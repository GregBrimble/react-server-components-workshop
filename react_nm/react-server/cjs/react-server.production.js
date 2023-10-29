/**
 * @license React
 * react-server.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = function $$$reconciler($$$config) {

    var exports = {};
'use strict';

var React = require('react');

// This is a host config that's used for the `react-server` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument.
// However, inside the `react-server` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-server` bundle is wrapped in something like:
//
// module.exports = function ($$$config) {
//   /* renderer code */
// }
//
// So `$$$config` looks like a global variable, but it's
// really an argument to a top-level wrapping function.
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
const scheduleWork = $$$config.scheduleWork;
const beginWriting = $$$config.beginWriting;
const writeChunk = $$$config.writeChunk;
const writeChunkAndReturn = $$$config.writeChunkAndReturn;
const completeWriting = $$$config.completeWriting;
const flushBuffered = $$$config.flushBuffered;
const close = $$$config.close;
const closeWithError = $$$config.closeWithError;
$$$config.stringToChunk;
$$$config.stringToPrecomputedChunk;
$$$config.typedArrayToBinaryChunk;
$$$config.clonePrecomputedChunk;
$$$config.byteLengthOfChunk;
$$$config.byteLengthOfBinaryChunk;
const createFastHash = $$$config.createFastHash;

// This is a host config that's used for the `react-server` package on npm.
const resetResumableState = $$$config.resetResumableState;
const completeResumableState = $$$config.completeResumableState;
const getChildFormatContext = $$$config.getChildFormatContext;
const makeId = $$$config.makeId;
const pushTextInstance = $$$config.pushTextInstance;
const pushStartInstance = $$$config.pushStartInstance;
const pushEndInstance = $$$config.pushEndInstance;
$$$config.pushStartCompletedSuspenseBoundary;
$$$config.pushEndCompletedSuspenseBoundary;
const pushSegmentFinale = $$$config.pushSegmentFinale;
const pushFormStateMarkerIsMatching = $$$config.pushFormStateMarkerIsMatching;
const pushFormStateMarkerIsNotMatching = $$$config.pushFormStateMarkerIsNotMatching;
const writeCompletedRoot = $$$config.writeCompletedRoot;
const writePlaceholder = $$$config.writePlaceholder;
const writeStartCompletedSuspenseBoundary = $$$config.writeStartCompletedSuspenseBoundary;
const writeStartPendingSuspenseBoundary = $$$config.writeStartPendingSuspenseBoundary;
const writeStartClientRenderedSuspenseBoundary = $$$config.writeStartClientRenderedSuspenseBoundary;
const writeEndCompletedSuspenseBoundary = $$$config.writeEndCompletedSuspenseBoundary;
const writeEndPendingSuspenseBoundary = $$$config.writeEndPendingSuspenseBoundary;
const writeEndClientRenderedSuspenseBoundary = $$$config.writeEndClientRenderedSuspenseBoundary;
const writeStartSegment = $$$config.writeStartSegment;
const writeEndSegment = $$$config.writeEndSegment;
const writeCompletedSegmentInstruction = $$$config.writeCompletedSegmentInstruction;
const writeCompletedBoundaryInstruction = $$$config.writeCompletedBoundaryInstruction;
const writeClientRenderBoundaryInstruction = $$$config.writeClientRenderBoundaryInstruction;
const prepareHostDispatcher = $$$config.prepareHostDispatcher;
const NotPendingTransition = $$$config.NotPendingTransition; // -------------------------
//     Resources
// -------------------------

const writePreamble = $$$config.writePreamble;
const writeHoistables = $$$config.writeHoistables;
const writePostamble = $$$config.writePostamble;
const hoistResources = $$$config.hoistResources;
$$$config.createResources;
const createBoundaryResources = $$$config.createBoundaryResources;
const setCurrentlyRenderingBoundaryResourcesTarget = $$$config.setCurrentlyRenderingBoundaryResourcesTarget;
const writeResourcesForBoundary = $$$config.writeResourcesForBoundary;
const emitEarlyPreloads = $$$config.emitEarlyPreloads;

const assign = Object.assign;

// -----------------------------------------------------------------------------
const enableFloat = true; // Enables unstable_useMemoCache hook, intended as a compilation target for

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
const REACT_ELEMENT_TYPE = Symbol.for('react.element');
const REACT_PORTAL_TYPE = Symbol.for('react.portal');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
const REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
const REACT_PROFILER_TYPE = Symbol.for('react.profiler');
const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
const REACT_CONTEXT_TYPE = Symbol.for('react.context');
const REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
const REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
const REACT_MEMO_TYPE = Symbol.for('react.memo');
const REACT_LAZY_TYPE = Symbol.for('react.lazy');
const REACT_SCOPE_TYPE = Symbol.for('react.scope');
const REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
const REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
const REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');
const REACT_CACHE_TYPE = Symbol.for('react.cache');
const REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for('react.default_value');
const REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel');
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
const MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  const maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  const displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  const functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

    case REACT_CACHE_TYPE:
      {
        return 'Cache';
      }

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        const context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        const provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        const outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          const lazyComponent = type;
          const payload = lazyComponent._payload;
          const init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      case REACT_SERVER_CONTEXT_TYPE:
        {
          const context2 = type;
          return (context2.displayName || context2._globalName) + '.Provider';
        }

    }
  }

  return null;
}

const ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

const emptyContextObject = {};

function getMaskedContext(type, unmaskedContext) {
  {
    const contextTypes = type.contextTypes;

    if (!contextTypes) {
      return emptyContextObject;
    }

    const context = {};

    for (const key in contextTypes) {
      context[key] = unmaskedContext[key];
    }

    return context;
  }
}
function processChildContext(instance, type, parentContext, childContextTypes) {
  {
    // TODO (bvaughn) Replace this behavior with an invariant() in the future.
    // It has only been added in Fiber to match the (unintentional) behavior in Stack.
    if (typeof instance.getChildContext !== 'function') {

      return parentContext;
    }

    const childContext = instance.getChildContext();

    for (const contextKey in childContext) {
      if (!(contextKey in childContextTypes)) {
        throw new Error((getComponentNameFromType(type) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes.");
      }
    }

    return assign({}, parentContext, childContext);
  }
}

// Forming a reverse tree.
// The structure of a context snapshot is an implementation of this file.
// Currently, it's implemented as tracking the current active node.


const rootContextSnapshot = null; // We assume that this runtime owns the "current" field on all ReactContext instances.
// This global (actually thread local) state represents what state all those "current",
// fields are currently in.

let currentActiveSnapshot = null;

function popNode(prev) {
  {
    prev.context._currentValue2 = prev.parentValue;
  }
}

function pushNode(next) {
  {
    next.context._currentValue2 = next.value;
  }
}

function popToNearestCommonAncestor(prev, next) {
  if (prev === next) ; else {
    popNode(prev);
    const parentPrev = prev.parent;
    const parentNext = next.parent;

    if (parentPrev === null) {
      if (parentNext !== null) {
        throw new Error('The stacks must reach the root at the same time. This is a bug in React.');
      }
    } else {
      if (parentNext === null) {
        throw new Error('The stacks must reach the root at the same time. This is a bug in React.');
      }

      popToNearestCommonAncestor(parentPrev, parentNext);
    } // On the way back, we push the new ones that weren't common.


    pushNode(next);
  }
}

function popAllPrevious(prev) {
  popNode(prev);
  const parentPrev = prev.parent;

  if (parentPrev !== null) {
    popAllPrevious(parentPrev);
  }
}

function pushAllNext(next) {
  const parentNext = next.parent;

  if (parentNext !== null) {
    pushAllNext(parentNext);
  }

  pushNode(next);
}

function popPreviousToCommonLevel(prev, next) {
  popNode(prev);
  const parentPrev = prev.parent;

  if (parentPrev === null) {
    throw new Error('The depth must equal at least at zero before reaching the root. This is a bug in React.');
  }

  if (parentPrev.depth === next.depth) {
    // We found the same level. Now we just need to find a shared ancestor.
    popToNearestCommonAncestor(parentPrev, next);
  } else {
    // We must still be deeper.
    popPreviousToCommonLevel(parentPrev, next);
  }
}

function popNextToCommonLevel(prev, next) {
  const parentNext = next.parent;

  if (parentNext === null) {
    throw new Error('The depth must equal at least at zero before reaching the root. This is a bug in React.');
  }

  if (prev.depth === parentNext.depth) {
    // We found the same level. Now we just need to find a shared ancestor.
    popToNearestCommonAncestor(prev, parentNext);
  } else {
    // We must still be deeper.
    popNextToCommonLevel(prev, parentNext);
  }

  pushNode(next);
} // Perform context switching to the new snapshot.
// To make it cheap to read many contexts, while not suspending, we make the switch eagerly by
// updating all the context's current values. That way reads, always just read the current value.
// At the cost of updating contexts even if they're never read by this subtree.


function switchContext(newSnapshot) {
  // The basic algorithm we need to do is to pop back any contexts that are no longer on the stack.
  // We also need to update any new contexts that are now on the stack with the deepest value.
  // The easiest way to update new contexts is to just reapply them in reverse order from the
  // perspective of the backpointers. To avoid allocating a lot when switching, we use the stack
  // for that. Therefore this algorithm is recursive.
  // 1) First we pop which ever snapshot tree was deepest. Popping old contexts as we go.
  // 2) Then we find the nearest common ancestor from there. Popping old contexts as we go.
  // 3) Then we reapply new contexts on the way back up the stack.
  const prev = currentActiveSnapshot;
  const next = newSnapshot;

  if (prev !== next) {
    if (prev === null) {
      // $FlowFixMe[incompatible-call]: This has to be non-null since it's not equal to prev.
      pushAllNext(next);
    } else if (next === null) {
      popAllPrevious(prev);
    } else if (prev.depth === next.depth) {
      popToNearestCommonAncestor(prev, next);
    } else if (prev.depth > next.depth) {
      popPreviousToCommonLevel(prev, next);
    } else {
      popNextToCommonLevel(prev, next);
    }

    currentActiveSnapshot = next;
  }
}
function pushProvider(context, nextValue) {
  let prevValue;

  {
    prevValue = context._currentValue2;
    context._currentValue2 = nextValue;
  }

  const prevNode = currentActiveSnapshot;
  const newNode = {
    parent: prevNode,
    depth: prevNode === null ? 0 : prevNode.depth + 1,
    context: context,
    parentValue: prevValue,
    value: nextValue
  };
  currentActiveSnapshot = newNode;
  return newNode;
}
function popProvider(context) {
  const prevSnapshot = currentActiveSnapshot;

  if (prevSnapshot === null) {
    throw new Error('Tried to pop a Context at the root of the app. This is a bug in React.');
  }

  {
    const value = prevSnapshot.parentValue;

    if (value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
      prevSnapshot.context._currentValue2 = prevSnapshot.context._defaultValue;
    } else {
      prevSnapshot.context._currentValue2 = value;
    }
  }

  return currentActiveSnapshot = prevSnapshot.parent;
}
function getActiveContext() {
  return currentActiveSnapshot;
}
function readContext$1(context) {
  const value = context._currentValue2;
  return value;
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
function set(key, value) {
  key._reactInternals = value;
}

const isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

const classComponentUpdater = {
  isMounted(inst) {
    return false;
  },

  // $FlowFixMe[missing-local-annot]
  enqueueSetState(inst, payload, callback) {
    const internals = get(inst);

    if (internals.queue === null) ; else {
      internals.queue.push(payload);
    }
  },

  enqueueReplaceState(inst, payload, callback) {
    const internals = get(inst);
    internals.replace = true;
    internals.queue = [payload];
  },

  // $FlowFixMe[missing-local-annot]
  enqueueForceUpdate(inst, callback) {
  }

};

function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
  const partialState = getDerivedStateFromProps(nextProps, prevState);


  const newState = partialState === null || partialState === undefined ? prevState : assign({}, prevState, partialState);
  return newState;
}

function constructClassInstance(ctor, props, maskedLegacyContext) {
  let context = emptyContextObject;
  const contextType = ctor.contextType;

  if (typeof contextType === 'object' && contextType !== null) {
    context = readContext$1(contextType);
  } else {
    context = maskedLegacyContext;
  }

  const instance = new ctor(props, context);

  return instance;
}

function callComponentWillMount(type, instance) {
  const oldState = instance.state;

  if (typeof instance.componentWillMount === 'function') {

    instance.componentWillMount();
  }

  if (typeof instance.UNSAFE_componentWillMount === 'function') {
    instance.UNSAFE_componentWillMount();
  }

  if (oldState !== instance.state) {

    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
}

function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
  if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
    const oldQueue = internalInstance.queue;
    const oldReplace = internalInstance.replace;
    internalInstance.queue = null;
    internalInstance.replace = false;

    if (oldReplace && oldQueue.length === 1) {
      inst.state = oldQueue[0];
    } else {
      let nextState = oldReplace ? oldQueue[0] : inst.state;
      let dontMutate = true;

      for (let i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
        const partial = oldQueue[i];
        const partialState = typeof partial === 'function' ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;

        if (partialState != null) {
          if (dontMutate) {
            dontMutate = false;
            nextState = assign({}, nextState, partialState);
          } else {
            assign(nextState, partialState);
          }
        }
      }

      inst.state = nextState;
    }
  } else {
    internalInstance.queue = null;
  }
} // Invokes the mount life-cycles on a previously never rendered instance.


function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {

  const initialState = instance.state !== undefined ? instance.state : null;
  instance.updater = classComponentUpdater;
  instance.props = newProps;
  instance.state = initialState; // We don't bother initializing the refs object on the server, since we're not going to resolve them anyway.
  // The internal instance will be used to manage updates that happen during this mount.

  const internalInstance = {
    queue: [],
    replace: false
  };
  set(instance, internalInstance);
  const contextType = ctor.contextType;

  if (typeof contextType === 'object' && contextType !== null) {
    instance.context = readContext$1(contextType);
  } else {
    instance.context = maskedLegacyContext;
  }

  const getDerivedStateFromProps = ctor.getDerivedStateFromProps;

  if (typeof getDerivedStateFromProps === 'function') {
    instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
  } // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.


  if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
    callComponentWillMount(ctor, instance); // If we had additional state updates during this life-cycle, let's
    // process them now.

    processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
  }
}

