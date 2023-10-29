/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// TODO: Ideally these types would be opaque but that doesn't work well with
const SyncLane =
/*                        */
0b0000000000000000000000000000010;
const InputContinuousLane =
/*             */
0b0000000000000000000000000001000;
const DefaultLane =
/*                     */
0b0000000000000000000000000100000;
const IdleLane =
/*                        */
0b0010000000000000000000000000000;

const DiscreteEventPriority = SyncLane;
const ContinuousEventPriority = InputContinuousLane;
const DefaultEventPriority = DefaultLane;
const IdleEventPriority = IdleLane;

const LegacyRoot = 0;
const ConcurrentRoot = 1;

exports.ConcurrentRoot = ConcurrentRoot;
exports.ContinuousEventPriority = ContinuousEventPriority;
exports.DefaultEventPriority = DefaultEventPriority;
exports.DiscreteEventPriority = DiscreteEventPriority;
exports.IdleEventPriority = IdleEventPriority;
exports.LegacyRoot = LegacyRoot;