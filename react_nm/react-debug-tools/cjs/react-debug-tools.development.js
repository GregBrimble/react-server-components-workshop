/**
 * @license React
 * react-debug-tools.development.js
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

var ErrorStackParser = require('error-stack-parser');
var React = require('react');

var assign = Object.assign;

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var FunctionComponent = 0;
var ContextProvider = 10;
var ForwardRef = 11;
var SimpleMemoComponent = 15;

var hookLog = []; // Primitives

var primitiveStackCache = null;

function getPrimitiveStackCache() {
  // This initializes a cache of all primitive hooks so that the top
  // most stack frames added by calling the primitive hook can be removed.
  if (primitiveStackCache === null) {
    var cache = new Map();
    var readHookLog;

    try {
      // Use all hooks here to add them to the hook log.
      Dispatcher.useContext({
        _currentValue: null
      });
      Dispatcher.useState(null);
      Dispatcher.useReducer(function (s, a) {
        return s;
      }, null);
      Dispatcher.useRef(null);

      if (typeof Dispatcher.useCacheRefresh === 'function') {
        // This type check is for Flow only.
        Dispatcher.useCacheRefresh();
      }

      Dispatcher.useLayoutEffect(function () {});
      Dispatcher.useInsertionEffect(function () {});
      Dispatcher.useEffect(function () {});
      Dispatcher.useImperativeHandle(undefined, function () {
        return null;
      });
      Dispatcher.useDebugValue(null);
      Dispatcher.useCallback(function () {});
      Dispatcher.useMemo(function () {
        return null;
      });

      if (typeof Dispatcher.useMemoCache === 'function') {
        // This type check is for Flow only.
        Dispatcher.useMemoCache(0);
      }
    } finally {
      readHookLog = hookLog;
      hookLog = [];
    }

    for (var i = 0; i < readHookLog.length; i++) {
      var hook = readHookLog[i];
      cache.set(hook.primitive, ErrorStackParser.parse(hook.stackError));
    }

    primitiveStackCache = cache;
  }

  return primitiveStackCache;
}

var currentHook = null;

function nextHook() {
  var hook = currentHook;

  if (hook !== null) {
    currentHook = hook.next;
  }

  return hook;
}

function readContext(context) {
  // For now we don't expose readContext usage in the hooks debugging info.
  return context._currentValue;
}

function use() {
  // TODO: What should this do if it receives an unresolved promise?
  throw new Error('Support for `use` not yet implemented in react-debug-tools.');
}

function useContext(context) {
  hookLog.push({
    primitive: 'Context',
    stackError: new Error(),
    value: context._currentValue
  });
  return context._currentValue;
}

function useState(initialState) {
  var hook = nextHook();
  var state = hook !== null ? hook.memoizedState : typeof initialState === 'function' ? // $FlowFixMe[incompatible-use]: Flow doesn't like mixed types
  initialState() : initialState;
  hookLog.push({
    primitive: 'State',
    stackError: new Error(),
    value: state
  });
  return [state, function (action) {}];
}

function useReducer(reducer, initialArg, init) {
  var hook = nextHook();
  var state;

  if (hook !== null) {
    state = hook.memoizedState;
  } else {
    state = init !== undefined ? init(initialArg) : initialArg;
  }

  hookLog.push({
    primitive: 'Reducer',
    stackError: new Error(),
    value: state
  });
  return [state, function (action) {}];
}

function useRef(initialValue) {
  var hook = nextHook();
  var ref = hook !== null ? hook.memoizedState : {
    current: initialValue
  };
  hookLog.push({
    primitive: 'Ref',
    stackError: new Error(),
    value: ref.current
  });
  return ref;
}

function useCacheRefresh() {
  var hook = nextHook();
  hookLog.push({
    primitive: 'CacheRefresh',
    stackError: new Error(),
    value: hook !== null ? hook.memoizedState : function refresh() {}
  });
  return function () {};
}

function useLayoutEffect(create, inputs) {
  nextHook();
  hookLog.push({
    primitive: 'LayoutEffect',
    stackError: new Error(),
    value: create
  });
}

function useInsertionEffect(create, inputs) {
  nextHook();
  hookLog.push({
    primitive: 'InsertionEffect',
    stackError: new Error(),
    value: create
  });
}

function useEffect(create, inputs) {
  nextHook();
  hookLog.push({
    primitive: 'Effect',
    stackError: new Error(),
    value: create
  });
}

function useImperativeHandle(ref, create, inputs) {
  nextHook(); // We don't actually store the instance anywhere if there is no ref callback
  // and if there is a ref callback it might not store it but if it does we
  // have no way of knowing where. So let's only enable introspection of the
  // ref itself if it is using the object form.

  var instance = undefined;

  if (ref !== null && typeof ref === 'object') {
    instance = ref.current;
  }

  hookLog.push({
    primitive: 'ImperativeHandle',
    stackError: new Error(),
    value: instance
  });
}

function useDebugValue(value, formatterFn) {
  hookLog.push({
    primitive: 'DebugValue',
    stackError: new Error(),
    value: typeof formatterFn === 'function' ? formatterFn(value) : value
  });
}

function useCallback(callback, inputs) {
  var hook = nextHook();
  hookLog.push({
    primitive: 'Callback',
    stackError: new Error(),
    value: hook !== null ? hook.memoizedState[0] : callback
  });
  return callback;
}

function useMemo(nextCreate, inputs) {
  var hook = nextHook();
  var value = hook !== null ? hook.memoizedState[0] : nextCreate();
  hookLog.push({
    primitive: 'Memo',
    stackError: new Error(),
    value: value
  });
  return value;
}

function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  // useSyncExternalStore() composes multiple hooks internally.
  // Advance the current hook index the same number of times
  // so that subsequent hooks have the right memoized state.
  nextHook(); // SyncExternalStore

  nextHook(); // Effect

  var value = getSnapshot();
  hookLog.push({
    primitive: 'SyncExternalStore',
    stackError: new Error(),
    value: value
  });
  return value;
}

function useTransition() {
  // useTransition() composes multiple hooks internally.
  // Advance the current hook index the same number of times
  // so that subsequent hooks have the right memoized state.
  nextHook(); // State

  nextHook(); // Callback

  hookLog.push({
    primitive: 'Transition',
    stackError: new Error(),
    value: undefined
  });
  return [false, function (callback) {}];
}

function useDeferredValue(value, initialValue) {
  var hook = nextHook();
  hookLog.push({
    primitive: 'DeferredValue',
    stackError: new Error(),
    value: hook !== null ? hook.memoizedState : value
  });
  return value;
}

function useId() {
  var hook = nextHook();
  var id = hook !== null ? hook.memoizedState : '';
  hookLog.push({
    primitive: 'Id',
    stackError: new Error(),
    value: id
  });
  return id;
} // useMemoCache is an implementation detail of Forget's memoization
// it should not be called directly in user-generated code
// we keep it as a stub for dispatcher


function useMemoCache(size) {
  return [];
}

var Dispatcher = {
  use: use,
  readContext: readContext,
  useCacheRefresh: useCacheRefresh,
  useCallback: useCallback,
  useContext: useContext,
  useEffect: useEffect,
  useImperativeHandle: useImperativeHandle,
  useDebugValue: useDebugValue,
  useLayoutEffect: useLayoutEffect,
  useInsertionEffect: useInsertionEffect,
  useMemo: useMemo,
  useMemoCache: useMemoCache,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,
  useTransition: useTransition,
  useSyncExternalStore: useSyncExternalStore,
  useDeferredValue: useDeferredValue,
  useId: useId
}; // create a proxy to throw a custom error
// in case future versions of React adds more hooks

var DispatcherProxyHandler = {
  get: function (target, prop) {
    if (target.hasOwnProperty(prop)) {
      return target[prop];
    }

    var error = new Error('Missing method in Dispatcher: ' + prop); // Note: This error name needs to stay in sync with react-devtools-shared
    // TODO: refactor this if we ever combine the devtools and debug tools packages

    error.name = 'ReactDebugToolsUnsupportedHookError';
    throw error;
  }
}; // `Proxy` may not exist on some platforms

var DispatcherProxy = typeof Proxy === 'undefined' ? Dispatcher : new Proxy(Dispatcher, DispatcherProxyHandler); // Inspect
// Don't assume
//
// We can't assume that stack frames are nth steps away from anything.
// E.g. we can't assume that the root call shares all frames with the stack
// of a hook call. A simple way to demonstrate this is wrapping `new Error()`
// in a wrapper constructor like a polyfill. That'll add an extra frame.
// Similar things can happen with the call to the dispatcher. The top frame
// may not be the primitive. Likewise the primitive can have fewer stack frames
// such as when a call to useState got inlined to use dispatcher.useState.
//
// We also can't assume that the last frame of the root call is the same
// frame as the last frame of the hook call because long stack traces can be
// truncated to a stack trace limit.

var mostLikelyAncestorIndex = 0;

function findSharedIndex(hookStack, rootStack, rootIndex) {
  var source = rootStack[rootIndex].source;

  hookSearch: for (var i = 0; i < hookStack.length; i++) {
    if (hookStack[i].source === source) {
      // This looks like a match. Validate that the rest of both stack match up.
      for (var a = rootIndex + 1, b = i + 1; a < rootStack.length && b < hookStack.length; a++, b++) {
        if (hookStack[b].source !== rootStack[a].source) {
          // If not, give up and try a different match.
          continue hookSearch;
        }
      }

      return i;
    }
  }

  return -1;
}

function findCommonAncestorIndex(rootStack, hookStack) {
  var rootIndex = findSharedIndex(hookStack, rootStack, mostLikelyAncestorIndex);

  if (rootIndex !== -1) {
    return rootIndex;
  } // If the most likely one wasn't a hit, try any other frame to see if it is shared.
  // If that takes more than 5 frames, something probably went wrong.


  for (var i = 0; i < rootStack.length && i < 5; i++) {
    rootIndex = findSharedIndex(hookStack, rootStack, i);

    if (rootIndex !== -1) {
      mostLikelyAncestorIndex = i;
      return rootIndex;
    }
  }

  return -1;
}

function isReactWrapper(functionName, primitiveName) {
  if (!functionName) {
    return false;
  }

  var expectedPrimitiveName = 'use' + primitiveName;

  if (functionName.length < expectedPrimitiveName.length) {
    return false;
  }

  return functionName.lastIndexOf(expectedPrimitiveName) === functionName.length - expectedPrimitiveName.length;
}

function findPrimitiveIndex(hookStack, hook) {
  var stackCache = getPrimitiveStackCache();
  var primitiveStack = stackCache.get(hook.primitive);

  if (primitiveStack === undefined) {
    return -1;
  }

  for (var i = 0; i < primitiveStack.length && i < hookStack.length; i++) {
    if (primitiveStack[i].source !== hookStack[i].source) {
      // If the next two frames are functions called `useX` then we assume that they're part of the
      // wrappers that the React packager or other packages adds around the dispatcher.
      if (i < hookStack.length - 1 && isReactWrapper(hookStack[i].functionName, hook.primitive)) {
        i++;
      }

      if (i < hookStack.length - 1 && isReactWrapper(hookStack[i].functionName, hook.primitive)) {
        i++;
      }

      return i;
    }
  }

  return -1;
}

function parseTrimmedStack(rootStack, hook) {
  // Get the stack trace between the primitive hook function and
  // the root function call. I.e. the stack frames of custom hooks.
  var hookStack = ErrorStackParser.parse(hook.stackError);
  var rootIndex = findCommonAncestorIndex(rootStack, hookStack);
  var primitiveIndex = findPrimitiveIndex(hookStack, hook);

  if (rootIndex === -1 || primitiveIndex === -1 || rootIndex - primitiveIndex < 2) {
    // Something went wrong. Give up.
    return null;
  }

  return hookStack.slice(primitiveIndex, rootIndex - 1);
}

function parseCustomHookName(functionName) {
  if (!functionName) {
    return '';
  }

  var startIndex = functionName.lastIndexOf('.');

  if (startIndex === -1) {
    startIndex = 0;
  }

  if (functionName.slice(startIndex, startIndex + 3) === 'use') {
    startIndex += 3;
  }

  return functionName.slice(startIndex);
}

function buildTree(rootStack, readHookLog, includeHooksSource) {
  var rootChildren = [];
  var prevStack = null;
  var levelChildren = rootChildren;
  var nativeHookID = 0;
  var stackOfChildren = [];

  for (var i = 0; i < readHookLog.length; i++) {
    var hook = readHookLog[i];
    var stack = parseTrimmedStack(rootStack, hook);

    if (stack !== null) {
      // Note: The indices 0 <= n < length-1 will contain the names.
      // The indices 1 <= n < length will contain the source locations.
      // That's why we get the name from n - 1 and don't check the source
      // of index 0.
      var commonSteps = 0;

      if (prevStack !== null) {
        // Compare the current level's stack to the new stack.
        while (commonSteps < stack.length && commonSteps < prevStack.length) {
          var stackSource = stack[stack.length - commonSteps - 1].source;
          var prevSource = prevStack[prevStack.length - commonSteps - 1].source;

          if (stackSource !== prevSource) {
            break;
          }

          commonSteps++;
        } // Pop back the stack as many steps as were not common.


        for (var j = prevStack.length - 1; j > commonSteps; j--) {
          levelChildren = stackOfChildren.pop();
        }
      } // The remaining part of the new stack are custom hooks. Push them
      // to the tree.


      for (var _j = stack.length - commonSteps - 1; _j >= 1; _j--) {
        var children = [];
        var stackFrame = stack[_j];
        var _levelChild = {
          id: null,
          isStateEditable: false,
          name: parseCustomHookName(stack[_j - 1].functionName),
          value: undefined,
          subHooks: children
        };

        if (includeHooksSource) {
          _levelChild.hookSource = {
            lineNumber: stackFrame.lineNumber,
            columnNumber: stackFrame.columnNumber,
            functionName: stackFrame.functionName,
            fileName: stackFrame.fileName
          };
        }

        levelChildren.push(_levelChild);
        stackOfChildren.push(levelChildren);
        levelChildren = children;
      }

      prevStack = stack;
    }

    var primitive = hook.primitive; // For now, the "id" of stateful hooks is just the stateful hook index.
    // Custom hooks have no ids, nor do non-stateful native hooks (e.g. Context, DebugValue).

    var id = primitive === 'Context' || primitive === 'DebugValue' ? null : nativeHookID++; // For the time being, only State and Reducer hooks support runtime overrides.

    var isStateEditable = primitive === 'Reducer' || primitive === 'State';
    var levelChild = {
      id: id,
      isStateEditable: isStateEditable,
      name: primitive,
      value: hook.value,
      subHooks: []
    };

    if (includeHooksSource) {
      var hookSource = {
        lineNumber: null,
        functionName: null,
        fileName: null,
        columnNumber: null
      };

      if (stack && stack.length >= 1) {
        var _stackFrame = stack[0];
        hookSource.lineNumber = _stackFrame.lineNumber;
        hookSource.functionName = _stackFrame.functionName;
        hookSource.fileName = _stackFrame.fileName;
        hookSource.columnNumber = _stackFrame.columnNumber;
      }

      levelChild.hookSource = hookSource;
    }

    levelChildren.push(levelChild);
  } // Associate custom hook values (useDebugValue() hook entries) with the correct hooks.


  processDebugValues(rootChildren, null);
  return rootChildren;
} // Custom hooks support user-configurable labels (via the special useDebugValue() hook).
// That hook adds user-provided values to the hooks tree,
// but these values aren't intended to appear alongside of the other hooks.
// Instead they should be attributed to their parent custom hook.
// This method walks the tree and assigns debug values to their custom hook owners.


function processDebugValues(hooksTree, parentHooksNode) {
  var debugValueHooksNodes = [];

  for (var i = 0; i < hooksTree.length; i++) {
    var hooksNode = hooksTree[i];

    if (hooksNode.name === 'DebugValue' && hooksNode.subHooks.length === 0) {
      hooksTree.splice(i, 1);
      i--;
      debugValueHooksNodes.push(hooksNode);
    } else {
      processDebugValues(hooksNode.subHooks, hooksNode);
    }
  } // Bubble debug value labels to their custom hook owner.
  // If there is no parent hook, just ignore them for now.
  // (We may warn about this in the future.)


  if (parentHooksNode !== null) {
    if (debugValueHooksNodes.length === 1) {
      parentHooksNode.value = debugValueHooksNodes[0].value;
    } else if (debugValueHooksNodes.length > 1) {
      parentHooksNode.value = debugValueHooksNodes.map(function (_ref) {
        var value = _ref.value;
        return value;
      });
    }
  }
}

function handleRenderFunctionError(error) {
  // original error might be any type.
  if (error instanceof Error && error.name === 'ReactDebugToolsUnsupportedHookError') {
    throw error;
  } // If the error is not caused by an unsupported feature, it means
  // that the error is caused by user's code in renderFunction.
  // In this case, we should wrap the original error inside a custom error
  // so that devtools can give a clear message about it.
  // $FlowFixMe[extra-arg]: Flow doesn't know about 2nd argument of Error constructor


  var wrapperError = new Error('Error rendering inspected component', {
    cause: error
  }); // Note: This error name needs to stay in sync with react-devtools-shared
  // TODO: refactor this if we ever combine the devtools and debug tools packages

  wrapperError.name = 'ReactDebugToolsRenderError'; // this stage-4 proposal is not supported by all environments yet.
  // $FlowFixMe[prop-missing] Flow doesn't have this type yet.

  wrapperError.cause = error;
  throw wrapperError;
}

function inspectHooks(renderFunction, props, currentDispatcher) {
  var includeHooksSource = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  // DevTools will pass the current renderer's injected dispatcher.
  // Other apps might compile debug hooks as part of their app though.
  if (currentDispatcher == null) {
    currentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  }

  var previousDispatcher = currentDispatcher.current;
  var readHookLog;
  currentDispatcher.current = DispatcherProxy;
  var ancestorStackError;

  try {
    ancestorStackError = new Error();
    renderFunction(props);
  } catch (error) {
    handleRenderFunctionError(error);
  } finally {
    readHookLog = hookLog;
    hookLog = []; // $FlowFixMe[incompatible-use] found when upgrading Flow

    currentDispatcher.current = previousDispatcher;
  }

  var rootStack = ErrorStackParser.parse(ancestorStackError);
  return buildTree(rootStack, readHookLog, includeHooksSource);
}

function setupContexts(contextMap, fiber) {
  var current = fiber;

  while (current) {
    if (current.tag === ContextProvider) {
      var providerType = current.type;
      var context = providerType._context;

      if (!contextMap.has(context)) {
        // Store the current value that we're going to restore later.
        contextMap.set(context, context._currentValue); // Set the inner most provider value on the context.

        context._currentValue = current.memoizedProps.value;
      }
    }

    current = current.return;
  }
}

function restoreContexts(contextMap) {
  contextMap.forEach(function (value, context) {
    return context._currentValue = value;
  });
}

function inspectHooksOfForwardRef(renderFunction, props, ref, currentDispatcher, includeHooksSource) {
  var previousDispatcher = currentDispatcher.current;
  var readHookLog;
  currentDispatcher.current = DispatcherProxy;
  var ancestorStackError;

  try {
    ancestorStackError = new Error();
    renderFunction(props, ref);
  } catch (error) {
    handleRenderFunctionError(error);
  } finally {
    readHookLog = hookLog;
    hookLog = [];
    currentDispatcher.current = previousDispatcher;
  }

  var rootStack = ErrorStackParser.parse(ancestorStackError);
  return buildTree(rootStack, readHookLog, includeHooksSource);
}

function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    // Resolve default props. Taken from ReactElement
    var props = assign({}, baseProps);
    var defaultProps = Component.defaultProps;

    for (var propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }

    return props;
  }

  return baseProps;
}

function inspectHooksOfFiber(fiber, currentDispatcher) {
  var includeHooksSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // DevTools will pass the current renderer's injected dispatcher.
  // Other apps might compile debug hooks as part of their app though.
  if (currentDispatcher == null) {
    currentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  }

  if (fiber.tag !== FunctionComponent && fiber.tag !== SimpleMemoComponent && fiber.tag !== ForwardRef) {
    throw new Error('Unknown Fiber. Needs to be a function component to inspect hooks.');
  } // Warm up the cache so that it doesn't consume the currentHook.


  getPrimitiveStackCache();
  var type = fiber.type;
  var props = fiber.memoizedProps;

  if (type !== fiber.elementType) {
    props = resolveDefaultProps(type, props);
  } // Set up the current hook so that we can step through and read the
  // current state from them.


  currentHook = fiber.memoizedState;
  var contextMap = new Map();

  try {
    setupContexts(contextMap, fiber);

    if (fiber.tag === ForwardRef) {
      return inspectHooksOfForwardRef(type.render, props, fiber.ref, currentDispatcher, includeHooksSource);
    }

    return inspectHooks(type, props, currentDispatcher, includeHooksSource);
  } finally {
    currentHook = null;
    restoreContexts(contextMap);
  }
}

exports.inspectHooks = inspectHooks;
exports.inspectHooksOfFiber = inspectHooksOfFiber;
  })();
}
