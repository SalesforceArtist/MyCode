'use strict';

var co = require('co');

co(function* () {

	// The promise that's yielded here isn't resolved
	// till 1 second later. That's when the yield statement
	// returns the resolved value.
	var first = yield new Promise(function(resolve) {
		setTimeout(function() {
            resolve([ 'First1', 'First2', 'First3' ]);
		}, 1000);
	});

	// Same idea here, except we're waiting 2 seconds
	// before the "second" variable gets it's value.
	var second = yield new Promise(function(resolve) {
		setTimeout(function() {
			resolve([ 'Second1', 'Second2', 'Second3' ]);
		}, 2000);
	});

	// Both "first" and "second" are resolved at this
	// point, so we can use both to map a new array.
	return first.map((v, i) => [ v, second[i] ]);

}).then((value) => {
	console.log('zipped', value);
	// →
	// [ 
	//   [ 'First1', 'Second1' ],
	//   [ 'First2', 'Second2' ],
    //   [ 'First3', 'Second3' ] 
	// ]
});

