/**
 * @license React
 * react-dom-test-utils.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

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

const FunctionComponent = 0;
const ClassComponent = 1;

const HostRoot = 3; // Root of a host tree. Could be nested inside another node.

const HostComponent = 5;
const HostText = 6;
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

function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber) {
    throw new Error('Unable to find node on an unmounted component.');
  }
}

function findCurrentFiberUsingSlowPath(fiber) {
  const alternate = fiber.alternate;

  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    const nearestMounted = getNearestMountedFiber(fiber);

    if (nearestMounted === null) {
      throw new Error('Unable to find node on an unmounted component.');
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


      throw new Error('Unable to find node on an unmounted component.');
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
          throw new Error('Child was not found in either parent set. This indicates a bug ' + 'in React related to the return pointer. Please file an issue.');
        }
      }
    }

    if (a.alternate !== b) {
      throw new Error("Return fibers should always be each others' alternates. " + 'This error is likely caused by a bug in React. Please file an issue.');
    }
  } // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.


  if (a.tag !== HostRoot) {
    throw new Error('Unable to find node on an unmounted component.');
  }

  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  } // Otherwise B has to be current branch.


  return alternate;
}

const assign = Object.assign;

/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */
function getEventCharCode(nativeEvent) {
  let charCode;
  const keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode; // FF does not set `charCode` for the Enter-key, check against `keyCode`.

    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  } // IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
  // report Enter as charCode 10 when ctrl is pressed.


  if (charCode === 10) {
    charCode = 13;
  } // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.


  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

function functionThatReturnsTrue() {
  return true;
}

function functionThatReturnsFalse() {
  return false;
} // This is intentionally a factory so that we have different returned constructors.
// If we had a single constructor, it would be megamorphic and engines would deopt.


function createSyntheticEvent(Interface) {
  /**
   * Synthetic events are dispatched by event plugins, typically in response to a
   * top-level event delegation handler.
   *
   * These systems should generally use pooling to reduce the frequency of garbage
   * collection. The system should check `isPersistent` to determine whether the
   * event should be released into the pool after being dispatched. Users that
   * need a persisted event should invoke `persist`.
   *
   * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
   * normalizing browser quirks. Subclasses do not necessarily have to implement a
   * DOM interface; custom application-specific events can also subclass this.
   */
  // $FlowFixMe[missing-this-annot]
  function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
    this._reactName = reactName;
    this._targetInst = targetInst;
    this.type = reactEventType;
    this.nativeEvent = nativeEvent;
    this.target = nativeEventTarget;
    this.currentTarget = null;

    for (const propName in Interface) {
      if (!Interface.hasOwnProperty(propName)) {
        continue;
      }

      const normalize = Interface[propName];

      if (normalize) {
        this[propName] = normalize(nativeEvent);
      } else {
        this[propName] = nativeEvent[propName];
      }
    }

    const defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;

    if (defaultPrevented) {
      this.isDefaultPrevented = functionThatReturnsTrue;
    } else {
      this.isDefaultPrevented = functionThatReturnsFalse;
    }

    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  } // $FlowFixMe[prop-missing] found when upgrading Flow


  assign(SyntheticBaseEvent.prototype, {
    // $FlowFixMe[missing-this-annot]
    preventDefault: function () {
      this.defaultPrevented = true;
      const event = this.nativeEvent;

      if (!event) {
        return;
      }

      if (event.preventDefault) {
        event.preventDefault(); // $FlowFixMe[illegal-typeof] - flow is not aware of `unknown` in IE
      } else if (typeof event.returnValue !== 'unknown') {
        event.returnValue = false;
      }

      this.isDefaultPrevented = functionThatReturnsTrue;
    },
    // $FlowFixMe[missing-this-annot]
    stopPropagation: function () {
      const event = this.nativeEvent;

      if (!event) {
        return;
      }

      if (event.stopPropagation) {
        event.stopPropagation(); // $FlowFixMe[illegal-typeof] - flow is not aware of `unknown` in IE
      } else if (typeof event.cancelBubble !== 'unknown') {
        // The ChangeEventPlugin registers a "propertychange" event for
        // IE. This event does not support bubbling or cancelling, and
        // any references to cancelBubble throw "Member not found".  A
        // typeof check of "unknown" circumvents this issue (and is also
        // IE specific).
        event.cancelBubble = true;
      }

      this.isPropagationStopped = functionThatReturnsTrue;
    },

    /**
     * We release all dispatched `SyntheticEvent`s after each event loop, adding
     * them back into the pool. This allows a way to hold onto a reference that
     * won't be added back into the pool.
     */
    persist: function () {// Modern event system doesn't use pooling.
    },

    /**
     * Checks if this event should be released back into the pool.
     *
     * @return {boolean} True if this should not be released, false otherwise.
     */
    isPersistent: functionThatReturnsTrue
  });
  return SyntheticBaseEvent;
}
/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */


