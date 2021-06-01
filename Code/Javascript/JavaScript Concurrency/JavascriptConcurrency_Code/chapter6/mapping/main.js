'use strict';


// This function determines whether or not an
// operation should be performed in parallel.
// It takes as arguments - the data to process,
// and a boolean flag, indicating that the task
// performed on each item in the data is expensive
// or not.
function isConcurrent(data, expensiveTask) {
	var size,
		isSet = data instanceof Set,
		isMap = data instanceof Map;

	// Figures out the size of the data, depending
	// on the type of "data".
	if (Array.isArray(data)) {
		size = data.length
	} else if (isSet || isMap) {
		size = data.size;
	} else {
		size = Object.keys(data).length;
	}

	// Determine whether or not the size of the
	// data surpasses a the parallel processing
	// threshold. The threshold depends on the
	// "expensiveTask" value.
	return size >= (expensiveTask ? 100 : 1000);
}

// Returns the the ideal number of web workers
// to create.
function getConcurrency(defaultLevel = 4) {

	// If the "navigator.hardwareConcurrency" property
	// exists, we use that. Otherwise, we return the
	// "defaultLevel" value, which is a sane guess
	// at the actual hardware concurrency level.
	return Number.isInteger(navigator.hardwareConcurrency) ?
		navigator.hardwareConcurrency : defaultLevel;
}

// The global "results" object, used to temporarily
// store the results of tasks as they're returned
// from web workers.
var results = {};

// This generator creates a set of workers that match
// the concurrency level of the system. Then, as the
// caller iterates over the generator, the next worker
// is yielded, until the end is reached, then we start
// again from the beginning. It's like a round-robin
// for selecting workers to send messages to.
function* genWorkers() {
	var concurrency = getConcurrency();
	var workers = new Array(concurrency);
	var index = 0;

	// Creates the workers, storing each in the "workers"
	// array.
	for (let i = 0; i < concurrency; i++) {
		workers[i] = new Worker('worker.js');

		// When we get a result back from a worker, we
		// place it in the appropriate response, based
		// on ID.
		workers[i].addEventListener('message', (e) => {
			var result = results[e.data.id];

			result.values.push(e.data.value);

			// If we've received the expected number of
			// responses, we can call the operation
			// callback, passing the responses as arguments.
			// We can also delete the response, since we're
			// done with it now.
			if (result.values.length === result.size) {
				result.done(...result.values);
				delete results[e.data.id];
			}
		});
	}

	// Continue yielding workers as long as they're
	// asked for.
	while (true) {
		yield workers[index] ?
			workers[index++] : workers[index = 0];
	}
}

// Creates the global "workers" generator.
var workers = genWorkers();

// This will generate unique IDs. We need them to
// map tasks executed by web workers to the larger
// operation that created them.
function* genID() {
	var id = 0;

	while (true) {
		yield id++;
	}
}

// Creates the global "id" generator.
var id = genID();

// Builds a function that when called, runs the given task
// in workers by splitting up the data into chunks.
function parallel(expensive, taskName, taskFunc, doneFunc) {

	// The function that's returned takes the data to process
	// as an argument, as well as the chunk size, which
	// has a default value.
	return function(data, size=250, ...args) {

		// If the data isn't large enough, and the function
		// isn't expensive, just run it in the main thread.
		if (!isConcurrent(data, expensive)) {
			if (typeof taskFunc === 'function') {
				return taskFunc(data);
			} else {
				throw new Error('missing task function');
			}
		} else {

			// A unique identifier for this call. Used when
			// reconcilling the worker results.
			var operationID = id.next().value;

			// Used to track the position of the data as
			// we slice it into chunks.
			var index = 0;
			var chunk;

			// The global "results" object gets an object
			// with data about this operation. The "size"
			// property represents the number of results 
			// we can expect back. The "done" property
			// is the callback function that all the results
			// are passed to. And "values" holds the
			// results as they come in from the workers.
			results[operationID] = {
				size: 0,
				done: doneFunc,
				values: []
			};
			
			while(true) {

				// Gets the next worker.
				let worker = workers.next().value;

				// Slice a chunk off the input data.
				chunk = data.slice(index, index + size);
				index += size;

				// If there's a chunk to process, we can
				// increment the size of the expected results
				// and post a message to the worker. If there's
				// no chunk, we're done.
				if (chunk.length) {
					results[operationID].size++;

					worker.postMessage({
						id: operationID,
						task: taskName,
						chunk: chunk,
						args: args
					});
				} else {
					break;
				}
			}
		}
	};
}

// Creates an array of 75,000 objects.
var array = new Array(75000)
	.fill(null)
	.map((v, i) => {
		return {
			id: i,
			enabled: true
		};
	});

// Creates a concurrent version of the "sum()"
// function.
var sumConcurrent = parallel(true, 'sum', sum, function(...results) {
	console.log('total', sum(results));
});

// Creates a concurrent version of the "pluck()"
// function. When the parallel jobs complete, we
// pass the results to "sumConcurrent()".
var pluckConcurrent = parallel(true, 'pluck', pluck, function(...results) {
	sumConcurrent([].concat(...results));
}); 

// Kicks off the concurrent pluck operation.
pluckConcurrent(array, 1000, 'id');
