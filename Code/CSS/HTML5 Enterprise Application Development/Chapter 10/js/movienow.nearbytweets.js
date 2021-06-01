/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * MovieNow Nearby Tweets Handler
*/
var movienow = movienow || {};
movienow.nearbytweets = (function(){
    var that = this;
    this.getTweets = function() {
    	$('.theater').each(function() {
    		that.getTweetsByTheater(this);
    	});
    };
	this.showNearbyTweets = function(event) {
		$(event.target).parents('li').addClass('nearby-tweets').addClass('open');
	};
	this.hideNearbyTweets = function(event) {
		$(this).parents('li').removeClass('open');
	};
    this.getTweetsByTheater = function(theater) {
    	var worker = new Worker('js/movienow.worker.js');
		worker.addEventListener('message', function(e) {
			var data = objectifyJSON(e.data);
  			var nearbyTweets = '';
  			for (var i=0; i<data.results.length; i++) {
  				nearbyTweets += '<li>'+data.results[i].text+'</li>';
  			}
  			var tweetCounter = (data.results.length==1) ? data.results.length+" tweet" : data.results.length+" tweets";
  			$(theater)
  				.append(' <span class="tweet-count">('+tweetCounter+')</span>')
  				.parents('li').append('<section class="nearby-tweets"><h3>Nearby Tweets</h3><ul>'+nearbyTweets+'</ul></section>')
  				.find('.tweet-count').click(that.showNearbyTweets)
  				.parents('li').find('.nearby-tweets').click(that.hideNearbyTweets);
		}, false);
		var geocode = $(theater).attr('data-location');
		var latitude = geocode.split(',')[0];
		var longitude = geocode.split(',')[1];
		worker.postMessage({
			'latitude': latitude,
			'longitude': longitude 
		});
    };
})();