// Ids are base 32 strings whose binary representation corresponds to the
// position of a node in a tree.
// Every time the tree forks into multiple children, we add additional bits to
// the left of the sequence that represent the position of the child within the
// current level of children.
//
//      00101       00010001011010101
//      ╰─┬─╯       ╰───────┬───────╯
//   Fork 5 of 20       Parent id
//
// The leading 0s are important. In the above example, you only need 3 bits to
// represent slot 5. However, you need 5 bits to represent all the forks at
// the current level, so we must account for the empty bits at the end.
//
// For this same reason, slots are 1-indexed instead of 0-indexed. Otherwise,
// the zeroth id at a level would be indistinguishable from its parent.
//
// If a node has only one child, and does not materialize an id (i.e. does not
// contain a useId hook), then we don't need to allocate any space in the
// sequence. It's treated as a transparent indirection. For example, these two
// trees produce the same ids:
//
// <>                          <>
//   <Indirection>               <A />
//     <A />                     <B />
//   </Indirection>            </>
//   <B />
// </>
//
// However, we cannot skip any node that materializes an id. Otherwise, a parent
// id that does not fork would be indistinguishable from its child id. For
// example, this tree does not fork, but the parent and child must have
// different ids.
//
// <Parent>
//   <Child />
// </Parent>
//
// To handle this scenario, every time we materialize an id, we allocate a
// new level with a single slot. You can think of this as a fork with only one
// prong, or an array of children with length 1.
//
// It's possible for the size of the sequence to exceed 32 bits, the max
// size for bitwise operations. When this happens, we make more room by
// converting the right part of the id to a string and storing it in an overflow
// variable. We use a base 32 string representation, because 32 is the largest
// power of 2 that is supported by toString(). We want the base to be large so
// that the resulting ids are compact, and we want the base to be a power of 2
// because every log2(base) bits corresponds to a single character, i.e. every
// log2(32) = 5 bits. That means we can lop bits off the end 5 at a time without
// affecting the final result.
const emptyTreeContext = {
  id: 1,
  overflow: ''
};
function getTreeId(context) {
  const overflow = context.overflow;
  const idWithLeadingBit = context.id;
  const id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
  return id.toString(32) + overflow;
}
function pushTreeContext(baseContext, totalChildren, index) {
  const baseIdWithLeadingBit = baseContext.id;
  const baseOverflow = baseContext.overflow; // The leftmost 1 marks the end of the sequence, non-inclusive. It's not part
  // of the id; we use it to account for leading 0s.

  const baseLength = getBitLength(baseIdWithLeadingBit) - 1;
  const baseId = baseIdWithLeadingBit & ~(1 << baseLength);
  const slot = index + 1;
  const length = getBitLength(totalChildren) + baseLength; // 30 is the max length we can store without overflowing, taking into
  // consideration the leading 1 we use to mark the end of the sequence.

  if (length > 30) {
    // We overflowed the bitwise-safe range. Fall back to slower algorithm.
    // This branch assumes the length of the base id is greater than 5; it won't
    // work for smaller ids, because you need 5 bits per character.
    //
    // We encode the id in multiple steps: first the base id, then the
    // remaining digits.
    //
    // Each 5 bit sequence corresponds to a single base 32 character. So for
    // example, if the current id is 23 bits long, we can convert 20 of those
    // bits into a string of 4 characters, with 3 bits left over.
    //
    // First calculate how many bits in the base id represent a complete
    // sequence of characters.
    const numberOfOverflowBits = baseLength - baseLength % 5; // Then create a bitmask that selects only those bits.

    const newOverflowBits = (1 << numberOfOverflowBits) - 1; // Select the bits, and convert them to a base 32 string.

    const newOverflow = (baseId & newOverflowBits).toString(32); // Now we can remove those bits from the base id.

    const restOfBaseId = baseId >> numberOfOverflowBits;
    const restOfBaseLength = baseLength - numberOfOverflowBits; // Finally, encode the rest of the bits using the normal algorithm. Because
    // we made more room, this time it won't overflow.

    const restOfLength = getBitLength(totalChildren) + restOfBaseLength;
    const restOfNewBits = slot << restOfBaseLength;
    const id = restOfNewBits | restOfBaseId;
    const overflow = newOverflow + baseOverflow;
    return {
      id: 1 << restOfLength | id,
      overflow
    };
  } else {
    // Normal path
    const newBits = slot << baseLength;
    const id = newBits | baseId;
    const overflow = baseOverflow;
    return {
      id: 1 << length | id,
      overflow
    };
  }
}

function getBitLength(number) {
  return 32 - clz32(number);
}

function getLeadingBit(id) {
  return 1 << getBitLength(id) - 1;
} // TODO: Math.clz32 is supported in Node 12+. Maybe we can drop the fallback.


const clz32 = Math.clz32 ? Math.clz32 : clz32Fallback; // Count leading zeros.
// Based on:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

const log = Math.log;
const LN2 = Math.LN2;

function clz32Fallback(x) {
  const asUint = x >>> 0;

  if (asUint === 0) {
    return 32;
  }

  return 31 - (log(asUint) / LN2 | 0) | 0;
}

// Corresponds to ReactFiberWakeable and ReactFlightWakeable modules. Generally,
// changes to one module should be reflected in the others.
// TODO: Rename this module and the corresponding Fiber one to "Thenable"
// instead of "Wakeable". Or some other more appropriate name.
// An error that is thrown (e.g. by `use`) to trigger Suspense. If we
// detect this is caught by userspace, we'll log a warning in development.
const SuspenseException = new Error("Suspense Exception: This is not a real error! It's an implementation " + 'detail of `use` to interrupt the current render. You must either ' + 'rethrow it immediately, or move the `use` call outside of the ' + '`try/catch` block. Capturing without rethrowing will lead to ' + 'unexpected behavior.\n\n' + 'To handle async errors, wrap your component in an error boundary, or ' + "call the promise's `.catch` method and pass the result to `use`");
function createThenableState() {
  // The ThenableState is created the first time a component suspends. If it
  // suspends again, we'll reuse the same state.
  return [];
}

function noop$2() {}

function trackUsedThenable(thenableState, thenable, index) {
  const previous = thenableState[index];

  if (previous === undefined) {
    thenableState.push(thenable);
  } else {
    if (previous !== thenable) {
      // Reuse the previous thenable, and drop the new one. We can assume
      // they represent the same value, because components are idempotent.
      // Avoid an unhandled rejection errors for the Promises that we'll
      // intentionally ignore.
      thenable.then(noop$2, noop$2);
      thenable = previous;
    }
  } // We use an expando to track the status and result of a thenable so that we
  // can synchronously unwrap the value. Think of this as an extension of the
  // Promise API, or a custom interface that is a superset of Thenable.
  //
  // If the thenable doesn't have a status, set it to "pending" and attach
  // a listener that will update its status and result when it resolves.


  switch (thenable.status) {
    case 'fulfilled':
      {
        const fulfilledValue = thenable.value;
        return fulfilledValue;
      }

    case 'rejected':
      {
        const rejectedError = thenable.reason;
        throw rejectedError;
      }

    default:
      {
        if (typeof thenable.status === 'string') ; else {
          const pendingThenable = thenable;
          pendingThenable.status = 'pending';
          pendingThenable.then(fulfilledValue => {
            if (thenable.status === 'pending') {
              const fulfilledThenable = thenable;
              fulfilledThenable.status = 'fulfilled';
              fulfilledThenable.value = fulfilledValue;
            }
          }, error => {
            if (thenable.status === 'pending') {
              const rejectedThenable = thenable;
              rejectedThenable.status = 'rejected';
              rejectedThenable.reason = error;
            }
          }); // Check one more time in case the thenable resolved synchronously

          switch (thenable.status) {
            case 'fulfilled':
              {
                const fulfilledThenable = thenable;
                return fulfilledThenable.value;
              }

            case 'rejected':
              {
                const rejectedThenable = thenable;
                throw rejectedThenable.reason;
              }
          }
        } // Suspend.
        //
        // Throwing here is an implementation detail that allows us to unwind the
        // call stack. But we shouldn't allow it to leak into userspace. Throw an
        // opaque placeholder value instead of the actual thenable. If it doesn't
        // get captured by the work loop, log a warning, because that means
        // something in userspace must have caught it.


        suspendedThenable = thenable;
        throw SuspenseException;
      }
  }
} // This is used to track the actual thenable that suspended so it can be
// passed to the rest of the Suspense implementation — which, for historical
// reasons, expects to receive a thenable.

let suspendedThenable = null;
function getSuspendedThenable() {
  // This is called right after `use` suspends by throwing an exception. `use`
  // throws an opaque value instead of the thenable itself so that it can't be
  // caught in userspace. Then the work loop accesses the actual thenable using
  // this function.
  if (suspendedThenable === null) {
    throw new Error('Expected a suspended thenable. This is a bug in React. Please file ' + 'an issue.');
  }

  const thenable = suspendedThenable;
  suspendedThenable = null;
  return thenable;
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

const objectIs = // $FlowFixMe[method-unbinding]
typeof Object.is === 'function' ? Object.is : is;

let currentlyRenderingComponent = null;
let currentlyRenderingTask = null;
let currentlyRenderingRequest = null;
let currentlyRenderingKeyPath = null;
let firstWorkInProgressHook = null;
let workInProgressHook = null; // Whether the work-in-progress hook is a re-rendered hook

let isReRender = false; // Whether an update was scheduled during the currently executing render pass.

let didScheduleRenderPhaseUpdate = false; // Counts the number of useId hooks in this component

let localIdCounter = 0; // Chunks that should be pushed to the stream once the component
// finishes rendering.
// Counts the number of useFormState calls in this component

let formStateCounter = 0; // The index of the useFormState hook that matches the one passed in at the
// root during an MPA navigation, if any.

let formStateMatchingIndex = -1; // Counts the number of use(thenable) calls in this component

let thenableIndexCounter = 0;
let thenableState = null; // Lazily created map of render-phase updates

let renderPhaseUpdates = null; // Counter to prevent infinite loops.

let numberOfReRenders = 0;
const RE_RENDER_LIMIT = 25;

function resolveCurrentlyRenderingComponent() {
  if (currentlyRenderingComponent === null) {
    throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
  }

  return currentlyRenderingComponent;
}

function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {

    return false;
  }


  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    // $FlowFixMe[incompatible-use] found when upgrading Flow
    if (objectIs(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
}

function createHook() {
  if (numberOfReRenders > 0) {
    throw new Error('Rendered more hooks than during the previous render');
  }

  return {
    memoizedState: null,
    queue: null,
    next: null
  };
}

function createWorkInProgressHook() {
  if (workInProgressHook === null) {
    // This is the first hook in the list
    if (firstWorkInProgressHook === null) {
      isReRender = false;
      firstWorkInProgressHook = workInProgressHook = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = firstWorkInProgressHook;
    }
  } else {
    if (workInProgressHook.next === null) {
      isReRender = false; // Append to the end of the list

      workInProgressHook = workInProgressHook.next = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = workInProgressHook.next;
    }
  }

  return workInProgressHook;
}

function prepareToUseHooks(request, task, keyPath, componentIdentity, prevThenableState) {
  currentlyRenderingComponent = componentIdentity;
  currentlyRenderingTask = task;
  currentlyRenderingRequest = request;
  currentlyRenderingKeyPath = keyPath;
  // didScheduleRenderPhaseUpdate = false;
  // firstWorkInProgressHook = null;
  // numberOfReRenders = 0;
  // renderPhaseUpdates = null;
  // workInProgressHook = null;


  localIdCounter = 0;
  formStateCounter = 0;
  formStateMatchingIndex = -1;
  thenableIndexCounter = 0;
  thenableState = prevThenableState;
}
function finishHooks(Component, props, children, refOrContext) {
  // This must be called after every function component to prevent hooks from
  // being used in classes.
  while (didScheduleRenderPhaseUpdate) {
    // Updates were scheduled during the render phase. They are stored in
    // the `renderPhaseUpdates` map. Call the component again, reusing the
    // work-in-progress hooks and applying the additional updates on top. Keep
    // restarting until no more updates are scheduled.
    didScheduleRenderPhaseUpdate = false;
    localIdCounter = 0;
    formStateCounter = 0;
    formStateMatchingIndex = -1;
    thenableIndexCounter = 0;
    numberOfReRenders += 1; // Start over from the beginning of the list

    workInProgressHook = null;
    children = Component(props, refOrContext);
  }

  resetHooksState();
  return children;
}
function getThenableStateAfterSuspending() {
  const state = thenableState;
  thenableState = null;
  return state;
}
function checkDidRenderIdHook() {
  // This should be called immediately after every finishHooks call.
  // Conceptually, it's part of the return value of finishHooks; it's only a
  // separate function to avoid using an array tuple.
  const didRenderIdHook = localIdCounter !== 0;
  return didRenderIdHook;
}
function getFormStateCount() {
  // This should be called immediately after every finishHooks call.
  // Conceptually, it's part of the return value of finishHooks; it's only a
  // separate function to avoid using an array tuple.
  return formStateCounter;
}
function getFormStateMatchingIndex() {
  // This should be called immediately after every finishHooks call.
  // Conceptually, it's part of the return value of finishHooks; it's only a
  // separate function to avoid using an array tuple.
  return formStateMatchingIndex;
} // Reset the internal hooks state if an error occurs while rendering a component

function resetHooksState() {

  currentlyRenderingComponent = null;
  currentlyRenderingTask = null;
  currentlyRenderingRequest = null;
  currentlyRenderingKeyPath = null;
  didScheduleRenderPhaseUpdate = false;
  firstWorkInProgressHook = null;
  numberOfReRenders = 0;
  renderPhaseUpdates = null;
  workInProgressHook = null;
}

function readContext(context) {

  return readContext$1(context);
}

function useContext(context) {

  resolveCurrentlyRenderingComponent();
  return readContext$1(context);
}

function basicStateReducer(state, action) {
  // $FlowFixMe[incompatible-use]: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}

function useState(initialState) {

  return useReducer(basicStateReducer, // useReducer has a special case to support lazy useState initializers
  initialState);
}
function useReducer(reducer, initialArg, init) {

  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();

  if (isReRender) {
    // This is a re-render. Apply the new render phase updates to the previous
    // current hook.
    const queue = workInProgressHook.queue;
    const dispatch = queue.dispatch;

    if (renderPhaseUpdates !== null) {
      // Render phase updates are stored in a map of queue -> linked list
      const firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

      if (firstRenderPhaseUpdate !== undefined) {
        // $FlowFixMe[incompatible-use] found when upgrading Flow
        renderPhaseUpdates.delete(queue); // $FlowFixMe[incompatible-use] found when upgrading Flow

        let newState = workInProgressHook.memoizedState;
        let update = firstRenderPhaseUpdate;

        do {
          // Process this render phase update. We don't have to check the
          // priority because it will always be the same as the current
          // render's.
          const action = update.action;

          newState = reducer(newState, action);


          update = update.next;
        } while (update !== null); // $FlowFixMe[incompatible-use] found when upgrading Flow


        workInProgressHook.memoizedState = newState;
        return [newState, dispatch];
      }
    } // $FlowFixMe[incompatible-use] found when upgrading Flow


    return [workInProgressHook.memoizedState, dispatch];
  } else {

    let initialState;

    if (reducer === basicStateReducer) {
      // Special case for `useState`.
      initialState = typeof initialArg === 'function' ? initialArg() : initialArg;
    } else {
      initialState = init !== undefined ? init(initialArg) : initialArg;
    }


    workInProgressHook.memoizedState = initialState; // $FlowFixMe[incompatible-use] found when upgrading Flow

    const queue = workInProgressHook.queue = {
      last: null,
      dispatch: null
    };
    const dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, queue); // $FlowFixMe[incompatible-use] found when upgrading Flow

    return [workInProgressHook.memoizedState, dispatch];
  }
}

function useMemo(nextCreate, deps) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;

  if (workInProgressHook !== null) {
    const prevState = workInProgressHook.memoizedState;

    if (prevState !== null) {
      if (nextDeps !== null) {
        const prevDeps = prevState[1];

        if (areHookInputsEqual(nextDeps, prevDeps)) {
          return prevState[0];
        }
      }
    }
  }

  const nextValue = nextCreate();


  workInProgressHook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function useRef(initialValue) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  const previousRef = workInProgressHook.memoizedState;

  if (previousRef === null) {
    const ref = {
      current: initialValue
    };


    workInProgressHook.memoizedState = ref;
    return ref;
  } else {
    return previousRef;
  }
}

function dispatchAction(componentIdentity, queue, action) {
  if (numberOfReRenders >= RE_RENDER_LIMIT) {
    throw new Error('Too many re-renders. React limits the number of renders to prevent ' + 'an infinite loop.');
  }

  if (componentIdentity === currentlyRenderingComponent) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdate = true;
    const update = {
      action,
      next: null
    };

    if (renderPhaseUpdates === null) {
      renderPhaseUpdates = new Map();
    }

    const firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

    if (firstRenderPhaseUpdate === undefined) {
      // $FlowFixMe[incompatible-use] found when upgrading Flow
      renderPhaseUpdates.set(queue, update);
    } else {
      // Append the update to the end of the list.
      let lastRenderPhaseUpdate = firstRenderPhaseUpdate;

      while (lastRenderPhaseUpdate.next !== null) {
        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      }

      lastRenderPhaseUpdate.next = update;
    }
  }
}

