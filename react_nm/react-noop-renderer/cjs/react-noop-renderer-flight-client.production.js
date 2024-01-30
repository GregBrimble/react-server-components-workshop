/**
 * @license React
 * react-noop-renderer-flight-client.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var flightModules = require('react-noop-renderer/flight-modules');
var ReactFlightClient = require('react-client/flight');

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */
const decoderOptions = {
  stream: true
};

const _ReactFlightClient = ReactFlightClient.default({
  createStringDecoder() {
    return new TextDecoder();
  },

  readPartialStringChunk(decoder, buffer) {
    return decoder.decode(buffer, decoderOptions);
  },

  readFinalStringChunk(decoder, buffer) {
    return decoder.decode(buffer);
  },

  resolveClientReference(bundlerConfig, idx) {
    return idx;
  },

  prepareDestinationForModule(moduleLoading, metadata) {},

  preloadModule(idx) {},

  requireModule(idx) {
    return flightModules.readModule(idx);
  },

  parseModel(response, json) {
    return JSON.parse(json, response._fromJSON);
  }

}),
      createResponse = _ReactFlightClient.createResponse,
      processBinaryChunk = _ReactFlightClient.processBinaryChunk,
      getRoot = _ReactFlightClient.getRoot,
      close = _ReactFlightClient.close;

function read(source) {
  const response = createResponse(source, null);

  for (let i = 0; i < source.length; i++) {
    processBinaryChunk(response, source[i], 0);
  }

  close(response);
  return getRoot(response);
}

exports.read = read;