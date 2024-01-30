/**
 * @license React
 * react-reconciler-reflection.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be replaced with error codes
// during build.
function formatProdErrorMessage(code) {
  let url = 'https://reactjs.org/docs/error-decoder.html?invariant=' + code;

  for (let i = 1; i < arguments.length; i++) {
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }

  return "Minified React error #" + code + "; visit " + url + " for the full message or " + 'use the non-minified dev environment for full errors and additional ' + 'helpful warnings.';
}

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */
function get(key) {
  return key._reactInternals;
}

const HostRoot = 3; // Root of a host tree. Could be nested inside another node.

const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.

const HostComponent = 5;
const HostText = 6;
const SuspenseComponent = 13;
const HostHoistable = 26;
const HostSingleton = 27;

const NoFlags =
/*                      */
0b0000000000000000000000000000;
const Placement =
/*                    */
0b0000000000000000000000000010;
const Hydrating =
/*                    */
0b0000000000000001000000000000; // You can change the rest (and add more).

function getNearestMountedFiber(fiber) {
  let node = fiber;
  let nearestMounted = fiber;

  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    let nextNode = node;

    do {
      node = nextNode;

      if ((node.flags & (Placement | Hydrating)) !== NoFlags) {
        // This is an insertion or in-progress hydration. The nearest possible
        // mounted fiber is the parent but we need to continue to figure out
        // if that one is still mounted.
        nearestMounted = node.return;
      } // $FlowFixMe[incompatible-type] we bail out when we get a null


      nextNode = node.return;
    } while (nextNode);
  } else {
    while (node.return) {
      node = node.return;
    }
  }

  if (node.tag === HostRoot) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return nearestMounted;
  } // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.


  return null;
}
function getSuspenseInstanceFromFiber(fiber) {
  if (fiber.tag === SuspenseComponent) {
    let suspenseState = fiber.memoizedState;

    if (suspenseState === null) {
      const current = fiber.alternate;

      if (current !== null) {
        suspenseState = current.memoizedState;
      }
    }

    if (suspenseState !== null) {
      return suspenseState.dehydrated;
    }
  }

  return null;
}
function getContainerFromFiber(fiber) {
  return fiber.tag === HostRoot ? fiber.stateNode.containerInfo : null;
}
function isFiberMounted(fiber) {
  return getNearestMountedFiber(fiber) === fiber;
}
function isMounted(component) {

  const fiber = get(component);

  if (!fiber) {
    return false;
  }

  return getNearestMountedFiber(fiber) === fiber;
}

function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber) {
    throw Error(formatProdErrorMessage(188));
  }
}

