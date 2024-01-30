/**
 * @license React
 * use-subscription.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var shim = require('use-sync-external-store/shim');

//
// In order to avoid removing and re-adding subscriptions each time this hook is called,
// the parameters passed to this hook should be memoized in some way–
// either by wrapping the entire params object with useMemo()
// or by wrapping the individual callbacks with useCallback().

function useSubscription(_ref) {
  let getCurrentValue = _ref.getCurrentValue,
      subscribe = _ref.subscribe;
  return shim.useSyncExternalStore(subscribe, getCurrentValue);
}

exports.useSubscription = useSubscription;