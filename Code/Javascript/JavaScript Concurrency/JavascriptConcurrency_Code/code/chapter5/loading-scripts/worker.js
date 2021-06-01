'use strict';

// Imports the lodash library, making the global "_"
// variable available in the worker context.
importScripts('lodash.min.js');

// We can use the library within the worker now.
console.log('in worker', _.at([ 1, 2, 3], 0, 2));
// → in worker [1, 3]
