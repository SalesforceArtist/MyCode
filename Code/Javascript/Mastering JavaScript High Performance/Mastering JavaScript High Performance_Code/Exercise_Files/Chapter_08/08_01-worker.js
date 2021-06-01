onmessage = function (oEvent) {
  for (var i = 0; i <= 1000; i++) {
	  postMessage(oEvent.data + " " + i);
  }
};