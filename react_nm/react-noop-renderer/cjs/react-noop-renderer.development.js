/**
 * @license React
 * react-noop-renderer.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var ReactFiberReconciler = require('react-reconciler');
var React = require('react');
var Scheduler = require('scheduler/unstable_mock');
var constants = require('react-reconciler/constants');

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

var assign = Object.assign;

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe[incompatible-return] only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object'; // $FlowFixMe[incompatible-return]

    return type;
  }
} // $FlowFixMe[incompatible-return] only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkPropStringCoercion(value, propName) {
  {
    if (willCoercionThrow(value)) {
      error('The provided `%s` prop is an unsupported type %s.' + ' This value must be coerced to a string before using it here.', propName, typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var NO_CONTEXT = {};
var UPPERCASE_CONTEXT = {};

{
  Object.freeze(NO_CONTEXT);
}

function createReactNoop(reconciler, useMutation) {
  var instanceCounter = 0;
  var hostUpdateCounter = 0;
  var hostCloneCounter = 0;

  function appendChildToContainerOrInstance(parentInstance, child) {
    var prevParent = child.parent;

    if (prevParent !== -1 && prevParent !== parentInstance.id) {
      throw new Error('Reparenting is not allowed');
    }

    child.parent = parentInstance.id;
    var index = parentInstance.children.indexOf(child);

    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }

    parentInstance.children.push(child);
  }

  function appendChildToContainer(parentInstance, child) {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('appendChildToContainer() first argument is not a container.');
    }

    appendChildToContainerOrInstance(parentInstance, child);
  }

  function appendChild(parentInstance, child) {
    if (typeof parentInstance.rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('appendChild() first argument is not an instance.');
    }

    appendChildToContainerOrInstance(parentInstance, child);
  }

  function insertInContainerOrInstanceBefore(parentInstance, child, beforeChild) {
    var index = parentInstance.children.indexOf(child);

    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }

    var beforeIndex = parentInstance.children.indexOf(beforeChild);

    if (beforeIndex === -1) {
      throw new Error('This child does not exist.');
    }

    parentInstance.children.splice(beforeIndex, 0, child);
  }

  function insertInContainerBefore(parentInstance, child, beforeChild) {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('insertInContainerBefore() first argument is not a container.');
    }

    insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
  }

  function insertBefore(parentInstance, child, beforeChild) {
    if (typeof parentInstance.rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('insertBefore() first argument is not an instance.');
    }

    insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
  }

  function clearContainer(container) {
    container.children.splice(0);
  }

  function removeChildFromContainerOrInstance(parentInstance, child) {
    var index = parentInstance.children.indexOf(child);

    if (index === -1) {
      throw new Error('This child does not exist.');
    }

    parentInstance.children.splice(index, 1);
  }

  function removeChildFromContainer(parentInstance, child) {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('removeChildFromContainer() first argument is not a container.');
    }

    removeChildFromContainerOrInstance(parentInstance, child);
  }

  function removeChild(parentInstance, child) {
    if (typeof parentInstance.rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('removeChild() first argument is not an instance.');
    }

    removeChildFromContainerOrInstance(parentInstance, child);
  }

  function cloneInstance(instance, type, oldProps, newProps, keepChildren, children) {
    {
      checkPropStringCoercion(newProps.children, 'children');
    }

    var clone = {
      id: instance.id,
      type: type,
      parent: instance.parent,
      children: keepChildren ? instance.children : children ?? [],
      text: shouldSetTextContent(type, newProps) ? computeText(newProps.children + '', instance.context) : null,
      prop: newProps.prop,
      hidden: !!newProps.hidden,
      context: instance.context
    };

    if (type === 'suspensey-thing' && typeof newProps.src === 'string') {
      clone.src = newProps.src;
    }

    Object.defineProperty(clone, 'id', {
      value: clone.id,
      enumerable: false
    });
    Object.defineProperty(clone, 'parent', {
      value: clone.parent,
      enumerable: false
    });
    Object.defineProperty(clone, 'text', {
      value: clone.text,
      enumerable: false
    });
    Object.defineProperty(clone, 'context', {
      value: clone.context,
      enumerable: false
    });
    hostCloneCounter++;
    return clone;
  }

  function shouldSetTextContent(type, props) {
    if (type === 'errorInBeginPhase') {
      throw new Error('Error in host config.');
    }

    return typeof props.children === 'string' || typeof props.children === 'number';
  }

  function computeText(rawText, hostContext) {
    return hostContext === UPPERCASE_CONTEXT ? rawText.toUpperCase() : rawText;
  }

  var suspenseyThingCache = null; // Represents a subscription for all the suspensey things that block a
  // particular commit. Once they've all loaded, the commit phase can proceed.

  var suspenseyCommitSubscription = null;

  function startSuspendingCommit() {
    // This is where we might suspend on things that aren't associated with a
    // particular node, like document.fonts.ready.
    suspenseyCommitSubscription = null;
  }

  function suspendInstance(type, props) {
    var src = props.src;

    if (type === 'suspensey-thing' && typeof src === 'string') {
      // Attach a listener to the suspensey thing and create a subscription
      // object that uses reference counting to track when all the suspensey
      // things have loaded.
      var record = suspenseyThingCache.get(src);

      if (record === undefined) {
        throw new Error('Could not find record for key.');
      }

      if (record.status === 'fulfilled') ; else if (record.status === 'pending') {
        if (suspenseyCommitSubscription === null) {
          suspenseyCommitSubscription = {
            pendingCount: 1,
            commit: null
          };
        } else {
          suspenseyCommitSubscription.pendingCount++;
        } // Stash the subscription on the record. In `resolveSuspenseyThing`,
        // we'll use this fire the commit once all the things have loaded.


        if (record.subscriptions === null) {
          record.subscriptions = [];
        }

        record.subscriptions.push(suspenseyCommitSubscription);
      }
    } else {
      throw new Error('Did not expect this host component to be visited when suspending ' + 'the commit. Did you check the SuspendCommit flag?');
    }
  }

  function waitForCommitToBeReady() {
    var subscription = suspenseyCommitSubscription;

    if (subscription !== null) {
      suspenseyCommitSubscription = null;
      return function (commit) {
        subscription.commit = commit;

        var cancelCommit = function () {
          subscription.commit = null;
        };

        return cancelCommit;
      };
    }

    return null;
  }

  var sharedHostConfig = {
    supportsSingletons: false,
    getRootHostContext: function () {
      return NO_CONTEXT;
    },
    getChildHostContext: function (parentHostContext, type) {
      if (type === 'offscreen') {
        return parentHostContext;
      }

      if (type === 'uppercase') {
        return UPPERCASE_CONTEXT;
      }

      return NO_CONTEXT;
    },
    getPublicInstance: function (instance) {
      return instance;
    },
    createInstance: function (type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
      if (type === 'errorInCompletePhase') {
        throw new Error('Error in host config.');
      }

      {
        // The `if` statement here prevents auto-disabling of the safe coercion
        // ESLint rule, so we must manually disable it below.
        if (shouldSetTextContent(type, props)) {
          checkPropStringCoercion(props.children, 'children');
        }
      }

      var inst = {
        id: instanceCounter++,
        type: type,
        children: [],
        parent: -1,
        text: shouldSetTextContent(type, props) ? // eslint-disable-next-line react-internal/safe-string-coercion
        computeText(props.children + '', hostContext) : null,
        prop: props.prop,
        hidden: !!props.hidden,
        context: hostContext
      };

      if (type === 'suspensey-thing' && typeof props.src === 'string') {
        inst.src = props.src;
      } // Hide from unit tests


      Object.defineProperty(inst, 'id', {
        value: inst.id,
        enumerable: false
      });
      Object.defineProperty(inst, 'parent', {
        value: inst.parent,
        enumerable: false
      });
      Object.defineProperty(inst, 'text', {
        value: inst.text,
        enumerable: false
      });
      Object.defineProperty(inst, 'context', {
        value: inst.context,
        enumerable: false
      });
      Object.defineProperty(inst, 'fiber', {
        value: internalInstanceHandle,
        enumerable: false
      });
      return inst;
    },
    appendInitialChild: function (parentInstance, child) {
      var prevParent = child.parent;

      if (prevParent !== -1 && prevParent !== parentInstance.id) {
        throw new Error('Reparenting is not allowed');
      }

      child.parent = parentInstance.id;
      parentInstance.children.push(child);
    },
    finalizeInitialChildren: function (domElement, type, props) {
      return false;
    },
    shouldSetTextContent: shouldSetTextContent,
    createTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
      if (hostContext === UPPERCASE_CONTEXT) {
        text = text.toUpperCase();
      }

      var inst = {
        text: text,
        id: instanceCounter++,
        parent: -1,
        hidden: false,
        context: hostContext
      }; // Hide from unit tests

      Object.defineProperty(inst, 'id', {
        value: inst.id,
        enumerable: false
      });
      Object.defineProperty(inst, 'parent', {
        value: inst.parent,
        enumerable: false
      });
      Object.defineProperty(inst, 'context', {
        value: inst.context,
        enumerable: false
      });
      return inst;
    },
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    supportsMicrotasks: true,
    scheduleMicrotask: typeof queueMicrotask === 'function' ? queueMicrotask : typeof Promise !== 'undefined' ? function (callback) {
      return Promise.resolve(null).then(callback).catch(function (error) {
        setTimeout(function () {
          throw error;
        });
      });
    } : setTimeout,
    prepareForCommit: function () {
      return null;
    },
    resetAfterCommit: function () {},
    getCurrentEventPriority: function () {
      return currentEventPriority;
    },
    shouldAttemptEagerTransition: function () {
      return false;
    },
    now: Scheduler.unstable_now,
    isPrimaryRenderer: true,
    warnsIfNotActing: true,
    supportsHydration: false,
    getInstanceFromNode: function () {
      throw new Error('Not yet implemented.');
    },
    beforeActiveInstanceBlur: function () {// NO-OP
    },
    afterActiveInstanceBlur: function () {// NO-OP
    },
    preparePortalMount: function () {// NO-OP
    },
    prepareScopeUpdate: function () {},
    getInstanceFromScope: function () {
      throw new Error('Not yet implemented.');
    },
    detachDeletedInstance: function () {},
    logRecoverableError: function () {// no-op
    },
    requestPostPaintCallback: function (callback) {
      var endTime = Scheduler.unstable_now();
      callback(endTime);
    },
    maySuspendCommit: function (type, props) {
      // Asks whether it's possible for this combination of type and props
      // to ever need to suspend. This is different from asking whether it's
      // currently ready because even if it's ready now, it might get purged
      // from the cache later.
      return type === 'suspensey-thing' && typeof props.src === 'string';
    },
    mayResourceSuspendCommit: function (resource) {
      throw new Error('Resources are not implemented for React Noop yet. This method should not be called');
    },
    preloadInstance: function (type, props) {
      if (type !== 'suspensey-thing' || typeof props.src !== 'string') {
        throw new Error('Attempted to preload unexpected instance: ' + type);
      } // In addition to preloading an instance, this method asks whether the
      // instance is ready to be committed. If it's not, React may yield to the
      // main thread and ask again. It's possible a load event will fire in
      // between, in which case we can avoid showing a fallback.


      if (suspenseyThingCache === null) {
        suspenseyThingCache = new Map();
      }

      var record = suspenseyThingCache.get(props.src);

      if (record === undefined) {
        var newRecord = {
          status: 'pending',
          subscriptions: null
        };
        suspenseyThingCache.set(props.src, newRecord);
        var onLoadStart = props.onLoadStart;

        if (typeof onLoadStart === 'function') {
          onLoadStart();
        }

        return false;
      } else {
        // If this is false, React will trigger a fallback, if needed.
        return record.status === 'fulfilled';
      }
    },
    preloadResource: function (resource) {
      throw new Error('Resources are not implemented for React Noop yet. This method should not be called');
    },
    startSuspendingCommit: startSuspendingCommit,
    suspendInstance: suspendInstance,
    suspendResource: function (resource) {
      throw new Error('Resources are not implemented for React Noop yet. This method should not be called');
    },
    waitForCommitToBeReady: waitForCommitToBeReady,
    NotPendingTransition: null
  };
  var hostConfig = useMutation ? assign({}, sharedHostConfig, {
    supportsMutation: true,
    supportsPersistence: false,
    commitMount: function (instance, type, newProps) {// Noop
    },
    commitUpdate: function (instance, updatePayload, type, oldProps, newProps) {
      if (oldProps === null) {
        throw new Error('Should have old props');
      }

      hostUpdateCounter++;
      instance.prop = newProps.prop;
      instance.hidden = !!newProps.hidden;

      if (type === 'suspensey-thing' && typeof newProps.src === 'string') {
        instance.src = newProps.src;
      }

      if (shouldSetTextContent(type, newProps)) {
        {
          checkPropStringCoercion(newProps.children, 'children');
        }

        instance.text = computeText(newProps.children + '', instance.context);
      }
    },
    commitTextUpdate: function (textInstance, oldText, newText) {
      hostUpdateCounter++;
      textInstance.text = computeText(newText, textInstance.context);
    },
    appendChild: appendChild,
    appendChildToContainer: appendChildToContainer,
    insertBefore: insertBefore,
    insertInContainerBefore: insertInContainerBefore,
    removeChild: removeChild,
    removeChildFromContainer: removeChildFromContainer,
    clearContainer: clearContainer,
    hideInstance: function (instance) {
      instance.hidden = true;
    },
    hideTextInstance: function (textInstance) {
      textInstance.hidden = true;
    },
    unhideInstance: function (instance, props) {
      if (!props.hidden) {
        instance.hidden = false;
      }
    },
    unhideTextInstance: function (textInstance, text) {
      textInstance.hidden = false;
    },
    resetTextContent: function (instance) {
      instance.text = null;
    }
  }) : assign({}, sharedHostConfig, {
    supportsMutation: false,
    supportsPersistence: true,
    cloneInstance: cloneInstance,
    clearContainer: clearContainer,
    createContainerChildSet: function () {
      return [];
    },
    appendChildToContainerChildSet: function (childSet, child) {
      childSet.push(child);
    },
    finalizeContainerChildren: function (container, newChildren) {
      container.pendingChildren = newChildren;

      if (newChildren.length === 1 && newChildren[0].text === 'Error when completing root') {
        // Trigger an error for testing purposes
        throw Error('Error when completing root');
      }
    },
    replaceContainerChildren: function (container, newChildren) {
      container.children = newChildren;
    },
    cloneHiddenInstance: function (instance, type, props) {
      var clone = cloneInstance(instance, type, props, props, true, null);
      clone.hidden = true;
      return clone;
    },
    cloneHiddenTextInstance: function (instance, text) {
      var clone = {
        text: instance.text,
        id: instance.id,
        parent: instance.parent,
        hidden: true,
        context: instance.context
      }; // Hide from unit tests

      Object.defineProperty(clone, 'id', {
        value: clone.id,
        enumerable: false
      });
      Object.defineProperty(clone, 'parent', {
        value: clone.parent,
        enumerable: false
      });
      Object.defineProperty(clone, 'context', {
        value: clone.context,
        enumerable: false
      });
      return clone;
    }
  });
  var NoopRenderer = reconciler(hostConfig);
  var rootContainers = new Map();
  var roots = new Map();
  var DEFAULT_ROOT_ID = '<default>';
  var currentEventPriority = constants.DefaultEventPriority;

  function childToJSX(child, text) {
    if (text !== null) {
      return text;
    }

    if (child === null) {
      return null;
    }

    if (typeof child === 'string') {
      return child;
    }

    if (isArray(child)) {
      if (child.length === 0) {
        return null;
      }

      if (child.length === 1) {
        return childToJSX(child[0], null);
      }

      var children = child.map(function (c) {
        return childToJSX(c, null);
      });

      if (children.every(function (c) {
        return typeof c === 'string' || typeof c === 'number';
      })) {
        return children.join('');
      }

      return children;
    }

    if (isArray(child.children)) {
      // This is an instance.
      var instance = child;

      var _children = childToJSX(instance.children, instance.text);

      var props = {
        prop: instance.prop
      };

      if (instance.hidden) {
        props.hidden = true;
      }

      if (instance.src) {
        props.src = instance.src;
      }

      if (_children !== null) {
        props.children = _children;
      }

      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: instance.type,
        key: null,
        ref: null,
        props: props,
        _owner: null,
        _store: {} 
      };
    } // This is a text instance


    var textInstance = child;

    if (textInstance.hidden) {
      return '';
    }

    return textInstance.text;
  }

  function getChildren(root) {
    if (root) {
      return root.children;
    } else {
      return null;
    }
  }

  function getPendingChildren(root) {
    if (root) {
      return root.children;
    } else {
      return null;
    }
  }

  function getChildrenAsJSX(root) {
    var children = childToJSX(getChildren(root), null);

    if (children === null) {
      return null;
    }

    if (isArray(children)) {
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: REACT_FRAGMENT_TYPE,
        key: null,
        ref: null,
        props: {
          children: children
        },
        _owner: null,
        _store: {} 
      };
    }

    return children;
  }

  function getPendingChildrenAsJSX(root) {
    var children = childToJSX(getChildren(root), null);

    if (children === null) {
      return null;
    }

    if (isArray(children)) {
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: REACT_FRAGMENT_TYPE,
        key: null,
        ref: null,
        props: {
          children: children
        },
        _owner: null,
        _store: {} 
      };
    }

    return children;
  }

  function flushSync(fn) {
    {
      if (NoopRenderer.isAlreadyRendering()) {
        error('flushSync was called from inside a lifecycle method. React cannot ' + 'flush when React is already rendering. Consider moving this call to ' + 'a scheduler task or micro task.');
      }
    }

    return NoopRenderer.flushSync(fn);
  }

  function onRecoverableError(error) {// TODO: Turn this on once tests are fixed
    // eslint-disable-next-line react-internal/no-production-logging, react-internal/warning-args
    // console.error(error);
  }

  var idCounter = 0;
  var ReactNoop = {
    _Scheduler: Scheduler,
    getChildren: function () {
      throw new Error('No longer supported due to bad performance when used with `expect()`. ' + 'Use `ReactNoop.getChildrenAsJSX()` instead or, if you really need to, `dangerouslyGetChildren` after you carefully considered the warning in its JSDOC.');
    },
    getPendingChildren: function () {
      throw new Error('No longer supported due to bad performance when used with `expect()`. ' + 'Use `ReactNoop.getPendingChildrenAsJSX()` instead or, if you really need to, `dangerouslyGetPendingChildren` after you carefully considered the warning in its JSDOC.');
    },

    /**
     * Prefer using `getChildrenAsJSX`.
     * Using the returned children in `.toEqual` has very poor performance on mismatch due to deep equality checking of fiber structures.
     * Make sure you deeply remove enumerable properties before passing it to `.toEqual`, or, better, use `getChildrenAsJSX` or `toMatchRenderedOutput`.
     */
    dangerouslyGetChildren: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      var container = rootContainers.get(rootID);
      return getChildren(container);
    },

    /**
     * Prefer using `getPendingChildrenAsJSX`.
     * Using the returned children in `.toEqual` has very poor performance on mismatch due to deep equality checking of fiber structures.
     * Make sure you deeply remove enumerable properties before passing it to `.toEqual`, or, better, use `getChildrenAsJSX` or `toMatchRenderedOutput`.
     */
    dangerouslyGetPendingChildren: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      var container = rootContainers.get(rootID);
      return getPendingChildren(container);
    },
    getOrCreateRootContainer: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      var tag = arguments.length > 1 ? arguments[1] : undefined;
      var root = roots.get(rootID);

      if (!root) {
        var container = {
          rootID: rootID,
          pendingChildren: [],
          children: []
        };
        rootContainers.set(rootID, container);
        root = NoopRenderer.createContainer(container, tag, null, null, false, '', onRecoverableError, null);
        roots.set(rootID, root);
      }

      return root.current.stateNode.containerInfo;
    },
    // TODO: Replace ReactNoop.render with createRoot + root.render
    createRoot: function (options) {
      var container = {
        rootID: '' + idCounter++,
        pendingChildren: [],
        children: []
      };
      var fiberRoot = NoopRenderer.createContainer(container, constants.ConcurrentRoot, null, null, false, '', onRecoverableError, options && options.unstable_transitionCallbacks ? options.unstable_transitionCallbacks : null);
      return {
        _Scheduler: Scheduler,
        render: function (children) {
          NoopRenderer.updateContainer(children, fiberRoot, null, null);
        },
        getChildren: function () {
          return getChildren(container);
        },
        getChildrenAsJSX: function () {
          return getChildrenAsJSX(container);
        }
      };
    },
    createLegacyRoot: function () {
      var container = {
        rootID: '' + idCounter++,
        pendingChildren: [],
        children: []
      };
      var fiberRoot = NoopRenderer.createContainer(container, constants.LegacyRoot, null, null, false, '', onRecoverableError, null);
      return {
        _Scheduler: Scheduler,
        render: function (children) {
          NoopRenderer.updateContainer(children, fiberRoot, null, null);
        },
        getChildren: function () {
          return getChildren(container);
        },
        getChildrenAsJSX: function () {
          return getChildrenAsJSX(container);
        }
      };
    },
    getChildrenAsJSX: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      var container = rootContainers.get(rootID);
      return getChildrenAsJSX(container);
    },
    getPendingChildrenAsJSX: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      var container = rootContainers.get(rootID);
      return getPendingChildrenAsJSX(container);
    },
    getSuspenseyThingStatus: function (src) {
      if (suspenseyThingCache === null) {
        return null;
      } else {
        var record = suspenseyThingCache.get(src);
        return record === undefined ? null : record.status;
      }
    },
    resolveSuspenseyThing: function (key) {
      if (suspenseyThingCache === null) {
        suspenseyThingCache = new Map();
      }

      var record = suspenseyThingCache.get(key);

      if (record === undefined) {
        var newRecord = {
          status: 'fulfilled',
          subscriptions: null
        };
        suspenseyThingCache.set(key, newRecord);
      } else {
        if (record.status === 'pending') {
          record.status = 'fulfilled';
          var subscriptions = record.subscriptions;

          if (subscriptions !== null) {
            record.subscriptions = null;

            for (var i = 0; i < subscriptions.length; i++) {
              var subscription = subscriptions[i];
              subscription.pendingCount--;

              if (subscription.pendingCount === 0) {
                var commit = subscription.commit;
                subscription.commit = null;
                commit();
              }
            }
          }
        }
      }
    },
    resetSuspenseyThingCache: function () {
      suspenseyThingCache = null;
    },
    createPortal: function (children, container) {
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return NoopRenderer.createPortal(children, container, null, key);
    },
    // Shortcut for testing a single root
    render: function (element, callback) {
      ReactNoop.renderToRootWithID(element, DEFAULT_ROOT_ID, callback);
    },
    renderLegacySyncRoot: function (element, callback) {
      var rootID = DEFAULT_ROOT_ID;
      var container = ReactNoop.getOrCreateRootContainer(rootID, constants.LegacyRoot);
      var root = roots.get(container.rootID);
      NoopRenderer.updateContainer(element, root, null, callback);
    },
    renderToRootWithID: function (element, rootID, callback) {
      var container = ReactNoop.getOrCreateRootContainer(rootID, constants.ConcurrentRoot);
      var root = roots.get(container.rootID);
      NoopRenderer.updateContainer(element, root, null, callback);
    },
    unmountRootWithID: function (rootID) {
      var root = roots.get(rootID);

      if (root) {
        NoopRenderer.updateContainer(null, root, null, function () {
          roots.delete(rootID);
          rootContainers.delete(rootID);
        });
      }
    },
    findInstance: function (componentOrElement) {
      if (componentOrElement == null) {
        return null;
      } // Unsound duck typing.


      var component = componentOrElement;

      if (typeof component.id === 'number') {
        return component;
      }

      {
        return NoopRenderer.findHostInstanceWithWarning(component, 'findInstance');
      }
    },
    flushNextYield: function () {
      Scheduler.unstable_flushNumberOfYields(1);
      return Scheduler.unstable_clearLog();
    },
    startTrackingHostCounters: function () {
      hostUpdateCounter = 0;
      hostCloneCounter = 0;
    },
    stopTrackingHostCounters: function () {
      var result = useMutation ? {
        hostUpdateCounter: hostUpdateCounter
      } : {
        hostCloneCounter: hostCloneCounter
      };
      hostUpdateCounter = 0;
      hostCloneCounter = 0;
      return result;
    },
    expire: Scheduler.unstable_advanceTime,
    flushExpired: function () {
      return Scheduler.unstable_flushExpired();
    },
    unstable_runWithPriority: NoopRenderer.runWithPriority,
    batchedUpdates: NoopRenderer.batchedUpdates,
    deferredUpdates: NoopRenderer.deferredUpdates,
    discreteUpdates: NoopRenderer.discreteUpdates,
    idleUpdates: function (fn) {
      var prevEventPriority = currentEventPriority;
      currentEventPriority = constants.IdleEventPriority;

      try {
        fn();
      } finally {
        currentEventPriority = prevEventPriority;
      }
    },
    flushSync: flushSync,
    flushPassiveEffects: NoopRenderer.flushPassiveEffects,
    // Logs the current state of the tree.
    dumpTree: function () {
      var _console;

      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      var root = roots.get(rootID);
      var rootContainer = rootContainers.get(rootID);

      if (!root || !rootContainer) {
        // eslint-disable-next-line react-internal/no-production-logging
        console.log('Nothing rendered yet.');
        return;
      }

      var bufferedLog = [];

      function log() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        bufferedLog.push.apply(bufferedLog, args.concat(['\n']));
      }

      function logHostInstances(children, depth) {
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          var indent = '  '.repeat(depth);

          if (typeof child.text === 'string') {
            log(indent + '- ' + child.text);
          } else {
            log(indent + '- ' + child.type + '#' + child.id);
            logHostInstances(child.children, depth + 1);
          }
        }
      }

      function logContainer(container, depth) {
        log('  '.repeat(depth) + '- [root#' + container.rootID + ']');
        logHostInstances(container.children, depth + 1);
      }

      function logUpdateQueue(updateQueue, depth) {
        log('  '.repeat(depth + 1) + 'QUEUED UPDATES');
        var first = updateQueue.firstBaseUpdate;
        var update = first;

        if (update !== null) {
          do {
            log('  '.repeat(depth + 1) + '~', '[' + update.expirationTime + ']');
          } while (update !== null);
        }

        var lastPending = updateQueue.shared.pending;

        if (lastPending !== null) {
          var firstPending = lastPending.next;
          var pendingUpdate = firstPending;

          if (pendingUpdate !== null) {
            do {
              log('  '.repeat(depth + 1) + '~', '[' + pendingUpdate.expirationTime + ']');
            } while (pendingUpdate !== null && pendingUpdate !== firstPending);
          }
        }
      }

      function logFiber(fiber, depth) {
        log('  '.repeat(depth) + '- ' + ( // need to explicitly coerce Symbol to a string
        fiber.type ? fiber.type.name || fiber.type.toString() : '[root]'), '[' + fiber.childExpirationTime + (fiber.pendingProps ? '*' : '') + ']');

        if (fiber.updateQueue) {
          logUpdateQueue(fiber.updateQueue, depth);
        } // const childInProgress = fiber.progressedChild;
        // if (childInProgress && childInProgress !== fiber.child) {
        //   log(
        //     '  '.repeat(depth + 1) + 'IN PROGRESS: ' + fiber.pendingWorkPriority,
        //   );
        //   logFiber(childInProgress, depth + 1);
        //   if (fiber.child) {
        //     log('  '.repeat(depth + 1) + 'CURRENT');
        //   }
        // } else if (fiber.child && fiber.updateQueue) {
        //   log('  '.repeat(depth + 1) + 'CHILDREN');
        // }


        if (fiber.child) {
          logFiber(fiber.child, depth + 1);
        }

        if (fiber.sibling) {
          logFiber(fiber.sibling, depth);
        }
      }

      log('HOST INSTANCES:');
      logContainer(rootContainer, 0);
      log('FIBERS:');
      logFiber(root.current, 0); // eslint-disable-next-line react-internal/no-production-logging

      (_console = console).log.apply(_console, bufferedLog);
    },
    getRoot: function () {
      var rootID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_ID;
      return roots.get(rootID);
    }
  };
  return ReactNoop;
}

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */

