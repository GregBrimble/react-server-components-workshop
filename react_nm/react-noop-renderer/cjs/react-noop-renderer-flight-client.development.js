/**
 * @license React
 * react-noop-renderer-flight-client.development.js
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
var ReactFlightClient = require('react-client/flight');

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */
var decoderOptions = {
  stream: true
};

var _ReactFlightClient = ReactFlightClient.default({
  createStringDecoder: function () {
    return new TextDecoder();
  },
  readPartialStringChunk: function (decoder, buffer) {
    return decoder.decode(buffer, decoderOptions);
  },
  readFinalStringChunk: function (decoder, buffer) {
    return decoder.decode(buffer);
  },
  resolveClientReference: function (bundlerConfig, idx) {
    return idx;
  },
  prepareDestinationForModule: function (moduleLoading, metadata) {},
  preloadModule: function (idx) {},
  requireModule: function (idx) {
    return flightModules.readModule(idx);
  },
  parseModel: function (response, json) {
    return JSON.parse(json, response._fromJSON);
  }
}),
    createResponse = _ReactFlightClient.createResponse,
    processBinaryChunk = _ReactFlightClient.processBinaryChunk,
    getRoot = _ReactFlightClient.getRoot,
    close = _ReactFlightClient.close;

function read(source) {
  var response = createResponse(source, null);

  for (var i = 0; i < source.length; i++) {
    processBinaryChunk(response, source[i], 0);
  }

  close(response);
  return getRoot(response);
}

exports.read = read;
  })();
}
