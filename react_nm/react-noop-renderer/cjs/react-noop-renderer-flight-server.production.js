/**
 * @license React
 * react-noop-renderer-flight-server.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var flightModules = require('react-noop-renderer/flight-modules');
var ReactFlightServer = require('react-server/flight');

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */
const textEncoder = new TextEncoder();
const ReactNoopFlightServer = ReactFlightServer.default({
  scheduleWork(callback) {
    callback();
  },

  beginWriting(destination) {},

  writeChunk(destination, chunk) {
    destination.push(chunk);
  },

  writeChunkAndReturn(destination, chunk) {
    destination.push(chunk);
    return true;
  },

  completeWriting(destination) {},

  close(destination) {},

  closeWithError(destination, error) {},

  flushBuffered(destination) {},

  stringToChunk(content) {
    return textEncoder.encode(content);
  },

  stringToPrecomputedChunk(content) {
    return textEncoder.encode(content);
  },

  clonePrecomputedChunk(chunk) {
    return chunk;
  },

  isClientReference(reference) {
    return reference.$$typeof === Symbol.for('react.client.reference');
  },

  isServerReference(reference) {
    return reference.$$typeof === Symbol.for('react.server.reference');
  },

  getClientReferenceKey(reference) {
    return reference;
  },

  resolveClientReferenceMetadata(config, reference) {
    return flightModules.saveModule(reference.value);
  },

  prepareHostDispatcher() {}

});

function render(model, options) {
  const destination = [];
  const bundlerConfig = undefined;
  const request = ReactNoopFlightServer.createRequest(model, bundlerConfig, options ? options.onError : undefined, options ? options.context : undefined, options ? options.identifierPrefix : undefined);
  ReactNoopFlightServer.startWork(request);
  ReactNoopFlightServer.startFlowing(request, destination);
  return destination;
}

exports.render = render;