var _createReactNoop = createReactNoop(ReactFiberReconciler.default, // reconciler
true // useMutation
),
    _Scheduler = _createReactNoop._Scheduler,
    getChildren = _createReactNoop.getChildren,
    dangerouslyGetChildren = _createReactNoop.dangerouslyGetChildren,
    getPendingChildren = _createReactNoop.getPendingChildren,
    dangerouslyGetPendingChildren = _createReactNoop.dangerouslyGetPendingChildren,
    getOrCreateRootContainer = _createReactNoop.getOrCreateRootContainer,
    createRoot = _createReactNoop.createRoot,
    createLegacyRoot = _createReactNoop.createLegacyRoot,
    getChildrenAsJSX = _createReactNoop.getChildrenAsJSX,
    getPendingChildrenAsJSX = _createReactNoop.getPendingChildrenAsJSX,
    getSuspenseyThingStatus = _createReactNoop.getSuspenseyThingStatus,
    resolveSuspenseyThing = _createReactNoop.resolveSuspenseyThing,
    resetSuspenseyThingCache = _createReactNoop.resetSuspenseyThingCache,
    createPortal = _createReactNoop.createPortal,
    render = _createReactNoop.render,
    renderLegacySyncRoot = _createReactNoop.renderLegacySyncRoot,
    renderToRootWithID = _createReactNoop.renderToRootWithID,
    unmountRootWithID = _createReactNoop.unmountRootWithID,
    findInstance = _createReactNoop.findInstance,
    flushNextYield = _createReactNoop.flushNextYield,
    startTrackingHostCounters = _createReactNoop.startTrackingHostCounters,
    stopTrackingHostCounters = _createReactNoop.stopTrackingHostCounters,
    expire = _createReactNoop.expire,
    flushExpired = _createReactNoop.flushExpired,
    batchedUpdates = _createReactNoop.batchedUpdates,
    deferredUpdates = _createReactNoop.deferredUpdates,
    discreteUpdates = _createReactNoop.discreteUpdates,
    idleUpdates = _createReactNoop.idleUpdates,
    flushSync = _createReactNoop.flushSync,
    flushPassiveEffects = _createReactNoop.flushPassiveEffects,
    act = _createReactNoop.act,
    dumpTree = _createReactNoop.dumpTree,
    getRoot = _createReactNoop.getRoot,
    unstable_runWithPriority = _createReactNoop.unstable_runWithPriority;

