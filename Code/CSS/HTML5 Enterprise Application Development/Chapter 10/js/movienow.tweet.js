/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * MovieNow Tweet Handler
*/
var movienow = movienow || {};
movienow.tweet = (function(){
    var that = this;
	var twitterReady = false;
	this.initTweet = function() {
		$("#tweet").keyup(that.updateCount);
		$("#twitter").submit(that.tweet);
		$("#close-tweet").click(that.hideTweetArea);
	};
	this.tweet = function(event) {
		if($("#twitter")[0].checkValidity()){
			$.ajax({
				url: 'tweet.php',
				data: $("#twitter").serialize(),
				success: function(info){
					var data = that.objectifyJSON(info);
					if(data.status!="ok"){
						alert("Ops! There was an error sending your tweet, please try again.");
					}else{
						that.hideTweetArea();
					}
				},
				error: function(error){
					alert(error.responseText);
				}
			});
		}
		return false;
		
	};
	this.updateCount = function(){
		var info=$("#tweet").val();
		var count= 140 - info.length;
		$('#count').html(count);
		if(count==140||count<0){
			$('#tweet-submit').removeClass("active");
		}
		else{
			$('#tweet-submit').addClass("active");
		}
	};
	this.showTweetArea = function(title, time) {
		if(!twitterReady){
			that.initTweet();
			twitterReady=true;
		}
		if($(".twitter-data").length>0){
			var message = "I'm going to "+title+" "+time;
			$("#tweet").val(message);
			that.updateCount();
			$(".modal-background").css("display", "block");
			$(".modal-background-color").css("display", "block");
			$("html,body").css("overflow","auto");

			
		}else{
			alert("Please login in twitter to tweet this");
		}
	};
	this.hideTweetArea = function() {
		$(".modal-background").css("display", "none");
		$(".modal-background-color").css("display", "none");
		$("html,body").css("overflow","hidden");

	}
})();