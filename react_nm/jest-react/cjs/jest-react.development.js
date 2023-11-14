/**
 * @license React
 * jest-react.development.js
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

function captureAssertion(fn) {
  // Trick to use a Jest matcher inside another Jest matcher. `fn` contains an
  // assertion; if it throws, we capture the error and return it, so the stack
  // trace presented to the user points to the original assertion in the
  // test file.
  try {
    fn();
  } catch (error) {
    return {
      pass: false,
      message: function () {
        return error.message;
      }
    };
  }

  return {
    pass: true
  };
}

function assertYieldsWereCleared(root) {
  var Scheduler = root._Scheduler;
  var actualYields = Scheduler.unstable_clearLog();

  if (actualYields.length !== 0) {
    var error = Error('Log of yielded values is not empty. ' + 'Call expect(ReactTestRenderer).unstable_toHaveYielded(...) first.');
    Error.captureStackTrace(error, assertYieldsWereCleared);
    throw error;
  }
}

function unstable_toMatchRenderedOutput(root, expectedJSX) {
  assertYieldsWereCleared(root);
  var actualJSON = root.toJSON();
  var actualJSX;

  if (actualJSON === null || typeof actualJSON === 'string') {
    actualJSX = actualJSON;
  } else if (isArray(actualJSON)) {
    if (actualJSON.length === 0) {
      actualJSX = null;
    } else if (actualJSON.length === 1) {
      actualJSX = jsonChildToJSXChild(actualJSON[0]);
    } else {
      var actualJSXChildren = jsonChildrenToJSXChildren(actualJSON);

      if (actualJSXChildren === null || typeof actualJSXChildren === 'string') {
        actualJSX = actualJSXChildren;
      } else {
        actualJSX = {
          $$typeof: REACT_ELEMENT_TYPE,
          type: REACT_FRAGMENT_TYPE,
          key: null,
          ref: null,
          props: {
            children: actualJSXChildren
          },
          _owner: null,
          _store: {} 
        };
      }
    }
  } else {
    actualJSX = jsonChildToJSXChild(actualJSON);
  }

  return captureAssertion(function () {
    expect(actualJSX).toEqual(expectedJSX);
  });
}

function jsonChildToJSXChild(jsonChild) {
  if (jsonChild === null || typeof jsonChild === 'string') {
    return jsonChild;
  } else {
    var jsxChildren = jsonChildrenToJSXChildren(jsonChild.children);
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: jsonChild.type,
      key: null,
      ref: null,
      props: jsxChildren === null ? jsonChild.props : assign({}, jsonChild.props, {
        children: jsxChildren
      }),
      _owner: null,
      _store: {} 
    };
  }
}

function jsonChildrenToJSXChildren(jsonChildren) {
  if (jsonChildren !== null) {
    if (jsonChildren.length === 1) {
      return jsonChildToJSXChild(jsonChildren[0]);
    } else if (jsonChildren.length > 1) {
      var jsxChildren = [];
      var allJSXChildrenAreStrings = true;
      var jsxChildrenString = '';

      for (var i = 0; i < jsonChildren.length; i++) {
        var jsxChild = jsonChildToJSXChild(jsonChildren[i]);
        jsxChildren.push(jsxChild);

        if (allJSXChildrenAreStrings) {
          if (typeof jsxChild === 'string') {
            jsxChildrenString += jsxChild;
          } else if (jsxChild !== null) {
            allJSXChildrenAreStrings = false;
          }
        }
      }

      return allJSXChildrenAreStrings ? jsxChildrenString : jsxChildren;
    }
  }

  return null;
}

exports.unstable_toMatchRenderedOutput = unstable_toMatchRenderedOutput;
  })();
}