exports._Scheduler = _Scheduler;
exports.act = act;
exports.batchedUpdates = batchedUpdates;
exports.createLegacyRoot = createLegacyRoot;
exports.createPortal = createPortal;
exports.createRoot = createRoot;
exports.dangerouslyGetChildren = dangerouslyGetChildren;
exports.dangerouslyGetPendingChildren = dangerouslyGetPendingChildren;
exports.deferredUpdates = deferredUpdates;
exports.discreteUpdates = discreteUpdates;
exports.dumpTree = dumpTree;
exports.expire = expire;
exports.findInstance = findInstance;
exports.flushExpired = flushExpired;
exports.flushNextYield = flushNextYield;
exports.flushPassiveEffects = flushPassiveEffects;
exports.flushSync = flushSync;
exports.getChildren = getChildren;
exports.getChildrenAsJSX = getChildrenAsJSX;
exports.getOrCreateRootContainer = getOrCreateRootContainer;
exports.getPendingChildren = getPendingChildren;
exports.getPendingChildrenAsJSX = getPendingChildrenAsJSX;
exports.getRoot = getRoot;
exports.getSuspenseyThingStatus = getSuspenseyThingStatus;
exports.idleUpdates = idleUpdates;
exports.render = render;
exports.renderLegacySyncRoot = renderLegacySyncRoot;
exports.renderToRootWithID = renderToRootWithID;
exports.resetSuspenseyThingCache = resetSuspenseyThingCache;
exports.resolveSuspenseyThing = resolveSuspenseyThing;
exports.startTrackingHostCounters = startTrackingHostCounters;
exports.stopTrackingHostCounters = stopTrackingHostCounters;
exports.unmountRootWithID = unmountRootWithID;
exports.unstable_runWithPriority = unstable_runWithPriority;
  })();
}
