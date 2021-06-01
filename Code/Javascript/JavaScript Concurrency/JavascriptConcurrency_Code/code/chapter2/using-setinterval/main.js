// Be careful, this function hogs the CPU...
function expensive(n = 25000) {
    var i = 0;
    while (++i < n * n) {}
    return i;
}

// A counter for keeping track of which
// interval we're on.
var cnt = 0;

// Set up an interval timer. The callback will
// log which interval scheduled the callback.
var timer = setInterval(() => {
	console.log('Interval', ++cnt);
}, 3000);

// Block the CPU for a while. When we're no longer
// blocking the CPU, the first interval is called,
// as expected. Then the second, when expected. And
// so on. So while we block the callback tasks, we're
// also blocking tasks that schedule the next interval.
expensive(50000);