function useCallback(callback, deps) {
  return useMemo(() => callback, deps);
}

function throwOnUseEffectEventCall() {
  throw new Error("A function wrapped in useEffectEvent can't be called during rendering.");
}

function useEffectEvent(callback) {
  // $FlowIgnore[incompatible-return]
  return throwOnUseEffectEventCall;
}

function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  if (getServerSnapshot === undefined) {
    throw new Error('Missing getServerSnapshot, which is required for ' + 'server-rendered content. Will revert to client rendering.');
  }

  return getServerSnapshot();
}

function useDeferredValue(value, initialValue) {
  resolveCurrentlyRenderingComponent();

  {
    return initialValue !== undefined ? initialValue : value;
  }
}

function unsupportedStartTransition() {
  throw new Error('startTransition cannot be called during server rendering.');
}

function useTransition() {
  resolveCurrentlyRenderingComponent();
  return [false, unsupportedStartTransition];
}

function useHostTransitionStatus() {
  resolveCurrentlyRenderingComponent();
  return NotPendingTransition;
}

function unsupportedSetOptimisticState() {
  throw new Error('Cannot update optimistic state while rendering.');
}

function useOptimistic(passthrough, reducer) {
  resolveCurrentlyRenderingComponent();
  return [passthrough, unsupportedSetOptimisticState];
}

function createPostbackFormStateKey(permalink, componentKeyPath, hookIndex) {
  if (permalink !== undefined) {
    // Don't bother to hash a permalink-based key since it's already short.
    return 'p' + permalink;
  } else {
    // Append a node to the key path that represents the form state hook.
    const keyPath = [componentKeyPath, null, hookIndex]; // Key paths are hashed to reduce the size. It does not need to be secure,
    // and it's more important that it's fast than that it's completely
    // collision-free.

    const keyPathHash = createFastHash(JSON.stringify(keyPath));
    return 'k' + keyPathHash;
  }
}

function useFormState(action, initialState, permalink) {
  resolveCurrentlyRenderingComponent(); // Count the number of useFormState hooks per component. We also use this to
  // track the position of this useFormState hook relative to the other ones in
  // this component, so we can generate a unique key for each one.

  const formStateHookIndex = formStateCounter++;
  const request = currentlyRenderingRequest; // $FlowIgnore[prop-missing]

  const formAction = action.$$FORM_ACTION;

  if (typeof formAction === 'function') {
    // This is a server action. These have additional features to enable
    // MPA-style form submissions with progressive enhancement.
    // TODO: If the same permalink is passed to multiple useFormStates, and
    // they all have the same action signature, Fizz will pass the postback
    // state to all of them. We should probably only pass it to the first one,
    // and/or warn.
    // The key is lazily generated and deduped so the that the keypath doesn't
    // get JSON.stringify-ed unnecessarily, and at most once.
    let nextPostbackStateKey = null; // Determine the current form state. If we received state during an MPA form
    // submission, then we will reuse that, if the action identity matches.
    // Otherwise we'll use the initial state argument. We will emit a comment
    // marker into the stream that indicates whether the state was reused.

    let state = initialState;
    const componentKeyPath = currentlyRenderingKeyPath;
    const postbackFormState = getFormState(request); // $FlowIgnore[prop-missing]

    const isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;

    if (postbackFormState !== null && typeof isSignatureEqual === 'function') {
      const postbackKey = postbackFormState[1];
      const postbackReferenceId = postbackFormState[2];
      const postbackBoundArity = postbackFormState[3];

      if (isSignatureEqual.call(action, postbackReferenceId, postbackBoundArity)) {
        nextPostbackStateKey = createPostbackFormStateKey(permalink, componentKeyPath, formStateHookIndex);

        if (postbackKey === nextPostbackStateKey) {
          // This was a match
          formStateMatchingIndex = formStateHookIndex; // Reuse the state that was submitted by the form.

          state = postbackFormState[0];
        }
      }
    } // Bind the state to the first argument of the action.


    const boundAction = action.bind(null, state); // Wrap the action so the return value is void.

    const dispatch = payload => {
      boundAction(payload);
    }; // $FlowIgnore[prop-missing]


    if (typeof boundAction.$$FORM_ACTION === 'function') {
      // $FlowIgnore[prop-missing]
      dispatch.$$FORM_ACTION = prefix => {
        const metadata = boundAction.$$FORM_ACTION(prefix); // Override the action URL

        if (permalink !== undefined) {

          permalink += '';
          metadata.action = permalink;
        }

        const formData = metadata.data;

        if (formData) {
          if (nextPostbackStateKey === null) {
            nextPostbackStateKey = createPostbackFormStateKey(permalink, componentKeyPath, formStateHookIndex);
          }

          formData.append('$ACTION_KEY', nextPostbackStateKey);
        }

        return metadata;
      };
    }

    return [state, dispatch];
  } else {
    // This is not a server action, so the implementation is much simpler.
    // Bind the state to the first argument of the action.
    const boundAction = action.bind(null, initialState); // Wrap the action so the return value is void.

    const dispatch = payload => {
      boundAction(payload);
    };

    return [initialState, dispatch];
  }
}

function useId() {
  const task = currentlyRenderingTask;
  const treeId = getTreeId(task.treeContext);
  const resumableState = currentResumableState;

  if (resumableState === null) {
    throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component.');
  }

  const localId = localIdCounter++;
  return makeId(resumableState, treeId, localId);
}

function use(usable) {
  if (usable !== null && typeof usable === 'object') {
    // $FlowFixMe[method-unbinding]
    if (typeof usable.then === 'function') {
      // This is a thenable.
      const thenable = usable;
      return unwrapThenable(thenable);
    } else if (usable.$$typeof === REACT_CONTEXT_TYPE || usable.$$typeof === REACT_SERVER_CONTEXT_TYPE) {
      const context = usable;
      return readContext(context);
    }
  } // eslint-disable-next-line react-internal/safe-string-coercion


  throw new Error('An unsupported type was passed to use(): ' + String(usable));
}

function unwrapThenable(thenable) {
  const index = thenableIndexCounter;
  thenableIndexCounter += 1;

  if (thenableState === null) {
    thenableState = createThenableState();
  }

  return trackUsedThenable(thenableState, thenable, index);
}

function unsupportedRefresh() {
  throw new Error('Cache cannot be refreshed during server rendering.');
}

function useCacheRefresh() {
  return unsupportedRefresh;
}

function useMemoCache(size) {
  const data = new Array(size);

  for (let i = 0; i < size; i++) {
    data[i] = REACT_MEMO_CACHE_SENTINEL;
  }

  return data;
}

function noop$1() {}

const HooksDispatcher = {
  readContext,
  use,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
  useInsertionEffect: noop$1,
  useLayoutEffect: noop$1,
  useCallback,
  // useImperativeHandle is not run in the server environment
  useImperativeHandle: noop$1,
  // Effects are not run in the server environment.
  useEffect: noop$1,
  // Debugging effect
  useDebugValue: noop$1,
  useDeferredValue,
  useTransition,
  useId,
  // Subscriptions are not setup in a server environment.
  useSyncExternalStore
};

{
  HooksDispatcher.useCacheRefresh = useCacheRefresh;
}

{
  HooksDispatcher.useEffectEvent = useEffectEvent;
}

{
  HooksDispatcher.useMemoCache = useMemoCache;
}

{
  HooksDispatcher.useHostTransitionStatus = useHostTransitionStatus;
}

{
  HooksDispatcher.useOptimistic = useOptimistic;
  HooksDispatcher.useFormState = useFormState;
}

let currentResumableState = null;
function setCurrentResumableState(resumableState) {
  currentResumableState = resumableState;
}

function getCacheSignal() {
  throw new Error('Not implemented.');
}

function getCacheForType(resourceType) {
  throw new Error('Not implemented.');
}

const DefaultCacheDispatcher = {
  getCacheSignal,
  getCacheForType
};

const ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
const ReactCurrentCache = ReactSharedInternals.ReactCurrentCache;
// The name might be minified but we assume that it's going to be the same generated name. Typically
// because it's just the same compiled output in practice.
// resume with segmentID at the index

const CLIENT_RENDERED = 4; // if it errors or infinitely suspends

const PENDING = 0;
const COMPLETED = 1;
const FLUSHED = 2;
const ABORTED = 3;
const ERRORED = 4;
const POSTPONED = 5;
const OPEN = 0;
const CLOSING = 1;
const CLOSED = 2; // This is a default heuristic for how to split up the HTML content into progressive
// loading. Our goal is to be able to display additional new content about every 500ms.
// Faster than that is unnecessary and should be throttled on the client. It also
// adds unnecessary overhead to do more splits. We don't know if it's a higher or lower
// end device but higher end suffer less from the overhead than lower end does from
// not getting small enough pieces. We error on the side of low end.
// We base this on low end 3G speeds which is about 500kbits per second. We assume
// that there can be a reasonable drop off from max bandwidth which leaves you with
// as little as 80%. We can receive half of that each 500ms - at best. In practice,
// a little bandwidth is lost to processing and contention - e.g. CSS and images that
// are downloaded along with the main content. So we estimate about half of that to be
// the lower end throughput. In other words, we expect that you can at least show
// about 12.5kb of content per 500ms. Not counting starting latency for the first
// paint.
// 500 * 1024 / 8 * .8 * 0.5 / 2

const DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;

function defaultErrorHandler(error) {
  console['error'](error); // Don't transform to our wrapper

  return null;
}

function noop() {}

function createRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
  prepareHostDispatcher();
  const pingedTasks = [];
  const abortSet = new Set();
  const request = {
    destination: null,
    flushScheduled: false,
    resumableState,
    renderState,
    rootFormatContext,
    progressiveChunkSize: progressiveChunkSize === undefined ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
    status: OPEN,
    fatalError: null,
    nextSegmentId: 0,
    allPendingTasks: 0,
    pendingRootTasks: 0,
    completedRootSegment: null,
    abortableTasks: abortSet,
    pingedTasks: pingedTasks,
    clientRenderedBoundaries: [],
    completedBoundaries: [],
    partialBoundaries: [],
    trackedPostpones: null,
    onError: onError === undefined ? defaultErrorHandler : onError,
    onPostpone: onPostpone === undefined ? noop : onPostpone,
    onAllReady: onAllReady === undefined ? noop : onAllReady,
    onShellReady: onShellReady === undefined ? noop : onShellReady,
    onShellError: onShellError === undefined ? noop : onShellError,
    onFatalError: onFatalError === undefined ? noop : onFatalError,
    formState: formState === undefined ? null : formState
  }; // This segment represents the root fallback.

  const rootSegment = createPendingSegment(request, 0, null, rootFormatContext, // Root segments are never embedded in Text on either edge
  false, false); // There is no parent so conceptually, we're unblocked to flush this segment.

  rootSegment.parentFlushed = true;
  const rootTask = createRenderTask(request, null, children, -1, null, rootSegment, abortSet, null, rootFormatContext, emptyContextObject, rootContextSnapshot, emptyTreeContext);
  pingedTasks.push(rootTask);
  return request;
}
function createPrerenderRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError, onPostpone) {
  const request = createRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, undefined); // Start tracking postponed holes during this render.

  request.trackedPostpones = {
    workingMap: new Map(),
    rootNodes: [],
    rootSlots: null
  };
  return request;
}
function resumeRequest(children, postponedState, renderState, onError, onAllReady, onShellReady, onShellError, onFatalError, onPostpone) {
  prepareHostDispatcher();
  const pingedTasks = [];
  const abortSet = new Set();
  const request = {
    destination: null,
    flushScheduled: false,
    resumableState: postponedState.resumableState,
    renderState,
    rootFormatContext: postponedState.rootFormatContext,
    progressiveChunkSize: postponedState.progressiveChunkSize,
    status: OPEN,
    fatalError: null,
    nextSegmentId: postponedState.nextSegmentId,
    allPendingTasks: 0,
    pendingRootTasks: 0,
    completedRootSegment: null,
    abortableTasks: abortSet,
    pingedTasks: pingedTasks,
    clientRenderedBoundaries: [],
    completedBoundaries: [],
    partialBoundaries: [],
    trackedPostpones: null,
    onError: onError === undefined ? defaultErrorHandler : onError,
    onPostpone: onPostpone === undefined ? noop : onPostpone,
    onAllReady: onAllReady === undefined ? noop : onAllReady,
    onShellReady: onShellReady === undefined ? noop : onShellReady,
    onShellError: onShellError === undefined ? noop : onShellError,
    onFatalError: onFatalError === undefined ? noop : onFatalError,
    formState: null
  };

  if (typeof postponedState.replaySlots === 'number') {
    const resumedId = postponedState.replaySlots; // We have a resume slot at the very root. This is effectively just a full rerender.

    const rootSegment = createPendingSegment(request, 0, null, postponedState.rootFormatContext, // Root segments are never embedded in Text on either edge
    false, false);
    rootSegment.id = resumedId; // There is no parent so conceptually, we're unblocked to flush this segment.

    rootSegment.parentFlushed = true;
    const rootTask = createRenderTask(request, null, children, -1, null, rootSegment, abortSet, null, postponedState.rootFormatContext, emptyContextObject, rootContextSnapshot, emptyTreeContext);
    pingedTasks.push(rootTask);
    return request;
  }

  const replay = {
    nodes: postponedState.replayNodes,
    slots: postponedState.replaySlots,
    pendingTasks: 0
  };
  const rootTask = createReplayTask(request, null, replay, children, -1, null, abortSet, null, postponedState.rootFormatContext, emptyContextObject, rootContextSnapshot, emptyTreeContext);
  pingedTasks.push(rootTask);
  return request;
}
let currentRequest = null;
function resolveRequest() {
  if (currentRequest) return currentRequest;

  return null;
}

function pingTask(request, task) {
  const pingedTasks = request.pingedTasks;
  pingedTasks.push(task);

  if (request.pingedTasks.length === 1) {
    request.flushScheduled = request.destination !== null;
    scheduleWork(() => performWork(request));
  }
}

function createSuspenseBoundary(request, fallbackAbortableTasks) {
  return {
    status: PENDING,
    rootSegmentID: -1,
    parentFlushed: false,
    pendingTasks: 0,
    completedSegments: [],
    byteSize: 0,
    fallbackAbortableTasks,
    errorDigest: null,
    resources: createBoundaryResources(),
    trackedContentKeyPath: null,
    trackedFallbackNode: null
  };
}

function createRenderTask(request, thenableState, node, childIndex, blockedBoundary, blockedSegment, abortSet, keyPath, formatContext, legacyContext, context, treeContext) {
  request.allPendingTasks++;

  if (blockedBoundary === null) {
    request.pendingRootTasks++;
  } else {
    blockedBoundary.pendingTasks++;
  }

  const task = {
    replay: null,
    node,
    childIndex,
    ping: () => pingTask(request, task),
    blockedBoundary,
    blockedSegment,
    abortSet,
    keyPath,
    formatContext,
    legacyContext,
    context,
    treeContext,
    thenableState
  };

  abortSet.add(task);
  return task;
}

function createReplayTask(request, thenableState, replay, node, childIndex, blockedBoundary, abortSet, keyPath, formatContext, legacyContext, context, treeContext) {
  request.allPendingTasks++;

  if (blockedBoundary === null) {
    request.pendingRootTasks++;
  } else {
    blockedBoundary.pendingTasks++;
  }

  replay.pendingTasks++;
  const task = {
    replay,
    node,
    childIndex,
    ping: () => pingTask(request, task),
    blockedBoundary,
    blockedSegment: null,
    abortSet,
    keyPath,
    formatContext,
    legacyContext,
    context,
    treeContext,
    thenableState
  };

  abortSet.add(task);
  return task;
}