const EventInterface = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
};
const SyntheticEvent = createSyntheticEvent(EventInterface);

const UIEventInterface = assign({}, EventInterface, {
  view: 0,
  detail: 0
});

createSyntheticEvent(UIEventInterface);
let lastMovementX;
let lastMovementY;
let lastMouseEvent;

function updateMouseMovementPolyfillState(event) {
  if (event !== lastMouseEvent) {
    if (lastMouseEvent && event.type === 'mousemove') {
      // $FlowFixMe[unsafe-arithmetic] assuming this is a number
      lastMovementX = event.screenX - lastMouseEvent.screenX; // $FlowFixMe[unsafe-arithmetic] assuming this is a number

      lastMovementY = event.screenY - lastMouseEvent.screenY;
    } else {
      lastMovementX = 0;
      lastMovementY = 0;
    }

    lastMouseEvent = event;
  }
}
/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */


const MouseEventInterface = assign({}, UIEventInterface, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: getEventModifierState,
  button: 0,
  buttons: 0,
  relatedTarget: function (event) {
    if (event.relatedTarget === undefined) return event.fromElement === event.srcElement ? event.toElement : event.fromElement;
    return event.relatedTarget;
  },
  movementX: function (event) {
    if ('movementX' in event) {
      return event.movementX;
    }

    updateMouseMovementPolyfillState(event);
    return lastMovementX;
  },
  movementY: function (event) {
    if ('movementY' in event) {
      return event.movementY;
    } // Don't need to call updateMouseMovementPolyfillState() here
    // because it's guaranteed to have already run when movementX
    // was copied.


    return lastMovementY;
  }
});

createSyntheticEvent(MouseEventInterface);
/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */

const DragEventInterface = assign({}, MouseEventInterface, {
  dataTransfer: 0
});

createSyntheticEvent(DragEventInterface);
/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */

const FocusEventInterface = assign({}, UIEventInterface, {
  relatedTarget: 0
});

createSyntheticEvent(FocusEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */

const AnimationEventInterface = assign({}, EventInterface, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
});

createSyntheticEvent(AnimationEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */

const ClipboardEventInterface = assign({}, EventInterface, {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
});

createSyntheticEvent(ClipboardEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */

const CompositionEventInterface = assign({}, EventInterface, {
  data: 0
});

createSyntheticEvent(CompositionEventInterface);
/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */

const normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
};
/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */

const translateToKey = {
  '8': 'Backspace',
  '9': 'Tab',
  '12': 'Clear',
  '13': 'Enter',
  '16': 'Shift',
  '17': 'Control',
  '18': 'Alt',
  '19': 'Pause',
  '20': 'CapsLock',
  '27': 'Escape',
  '32': ' ',
  '33': 'PageUp',
  '34': 'PageDown',
  '35': 'End',
  '36': 'Home',
  '37': 'ArrowLeft',
  '38': 'ArrowUp',
  '39': 'ArrowRight',
  '40': 'ArrowDown',
  '45': 'Insert',
  '46': 'Delete',
  '112': 'F1',
  '113': 'F2',
  '114': 'F3',
  '115': 'F4',
  '116': 'F5',
  '117': 'F6',
  '118': 'F7',
  '119': 'F8',
  '120': 'F9',
  '121': 'F10',
  '122': 'F11',
  '123': 'F12',
  '144': 'NumLock',
  '145': 'ScrollLock',
  '224': 'Meta'
};
/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */

function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.
    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    const key = // $FlowFixMe[invalid-computed-prop] unable to index with a `mixed` value
    normalizeKey[nativeEvent.key] || nativeEvent.key;

    if (key !== 'Unidentified') {
      return key;
    }
  } // Browser does not implement `key`, polyfill as much of it as we can.


  if (nativeEvent.type === 'keypress') {
    const charCode = getEventCharCode( // $FlowFixMe[incompatible-call] unable to narrow to `KeyboardEvent`
    nativeEvent); // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.

    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }

  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    // $FlowFixMe[invalid-computed-prop] unable to index with a `mixed` value
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }

  return '';
}
/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */


