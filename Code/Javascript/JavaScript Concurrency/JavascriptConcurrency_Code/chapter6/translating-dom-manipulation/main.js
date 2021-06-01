'use strict';

// Starts the worker (the bottom-half).
var worker = new Worker('worker.js');

worker.addEventListener('message', (e) => {

	// If we get a message for the "appendChild" action,
	// then we create the new element and append it to the
	// appropriate parent - all this information is found
	// in the message data. This handler does absolutely
	// nothing but talk to the DOM.
	if (e.data.action === 'appendChild') {
		let child = document.createElement(e.data.type);
		child.textContent = e.data.content;

		document.querySelector(e.data.node)
			.appendChild(child);
	}
});