function createPendingSegment(request, index, boundary, parentFormatContext, lastPushedText, textEmbedded) {
  return {
    status: PENDING,
    id: -1,
    // lazily assigned later
    index,
    parentFlushed: false,
    chunks: [],
    children: [],
    parentFormatContext,
    boundary,
    lastPushedText,
    textEmbedded
  };
} // DEV-only global reference to the currently executing task

function popComponentStackInDEV(task) {
} // stash the component stack of an unwinding error until it is processed

function logPostpone(request, reason) {
  // If this callback errors, we intentionally let that error bubble up to become a fatal error
  // so that someone fixes the error reporting instead of hiding it.
  request.onPostpone(reason);
}

function logRecoverableError(request, error) {
  // If this callback errors, we intentionally let that error bubble up to become a fatal error
  // so that someone fixes the error reporting instead of hiding it.
  const errorDigest = request.onError(error);

  if (errorDigest != null && typeof errorDigest !== 'string') {
    // eslint-disable-next-line react-internal/prod-error-codes
    throw new Error("onError returned something with a type other than \"string\". onError should return a string and may return null or undefined but must not return anything else. It received something of type \"" + typeof errorDigest + "\" instead");
  }

  return errorDigest;
}

function fatalError(request, error) {
  // This is called outside error handling code such as if the root errors outside
  // a suspense boundary or if the root suspense boundary's fallback errors.
  // It's also called if React itself or its host configs errors.
  const onShellError = request.onShellError;
  onShellError(error);
  const onFatalError = request.onFatalError;
  onFatalError(error);

  if (request.destination !== null) {
    request.status = CLOSED;
    closeWithError(request.destination, error);
  } else {
    request.status = CLOSING;
    request.fatalError = error;
  }
}

function renderSuspenseBoundary(request, someTask, keyPath, props) {
  if (someTask.replay !== null) {
    // If we're replaying through this pass, it means we're replaying through
    // an already completed Suspense boundary. It's too late to do anything about it
    // so we can just render through it.
    const prevKeyPath = someTask.keyPath;
    someTask.keyPath = keyPath;
    const content = props.children;

    try {
      renderNode(request, someTask, content, -1);
    } finally {
      someTask.keyPath = prevKeyPath;
    }

    return;
  } // $FlowFixMe: Refined.


  const task = someTask;
  const prevKeyPath = task.keyPath;
  const parentBoundary = task.blockedBoundary;
  const parentSegment = task.blockedSegment; // Each time we enter a suspense boundary, we split out into a new segment for
  // the fallback so that we can later replace that segment with the content.
  // This also lets us split out the main content even if it doesn't suspend,
  // in case it ends up generating a large subtree of content.

  const fallback = props.fallback;
  const content = props.children;
  const fallbackAbortSet = new Set();
  const newBoundary = createSuspenseBoundary(request, fallbackAbortSet);

  if (request.trackedPostpones !== null) {
    newBoundary.trackedContentKeyPath = keyPath;
  }

  const insertionIndex = parentSegment.chunks.length; // The children of the boundary segment is actually the fallback.

  const boundarySegment = createPendingSegment(request, insertionIndex, newBoundary, task.formatContext, // boundaries never require text embedding at their edges because comment nodes bound them
  false, false);
  parentSegment.children.push(boundarySegment); // The parentSegment has a child Segment at this index so we reset the lastPushedText marker on the parent

  parentSegment.lastPushedText = false; // This segment is the actual child content. We can start rendering that immediately.

  const contentRootSegment = createPendingSegment(request, 0, null, task.formatContext, // boundaries never require text embedding at their edges because comment nodes bound them
  false, false); // We mark the root segment as having its parent flushed. It's not really flushed but there is
  // no parent segment so there's nothing to wait on.

  contentRootSegment.parentFlushed = true; // Currently this is running synchronously. We could instead schedule this to pingedTasks.
  // I suspect that there might be some efficiency benefits from not creating the suspended task
  // and instead just using the stack if possible.
  // TODO: Call this directly instead of messing with saving and restoring contexts.
  // We can reuse the current context and task to render the content immediately without
  // context switching. We just need to temporarily switch which boundary and which segment
  // we're writing to. If something suspends, it'll spawn new suspended task with that context.

  task.blockedBoundary = newBoundary;
  task.blockedSegment = contentRootSegment;

  {
    setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, newBoundary.resources);
  }

  task.keyPath = keyPath;

  try {
    // We use the safe form because we don't handle suspending here. Only error handling.
    renderNode(request, task, content, -1);
    pushSegmentFinale(contentRootSegment.chunks, request.renderState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded);
    contentRootSegment.status = COMPLETED;
    queueCompletedSegment(newBoundary, contentRootSegment);

    if (newBoundary.pendingTasks === 0 && newBoundary.status === PENDING) {
      newBoundary.status = COMPLETED; // This must have been the last segment we were waiting on. This boundary is now complete.
      // Therefore we won't need the fallback. We early return so that we don't have to create
      // the fallback.

      popComponentStackInDEV(task);
      return;
    }
  } catch (error) {
    contentRootSegment.status = ERRORED;
    newBoundary.status = CLIENT_RENDERED;
    let errorDigest;

    if (typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE) {
      const postponeInstance = error;
      logPostpone(request, postponeInstance.message); // TODO: Figure out a better signal than a magic digest value.

      errorDigest = 'POSTPONE';
    } else {
      errorDigest = logRecoverableError(request, error);
    }

    newBoundary.errorDigest = errorDigest;
    // We don't need to schedule any task because we know the parent has written yet.
    // We do need to fallthrough to create the fallback though.

  } finally {
    {
      setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, parentBoundary ? parentBoundary.resources : null);
    }

    task.blockedBoundary = parentBoundary;
    task.blockedSegment = parentSegment;
    task.keyPath = prevKeyPath;
  }

  const fallbackKeyPath = [keyPath[0], 'Suspense Fallback', keyPath[2]];
  const trackedPostpones = request.trackedPostpones;

  if (trackedPostpones !== null) {
    // We create a detached replay node to track any postpones inside the fallback.
    const fallbackReplayNode = [fallbackKeyPath[1], fallbackKeyPath[2], [], null];
    trackedPostpones.workingMap.set(fallbackKeyPath, fallbackReplayNode);

    if (newBoundary.status === POSTPONED) {
      // This must exist now.
      const boundaryReplayNode = trackedPostpones.workingMap.get(keyPath);
      boundaryReplayNode[4] = fallbackReplayNode;
    } else {
      // We might not inject it into the postponed tree, unless the content actually
      // postpones too. We need to keep track of it until that happpens.
      newBoundary.trackedFallbackNode = fallbackReplayNode;
    }
  } // We create suspended task for the fallback because we don't want to actually work
  // on it yet in case we finish the main content, so we queue for later.


  const suspendedFallbackTask = createRenderTask(request, null, fallback, -1, parentBoundary, boundarySegment, fallbackAbortSet, fallbackKeyPath, task.formatContext, task.legacyContext, task.context, task.treeContext);
  // on preparing fallbacks if we don't have any more main content to task on.


  request.pingedTasks.push(suspendedFallbackTask);
}

function replaySuspenseBoundary(request, task, keyPath, props, id, childNodes, childSlots, fallbackNodes, fallbackSlots) {
  const prevKeyPath = task.keyPath;
  const previousReplaySet = task.replay;
  const parentBoundary = task.blockedBoundary;
  const content = props.children;
  const fallback = props.fallback;
  const fallbackAbortSet = new Set();
  const resumedBoundary = createSuspenseBoundary(request, fallbackAbortSet);
  resumedBoundary.parentFlushed = true; // We restore the same id of this boundary as was used during prerender.

  resumedBoundary.rootSegmentID = id; // We can reuse the current context and task to render the content immediately without
  // context switching. We just need to temporarily switch which boundary and replay node
  // we're writing to. If something suspends, it'll spawn new suspended task with that context.

  task.blockedBoundary = resumedBoundary;
  task.replay = {
    nodes: childNodes,
    slots: childSlots,
    pendingTasks: 1
  };

  {
    setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, resumedBoundary.resources);
  }

  try {
    // We use the safe form because we don't handle suspending here. Only error handling.
    renderNode(request, task, content, -1);

    if (task.replay.pendingTasks === 1 && task.replay.nodes.length > 0) {
      throw new Error("Couldn't find all resumable slots by key/index during replaying. " + "The tree doesn't match so React will fallback to client rendering.");
    }

    task.replay.pendingTasks--;

    if (resumedBoundary.pendingTasks === 0 && resumedBoundary.status === PENDING) {
      resumedBoundary.status = COMPLETED;
      request.completedBoundaries.push(resumedBoundary); // This must have been the last segment we were waiting on. This boundary is now complete.
      // Therefore we won't need the fallback. We early return so that we don't have to create
      // the fallback.

      popComponentStackInDEV(task);
      return;
    }
  } catch (error) {
    resumedBoundary.status = CLIENT_RENDERED;
    let errorDigest;

    if (typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE) {
      const postponeInstance = error;
      logPostpone(request, postponeInstance.message); // TODO: Figure out a better signal than a magic digest value.

      errorDigest = 'POSTPONE';
    } else {
      errorDigest = logRecoverableError(request, error);
    }

    resumedBoundary.errorDigest = errorDigest;

    task.replay.pendingTasks--; // The parent already flushed in the prerender so we need to schedule this to be emitted.

    request.clientRenderedBoundaries.push(resumedBoundary); // We don't need to decrement any task numbers because we didn't spawn any new task.
    // We don't need to schedule any task because we know the parent has written yet.
    // We do need to fallthrough to create the fallback though.
  } finally {
    {
      setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, parentBoundary ? parentBoundary.resources : null);
    }

    task.blockedBoundary = parentBoundary;
    task.replay = previousReplaySet;
    task.keyPath = prevKeyPath;
  }

  const fallbackKeyPath = [keyPath[0], 'Suspense Fallback', keyPath[2]]; // We create suspended task for the fallback because we don't want to actually work
  // on it yet in case we finish the main content, so we queue for later.

  const fallbackReplay = {
    nodes: fallbackNodes,
    slots: fallbackSlots,
    pendingTasks: 0
  };
  const suspendedFallbackTask = createReplayTask(request, null, fallbackReplay, fallback, -1, parentBoundary, fallbackAbortSet, fallbackKeyPath, task.formatContext, task.legacyContext, task.context, task.treeContext);
  // on preparing fallbacks if we don't have any more main content to task on.


  request.pingedTasks.push(suspendedFallbackTask);
}

function renderHostElement(request, task, keyPath, type, props) {
  const segment = task.blockedSegment;

  if (segment === null) {
    // Replay
    const children = props.children; // TODO: Make this a Config for replaying.

    const prevContext = task.formatContext;
    const prevKeyPath = task.keyPath;
    task.formatContext = getChildFormatContext(prevContext, type, props);
    task.keyPath = keyPath; // We use the non-destructive form because if something suspends, we still
    // need to pop back up and finish this subtree of HTML.

    renderNode(request, task, children, -1); // We expect that errors will fatal the whole task and that we don't need
    // the correct context. Therefore this is not in a finally.

    task.formatContext = prevContext;
    task.keyPath = prevKeyPath;
  } else {
    // Render
    const children = pushStartInstance(segment.chunks, type, props, request.resumableState, request.renderState, task.formatContext, segment.lastPushedText);
    segment.lastPushedText = false;
    const prevContext = task.formatContext;
    const prevKeyPath = task.keyPath;
    task.formatContext = getChildFormatContext(prevContext, type, props);
    task.keyPath = keyPath; // We use the non-destructive form because if something suspends, we still
    // need to pop back up and finish this subtree of HTML.

    renderNode(request, task, children, -1); // We expect that errors will fatal the whole task and that we don't need
    // the correct context. Therefore this is not in a finally.

    task.formatContext = prevContext;
    task.keyPath = prevKeyPath;
    pushEndInstance(segment.chunks, type, props, request.resumableState, prevContext);
    segment.lastPushedText = false;
  }
}

function shouldConstruct(Component) {
  return Component.prototype && Component.prototype.isReactComponent;
}

function renderWithHooks(request, task, keyPath, prevThenableState, Component, props, secondArg) {
  const componentIdentity = {};
  prepareToUseHooks(request, task, keyPath, componentIdentity, prevThenableState);
  const result = Component(props, secondArg);
  return finishHooks(Component, props, result, secondArg);
}

function finishClassComponent(request, task, keyPath, instance, Component, props) {
  const nextChildren = instance.render();

  {
    const childContextTypes = Component.childContextTypes;

    if (childContextTypes !== null && childContextTypes !== undefined) {
      const previousContext = task.legacyContext;
      const mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
      task.legacyContext = mergedContext;
      renderNodeDestructive(request, task, null, nextChildren, -1);
      task.legacyContext = previousContext;
      return;
    }
  }

  const prevKeyPath = task.keyPath;
  task.keyPath = keyPath;
  renderNodeDestructive(request, task, null, nextChildren, -1);
  task.keyPath = prevKeyPath;
}

function renderClassComponent(request, task, keyPath, Component, props) {
  const maskedContext = getMaskedContext(Component, task.legacyContext) ;
  const instance = constructClassInstance(Component, props, maskedContext);
  mountClassInstance(instance, Component, props, maskedContext);
  finishClassComponent(request, task, keyPath, instance, Component);
}
// components for some reason.

function renderIndeterminateComponent(request, task, keyPath, prevThenableState, Component, props) {
  let legacyContext;

  {
    legacyContext = getMaskedContext(Component, task.legacyContext);
  }

  const value = renderWithHooks(request, task, keyPath, prevThenableState, Component, props, legacyContext);
  const hasId = checkDidRenderIdHook();
  const formStateCount = getFormStateCount();
  const formStateMatchingIndex = getFormStateMatchingIndex();

  if ( // Run these checks in production only if the flag is off.
  // Eventually we'll delete this branch altogether.
  typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {

    mountClassInstance(value, Component, props, legacyContext);
    finishClassComponent(request, task, keyPath, value, Component);
  } else {

    finishFunctionComponent(request, task, keyPath, value, hasId, formStateCount, formStateMatchingIndex);
  }
}

function finishFunctionComponent(request, task, keyPath, children, hasId, formStateCount, formStateMatchingIndex) {
  let didEmitFormStateMarkers = false;

  if (formStateCount !== 0 && request.formState !== null) {
    // For each useFormState hook, emit a marker that indicates whether we
    // rendered using the form state passed at the root. We only emit these
    // markers if form state is passed at the root.
    const segment = task.blockedSegment;

    if (segment === null) ; else {
      didEmitFormStateMarkers = true;
      const target = segment.chunks;

      for (let i = 0; i < formStateCount; i++) {
        if (i === formStateMatchingIndex) {
          pushFormStateMarkerIsMatching(target);
        } else {
          pushFormStateMarkerIsNotMatching(target);
        }
      }
    }
  }

  const prevKeyPath = task.keyPath;
  task.keyPath = keyPath;

  if (hasId) {
    // This component materialized an id. We treat this as its own level, with
    // a single "child" slot.
    const prevTreeContext = task.treeContext;
    const totalChildren = 1;
    const index = 0; // Modify the id context. Because we'll need to reset this if something
    // suspends or errors, we'll use the non-destructive render path.

    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
    renderNode(request, task, children, -1); // Like the other contexts, this does not need to be in a finally block
    // because renderNode takes care of unwinding the stack.

    task.treeContext = prevTreeContext;
  } else if (didEmitFormStateMarkers) {
    // If there were formState hooks, we must use the non-destructive path
    // because this component is not a pure indirection; we emitted markers
    // to the stream.
    renderNode(request, task, children, -1);
  } else {
    // We're now successfully past this task, and we haven't modified the
    // context stack. We don't have to pop back to the previous task every
    // again, so we can use the destructive recursive form.
    renderNodeDestructive(request, task, null, children, -1);
  }

  task.keyPath = prevKeyPath;
}

function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    // Resolve default props. Taken from ReactElement
    const props = assign({}, baseProps);
    const defaultProps = Component.defaultProps;

    for (const propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }

    return props;
  }

  return baseProps;
}