function findCurrentFiberUsingSlowPath(fiber) {
  const alternate = fiber.alternate;

  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    const nearestMounted = getNearestMountedFiber(fiber);

    if (nearestMounted === null) {
      throw Error(formatProdErrorMessage(188));
    }

    if (nearestMounted !== fiber) {
      return null;
    }

    return fiber;
  } // If we have two possible branches, we'll walk backwards up to the root
  // to see what path the root points to. On the way we may hit one of the
  // special cases and we'll deal with them.


  let a = fiber;
  let b = alternate;

  while (true) {
    const parentA = a.return;

    if (parentA === null) {
      // We're at the root.
      break;
    }

    const parentB = parentA.alternate;

    if (parentB === null) {
      // There is no alternate. This is an unusual case. Currently, it only
      // happens when a Suspense component is hidden. An extra fragment fiber
      // is inserted in between the Suspense fiber and its children. Skip
      // over this extra fragment fiber and proceed to the next parent.
      const nextParent = parentA.return;

      if (nextParent !== null) {
        a = b = nextParent;
        continue;
      } // If there's no parent, we're at the root.


      break;
    } // If both copies of the parent fiber point to the same child, we can
    // assume that the child is current. This happens when we bailout on low
    // priority: the bailed out fiber's child reuses the current child.


    if (parentA.child === parentB.child) {
      let child = parentA.child;

      while (child) {
        if (child === a) {
          // We've determined that A is the current branch.
          assertIsMounted(parentA);
          return fiber;
        }

        if (child === b) {
          // We've determined that B is the current branch.
          assertIsMounted(parentA);
          return alternate;
        }

        child = child.sibling;
      } // We should never have an alternate for any mounting node. So the only
      // way this could possibly happen is if this was unmounted, if at all.


      throw Error(formatProdErrorMessage(188));
    }

    if (a.return !== b.return) {
      // The return pointer of A and the return pointer of B point to different
      // fibers. We assume that return pointers never criss-cross, so A must
      // belong to the child set of A.return, and B must belong to the child
      // set of B.return.
      a = parentA;
      b = parentB;
    } else {
      // The return pointers point to the same fiber. We'll have to use the
      // default, slow path: scan the child sets of each parent alternate to see
      // which child belongs to which set.
      //
      // Search parent A's child set
      let didFindChild = false;
      let child = parentA.child;

      while (child) {
        if (child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }

        if (child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }

        child = child.sibling;
      }

      if (!didFindChild) {
        // Search parent B's child set
        child = parentB.child;

        while (child) {
          if (child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }

          if (child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }

          child = child.sibling;
        }

        if (!didFindChild) {
          throw Error(formatProdErrorMessage(189));
        }
      }
    }

    if (a.alternate !== b) {
      throw Error(formatProdErrorMessage(190));
    }
  } // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.


  if (a.tag !== HostRoot) {
    throw Error(formatProdErrorMessage(188));
  }

  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  } // Otherwise B has to be current branch.


  return alternate;
}
function findCurrentHostFiber(parent) {
  const currentParent = findCurrentFiberUsingSlowPath(parent);
  return currentParent !== null ? findCurrentHostFiberImpl(currentParent) : null;
}

function findCurrentHostFiberImpl(node) {
  // Next we'll drill down this component to find the first HostComponent/Text.
  const tag = node.tag;

  if (tag === HostComponent || (tag === HostHoistable ) || (tag === HostSingleton ) || tag === HostText) {
    return node;
  }

  let child = node.child;

  while (child !== null) {
    const match = findCurrentHostFiberImpl(child);

    if (match !== null) {
      return match;
    }

    child = child.sibling;
  }

  return null;
}

function findCurrentHostFiberWithNoPortals(parent) {
  const currentParent = findCurrentFiberUsingSlowPath(parent);
  return currentParent !== null ? findCurrentHostFiberWithNoPortalsImpl(currentParent) : null;
}

function findCurrentHostFiberWithNoPortalsImpl(node) {
  // Next we'll drill down this component to find the first HostComponent/Text.
  const tag = node.tag;

  if (tag === HostComponent || (tag === HostHoistable ) || (tag === HostSingleton ) || tag === HostText) {
    return node;
  }

  let child = node.child;

  while (child !== null) {
    if (child.tag !== HostPortal) {
      const match = findCurrentHostFiberWithNoPortalsImpl(child);

      if (match !== null) {
        return match;
      }
    }

    child = child.sibling;
  }

  return null;
}

function isFiberSuspenseAndTimedOut(fiber) {
  const memoizedState = fiber.memoizedState;
  return fiber.tag === SuspenseComponent && memoizedState !== null && memoizedState.dehydrated === null;
}
function doesFiberContain(parentFiber, childFiber) {
  let node = childFiber;
  const parentFiberAlternate = parentFiber.alternate;

  while (node !== null) {
    if (node === parentFiber || node === parentFiberAlternate) {
      return true;
    }

    node = node.return;
  }

  return false;
}

exports.doesFiberContain = doesFiberContain;
exports.findCurrentFiberUsingSlowPath = findCurrentFiberUsingSlowPath;
exports.findCurrentHostFiber = findCurrentHostFiber;
exports.findCurrentHostFiberWithNoPortals = findCurrentHostFiberWithNoPortals;
exports.getContainerFromFiber = getContainerFromFiber;
exports.getNearestMountedFiber = getNearestMountedFiber;
exports.getSuspenseInstanceFromFiber = getSuspenseInstanceFromFiber;
exports.isFiberMounted = isFiberMounted;
exports.isFiberSuspenseAndTimedOut = isFiberSuspenseAndTimedOut;
exports.isMounted = isMounted;