const modifierKeyToProp = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Meta: 'metaKey',
  Shift: 'shiftKey'
}; // Older browsers (Safari <= 10, iOS Safari <= 10.2) do not support
// getModifierState. If getModifierState is not supported, we map it to a set of
// modifier keys exposed by the event. In this case, Lock-keys are not supported.
// $FlowFixMe[missing-local-annot]
// $FlowFixMe[missing-this-annot]

function modifierStateGetter(keyArg) {
  const syntheticEvent = this;
  const nativeEvent = syntheticEvent.nativeEvent;

  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }

  const keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}
/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */


const KeyboardEventInterface = assign({}, UIEventInterface, {
  key: getEventKey,
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: getEventModifierState,
  // Legacy Interface
  charCode: function (event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.
    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode( // $FlowFixMe[incompatible-call] unable to narrow to `KeyboardEvent`
      event);
    }

    return 0;
  },
  keyCode: function (event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.
    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }

    return 0;
  },
  which: function (event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode( // $FlowFixMe[incompatible-call] unable to narrow to `KeyboardEvent`
      event);
    }

    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }

    return 0;
  }
});

createSyntheticEvent(KeyboardEventInterface);
/**
 * @interface PointerEvent
 * @see http://www.w3.org/TR/pointerevents/
 */

const PointerEventInterface = assign({}, MouseEventInterface, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
});

createSyntheticEvent(PointerEventInterface);
/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */

const TouchEventInterface = assign({}, UIEventInterface, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: getEventModifierState
});

createSyntheticEvent(TouchEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */

const TransitionEventInterface = assign({}, EventInterface, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
});

createSyntheticEvent(TransitionEventInterface);
/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */

const WheelEventInterface = assign({}, MouseEventInterface, {
  deltaX(event) {
    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? // $FlowFixMe[unsafe-arithmetic] assuming this is a number
    -event.wheelDeltaX : 0;
  },

  deltaY(event) {
    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? // $FlowFixMe[unsafe-arithmetic] assuming this is a number
    -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? // $FlowFixMe[unsafe-arithmetic] assuming this is a number
    -event.wheelDelta : 0;
  },

  deltaZ: 0,
  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: 0
});

createSyntheticEvent(WheelEventInterface);

/**
 * HTML nodeType values that represent the type of the node
 */
const ELEMENT_NODE = 1;

function invokeGuardedCallbackImpl(name, func, context) {
  {
    // $FlowFixMe[method-unbinding]
    const funcArgs = Array.prototype.slice.call(arguments, 3);

    try {
      // $FlowFixMe[incompatible-call] Flow doesn't understand the arguments splicing.
      func.apply(context, funcArgs);
    } catch (error) {
      this.onError(error);
    }
  }
}

let hasError = false;
let caughtError = null; // Used by event system to capture/rethrow the first error.

let hasRethrowError = false;
let rethrowError = null;
const reporter = {
  onError(error) {
    hasError = true;
    caughtError = error;
  }

};
/**
 * Call a function while guarding against errors that happens within it.
 * Returns an error if it throws, otherwise null.
 *
 * In production, this is implemented using a try-catch. The reason we don't
 * use a try-catch directly is so that we can swap out a different
 * implementation in DEV mode.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */

function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = false;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
/**
 * Same as invokeGuardedCallback, but instead of returning an error, it stores
 * it in a global so it can be rethrown by `rethrowCaughtError` later.
 * TODO: See if caughtError and rethrowError can be unified.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */

