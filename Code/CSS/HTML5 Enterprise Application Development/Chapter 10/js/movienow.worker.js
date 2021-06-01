self.addEventListener('message', function(e) {
	var url = '../nearbytweets.php';
	var data = 'latitude='+e.data.latitude+'&longitude='+e.data.longitude;
	var xhr = new XMLHttpRequest();
  	xhr.open('GET', url + '?' + data, true);
	xhr.send(null);
	xhr.onreadystatechange = function() {
    	if (xhr.readyState == 4) {
			if (xhr.status == 200 || xhr.status ==0) {
				self.postMessage(xhr.responseText);
			} else {
				throw xhr.status + xhr.responseText;
			}
		} 
	}
}, false);