/**
 * @license React
 * react-noop-renderer-server.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactFizzServer = require('react-server');

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */
const POP = Buffer.from('/', 'utf8');

function write(destination, buffer) {
  const stack = destination.stack;

  if (buffer === POP) {
    stack.pop();
    return;
  } // We assume one chunk is one instance.


  const instance = JSON.parse(Buffer.from(buffer).toString('utf8'));

  if (stack.length === 0) {
    destination.root = instance;
  } else {
    const parent = stack[stack.length - 1];
    parent.children.push(instance);
  }

  stack.push(instance);
}

const ReactNoopServer = ReactFizzServer.default({
  scheduleWork(callback) {
    callback();
  },

  beginWriting(destination) {},

  writeChunk(destination, buffer) {
    write(destination, buffer);
  },

  writeChunkAndReturn(destination, buffer) {
    write(destination, buffer);
    return true;
  },

  completeWriting(destination) {},

  close(destination) {},

  closeWithError(destination, error) {},

  flushBuffered(destination) {},

  getChildFormatContext() {
    return null;
  },

  resetResumableState() {},

  completeResumableState() {},

  pushTextInstance(target, text, renderState, textEmbedded) {
    const textInstance = {
      text,
      hidden: false
    };
    target.push(Buffer.from(JSON.stringify(textInstance), 'utf8'), POP);
    return false;
  },

  pushStartInstance(target, type, props) {
    const instance = {
      type: type,
      children: [],
      prop: props.prop,
      hidden: false
    };
    target.push(Buffer.from(JSON.stringify(instance), 'utf8'));
    return props.children;
  },

  pushEndInstance(target, type, props) {
    target.push(POP);
  },

  // This is a noop in ReactNoop
  pushSegmentFinale(target, renderState, lastPushedText, textEmbedded) {},

  writeCompletedRoot(destination, renderState) {
    return true;
  },

  writePlaceholder(destination, renderState, id) {
    const parent = destination.stack[destination.stack.length - 1];
    destination.placeholders.set(id, {
      parent: parent,
      index: parent.children.length
    });
  },

  writeStartCompletedSuspenseBoundary(destination, renderState, suspenseInstance) {
    suspenseInstance.state = 'complete';
    const parent = destination.stack[destination.stack.length - 1];
    parent.children.push(suspenseInstance);
    destination.stack.push(suspenseInstance);
  },

  writeStartPendingSuspenseBoundary(destination, renderState, suspenseInstance) {
    suspenseInstance.state = 'pending';
    const parent = destination.stack[destination.stack.length - 1];
    parent.children.push(suspenseInstance);
    destination.stack.push(suspenseInstance);
  },

  writeStartClientRenderedSuspenseBoundary(destination, renderState, suspenseInstance) {
    suspenseInstance.state = 'client-render';
    const parent = destination.stack[destination.stack.length - 1];
    parent.children.push(suspenseInstance);
    destination.stack.push(suspenseInstance);
  },

  writeEndCompletedSuspenseBoundary(destination) {
    destination.stack.pop();
  },

  writeEndPendingSuspenseBoundary(destination) {
    destination.stack.pop();
  },

  writeEndClientRenderedSuspenseBoundary(destination) {
    destination.stack.pop();
  },

  writeStartSegment(destination, renderState, formatContext, id) {
    const segment = {
      children: []
    };
    destination.segments.set(id, segment);

    if (destination.stack.length > 0) {
      throw new Error('Segments are only expected at the root of the stack.');
    }

    destination.stack.push(segment);
  },

  writeEndSegment(destination, formatContext) {
    destination.stack.pop();
  },

  writeCompletedSegmentInstruction(destination, renderState, contentSegmentID) {
    var _placeholder$parent$c;

    const segment = destination.segments.get(contentSegmentID);

    if (!segment) {
      throw new Error('Missing segment.');
    }

    const placeholder = destination.placeholders.get(contentSegmentID);

    if (!placeholder) {
      throw new Error('Missing placeholder.');
    }

    (_placeholder$parent$c = placeholder.parent.children).splice.apply(_placeholder$parent$c, [placeholder.index, 0].concat(segment.children));
  },

  writeCompletedBoundaryInstruction(destination, renderState, boundary, contentSegmentID) {
    const segment = destination.segments.get(contentSegmentID);

    if (!segment) {
      throw new Error('Missing segment.');
    }

    boundary.children = segment.children;
    boundary.state = 'complete';
  },

  writeClientRenderBoundaryInstruction(destination, renderState, boundary) {
    boundary.status = 'client-render';
  },

  writePreamble() {},

  writeHoistables() {},

  writePostamble() {},

  createBoundaryResources() {
    return null;
  },

  setCurrentlyRenderingBoundaryResourcesTarget(resources) {},

  prepareHostDispatcher() {},

  emitEarlyPreloads() {}

});

function render(children, options) {
  const destination = {
    root: null,
    placeholders: new Map(),
    segments: new Map(),
    stack: [],

    abort() {
      ReactNoopServer.abort(request);
    }

  };
  const request = ReactNoopServer.createRequest(children, null, null, options ? options.progressiveChunkSize : undefined, options ? options.onError : undefined, options ? options.onAllReady : undefined, options ? options.onShellReady : undefined);
  ReactNoopServer.startWork(request);
  ReactNoopServer.startFlowing(request, destination);
  return destination;
}

exports.render = render;