function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
  invokeGuardedCallback.apply(this, arguments);

  if (hasError) {
    const error = clearCaughtError();

    if (!hasRethrowError) {
      hasRethrowError = true;
      rethrowError = error;
    }
  }
}
/**
 * During execution of guarded functions we will capture the first error which
 * we will rethrow to be handled by the top level error handler.
 */

function rethrowCaughtError() {
  if (hasRethrowError) {
    const error = rethrowError;
    hasRethrowError = false;
    rethrowError = null;
    throw error;
  }
}
function clearCaughtError() {
  if (hasError) {
    const error = caughtError;
    hasError = false;
    caughtError = null;
    return error;
  } else {
    throw new Error('clearCaughtError was called but no error was captured. This error ' + 'is likely caused by a bug in React. Please file an issue.');
  }
}

const isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

const SecretInternals = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const EventInternals = SecretInternals.Events;
const getInstanceFromNode = EventInternals[0];
const getNodeFromInstance = EventInternals[1];
const getFiberCurrentPropsFromNode = EventInternals[2];
const enqueueStateRestore = EventInternals[3];
const restoreStateIfNeeded = EventInternals[4];
const act = React.unstable_act;

function Event(suffix) {}
/**
 * @class ReactTestUtils
 */

function findAllInRenderedFiberTreeInternal(fiber, test) {
  if (!fiber) {
    return [];
  }

  const currentParent = findCurrentFiberUsingSlowPath(fiber);

  if (!currentParent) {
    return [];
  }

  let node = currentParent;
  const ret = [];

  while (true) {
    if (node.tag === HostComponent || node.tag === HostText || node.tag === ClassComponent || node.tag === FunctionComponent || (node.tag === HostHoistable ) || (node.tag === HostSingleton )) {
      const publicInst = node.stateNode;

      if (test(publicInst)) {
        ret.push(publicInst);
      }
    }

    if (node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === currentParent) {
      return ret;
    }

    while (!node.sibling) {
      if (!node.return || node.return === currentParent) {
        return ret;
      }

      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function validateClassInstance(inst, methodName) {
  if (!inst) {
    // This is probably too relaxed but it's existing behavior.
    return;
  }

  if (get(inst)) {
    // This is a public instance indeed.
    return;
  }

  let received;
  const stringified = String(inst);

  if (isArray(inst)) {
    received = 'an array';
  } else if (inst && inst.nodeType === ELEMENT_NODE && inst.tagName) {
    received = 'a DOM node';
  } else if (stringified === '[object Object]') {
    received = 'object with keys {' + Object.keys(inst).join(', ') + '}';
  } else {
    received = stringified;
  }

  throw new Error(methodName + "(...): the first argument must be a React class instance. " + ("Instead received: " + received + "."));
}
/**
 * Utilities for making it easy to test React components.
 *
 * See https://reactjs.org/docs/test-utils.html
 *
 * Todo: Support the entire DOM.scry query syntax. For now, these simple
 * utilities will suffice for testing purposes.
 * @lends ReactTestUtils
 */


function renderIntoDocument(element) {
  const div = document.createElement('div'); // None of our tests actually require attaching the container to the
  // DOM, and doing so creates a mess that we rely on test isolation to
  // clean up, so we're going to stop honoring the name of this method
  // (and probably rename it eventually) if no problems arise.
  // document.documentElement.appendChild(div);

  return ReactDOM.render(element, div);
}

function isElement(element) {
  return React.isValidElement(element);
}

function isElementOfType(inst, convenienceConstructor) {
  return React.isValidElement(inst) && inst.type === convenienceConstructor;
}

function isDOMComponent(inst) {
  return !!(inst && inst.nodeType === ELEMENT_NODE && inst.tagName);
}

function isDOMComponentElement(inst) {
  return !!(inst && React.isValidElement(inst) && !!inst.tagName);
}

function isCompositeComponent(inst) {
  if (isDOMComponent(inst)) {
    // Accessing inst.setState warns; just return false as that'll be what
    // this returns when we have DOM nodes as refs directly
    return false;
  }

  return inst != null && typeof inst.render === 'function' && typeof inst.setState === 'function';
}

function isCompositeComponentWithType(inst, type) {
  if (!isCompositeComponent(inst)) {
    return false;
  }

  const internalInstance = get(inst);
  const constructor = internalInstance.type;
  return constructor === type;
}

function findAllInRenderedTree(inst, test) {
  validateClassInstance(inst, 'findAllInRenderedTree');

  if (!inst) {
    return [];
  }

  const internalInstance = get(inst);
  return findAllInRenderedFiberTreeInternal(internalInstance, test);
}
/**
 * Finds all instances of components in the rendered tree that are DOM
 * components with the class name matching `className`.
 * @return {array} an array of all the matches.
 */


function scryRenderedDOMComponentsWithClass(root, classNames) {
  validateClassInstance(root, 'scryRenderedDOMComponentsWithClass');
  return findAllInRenderedTree(root, function (inst) {
    if (isDOMComponent(inst)) {
      let className = inst.className;

      if (typeof className !== 'string') {
        // SVG, probably.
        className = inst.getAttribute('class') || '';
      }

      const classList = className.split(/\s+/);

      if (!isArray(classNames)) {
        if (classNames === undefined) {
          throw new Error('TestUtils.scryRenderedDOMComponentsWithClass expects a ' + 'className as a second argument.');
        }

        classNames = classNames.split(/\s+/);
      }

      return classNames.every(function (name) {
        return classList.indexOf(name) !== -1;
      });
    }

    return false;
  });
}
/**
 * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactDOMComponent} The one match.
 */


function findRenderedDOMComponentWithClass(root, className) {
  validateClassInstance(root, 'findRenderedDOMComponentWithClass');
  const all = scryRenderedDOMComponentsWithClass(root, className);

  if (all.length !== 1) {
    throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for class:' + className);
  }

  return all[0];
}
/**
 * Finds all instances of components in the rendered tree that are DOM
 * components with the tag name matching `tagName`.
 * @return {array} an array of all the matches.
 */


function scryRenderedDOMComponentsWithTag(root, tagName) {
  validateClassInstance(root, 'scryRenderedDOMComponentsWithTag');
  return findAllInRenderedTree(root, function (inst) {
    return isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
  });
}
/**
 * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactDOMComponent} The one match.
 */


function findRenderedDOMComponentWithTag(root, tagName) {
  validateClassInstance(root, 'findRenderedDOMComponentWithTag');
  const all = scryRenderedDOMComponentsWithTag(root, tagName);

  if (all.length !== 1) {
    throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for tag:' + tagName);
  }

  return all[0];
}
/**
 * Finds all instances of components with type equal to `componentType`.
 * @return {array} an array of all the matches.
 */


function scryRenderedComponentsWithType(root, componentType) {
  validateClassInstance(root, 'scryRenderedComponentsWithType');
  return findAllInRenderedTree(root, function (inst) {
    return isCompositeComponentWithType(inst, componentType);
  });
}
/**
 * Same as `scryRenderedComponentsWithType` but expects there to be one result
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactComponent} The one match.
 */


function findRenderedComponentWithType(root, componentType) {
  validateClassInstance(root, 'findRenderedComponentWithType');
  const all = scryRenderedComponentsWithType(root, componentType);

  if (all.length !== 1) {
    throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for componentType:' + componentType);
  }

  return all[0];
}
/**
 * Pass a mocked component module to this method to augment it with
 * useful methods that allow it to be used as a dummy React component.
 * Instead of rendering as usual, the component will become a simple
 * <div> containing any provided children.
 *
 * @param {object} module the mock function object exported from a
 *                        module that defines the component to be mocked
 * @param {?string} mockTagName optional dummy root tag name to return
 *                              from render method (overrides
 *                              module.mockTagName if provided)
 * @return {object} the ReactTestUtils object (for chaining)
 */


function mockComponent(module, mockTagName) {

  mockTagName = mockTagName || module.mockTagName || 'div';
  module.prototype.render.mockImplementation(function () {
    return React.createElement(mockTagName, null, this.props.children);
  });
  return this;
}

function nativeTouchData(x, y) {
  return {
    touches: [{
      pageX: x,
      pageY: y
    }]
  };
} // Start of inline: the below functions were inlined from
// EventPropagator.js, as they deviated from ReactDOM's newer
// implementations.

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */


function executeDispatch(event, listener, inst) {
  const type = event.type || 'unknown-event';
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}
/**
 * Standard/simple iteration through an event's collected dispatches.
 */


function executeDispatchesInOrder(event) {
  const dispatchListeners = event._dispatchListeners;
  const dispatchInstances = event._dispatchInstances;

  if (isArray(dispatchListeners)) {
    for (let i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      } // Listeners and Instances are two parallel arrays that are always in sync.


      executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, dispatchListeners, dispatchInstances);
  }

  event._dispatchListeners = null;
  event._dispatchInstances = null;
}
/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */


function executeDispatchesAndRelease(event
/* ReactSyntheticEvent */
) {
  if (event) {
    executeDispatchesInOrder(event);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
}

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function getParent(inst) {
  do {
    inst = inst.return; // TODO: If this is a HostRoot we might want to bail out.
    // That is depending on if we want nested subtrees (layers) to bubble
    // events to their parent. We could also go through parentNode on the
    // host node but that wouldn't work for React Native and doesn't let us
    // do the portal feature.
  } while (inst && inst.tag !== HostComponent && (inst.tag !== HostSingleton));

  if (inst) {
    return inst;
  }

  return null;
}
/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */


function traverseTwoPhase(inst, fn, arg) {
  const path = [];

  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }

  let i;

  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }

  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      return !!(props.disabled && isInteractive(type));

    default:
      return false;
  }
}
/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */


