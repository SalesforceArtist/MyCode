'use strict';

// Represents a "pool" of web worker threads, hidden behind
// the interface of a single web worker interface.
function WorkerPool(script) {

	// The level of concurrency, or, the number of web workers
	// to created. This uses the "hardwareConcurrency" property
	// if it exists. Otherwise, it defaults to 4, since this is
	// a reasonable guess at the most common CPU topology.
	var concurrency = navigator.hardwareConcurrency || 4;

	// The worker instances themselves are stored in a Map,
	// as keys. We'll see why in a moment.
	var workers = this.workers = new Map();

	// The queue exists for messages that are posted while,
	// all workers are busy. So this may never actually be
	// used.
	var queue = this.queue = [];

	// Used below for creating the worker instances, and adding
	// event listeners.
	var worker;

	for (var i = 0; i < concurrency; i++) {
		worker = new Worker(script);
		worker.addEventListener('message', function(e) {

			// We use the "get()" method to lookup the "resolve()"
			// function of the promise. The worker is the key. We
			// call the resolver with the data returned from the worker, and
			// can now reset this to null. This is important because
			// it signifies that the worker is free to take on more work.
			workers.get(this)(e.data);
			workers.set(this, null);

			// If there's queued data, we get the first "data" and
			// "resolver" from the queue. Before we call "postMessage()"
			// with the data, we update the "workers" map with the 
			// new "resolve()" function.
			if (queue.length) {
				var [ data, resolver ] = queue.shift();
				workers.set(this, resolver);
				this.postMessage(data);
			}
		}.bind(worker));

		// This is the initial setting of the worker, as a key, in
		// the "workers" map. It's value is null, meaning there's no
		// resolve function, and it can take on work.
		this.workers.set(worker, null);
	}

}

WorkerPool.prototype.postMessage = function(data) {

	// The "workers" Map instance, where all the web workers
	// are stored.
	var workers = this.workers;

	// The "queue" where messages are placed when all the workers
	// are busy.
	var queue = this.queue;

	// Try finding an available worker.
	var worker = this.getWorker();

	// The promise is immediately passed back to the caller,
	// even if there's no worker available.
	return new Promise(function(resolve) {

		// If a worker is found, we can update the map, using
		// the worker as the key, and the "resolve()" function
		// as the value. If there's no worker, then the message
		// data, along with the "resolve()" function get pushed
		// to the "queue".
		if (worker) {
			workers.set(worker, resolve);
			worker.postMessage(data);
		} else {
			queue.push([ data, resolve ]);
		}
	});	
};

// Iterates over the "workers" map, and returns the first
// available worker. Available means that the value for
// the worker key is falsey, meaning there's no "resolve()"
// function waiting to execute.
WorkerPool.prototype.getWorker = function() {
	for (var pair of this.workers) {
		if (!pair[1]) {
			return pair[0];
		}
	}
};

// Create a new pool, and a workload counter.
var pool = new WorkerPool('worker.js');
var workload = 0;

document.getElementById('work').addEventListener('click', function(e) {

	// Get the data we're going to pass to the
	// worker, and create a timer for this workload.
	var amount = +document.getElementById('amount').value,
		timer = 'Workload ' + (++workload);

	console.time(timer);

	// Pass the message to the pool, and when the promise resolves,
	// stop the timer.
	pool.postMessage(amount).then(function(result) {
		console.timeEnd(timer);
	});

	// If messages are getting queued, our pool is overworked,
	// display a warning.
	if (pool.queue.length) {
		console.warn('Worker pool is getting busy...');
	}
});