function renderForwardRef(request, task, keyPath, prevThenableState, type, props, ref) {
  const children = renderWithHooks(request, task, keyPath, prevThenableState, type.render, props, ref);
  const hasId = checkDidRenderIdHook();
  const formStateCount = getFormStateCount();
  const formStateMatchingIndex = getFormStateMatchingIndex();
  finishFunctionComponent(request, task, keyPath, children, hasId, formStateCount, formStateMatchingIndex);
}

function renderMemo(request, task, keyPath, prevThenableState, type, props, ref) {
  const innerType = type.type;
  const resolvedProps = resolveDefaultProps(innerType, props);
  renderElement(request, task, keyPath, prevThenableState, innerType, resolvedProps, ref);
}

function renderContextConsumer(request, task, keyPath, context, props) {

  const render = props.children;

  const newValue = readContext$1(context);
  const newChildren = render(newValue);
  const prevKeyPath = task.keyPath;
  task.keyPath = keyPath;
  renderNodeDestructive(request, task, null, newChildren, -1);
  task.keyPath = prevKeyPath;
}

function renderContextProvider(request, task, keyPath, type, props) {
  const context = type._context;
  const value = props.value;
  const children = props.children;

  const prevKeyPath = task.keyPath;
  task.context = pushProvider(context, value);
  task.keyPath = keyPath;
  renderNodeDestructive(request, task, null, children, -1);
  task.context = popProvider();
  task.keyPath = prevKeyPath;
}

function renderLazyComponent(request, task, keyPath, prevThenableState, lazyComponent, props, ref) {
  const payload = lazyComponent._payload;
  const init = lazyComponent._init;
  const Component = init(payload);
  const resolvedProps = resolveDefaultProps(Component, props);
  renderElement(request, task, keyPath, prevThenableState, Component, resolvedProps, ref);
}

function renderOffscreen(request, task, keyPath, props) {
  const mode = props.mode;

  if (mode === 'hidden') ; else {
    // A visible Offscreen boundary is treated exactly like a fragment: a
    // pure indirection.
    const prevKeyPath = task.keyPath;
    task.keyPath = keyPath;
    renderNodeDestructive(request, task, null, props.children, -1);
    task.keyPath = prevKeyPath;
  }
}

function renderElement(request, task, keyPath, prevThenableState, type, props, ref) {
  if (typeof type === 'function') {
    if (shouldConstruct(type)) {
      renderClassComponent(request, task, keyPath, type, props);
      return;
    } else {
      renderIndeterminateComponent(request, task, keyPath, prevThenableState, type, props);
      return;
    }
  }

  if (typeof type === 'string') {
    renderHostElement(request, task, keyPath, type, props);
    return;
  }

  switch (type) {
    // LegacyHidden acts the same as a fragment. This only works because we
    // currently assume that every instance of LegacyHidden is accompanied by a
    // host component wrapper. In the hidden mode, the host component is given a
    // `hidden` attribute, which ensures that the initial HTML is not visible.
    // To support the use of LegacyHidden as a true fragment, without an extra
    // DOM node, we would have to hide the initial HTML in some other way.
    // TODO: Delete in LegacyHidden. It's an unstable API only used in the
    // www build. As a migration step, we could add a special prop to Offscreen
    // that simulates the old behavior (no hiding, no change to effects).
    case REACT_LEGACY_HIDDEN_TYPE:
    case REACT_DEBUG_TRACING_MODE_TYPE:
    case REACT_STRICT_MODE_TYPE:
    case REACT_PROFILER_TYPE:
    case REACT_FRAGMENT_TYPE:
      {
        const prevKeyPath = task.keyPath;
        task.keyPath = keyPath;
        renderNodeDestructive(request, task, null, props.children, -1);
        task.keyPath = prevKeyPath;
        return;
      }

    case REACT_OFFSCREEN_TYPE:
      {
        renderOffscreen(request, task, keyPath, props);
        return;
      }

    case REACT_SUSPENSE_LIST_TYPE:
      {

        const prevKeyPath = task.keyPath;
        task.keyPath = keyPath;
        renderNodeDestructive(request, task, null, props.children, -1);
        task.keyPath = prevKeyPath;
        return;
      }

    case REACT_SCOPE_TYPE:
      {

        throw new Error('ReactDOMServer does not yet support scope components.');
      }

    case REACT_SUSPENSE_TYPE:
      {
        {
          renderSuspenseBoundary(request, task, keyPath, props);
        }

        return;
      }
  }

  if (typeof type === 'object' && type !== null) {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        {
          renderForwardRef(request, task, keyPath, prevThenableState, type, props, ref);
          return;
        }

      case REACT_MEMO_TYPE:
        {
          renderMemo(request, task, keyPath, prevThenableState, type, props, ref);
          return;
        }

      case REACT_PROVIDER_TYPE:
        {
          renderContextProvider(request, task, keyPath, type, props);
          return;
        }

      case REACT_CONTEXT_TYPE:
        {
          renderContextConsumer(request, task, keyPath, type, props);
          return;
        }

      case REACT_LAZY_TYPE:
        {
          renderLazyComponent(request, task, keyPath, prevThenableState, type, props);
          return;
        }
    }
  }

  let info = '';

  throw new Error('Element type is invalid: expected a string (for built-in ' + 'components) or a class/function (for composite components) ' + ("but got: " + (type == null ? type : typeof type) + "." + info));
}

function resumeNode(request, task, segmentId, node, childIndex) {
  const prevReplay = task.replay;
  const blockedBoundary = task.blockedBoundary;
  const resumedSegment = createPendingSegment(request, 0, null, task.formatContext, false, false);
  resumedSegment.id = segmentId;
  resumedSegment.parentFlushed = true;

  try {
    // Convert the current ReplayTask to a RenderTask.
    const renderTask = task;
    renderTask.replay = null;
    renderTask.blockedSegment = resumedSegment;
    renderNode(request, task, node, childIndex);
    resumedSegment.status = COMPLETED;

    if (blockedBoundary === null) {
      request.completedRootSegment = resumedSegment;
    } else {
      queueCompletedSegment(blockedBoundary, resumedSegment);

      if (blockedBoundary.parentFlushed) {
        request.partialBoundaries.push(blockedBoundary);
      }
    }
  } finally {
    // Restore to a ReplayTask.
    task.replay = prevReplay;
    task.blockedSegment = null;
  }
}

function replayElement(request, task, keyPath, prevThenableState, name, keyOrIndex, childIndex, type, props, ref, replay) {
  // We're replaying. Find the path to follow.
  const replayNodes = replay.nodes;

  for (let i = 0; i < replayNodes.length; i++) {
    // Flow doesn't support refinement on tuples so we do it manually here.
    const node = replayNodes[i];

    if (keyOrIndex !== node[1]) {
      continue;
    }

    if (node.length === 4) {
      // Matched a replayable path.
      // Let's double check that the component name matches as a precaution.
      if (name !== null && name !== node[0]) {
        throw new Error('Expected the resume to render <' + node[0] + '> in this slot but instead it rendered <' + name + '>. ' + "The tree doesn't match so React will fallback to client rendering.");
      }

      const childNodes = node[2];
      const childSlots = node[3];
      const currentNode = task.node;
      task.replay = {
        nodes: childNodes,
        slots: childSlots,
        pendingTasks: 1
      };

      try {
        renderElement(request, task, keyPath, prevThenableState, type, props, ref);

        if (task.replay.pendingTasks === 1 && task.replay.nodes.length > 0 // TODO check remaining slots
        ) {
            throw new Error("Couldn't find all resumable slots by key/index during replaying. " + "The tree doesn't match so React will fallback to client rendering.");
          }

        task.replay.pendingTasks--;
      } catch (x) {
        if (typeof x === 'object' && x !== null && (x === SuspenseException || typeof x.then === 'function')) {
          // Suspend
          if (task.node === currentNode) {
            // This same element suspended so we need to pop the replay we just added.
            task.replay = replay;
          }

          throw x;
        }

        task.replay.pendingTasks--; // Unlike regular render, we don't terminate the siblings if we error
        // during a replay. That's because this component didn't actually error
        // in the original prerender. What's unable to complete is the child
        // replay nodes which might be Suspense boundaries which are able to
        // absorb the error and we can still continue with siblings.

        erroredReplay(request, task.blockedBoundary, x, childNodes, childSlots);
      }

      task.replay = replay;
    } else {
      // Let's double check that the component type matches.
      if (type !== REACT_SUSPENSE_TYPE) {
        const expectedType = 'Suspense';
        throw new Error('Expected the resume to render <' + expectedType + '> in this slot but instead it rendered <' + (getComponentNameFromType(type) || 'Unknown') + '>. ' + "The tree doesn't match so React will fallback to client rendering.");
      } // Matched a replayable path.


      replaySuspenseBoundary(request, task, keyPath, props, node[5], node[2], node[3], node[4] === null ? [] : node[4][2], node[4] === null ? null : node[4][3]);
    } // We finished rendering this node, so now we can consume this
    // slot. This must happen after in case we rerender this task.


    replayNodes.splice(i, 1);
    return;
  } // We didn't find any matching nodes. We assume that this element was already
  // rendered in the prelude and skip it.

} // $FlowFixMe[missing-local-annot]

function renderNodeDestructive(request, task, // The thenable state reused from the previous attempt, if any. This is almost
// always null, except when called by retryTask.
prevThenableState, node, childIndex) {
  {
    return renderNodeDestructiveImpl(request, task, prevThenableState, node, childIndex);
  }
} // This function by it self renders a node and consumes the task by mutating it
// to update the current execution state.


function renderNodeDestructiveImpl(request, task, prevThenableState, node, childIndex) {
  if (task.replay !== null && typeof task.replay.slots === 'number') {
    // TODO: Figure out a cheaper place than this hot path to do this check.
    const resumeSegmentID = task.replay.slots;
    resumeNode(request, task, resumeSegmentID, node, childIndex);
    return;
  } // Stash the node we're working on. We'll pick up from this task in case
  // something suspends.


  task.node = node;
  task.childIndex = childIndex; // Handle object types

  if (typeof node === 'object' && node !== null) {
    switch (node.$$typeof) {
      case REACT_ELEMENT_TYPE:
        {
          const element = node;
          const type = element.type;
          const key = element.key;
          const props = element.props;
          const ref = element.ref;
          const name = getComponentNameFromType(type);
          const keyOrIndex = key == null ? childIndex === -1 ? 0 : childIndex : key;
          const keyPath = [task.keyPath, name, keyOrIndex];

          if (task.replay !== null) {
            replayElement(request, task, keyPath, prevThenableState, name, keyOrIndex, childIndex, type, props, ref, task.replay); // No matches found for this node. We assume it's already emitted in the
            // prelude and skip it during the replay.
          } else {
            // We're doing a plain render.
            renderElement(request, task, keyPath, prevThenableState, type, props, ref);
          }

          return;
        }

      case REACT_PORTAL_TYPE:
        throw new Error('Portals are not currently supported by the server renderer. ' + 'Render them conditionally so that they only appear on the client render.');

      case REACT_LAZY_TYPE:
        {
          const lazyNode = node;
          const payload = lazyNode._payload;
          const init = lazyNode._init;
          let resolvedNode;

          {
            resolvedNode = init(payload);
          }

          renderNodeDestructive(request, task, null, resolvedNode, childIndex);
          return;
        }
    }

    if (isArray(node)) {
      renderChildrenArray(request, task, node, childIndex);
      return;
    }

    const iteratorFn = getIteratorFn(node);

    if (iteratorFn) {

      const iterator = iteratorFn.call(node);

      if (iterator) {
        // We need to know how many total children are in this set, so that we
        // can allocate enough id slots to acommodate them. So we must exhaust
        // the iterator before we start recursively rendering the children.
        // TODO: This is not great but I think it's inherent to the id
        // generation algorithm.
        let step = iterator.next(); // If there are not entries, we need to push an empty so we start by checking that.

        if (!step.done) {
          const children = [];

          do {
            children.push(step.value);
            step = iterator.next();
          } while (!step.done);

          renderChildrenArray(request, task, children, childIndex);
          return;
        }

        return;
      }
    } // Usables are a valid React node type. When React encounters a Usable in
    // a child position, it unwraps it using the same algorithm as `use`. For
    // example, for promises, React will throw an exception to unwind the
    // stack, then replay the component once the promise resolves.
    //
    // A difference from `use` is that React will keep unwrapping the value
    // until it reaches a non-Usable type.
    //
    // e.g. Usable<Usable<Usable<T>>> should resolve to T


    const maybeUsable = node;

    if (typeof maybeUsable.then === 'function') {
      const thenable = maybeUsable;
      return renderNodeDestructiveImpl(request, task, null, unwrapThenable(thenable), childIndex);
    }

    if (maybeUsable.$$typeof === REACT_CONTEXT_TYPE || maybeUsable.$$typeof === REACT_SERVER_CONTEXT_TYPE) {
      const context = maybeUsable;
      return renderNodeDestructiveImpl(request, task, null, readContext$1(context), childIndex);
    } // $FlowFixMe[method-unbinding]


    const childString = Object.prototype.toString.call(node);
    throw new Error("Objects are not valid as a React child (found: " + (childString === '[object Object]' ? 'object with keys {' + Object.keys(node).join(', ') + '}' : childString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
  }

  if (typeof node === 'string') {
    const segment = task.blockedSegment;

    if (segment === null) ; else {
      segment.lastPushedText = pushTextInstance(segment.chunks, node, request.renderState, segment.lastPushedText);
    }

    return;
  }

  if (typeof node === 'number') {
    const segment = task.blockedSegment;

    if (segment === null) ; else {
      segment.lastPushedText = pushTextInstance(segment.chunks, '' + node, request.renderState, segment.lastPushedText);
    }

    return;
  }
}

function replayFragment(request, task, children, childIndex) {
  // If we're supposed follow this array, we'd expect to see a ReplayNode matching
  // this fragment.
  const replay = task.replay;
  const replayNodes = replay.nodes;

  for (let j = 0; j < replayNodes.length; j++) {
    const node = replayNodes[j];

    if (node[1] !== childIndex) {
      continue;
    } // Matched a replayable path.


    const childNodes = node[2];
    const childSlots = node[3];
    task.replay = {
      nodes: childNodes,
      slots: childSlots,
      pendingTasks: 1
    };

    try {
      renderChildrenArray(request, task, children, -1);

      if (task.replay.pendingTasks === 1 && task.replay.nodes.length > 0) {
        throw new Error("Couldn't find all resumable slots by key/index during replaying. " + "The tree doesn't match so React will fallback to client rendering.");
      }

      task.replay.pendingTasks--;
    } catch (x) {
      if (typeof x === 'object' && x !== null && (x === SuspenseException || typeof x.then === 'function')) {
        // Suspend
        throw x;
      }

      task.replay.pendingTasks--; // Unlike regular render, we don't terminate the siblings if we error
      // during a replay. That's because this component didn't actually error
      // in the original prerender. What's unable to complete is the child
      // replay nodes which might be Suspense boundaries which are able to
      // absorb the error and we can still continue with siblings.
      // This is an error, stash the component stack if it is null.

      erroredReplay(request, task.blockedBoundary, x, childNodes, childSlots);
    }

    task.replay = replay; // We finished rendering this node, so now we can consume this
    // slot. This must happen after in case we rerender this task.

    replayNodes.splice(j, 1);
    break;
  }
}

function renderChildrenArray(request, task, children, childIndex) {
  const prevKeyPath = task.keyPath;

  if (childIndex !== -1) {
    task.keyPath = [task.keyPath, 'Fragment', childIndex];

    if (task.replay !== null) {
      replayFragment(request, // $FlowFixMe: Refined.
      task, children, childIndex);
      task.keyPath = prevKeyPath;
      return;
    }
  }

  const prevTreeContext = task.treeContext;
  const totalChildren = children.length;

  if (task.replay !== null) {
    // Replay
    // First we need to check if we have any resume slots at this level.
    const resumeSlots = task.replay.slots;

    if (resumeSlots !== null && typeof resumeSlots === 'object') {
      for (let i = 0; i < totalChildren; i++) {
        const node = children[i];
        task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i); // We need to use the non-destructive form so that we can safely pop back
        // up and render the sibling if something suspends.

        const resumeSegmentID = resumeSlots[i]; // TODO: If this errors we should still continue with the next sibling.

        if (typeof resumeSegmentID === 'number') {
          resumeNode(request, task, resumeSegmentID, node, i); // We finished rendering this node, so now we can consume this
          // slot. This must happen after in case we rerender this task.

          delete resumeSlots[i];
        } else {
          renderNode(request, task, node, i);
        }
      }

      task.treeContext = prevTreeContext;
      task.keyPath = prevKeyPath;
      return;
    }
  }

  for (let i = 0; i < totalChildren; i++) {
    const node = children[i];
    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i); // We need to use the non-destructive form so that we can safely pop back
    // up and render the sibling if something suspends.

    renderNode(request, task, node, i);
  } // Because this context is always set right before rendering every child, we
  // only need to reset it to the previous value at the very end.


  task.treeContext = prevTreeContext;
  task.keyPath = prevKeyPath;
}

