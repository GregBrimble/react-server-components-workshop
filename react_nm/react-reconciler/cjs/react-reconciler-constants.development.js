/**
 * @license React
 * react-reconciler-constants.development.js
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

var SyncLane =
/*                        */
2;
var InputContinuousLane =
/*             */
8;
var DefaultLane =
/*                     */
32;
var IdleLane =
/*                        */
268435456;

var DiscreteEventPriority = SyncLane;
var ContinuousEventPriority = InputContinuousLane;
var DefaultEventPriority = DefaultLane;
var IdleEventPriority = IdleLane;

var LegacyRoot = 0;
var ConcurrentRoot = 1;

exports.ConcurrentRoot = ConcurrentRoot;
exports.ContinuousEventPriority = ContinuousEventPriority;
exports.DefaultEventPriority = DefaultEventPriority;
exports.DiscreteEventPriority = DiscreteEventPriority;
exports.IdleEventPriority = IdleEventPriority;
exports.LegacyRoot = LegacyRoot;
  })();
}
