'use strict';

// This promise executor throws an error, and the rejected
// callback function is called as a result.
new Promise(() => {
	throw new Error('Problem executing promise');
}).catch((reason) => {
	console.error(reason);
});

// This promise executor catches an error, and rejects
// the promise with a more useful message.
new Promise((resolve, reject) => {
	try {
		var size = this.name.length;
	} catch(error) {
		reject(error instanceof TypeError ?
			'Missing "name" property' : error);
	}
}).catch((reason) => {
	console.error(reason);
});