function trackPostpone(request, trackedPostpones, task, segment) {
  segment.status = POSTPONED;
  const keyPath = task.keyPath;
  const boundary = task.blockedBoundary;

  if (boundary === null) {
    segment.id = request.nextSegmentId++;
    trackedPostpones.rootSlots = segment.id;

    if (request.completedRootSegment !== null) {
      // Postpone the root if this was a deeper segment.
      request.completedRootSegment.status = POSTPONED;
    }

    return;
  }

  if (boundary !== null && boundary.status === PENDING) {
    boundary.status = POSTPONED; // We need to eagerly assign it an ID because we'll need to refer to
    // it before flushing and we know that we can't inline it.

    boundary.rootSegmentID = request.nextSegmentId++;
    const boundaryKeyPath = boundary.trackedContentKeyPath;

    if (boundaryKeyPath === null) {
      throw new Error('It should not be possible to postpone at the root. This is a bug in React.');
    }

    const fallbackReplayNode = boundary.trackedFallbackNode;
    const children = [];

    if (boundaryKeyPath === keyPath && task.childIndex === -1) {
      // Assign ID
      if (segment.id === -1) {
        if (segment.parentFlushed) {
          // If this segment's parent was already flushed, it means we really just
          // skipped the parent and this segment is now the root.
          segment.id = boundary.rootSegmentID;
        } else {
          segment.id = request.nextSegmentId++;
        }
      } // We postponed directly inside the Suspense boundary so we mark this for resuming.


      const boundaryNode = [boundaryKeyPath[1], boundaryKeyPath[2], children, segment.id, fallbackReplayNode, boundary.rootSegmentID];
      trackedPostpones.workingMap.set(boundaryKeyPath, boundaryNode);
      addToReplayParent(boundaryNode, boundaryKeyPath[0], trackedPostpones);
      return;
    } else {
      let boundaryNode = trackedPostpones.workingMap.get(boundaryKeyPath);

      if (boundaryNode === undefined) {
        boundaryNode = [boundaryKeyPath[1], boundaryKeyPath[2], children, null, fallbackReplayNode, boundary.rootSegmentID];
        trackedPostpones.workingMap.set(boundaryKeyPath, boundaryNode);
        addToReplayParent(boundaryNode, boundaryKeyPath[0], trackedPostpones);
      } else {
        // Upgrade to ReplaySuspenseBoundary.
        const suspenseBoundary = boundaryNode;
        suspenseBoundary[4] = fallbackReplayNode;
        suspenseBoundary[5] = boundary.rootSegmentID;
      } // Fall through to add the child node.

    }
  } // We know that this will leave a hole so we might as well assign an ID now.
  // We might have one already if we had a parent that gave us its ID.


  if (segment.id === -1) {
    if (segment.parentFlushed && boundary !== null) {
      // If this segment's parent was already flushed, it means we really just
      // skipped the parent and this segment is now the root.
      segment.id = boundary.rootSegmentID;
    } else {
      segment.id = request.nextSegmentId++;
    }
  }

  if (task.childIndex === -1) {
    // Resume starting from directly inside the previous parent element.
    if (keyPath === null) {
      trackedPostpones.rootSlots = segment.id;
    } else {
      const workingMap = trackedPostpones.workingMap;
      let resumableNode = workingMap.get(keyPath);

      if (resumableNode === undefined) {
        resumableNode = [keyPath[1], keyPath[2], [], segment.id];
        addToReplayParent(resumableNode, keyPath[0], trackedPostpones);
      } else {
        resumableNode[3] = segment.id;
      }
    }
  } else {
    let slots;

    if (keyPath === null) {
      slots = trackedPostpones.rootSlots;

      if (slots === null) {
        slots = trackedPostpones.rootSlots = {};
      } else if (typeof slots === 'number') {
        throw new Error('It should not be possible to postpone both at the root of an element ' + 'as well as a slot below. This is a bug in React.');
      }
    } else {
      const workingMap = trackedPostpones.workingMap;
      let resumableNode = workingMap.get(keyPath);

      if (resumableNode === undefined) {
        slots = {};
        resumableNode = [keyPath[1], keyPath[2], [], slots];
        workingMap.set(keyPath, resumableNode);
        addToReplayParent(resumableNode, keyPath[0], trackedPostpones);
      } else {
        slots = resumableNode[3];

        if (slots === null) {
          slots = resumableNode[3] = {};
        } else if (typeof slots === 'number') {
          throw new Error('It should not be possible to postpone both at the root of an element ' + 'as well as a slot below. This is a bug in React.');
        }
      }
    }

    slots[task.childIndex] = segment.id;
  }
}

function injectPostponedHole(request, task, reason) {
  logPostpone(request, reason); // Something suspended, we'll need to create a new segment and resolve it later.

  const segment = task.blockedSegment;
  const insertionIndex = segment.chunks.length;
  const newSegment = createPendingSegment(request, insertionIndex, null, task.formatContext, // Adopt the parent segment's leading text embed
  segment.lastPushedText, // Assume we are text embedded at the trailing edge
  true);
  segment.children.push(newSegment); // Reset lastPushedText for current Segment since the new Segment "consumed" it

  segment.lastPushedText = false;
  return newSegment;
}

function spawnNewSuspendedReplayTask(request, task, thenableState, x) {
  const newTask = createReplayTask(request, thenableState, task.replay, task.node, task.childIndex, task.blockedBoundary, task.abortSet, task.keyPath, task.formatContext, task.legacyContext, task.context, task.treeContext);

  const ping = newTask.ping;
  x.then(ping, ping);
}

function spawnNewSuspendedRenderTask(request, task, thenableState, x) {
  // Something suspended, we'll need to create a new segment and resolve it later.
  const segment = task.blockedSegment;
  const insertionIndex = segment.chunks.length;
  const newSegment = createPendingSegment(request, insertionIndex, null, task.formatContext, // Adopt the parent segment's leading text embed
  segment.lastPushedText, // Assume we are text embedded at the trailing edge
  true);
  segment.children.push(newSegment); // Reset lastPushedText for current Segment since the new Segment "consumed" it

  segment.lastPushedText = false;
  const newTask = createRenderTask(request, thenableState, task.node, task.childIndex, task.blockedBoundary, newSegment, task.abortSet, task.keyPath, task.formatContext, task.legacyContext, task.context, task.treeContext);

  const ping = newTask.ping;
  x.then(ping, ping);
} // This is a non-destructive form of rendering a node. If it suspends it spawns
// a new task and restores the context of this task to what it was before.


function renderNode(request, task, node, childIndex) {
  // Snapshot the current context in case something throws to interrupt the
  // process.
  const previousFormatContext = task.formatContext;
  const previousLegacyContext = task.legacyContext;
  const previousContext = task.context;
  const previousKeyPath = task.keyPath;
  const previousTreeContext = task.treeContext;

  let x; // Store how much we've pushed at this point so we can reset it in case something
  // suspended partially through writing something.

  const segment = task.blockedSegment;

  if (segment === null) {
    // Replay
    try {
      return renderNodeDestructive(request, task, null, node, childIndex);
    } catch (thrownValue) {
      resetHooksState();
      x = thrownValue === SuspenseException ? // This is a special type of exception used for Suspense. For historical
      // reasons, the rest of the Suspense implementation expects the thrown
      // value to be a thenable, because before `use` existed that was the
      // (unstable) API for suspending. This implementation detail can change
      // later, once we deprecate the old API in favor of `use`.
      getSuspendedThenable() : thrownValue;

      if (typeof x === 'object' && x !== null) {
        // $FlowFixMe[method-unbinding]
        if (typeof x.then === 'function') {
          const wakeable = x;
          const thenableState = getThenableStateAfterSuspending();
          spawnNewSuspendedReplayTask(request, // $FlowFixMe: Refined.
          task, thenableState, wakeable); // Restore the context. We assume that this will be restored by the inner
          // functions in case nothing throws so we don't use "finally" here.

          task.formatContext = previousFormatContext;
          task.legacyContext = previousLegacyContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext; // Restore all active ReactContexts to what they were before.

          switchContext(previousContext);

          return;
        }
      } // TODO: Abort any undiscovered Suspense boundaries in the ReplayNode.

    }
  } else {
    // Render
    const childrenLength = segment.children.length;
    const chunkLength = segment.chunks.length;

    try {
      return renderNodeDestructive(request, task, null, node, childIndex);
    } catch (thrownValue) {
      resetHooksState(); // Reset the write pointers to where we started.

      segment.children.length = childrenLength;
      segment.chunks.length = chunkLength;
      x = thrownValue === SuspenseException ? // This is a special type of exception used for Suspense. For historical
      // reasons, the rest of the Suspense implementation expects the thrown
      // value to be a thenable, because before `use` existed that was the
      // (unstable) API for suspending. This implementation detail can change
      // later, once we deprecate the old API in favor of `use`.
      getSuspendedThenable() : thrownValue;

      if (typeof x === 'object' && x !== null) {
        // $FlowFixMe[method-unbinding]
        if (typeof x.then === 'function') {
          const wakeable = x;
          const thenableState = getThenableStateAfterSuspending();
          spawnNewSuspendedRenderTask(request, // $FlowFixMe: Refined.
          task, thenableState, wakeable); // Restore the context. We assume that this will be restored by the inner
          // functions in case nothing throws so we don't use "finally" here.

          task.formatContext = previousFormatContext;
          task.legacyContext = previousLegacyContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext; // Restore all active ReactContexts to what they were before.

          switchContext(previousContext);

          return;
        }

        if (request.trackedPostpones !== null && x.$$typeof === REACT_POSTPONE_TYPE && task.blockedBoundary !== null // bubble if we're postponing in the shell
        ) {
            // If we're tracking postpones, we inject a hole here and continue rendering
            // sibling. Similar to suspending. If we're not tracking, we treat it more like
            // an error. Notably this doesn't spawn a new task since nothing will fill it
            // in during this prerender.
            const postponeInstance = x;
            const trackedPostpones = request.trackedPostpones;
            const postponedSegment = injectPostponedHole(request, task, // We don't use ReplayTasks in prerenders.
            postponeInstance.message);
            trackPostpone(request, trackedPostpones, task, postponedSegment); // Restore the context. We assume that this will be restored by the inner
            // functions in case nothing throws so we don't use "finally" here.

            task.formatContext = previousFormatContext;
            task.legacyContext = previousLegacyContext;
            task.context = previousContext;
            task.keyPath = previousKeyPath;
            task.treeContext = previousTreeContext; // Restore all active ReactContexts to what they were before.

            switchContext(previousContext);
            return;
          }
      }
    }
  } // Restore the context. We assume that this will be restored by the inner
  // functions in case nothing throws so we don't use "finally" here.


  task.formatContext = previousFormatContext;
  task.legacyContext = previousLegacyContext;
  task.context = previousContext;
  task.keyPath = previousKeyPath;
  task.treeContext = previousTreeContext; // Restore all active ReactContexts to what they were before.

  switchContext(previousContext);
  // Let's terminate the rest of the tree and don't render any siblings.


  throw x;
}

function erroredReplay(request, boundary, error, replayNodes, resumeSlots) {
  // Erroring during a replay doesn't actually cause an error by itself because
  // that component has already rendered. What causes the error is the resumable
  // points that we did not yet finish which will be below the point of the reset.
  // For example, if we're replaying a path to a Suspense boundary that is not done
  // that doesn't error the parent Suspense boundary.
  // This might be a bit strange that the error in a parent gets thrown at a child.
  // We log it only once and reuse the digest.
  let errorDigest;

  if (typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE) {
    const postponeInstance = error;
    logPostpone(request, postponeInstance.message); // TODO: Figure out a better signal than a magic digest value.

    errorDigest = 'POSTPONE';
  } else {
    errorDigest = logRecoverableError(request, error);
  }

  abortRemainingReplayNodes(request, boundary, replayNodes, resumeSlots, error, errorDigest);
}

function erroredTask(request, boundary, error) {
  // Report the error to a global handler.
  let errorDigest;

  if (typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE) {
    const postponeInstance = error;
    logPostpone(request, postponeInstance.message); // TODO: Figure out a better signal than a magic digest value.

    errorDigest = 'POSTPONE';
  } else {
    errorDigest = logRecoverableError(request, error);
  }

  if (boundary === null) {
    fatalError(request, error);
  } else {
    boundary.pendingTasks--;

    if (boundary.status !== CLIENT_RENDERED) {
      boundary.status = CLIENT_RENDERED;
      boundary.errorDigest = errorDigest;
      // so we can flush it, if the parent already flushed.


      if (boundary.parentFlushed) {
        // We don't have a preference where in the queue this goes since it's likely
        // to error on the client anyway. However, intentionally client-rendered
        // boundaries should be flushed earlier so that they can start on the client.
        // We reuse the same queue for errors.
        request.clientRenderedBoundaries.push(boundary);
      }
    }
  }

  request.allPendingTasks--;

  if (request.allPendingTasks === 0) {
    completeAll(request);
  }
}

function abortTaskSoft(task) {
  // This aborts task without aborting the parent boundary that it blocks.
  // It's used for when we didn't need this task to complete the tree.
  // If task was needed, then it should use abortTask instead.
  const request = this;
  const boundary = task.blockedBoundary;
  const segment = task.blockedSegment;

  if (segment !== null) {
    segment.status = ABORTED;
    finishedTask(request, boundary, segment);
  }
}

function abortRemainingSuspenseBoundary(request, rootSegmentID, error, errorDigest) {
  const resumedBoundary = createSuspenseBoundary(request, new Set());
  resumedBoundary.parentFlushed = true; // We restore the same id of this boundary as was used during prerender.

  resumedBoundary.rootSegmentID = rootSegmentID;
  resumedBoundary.status = CLIENT_RENDERED;
  resumedBoundary.errorDigest = errorDigest;

  if (resumedBoundary.parentFlushed) {
    request.clientRenderedBoundaries.push(resumedBoundary);
  }
}