function getListener(inst
/* Fiber */
, registrationName) {
  // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
  // live here; needs to be moved to a better place soon
  const stateNode = inst.stateNode;

  if (!stateNode) {
    // Work in progress (ex: onload events in incremental mode).
    return null;
  }

  const props = getFiberCurrentPropsFromNode(stateNode);

  if (!props) {
    // Work in progress.
    return null;
  }

  const listener = props[registrationName];

  if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
    return null;
  }

  if (listener && typeof listener !== 'function') {
    throw new Error("Expected `" + registrationName + "` listener to be a function, instead got a value of `" + typeof listener + "` type.");
  }

  return listener;
}

function listenerAtPhase(inst, event, propagationPhase) {
  let registrationName = event._reactName;

  if (propagationPhase === 'captured') {
    registrationName += 'Capture';
  }

  return getListener(inst, registrationName);
}

function accumulateDispatches(inst, ignoredDirection, event) {
  if (inst && event && event._reactName) {
    const registrationName = event._reactName;
    const listener = getListener(inst, registrationName);

    if (listener) {
      if (event._dispatchListeners == null) {
        event._dispatchListeners = [];
      }

      if (event._dispatchInstances == null) {
        event._dispatchInstances = [];
      }

      event._dispatchListeners.push(listener);

      event._dispatchInstances.push(inst);
    }
  }
}

