'use strict';

// Be careful, this function hogs the CPU...
function expensive(n = 25000) {
	var i = 0;
	while (++i < n * n) {}
	return i;
}

// Creates a timer, the callback uses
// "console.timeEnd()" to see how long we
// really waited, compared to the 300MS
// we were expecting.
var timer = setTimeout(() => {
	console.timeEnd('setTimeout');
}, 300);

console.time('setTimeout');

// This takes a nnumber of seconds to
// complete on most CPUs. All the while, a
// task has been en-queued to run our callback
// function. But the event loop can't get
// to that task until "expensive()" completes.
expensive();