function abortRemainingReplayNodes(request, boundary, nodes, slots, error, errorDigest) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.length === 4) {
      abortRemainingReplayNodes(request, boundary, node[2], node[3], error, errorDigest);
    } else {
      const boundaryNode = node;
      const rootSegmentID = boundaryNode[5];
      abortRemainingSuspenseBoundary(request, rootSegmentID, error, errorDigest);
    }
  } // Empty the set, since we've cleared it now.


  nodes.length = 0;

  if (slots !== null) {
    // We had something still to resume in the parent boundary. We must trigger
    // the error on the parent boundary since it's not able to complete.
    if (boundary === null) {
      throw new Error('We should not have any resumable nodes in the shell. ' + 'This is a bug in React.');
    } else if (boundary.status !== CLIENT_RENDERED) {
      boundary.status = CLIENT_RENDERED;
      boundary.errorDigest = errorDigest;

      if (boundary.parentFlushed) {
        request.clientRenderedBoundaries.push(boundary);
      }
    } // Empty the set


    if (typeof slots === 'object') {
      for (const index in slots) {
        delete slots[index];
      }
    }
  }
}

function abortTask(task, request, error) {
  // This aborts the task and aborts the parent that it blocks, putting it into
  // client rendered mode.
  const boundary = task.blockedBoundary;
  const segment = task.blockedSegment;

  if (segment !== null) {
    segment.status = ABORTED;
  }

  if (boundary === null) {
    if (request.status !== CLOSING && request.status !== CLOSED) {
      const replay = task.replay;

      if (replay === null) {
        // We didn't complete the root so we have nothing to show. We can close
        // the request;
        logRecoverableError(request, error);
        fatalError(request, error);
        return;
      } else {
        // If the shell aborts during a replay, that's not a fatal error. Instead
        // we should be able to recover by client rendering all the root boundaries in
        // the ReplaySet.
        replay.pendingTasks--;

        if (replay.pendingTasks === 0 && replay.nodes.length > 0) {
          const errorDigest = logRecoverableError(request, error);
          abortRemainingReplayNodes(request, null, replay.nodes, replay.slots, error, errorDigest);
        }

        request.pendingRootTasks--;

        if (request.pendingRootTasks === 0) {
          completeShell(request);
        }
      }
    }
  } else {
    boundary.pendingTasks--;

    if (boundary.status !== CLIENT_RENDERED) {
      boundary.status = CLIENT_RENDERED;
      boundary.errorDigest = logRecoverableError(request, error);

      if (boundary.parentFlushed) {
        request.clientRenderedBoundaries.push(boundary);
      }
    } // If this boundary was still pending then we haven't already cancelled its fallbacks.
    // We'll need to abort the fallbacks, which will also error that parent boundary.


    boundary.fallbackAbortableTasks.forEach(fallbackTask => abortTask(fallbackTask, request, error));
    boundary.fallbackAbortableTasks.clear();
  }

  request.allPendingTasks--;

  if (request.allPendingTasks === 0) {
    completeAll(request);
  }
} // I extracted this function out because we want to ensure we consistently emit preloads before
// transitioning to the next request stage and this transition can happen in multiple places in this
// implementation.


function completeShell(request) {
  if (request.trackedPostpones === null) {
    // We only emit early preloads on shell completion for renders. For prerenders
    // we wait for the entire Request to finish because we are not responding to a
    // live request and can wait for as much data as possible.
    // we should only be calling completeShell when the shell is complete so we
    // just use a literal here
    const shellComplete = true;
    emitEarlyPreloads(request.renderState, request.resumableState, shellComplete);
  } // We have completed the shell so the shell can't error anymore.


  request.onShellError = noop;
  const onShellReady = request.onShellReady;
  onShellReady();
} // I extracted this function out because we want to ensure we consistently emit preloads before
// transitioning to the next request stage and this transition can happen in multiple places in this
// implementation.


function completeAll(request) {
  // During a render the shell must be complete if the entire request is finished
  // however during a Prerender it is possible that the shell is incomplete because
  // it postponed. We cannot use rootPendingTasks in the prerender case because
  // those hit zero even when the shell postpones. Instead we look at the completedRootSegment
  const shellComplete = request.trackedPostpones === null ? // Render, we assume it is completed
  true : // Prerender Request, we use the state of the root segment
  request.completedRootSegment === null || request.completedRootSegment.status !== POSTPONED;
  emitEarlyPreloads(request.renderState, request.resumableState, shellComplete);
  const onAllReady = request.onAllReady;
  onAllReady();
}

function queueCompletedSegment(boundary, segment) {
  if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null && segment.children[0].id === -1) {
    // This is an empty segment. There's nothing to write, so we can instead transfer the ID
    // to the child. That way any existing references point to the child.
    const childSegment = segment.children[0];
    childSegment.id = segment.id;
    childSegment.parentFlushed = true;

    if (childSegment.status === COMPLETED) {
      queueCompletedSegment(boundary, childSegment);
    }
  } else {
    const completedSegments = boundary.completedSegments;
    completedSegments.push(segment);
  }
}

function finishedTask(request, boundary, segment) {
  if (boundary === null) {
    if (segment !== null && segment.parentFlushed) {
      if (request.completedRootSegment !== null) {
        throw new Error('There can only be one root segment. This is a bug in React.');
      }

      request.completedRootSegment = segment;
    }

    request.pendingRootTasks--;

    if (request.pendingRootTasks === 0) {
      completeShell(request);
    }
  } else {
    boundary.pendingTasks--;

    if (boundary.status === CLIENT_RENDERED) ; else if (boundary.pendingTasks === 0) {
      if (boundary.status === PENDING) {
        boundary.status = COMPLETED;
      } // This must have been the last segment we were waiting on. This boundary is now complete.


      if (segment !== null && segment.parentFlushed) {
        // Our parent segment already flushed, so we need to schedule this segment to be emitted.
        // If it is a segment that was aborted, we'll write other content instead so we don't need
        // to emit it.
        if (segment.status === COMPLETED) {
          queueCompletedSegment(boundary, segment);
        }
      }

      if (boundary.parentFlushed) {
        // The segment might be part of a segment that didn't flush yet, but if the boundary's
        // parent flushed, we need to schedule the boundary to be emitted.
        request.completedBoundaries.push(boundary);
      } // We can now cancel any pending task on the fallback since we won't need to show it anymore.
      // This needs to happen after we read the parentFlushed flags because aborting can finish
      // work which can trigger user code, which can start flushing, which can change those flags.
      // If the boundary was POSTPONED, we still need to finish the fallback first.


      if (boundary.status === COMPLETED) {
        boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
        boundary.fallbackAbortableTasks.clear();
      }
    } else {
      if (segment !== null && segment.parentFlushed) {
        // Our parent already flushed, so we need to schedule this segment to be emitted.
        // If it is a segment that was aborted, we'll write other content instead so we don't need
        // to emit it.
        if (segment.status === COMPLETED) {
          queueCompletedSegment(boundary, segment);
          const completedSegments = boundary.completedSegments;

          if (completedSegments.length === 1) {
            // This is the first time since we last flushed that we completed anything.
            // We can schedule this boundary to emit its partially completed segments early
            // in case the parent has already been flushed.
            if (boundary.parentFlushed) {
              request.partialBoundaries.push(boundary);
            }
          }
        }
      }
    }
  }

  request.allPendingTasks--;

  if (request.allPendingTasks === 0) {
    completeAll(request);
  }
}

function retryTask(request, task) {
  {
    const blockedBoundary = task.blockedBoundary;
    setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, blockedBoundary ? blockedBoundary.resources : null);
  }

  const segment = task.blockedSegment;

  if (segment === null) {
    retryReplayTask(request, // $FlowFixMe: Refined.
    task);
  } else {
    retryRenderTask(request, // $FlowFixMe: Refined.
    task, segment);
  }
}

function retryRenderTask(request, task, segment) {
  if (segment.status !== PENDING) {
    // We completed this by other means before we had a chance to retry it.
    return;
  } // We restore the context to what it was when we suspended.
  // We don't restore it after we leave because it's likely that we'll end up
  // needing a very similar context soon again.


  switchContext(task.context);

  const childrenLength = segment.children.length;
  const chunkLength = segment.chunks.length;

  try {
    // We call the destructive form that mutates this task. That way if something
    // suspends again, we can reuse the same task instead of spawning a new one.
    // Reset the task's thenable state before continuing, so that if a later
    // component suspends we can reuse the same task object. If the same
    // component suspends again, the thenable state will be restored.
    const prevThenableState = task.thenableState;
    task.thenableState = null;
    renderNodeDestructive(request, task, prevThenableState, task.node, task.childIndex);
    pushSegmentFinale(segment.chunks, request.renderState, segment.lastPushedText, segment.textEmbedded);
    task.abortSet.delete(task);
    segment.status = COMPLETED;
    finishedTask(request, task.blockedBoundary, segment);
  } catch (thrownValue) {
    resetHooksState(); // Reset the write pointers to where we started.

    segment.children.length = childrenLength;
    segment.chunks.length = chunkLength;
    const x = thrownValue === SuspenseException ? // This is a special type of exception used for Suspense. For historical
    // reasons, the rest of the Suspense implementation expects the thrown
    // value to be a thenable, because before `use` existed that was the
    // (unstable) API for suspending. This implementation detail can change
    // later, once we deprecate the old API in favor of `use`.
    getSuspendedThenable() : thrownValue;

    if (typeof x === 'object' && x !== null) {
      // $FlowFixMe[method-unbinding]
      if (typeof x.then === 'function') {
        // Something suspended again, let's pick it back up later.
        const ping = task.ping;
        x.then(ping, ping);
        task.thenableState = getThenableStateAfterSuspending();
        return;
      } else if (request.trackedPostpones !== null && x.$$typeof === REACT_POSTPONE_TYPE) {
        // If we're tracking postpones, we mark this segment as postponed and finish
        // the task without filling it in. If we're not tracking, we treat it more like
        // an error.
        const trackedPostpones = request.trackedPostpones;
        task.abortSet.delete(task);
        const postponeInstance = x;
        logPostpone(request, postponeInstance.message);
        trackPostpone(request, trackedPostpones, task, segment);
        finishedTask(request, task.blockedBoundary, segment);
        return;
      }
    }

    task.abortSet.delete(task);
    segment.status = ERRORED;
    erroredTask(request, task.blockedBoundary, x);
    return;
  } finally {
    {
      setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, null);
    }
  }
}

function retryReplayTask(request, task) {
  if (task.replay.pendingTasks === 0) {
    // There are no pending tasks working on this set, so we must have aborted.
    return;
  } // We restore the context to what it was when we suspended.
  // We don't restore it after we leave because it's likely that we'll end up
  // needing a very similar context soon again.


  switchContext(task.context);

  try {
    // We call the destructive form that mutates this task. That way if something
    // suspends again, we can reuse the same task instead of spawning a new one.
    // Reset the task's thenable state before continuing, so that if a later
    // component suspends we can reuse the same task object. If the same
    // component suspends again, the thenable state will be restored.
    const prevThenableState = task.thenableState;
    task.thenableState = null;
    renderNodeDestructive(request, task, prevThenableState, task.node, task.childIndex);

    if (task.replay.pendingTasks === 1 && task.replay.nodes.length > 0) {
      throw new Error("Couldn't find all resumable slots by key/index during replaying. " + "The tree doesn't match so React will fallback to client rendering.");
    }

    task.replay.pendingTasks--;
    task.abortSet.delete(task);
    finishedTask(request, task.blockedBoundary, null);
  } catch (thrownValue) {
    resetHooksState();
    const x = thrownValue === SuspenseException ? // This is a special type of exception used for Suspense. For historical
    // reasons, the rest of the Suspense implementation expects the thrown
    // value to be a thenable, because before `use` existed that was the
    // (unstable) API for suspending. This implementation detail can change
    // later, once we deprecate the old API in favor of `use`.
    getSuspendedThenable() : thrownValue;

    if (typeof x === 'object' && x !== null) {
      // $FlowFixMe[method-unbinding]
      if (typeof x.then === 'function') {
        // Something suspended again, let's pick it back up later.
        const ping = task.ping;
        x.then(ping, ping);
        task.thenableState = getThenableStateAfterSuspending();
        return;
      }
    }

    task.replay.pendingTasks--;
    task.abortSet.delete(task);
    erroredReplay(request, task.blockedBoundary, x, task.replay.nodes, task.replay.slots);
    request.pendingRootTasks--;

    if (request.pendingRootTasks === 0) {
      completeShell(request);
    }

    request.allPendingTasks--;

    if (request.allPendingTasks === 0) {
      completeAll(request);
    }

    return;
  } finally {
    {
      setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, null);
    }
  }
}

function performWork(request) {
  if (request.status === CLOSED) {
    return;
  }

  const prevContext = getActiveContext();
  const prevDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = HooksDispatcher;
  let prevCacheDispatcher;

  {
    prevCacheDispatcher = ReactCurrentCache.current;
    ReactCurrentCache.current = DefaultCacheDispatcher;
  }

  const prevRequest = currentRequest;
  currentRequest = request;

  const prevResumableState = currentResumableState;
  setCurrentResumableState(request.resumableState);

  try {
    const pingedTasks = request.pingedTasks;
    let i;

    for (i = 0; i < pingedTasks.length; i++) {
      const task = pingedTasks[i];
      retryTask(request, task);
    }

    pingedTasks.splice(0, i);

    if (request.destination !== null) {
      flushCompletedQueues(request, request.destination);
    }
  } catch (error) {
    logRecoverableError(request, error);
    fatalError(request, error);
  } finally {
    setCurrentResumableState(prevResumableState);
    ReactCurrentDispatcher.current = prevDispatcher;

    {
      ReactCurrentCache.current = prevCacheDispatcher;
    }

    if (prevDispatcher === HooksDispatcher) {
      // This means that we were in a reentrant work loop. This could happen
      // in a renderer that supports synchronous work like renderToString,
      // when it's called from within another renderer.
      // Normally we don't bother switching the contexts to their root/default
      // values when leaving because we'll likely need the same or similar
      // context again. However, when we're inside a synchronous loop like this
      // we'll to restore the context to what it was before returning.
      switchContext(prevContext);
    }

    currentRequest = prevRequest;
  }
}

function flushSubtree(request, destination, segment) {
  segment.parentFlushed = true;

  switch (segment.status) {
    case PENDING:
      {
        // We're emitting a placeholder for this segment to be filled in later.
        // Therefore we'll need to assign it an ID - to refer to it by.
        segment.id = request.nextSegmentId++; // Fallthrough
      }

    case POSTPONED:
      {
        const segmentID = segment.id; // When this segment finally completes it won't be embedded in text since it will flush separately

        segment.lastPushedText = false;
        segment.textEmbedded = false;
        return writePlaceholder(destination, request.renderState, segmentID);
      }

    case COMPLETED:
      {
        segment.status = FLUSHED;
        let r = true;
        const chunks = segment.chunks;
        let chunkIdx = 0;
        const children = segment.children;

        for (let childIdx = 0; childIdx < children.length; childIdx++) {
          const nextChild = children[childIdx]; // Write all the chunks up until the next child.

          for (; chunkIdx < nextChild.index; chunkIdx++) {
            writeChunk(destination, chunks[chunkIdx]);
          }

          r = flushSegment(request, destination, nextChild);
        } // Finally just write all the remaining chunks


        for (; chunkIdx < chunks.length - 1; chunkIdx++) {
          writeChunk(destination, chunks[chunkIdx]);
        }

        if (chunkIdx < chunks.length) {
          r = writeChunkAndReturn(destination, chunks[chunkIdx]);
        }

        return r;
      }

    default:
      {
        throw new Error('Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.');
      }
  }
}