function accumulateDirectionalDispatches(inst, phase, event) {

  const listener = listenerAtPhase(inst, event, phase);

  if (listener) {
    if (event._dispatchListeners == null) {
      event._dispatchListeners = [];
    }

    if (event._dispatchInstances == null) {
      event._dispatchInstances = [];
    }

    event._dispatchListeners.push(listener);

    event._dispatchInstances.push(inst);
  }
}

function accumulateDirectDispatchesSingle(event) {
  if (event && event._reactName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event._reactName) {
    traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
} // End of inline


const Simulate = {};
const directDispatchEventTypes = new Set(['mouseEnter', 'mouseLeave', 'pointerEnter', 'pointerLeave']);
/**
 * Exports:
 *
 * - `Simulate.click(Element)`
 * - `Simulate.mouseMove(Element)`
 * - `Simulate.change(Element)`
 * - ... (All keys from event plugin `eventTypes` objects)
 */

function makeSimulator(eventType) {
  return function (domNode, eventData) {
    if (React.isValidElement(domNode)) {
      throw new Error('TestUtils.Simulate expected a DOM node as the first argument but received ' + 'a React element. Pass the DOM node you wish to simulate the event on instead. ' + 'Note that TestUtils.Simulate will not work if you are using shallow rendering.');
    }

    if (isCompositeComponent(domNode)) {
      throw new Error('TestUtils.Simulate expected a DOM node as the first argument but received ' + 'a component instance. Pass the DOM node you wish to simulate the event on instead.');
    }

    const reactName = 'on' + eventType[0].toUpperCase() + eventType.slice(1);
    const fakeNativeEvent = new Event();
    fakeNativeEvent.target = domNode;
    fakeNativeEvent.type = eventType.toLowerCase();
    const targetInst = getInstanceFromNode(domNode);
    const event = new SyntheticEvent(reactName, fakeNativeEvent.type, targetInst, fakeNativeEvent, domNode); // Since we aren't using pooling, always persist the event. This will make
    // sure it's marked and won't warn when setting additional properties.

    event.persist();
    assign(event, eventData);

    if (directDispatchEventTypes.has(eventType)) {
      accumulateDirectDispatchesSingle(event);
    } else {
      accumulateTwoPhaseDispatchesSingle(event);
    }

    ReactDOM.unstable_batchedUpdates(function () {
      // Normally extractEvent enqueues a state restore, but we'll just always
      // do that since we're by-passing it here.
      enqueueStateRestore(domNode);
      executeDispatchesAndRelease(event);
      rethrowCaughtError();
    });
    restoreStateIfNeeded();
  };
} // A one-time snapshot with no plans to update. We'll probably want to deprecate Simulate API.


const simulatedEventTypes = ['blur', 'cancel', 'click', 'close', 'contextMenu', 'copy', 'cut', 'auxClick', 'doubleClick', 'dragEnd', 'dragStart', 'drop', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'mouseDown', 'mouseUp', 'paste', 'pause', 'play', 'pointerCancel', 'pointerDown', 'pointerUp', 'rateChange', 'reset', 'resize', 'seeked', 'submit', 'touchCancel', 'touchEnd', 'touchStart', 'volumeChange', 'drag', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'mouseMove', 'mouseOut', 'mouseOver', 'pointerMove', 'pointerOut', 'pointerOver', 'scroll', 'toggle', 'touchMove', 'wheel', 'abort', 'animationEnd', 'animationIteration', 'animationStart', 'canPlay', 'canPlayThrough', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'gotPointerCapture', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'lostPointerCapture', 'playing', 'progress', 'seeking', 'stalled', 'suspend', 'timeUpdate', 'transitionEnd', 'waiting', 'mouseEnter', 'mouseLeave', 'pointerEnter', 'pointerLeave', 'change', 'select', 'beforeInput', 'compositionEnd', 'compositionStart', 'compositionUpdate'];

function buildSimulators() {
  simulatedEventTypes.forEach(eventType => {
    Simulate[eventType] = makeSimulator(eventType);
  });
}

buildSimulators();

exports.Simulate = Simulate;
exports.act = act;
exports.findAllInRenderedTree = findAllInRenderedTree;
exports.findRenderedComponentWithType = findRenderedComponentWithType;
exports.findRenderedDOMComponentWithClass = findRenderedDOMComponentWithClass;
exports.findRenderedDOMComponentWithTag = findRenderedDOMComponentWithTag;
exports.isCompositeComponent = isCompositeComponent;
exports.isCompositeComponentWithType = isCompositeComponentWithType;
exports.isDOMComponent = isDOMComponent;
exports.isDOMComponentElement = isDOMComponentElement;
exports.isElement = isElement;
exports.isElementOfType = isElementOfType;
exports.mockComponent = mockComponent;
exports.nativeTouchData = nativeTouchData;
exports.renderIntoDocument = renderIntoDocument;
exports.scryRenderedComponentsWithType = scryRenderedComponentsWithType;
exports.scryRenderedDOMComponentsWithClass = scryRenderedDOMComponentsWithClass;
exports.scryRenderedDOMComponentsWithTag = scryRenderedDOMComponentsWithTag;
exports.traverseTwoPhase = traverseTwoPhase;