/**
 * @license React
 * react-noop-renderer-flight-server.development.js
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

var flightModules = require('react-noop-renderer/flight-modules');
var ReactFlightServer = require('react-server/flight');

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */
var textEncoder = new TextEncoder();
var ReactNoopFlightServer = ReactFlightServer.default({
  scheduleWork: function (callback) {
    callback();
  },
  beginWriting: function (destination) {},
  writeChunk: function (destination, chunk) {
    destination.push(chunk);
  },
  writeChunkAndReturn: function (destination, chunk) {
    destination.push(chunk);
    return true;
  },
  completeWriting: function (destination) {},
  close: function (destination) {},
  closeWithError: function (destination, error) {},
  flushBuffered: function (destination) {},
  stringToChunk: function (content) {
    return textEncoder.encode(content);
  },
  stringToPrecomputedChunk: function (content) {
    return textEncoder.encode(content);
  },
  clonePrecomputedChunk: function (chunk) {
    return chunk;
  },
  isClientReference: function (reference) {
    return reference.$$typeof === Symbol.for('react.client.reference');
  },
  isServerReference: function (reference) {
    return reference.$$typeof === Symbol.for('react.server.reference');
  },
  getClientReferenceKey: function (reference) {
    return reference;
  },
  resolveClientReferenceMetadata: function (config, reference) {
    return flightModules.saveModule(reference.value);
  },
  prepareHostDispatcher: function () {}
});

function render(model, options) {
  var destination = [];
  var bundlerConfig = undefined;
  var request = ReactNoopFlightServer.createRequest(model, bundlerConfig, options ? options.onError : undefined, options ? options.context : undefined, options ? options.identifierPrefix : undefined);
  ReactNoopFlightServer.startWork(request);
  ReactNoopFlightServer.startFlowing(request, destination);
  return destination;
}

exports.render = render;
  })();
}