function flushSegment(request, destination, segment) {
  const boundary = segment.boundary;

  if (boundary === null) {
    // Not a suspense boundary.
    return flushSubtree(request, destination, segment);
  }

  boundary.parentFlushed = true; // This segment is a Suspense boundary. We need to decide whether to
  // emit the content or the fallback now.

  if (boundary.status === CLIENT_RENDERED) {
    // Emit a client rendered suspense boundary wrapper.
    // We never queue the inner boundary so we'll never emit its content or partial segments.
    writeStartClientRenderedSuspenseBoundary(destination, request.renderState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack); // Flush the fallback.

    flushSubtree(request, destination, segment);
    return writeEndClientRenderedSuspenseBoundary(destination, request.renderState);
  } else if (boundary.status !== COMPLETED) {
    if (boundary.status === PENDING) {
      // For pending boundaries we lazily assign an ID to the boundary
      // and root segment.
      boundary.rootSegmentID = request.nextSegmentId++;
    }

    if (boundary.completedSegments.length > 0) {
      // If this is at least partially complete, we can queue it to be partially emitted early.
      request.partialBoundaries.push(boundary);
    } // This boundary is still loading. Emit a pending suspense boundary wrapper.


    const id = boundary.rootSegmentID;
    writeStartPendingSuspenseBoundary(destination, request.renderState, id); // Flush the fallback.

    flushSubtree(request, destination, segment);
    return writeEndPendingSuspenseBoundary(destination, request.renderState);
  } else if (boundary.byteSize > request.progressiveChunkSize) {
    // This boundary is large and will be emitted separately so that we can progressively show
    // other content. We add it to the queue during the flush because we have to ensure that
    // the parent flushes first so that there's something to inject it into.
    // We also have to make sure that it's emitted into the queue in a deterministic slot.
    // I.e. we can't insert it here when it completes.
    // Assign an ID to refer to the future content by.
    boundary.rootSegmentID = request.nextSegmentId++;
    request.completedBoundaries.push(boundary); // Emit a pending rendered suspense boundary wrapper.

    writeStartPendingSuspenseBoundary(destination, request.renderState, boundary.rootSegmentID); // Flush the fallback.

    flushSubtree(request, destination, segment);
    return writeEndPendingSuspenseBoundary(destination, request.renderState);
  } else {
    {
      hoistResources(request.renderState, boundary.resources);
    } // We can inline this boundary's content as a complete boundary.


    writeStartCompletedSuspenseBoundary(destination, request.renderState);
    const completedSegments = boundary.completedSegments;

    if (completedSegments.length !== 1) {
      throw new Error('A previously unvisited boundary must have exactly one root segment. This is a bug in React.');
    }

    const contentSegment = completedSegments[0];
    flushSegment(request, destination, contentSegment);
    return writeEndCompletedSuspenseBoundary(destination, request.renderState);
  }
}

function flushClientRenderedBoundary(request, destination, boundary) {
  return writeClientRenderBoundaryInstruction(destination, request.resumableState, request.renderState, boundary.rootSegmentID, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
}

function flushSegmentContainer(request, destination, segment) {
  writeStartSegment(destination, request.renderState, segment.parentFormatContext, segment.id);
  flushSegment(request, destination, segment);
  return writeEndSegment(destination, segment.parentFormatContext);
}

function flushCompletedBoundary(request, destination, boundary) {
  {
    setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, boundary.resources);
  }

  const completedSegments = boundary.completedSegments;
  let i = 0;

  for (; i < completedSegments.length; i++) {
    const segment = completedSegments[i];
    flushPartiallyCompletedSegment(request, destination, boundary, segment);
  }

  completedSegments.length = 0;

  {
    writeResourcesForBoundary(destination, boundary.resources, request.renderState);
  }

  return writeCompletedBoundaryInstruction(destination, request.resumableState, request.renderState, boundary.rootSegmentID, boundary.resources);
}

function flushPartialBoundary(request, destination, boundary) {
  {
    setCurrentlyRenderingBoundaryResourcesTarget(request.renderState, boundary.resources);
  }

  const completedSegments = boundary.completedSegments;
  let i = 0;

  for (; i < completedSegments.length; i++) {
    const segment = completedSegments[i];

    if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
      i++;
      completedSegments.splice(0, i); // Only write as much as the buffer wants. Something higher priority
      // might want to write later.

      return false;
    }
  }

  completedSegments.splice(0, i);

  {
    // The way this is structured we only write resources for partial boundaries
    // if there is no backpressure. Later before we complete the boundary we
    // will write resources regardless of backpressure before we emit the
    // completion instruction
    return writeResourcesForBoundary(destination, boundary.resources, request.renderState);
  }
}

function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
  if (segment.status === FLUSHED) {
    // We've already flushed this inline.
    return true;
  }

  const segmentID = segment.id;

  if (segmentID === -1) {
    // This segment wasn't previously referred to. This happens at the root of
    // a boundary. We make kind of a leap here and assume this is the root.
    const rootSegmentID = segment.id = boundary.rootSegmentID;

    if (rootSegmentID === -1) {
      throw new Error('A root segment ID must have been assigned by now. This is a bug in React.');
    }

    return flushSegmentContainer(request, destination, segment);
  } else if (segmentID === boundary.rootSegmentID) {
    // When we emit postponed boundaries, we might have assigned the ID already
    // but it's still the root segment so we can't inject it into the parent yet.
    return flushSegmentContainer(request, destination, segment);
  } else {
    flushSegmentContainer(request, destination, segment);
    return writeCompletedSegmentInstruction(destination, request.resumableState, request.renderState, segmentID);
  }
}

function flushCompletedQueues(request, destination) {
  beginWriting(destination);

  try {
    // The structure of this is to go through each queue one by one and write
    // until the sink tells us to stop. When we should stop, we still finish writing
    // that item fully and then yield. At that point we remove the already completed
    // items up until the point we completed them.
    let i;
    const completedRootSegment = request.completedRootSegment;

    if (completedRootSegment !== null) {
      if (completedRootSegment.status === POSTPONED) {
        // We postponed the root, so we write nothing.
        return;
      } else if (request.pendingRootTasks === 0) {
        if (enableFloat) {
          writePreamble(destination, request.resumableState, request.renderState, request.allPendingTasks === 0 && request.trackedPostpones === null);
        }

        flushSegment(request, destination, completedRootSegment);
        request.completedRootSegment = null;
        writeCompletedRoot(destination, request.renderState);
      } else {
        // We haven't flushed the root yet so we don't need to check any other branches further down
        return;
      }
    }

    if (enableFloat) {
      writeHoistables(destination, request.resumableState, request.renderState);
    } // We emit client rendering instructions for already emitted boundaries first.
    // This is so that we can signal to the client to start client rendering them as
    // soon as possible.


    const clientRenderedBoundaries = request.clientRenderedBoundaries;

    for (i = 0; i < clientRenderedBoundaries.length; i++) {
      const boundary = clientRenderedBoundaries[i];

      if (!flushClientRenderedBoundary(request, destination, boundary)) {
        request.destination = null;
        i++;
        clientRenderedBoundaries.splice(0, i);
        return;
      }
    }

    clientRenderedBoundaries.splice(0, i); // Next we emit any complete boundaries. It's better to favor boundaries
    // that are completely done since we can actually show them, than it is to emit
    // any individual segments from a partially complete boundary.

    const completedBoundaries = request.completedBoundaries;

    for (i = 0; i < completedBoundaries.length; i++) {
      const boundary = completedBoundaries[i];

      if (!flushCompletedBoundary(request, destination, boundary)) {
        request.destination = null;
        i++;
        completedBoundaries.splice(0, i);
        return;
      }
    }

    completedBoundaries.splice(0, i); // Allow anything written so far to flush to the underlying sink before
    // we continue with lower priorities.

    completeWriting(destination);
    beginWriting(destination); // TODO: Here we'll emit data used by hydration.
    // Next we emit any segments of any boundaries that are partially complete
    // but not deeply complete.

    const partialBoundaries = request.partialBoundaries;

    for (i = 0; i < partialBoundaries.length; i++) {
      const boundary = partialBoundaries[i];

      if (!flushPartialBoundary(request, destination, boundary)) {
        request.destination = null;
        i++;
        partialBoundaries.splice(0, i);
        return;
      }
    }

    partialBoundaries.splice(0, i); // Next we check the completed boundaries again. This may have had
    // boundaries added to it in case they were too larged to be inlined.
    // New ones might be added in this loop.

    const largeBoundaries = request.completedBoundaries;

    for (i = 0; i < largeBoundaries.length; i++) {
      const boundary = largeBoundaries[i];

      if (!flushCompletedBoundary(request, destination, boundary)) {
        request.destination = null;
        i++;
        largeBoundaries.splice(0, i);
        return;
      }
    }

    largeBoundaries.splice(0, i);
  } finally {
    if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0 // We don't need to check any partially completed segments because
    // either they have pending task or they're complete.
    ) {
        request.flushScheduled = false;

        {
          // We write the trailing tags but only if don't have any data to resume.
          // If we need to resume we'll write the postamble in the resume instead.
          if (request.trackedPostpones === null) {
            writePostamble(destination, request.resumableState);
          }
        }

        completeWriting(destination);
        flushBuffered(destination);


        close(destination); // We need to stop flowing now because we do not want any async contexts which might call
        // float methods to initiate any flushes after this point

        stopFlowing(request);
      } else {
      completeWriting(destination);
      flushBuffered(destination);
    }
  }
}

function startWork(request) {
  request.flushScheduled = request.destination !== null;

  {
    scheduleWork(() => performWork(request));
  }

  if (request.trackedPostpones === null) {
    // this is either a regular render or a resume. For regular render we want
    // to call emitEarlyPreloads after the first performWork because we want
    // are responding to a live request and need to balance sending something early
    // (i.e. don't want for the shell to finish) but we need something to send.
    // The only implementation of this is for DOM at the moment and during resumes nothing
    // actually emits but the code paths here are the same.
    // During a prerender we don't want to be too aggressive in emitting early preloads
    // because we aren't responding to a live request and we can wait for the prerender to
    // postpone before we emit anything.
    {
      scheduleWork(() => enqueueEarlyPreloadsAfterInitialWork(request));
    }
  }
}

function enqueueEarlyPreloadsAfterInitialWork(request) {
  const shellComplete = request.pendingRootTasks === 0;
  emitEarlyPreloads(request.renderState, request.resumableState, shellComplete);
}

function enqueueFlush(request) {
  if (request.flushScheduled === false && // If there are pinged tasks we are going to flush anyway after work completes
  request.pingedTasks.length === 0 && // If there is no destination there is nothing we can flush to. A flush will
  // happen when we start flowing again
  request.destination !== null) {
    request.flushScheduled = true;
    scheduleWork(() => {
      // We need to existence check destination again here because it might go away
      // in between the enqueueFlush call and the work execution
      const destination = request.destination;

      if (destination) {
        flushCompletedQueues(request, destination);
      } else {
        request.flushScheduled = false;
      }
    });
  }
} // This function is intented to only be called during the pipe function for the Node builds.
// The reason we need this is because `renderToPipeableStream` is the only API which allows
// you to start flowing before the shell is complete and we've had a chance to emit early
// preloads already. This is really just defensive programming to ensure that we give hosts an
// opportunity to flush early preloads before streaming begins in case they are in an environment
// that only supports a single call to emitEarlyPreloads like the DOM renderers. It's unfortunate
// to put this Node only function directly in ReactFizzServer but it'd be more ackward to factor it
// by moving the implementation into ReactServerStreamConfigNode and even then we may not be able to
// eliminate all the wasted branching.


function prepareForStartFlowingIfBeforeAllReady(request) {
  const shellComplete = request.trackedPostpones === null ? // Render Request, we define shell complete by the pending root tasks
  request.pendingRootTasks === 0 : // Prerender Request, we define shell complete by completedRootSegemtn
  request.completedRootSegment === null ? request.pendingRootTasks === 0 : request.completedRootSegment.status !== POSTPONED;
  emitEarlyPreloads(request.renderState, request.resumableState, shellComplete);
}
function startFlowing(request, destination) {
  if (request.status === CLOSING) {
    request.status = CLOSED;
    closeWithError(destination, request.fatalError);
    return;
  }

  if (request.status === CLOSED) {
    return;
  }

  if (request.destination !== null) {
    // We're already flowing.
    return;
  }

  request.destination = destination;

  try {
    flushCompletedQueues(request, destination);
  } catch (error) {
    logRecoverableError(request, error);
    fatalError(request, error);
  }
}
function stopFlowing(request) {
  request.destination = null;
} // This is called to early terminate a request. It puts all pending boundaries in client rendered state.

function abort(request, reason) {
  try {
    const abortableTasks = request.abortableTasks;

    if (abortableTasks.size > 0) {
      const error = reason === undefined ? new Error('The render was aborted by the server without a reason.') : reason;
      abortableTasks.forEach(task => abortTask(task, request, error));
      abortableTasks.clear();
    }

    if (request.destination !== null) {
      flushCompletedQueues(request, request.destination);
    }
  } catch (error) {
    logRecoverableError(request, error);
    fatalError(request, error);
  }
}
function flushResources(request) {
  enqueueFlush(request);
}
function getFormState(request) {
  return request.formState;
}
function getResumableState(request) {
  return request.resumableState;
}
function getRenderState(request) {
  return request.renderState;
}

function addToReplayParent(node, parentKeyPath, trackedPostpones) {
  if (parentKeyPath === null) {
    trackedPostpones.rootNodes.push(node);
  } else {
    const workingMap = trackedPostpones.workingMap;
    let parentNode = workingMap.get(parentKeyPath);

    if (parentNode === undefined) {
      parentNode = [parentKeyPath[1], parentKeyPath[2], [], null];
      workingMap.set(parentKeyPath, parentNode);
      addToReplayParent(parentNode, parentKeyPath[0], trackedPostpones);
    }

    parentNode[2].push(node);
  }
} // Returns the state of a postponed request or null if nothing was postponed.


function getPostponedState(request) {
  const trackedPostpones = request.trackedPostpones;

  if (trackedPostpones === null || trackedPostpones.rootNodes.length === 0 && trackedPostpones.rootSlots === null) {
    // Reset. Let the flushing behave as if we completed the whole document.
    request.trackedPostpones = null;
    return null;
  }

  if (request.completedRootSegment !== null && request.completedRootSegment.status === POSTPONED) {
    // We postponed the root so we didn't flush anything.
    resetResumableState(request.resumableState, request.renderState);
  } else {
    completeResumableState(request.resumableState);
  }

  return {
    nextSegmentId: request.nextSegmentId,
    rootFormatContext: request.rootFormatContext,
    progressiveChunkSize: request.progressiveChunkSize,
    resumableState: request.resumableState,
    replayNodes: trackedPostpones.rootNodes,
    replaySlots: trackedPostpones.rootSlots
  };
}

exports.abort = abort;
exports.createPrerenderRequest = createPrerenderRequest;
exports.createRequest = createRequest;
exports.flushResources = flushResources;
exports.getFormState = getFormState;
exports.getPostponedState = getPostponedState;
exports.getRenderState = getRenderState;
exports.getResumableState = getResumableState;
exports.performWork = performWork;
exports.prepareForStartFlowingIfBeforeAllReady = prepareForStartFlowingIfBeforeAllReady;
exports.resolveRequest = resolveRequest;
exports.resumeRequest = resumeRequest;
exports.startFlowing = startFlowing;
exports.startWork = startWork;
exports.stopFlowing = stopFlowing;
    return exports;
};
module.exports.default = module.exports;
Object.defineProperty(module.exports, "__esModule", { value: true });
