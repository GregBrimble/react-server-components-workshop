/**
 * @license React
 * react-cache.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var Scheduler = require('scheduler');

// use dynamic dispatch for CommonJS interop named imports.

const scheduleCallback = Scheduler.unstable_scheduleCallback,
      IdlePriority = Scheduler.unstable_IdlePriority;
function createLRU(limit) {
  let LIMIT = limit; // Circular, doubly-linked list

  let first = null;
  let size = 0;
  let cleanUpIsScheduled = false;

  function scheduleCleanUp() {
    if (cleanUpIsScheduled === false && size > LIMIT) {
      // The cache size exceeds the limit. Schedule a callback to delete the
      // least recently used entries.
      cleanUpIsScheduled = true;
      scheduleCallback(IdlePriority, cleanUp);
    }
  }

  function cleanUp() {
    cleanUpIsScheduled = false;
    deleteLeastRecentlyUsedEntries(LIMIT);
  }

  function deleteLeastRecentlyUsedEntries(targetSize) {
    // Delete entries from the cache, starting from the end of the list.
    if (first !== null) {
      const resolvedFirst = first;
      let last = resolvedFirst.previous;

      while (size > targetSize && last !== null) {
        const onDelete = last.onDelete;
        const previous = last.previous;
        last.onDelete = null; // Remove from the list

        last.previous = last.next = null;

        if (last === first) {
          // Reached the head of the list.
          first = last = null;
        } else {
          first.previous = previous;
          previous.next = first;
          last = previous;
        }

        size -= 1; // Call the destroy method after removing the entry from the list. If it
        // throws, the rest of cache will not be deleted, but it will be in a
        // valid state.

        onDelete();
      }
    }
  }

  function add(value, onDelete) {
    const entry = {
      value,
      onDelete,
      next: null,
      previous: null
    };

    if (first === null) {
      entry.previous = entry.next = entry;
      first = entry;
    } else {
      // Append to head
      const last = first.previous;
      last.next = entry;
      entry.previous = last;
      first.previous = entry;
      entry.next = first;
      first = entry;
    }

    size += 1;
    return entry;
  }

  function update(entry, newValue) {
    entry.value = newValue;
  }

  function access(entry) {
    const next = entry.next;

    if (next !== null) {
      // Entry already cached
      const resolvedFirst = first;

      if (first !== entry) {
        // Remove from current position
        const previous = entry.previous;
        previous.next = next;
        next.previous = previous; // Append to head

        const last = resolvedFirst.previous;
        last.next = entry;
        entry.previous = last;
        resolvedFirst.previous = entry;
        entry.next = resolvedFirst;
        first = entry;
      }
    }

    scheduleCleanUp();
    return entry.value;
  }

  function setLimit(newLimit) {
    LIMIT = newLimit;
    scheduleCleanUp();
  }

  return {
    add,
    update,
    access,
    setLimit
  };
}

const Pending = 0;
const Resolved = 1;
const Rejected = 2;
const ReactCurrentDispatcher = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;

function readContext(Context) {
  const dispatcher = ReactCurrentDispatcher.current;

  if (dispatcher === null) {
    // This wasn't being minified but we're going to retire this package anyway.
    // eslint-disable-next-line react-internal/prod-error-codes
    throw new Error('react-cache: read and preload may only be called from within a ' + "component's render. They are not supported in event handlers or " + 'lifecycle methods.');
  }

  return dispatcher.readContext(Context);
} // $FlowFixMe[missing-local-annot]


function identityHashFn(input) {

  return input;
}

const CACHE_LIMIT = 500;
const lru = createLRU(CACHE_LIMIT);
const entries = new Map();
const CacheContext = React.createContext(null);

function accessResult(resource, fetch, input, key) {
  let entriesForResource = entries.get(resource);

  if (entriesForResource === undefined) {
    entriesForResource = new Map();
    entries.set(resource, entriesForResource);
  }

  const entry = entriesForResource.get(key);

  if (entry === undefined) {
    const thenable = fetch(input);
    thenable.then(value => {
      if (newResult.status === Pending) {
        const resolvedResult = newResult;
        resolvedResult.status = Resolved;
        resolvedResult.value = value;
      }
    }, error => {
      if (newResult.status === Pending) {
        const rejectedResult = newResult;
        rejectedResult.status = Rejected;
        rejectedResult.value = error;
      }
    });
    const newResult = {
      status: Pending,
      value: thenable
    };
    const newEntry = lru.add(newResult, deleteEntry.bind(null, resource, key));
    entriesForResource.set(key, newEntry);
    return newResult;
  } else {
    return lru.access(entry);
  }
}

function deleteEntry(resource, key) {
  const entriesForResource = entries.get(resource);

  if (entriesForResource !== undefined) {
    entriesForResource.delete(key);

    if (entriesForResource.size === 0) {
      entries.delete(resource);
    }
  }
}

function unstable_createResource(fetch, maybeHashInput) {
  const hashInput = maybeHashInput !== undefined ? maybeHashInput : identityHashFn;
  const resource = {
    read(input) {
      // react-cache currently doesn't rely on context, but it may in the
      // future, so we read anyway to prevent access outside of render.
      readContext(CacheContext);
      const key = hashInput(input);
      const result = accessResult(resource, fetch, input, key);

      switch (result.status) {
        case Pending:
          {
            const suspender = result.value;
            throw suspender;
          }

        case Resolved:
          {
            const value = result.value;
            return value;
          }

        case Rejected:
          {
            const error = result.value;
            throw error;
          }

        default:
          // Should be unreachable
          return undefined;
      }
    },

    preload(input) {
      // react-cache currently doesn't rely on context, but it may in the
      // future, so we read anyway to prevent access outside of render.
      readContext(CacheContext);
      const key = hashInput(input);
      accessResult(resource, fetch, input, key);
    }

  };
  return resource;
}
function unstable_setGlobalCacheLimit(limit) {
  lru.setLimit(limit);
}

exports.unstable_createResource = unstable_createResource;
exports.unstable_setGlobalCacheLimit = unstable_setGlobalCacheLimit;