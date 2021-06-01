/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * MovieNow media Player
*/
var movienow = movienow || {};
movienow.mediaplayer = (function(){
    var that = this;
    $(document).ready(function(){ 
		/*** play/pause button click event listener ***/ 
		$(".media-container .play-button").click(that.play);
		var mediaElements=$(".media-container .media");
		if (mediaElements[0].fullscreenEnabled) {
			/*** fullscreen button click event listener ***/
            $(".media-container .fullscreen-button").click(that.fullScreen);
        }
        else if (mediaElements[0].mozRequestFullScreen) {
			/*** fullscreen button click event listener mozilla ***/
            $(".media-container .fullscreen-button").click(that.mozFullScreen);
        }
        else if (mediaElements[0].webkitRequestFullScreen) {
			/*** fullscreen button click event listener webkit ***/
            $(".media-container .fullscreen-button").click(that.webkitFullScreen);
        }
		else{
			/*** we add class no-fullscreen to hide fullscreen button when it is not available ***/
			$(".media-container").addClass("no-fullscreen");
		}
		/*** Loop to add jquery ui sliders to progress/seek bar and volume ***/
		$(".media-container .seek").each(function() {
			/*** Duration of the media ***/
			var duration=that.getPlayer($(this))[0].duration;
			duration = duration?duration:0;
			$(this).slider({
				value: 0,
				step: 0.01,
				orientation: "horizontal",
				range: "min",
				max: duration,
				/*** Start seek ***/		
				start: function(event,ui){	
					var mediaArea=that.getPlayer($(event.target));
					/*** Class seeking to know status of the media player ***/
					mediaArea.addClass("seeking");		
					mediaArea[0].pause();
				},
				/*** During seek ***/
				slide:function(event,ui){
					sliderTime(event,ui);	
				},
				/*** Stop seek ***/
				stop:function(event,ui){
					var mediaArea=that.getPlayer($(event.target));	
					var controls=that.controls(mediaArea);
					sliderTime(event,ui);	
					/*** We restore the status (paying or not) to the one before start seeking ***/
					if(controls.find(".play-button").hasClass("playing"))	{
						mediaArea[0].play();
					}
					mediaArea.removeClass("seeking");	
				}
			});
			/*** Volume controllers ***/
			if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)){
				/*** ios devices only allow to change volume using the device hardware, so we hide volume controllers ***/
				$(".media-container").addClass("no-volume");
			}else{
				/*** volume slider controller ***/
				that.controls($(this)).find(".volume-slider").slider({
					value: 1,
					step: 0.05,
					orientation: "vertical",
					range: "min",
					max: 1,
					animate: true,
					slide:function(event,ui){
						var mediaArea=that.getPlayer($(event.target));	
						mediaArea[0].volume=ui.value;
					}
				});
			}
		});
		/*** event triggered when time change on media player ***/ 
		mediaElements.bind("timeupdate", that.timeUpdate);
		/*** event triggered when reproduction end on media player ***/ 
		mediaElements.bind('ended', that.endReproduction);
		
    });
	/*** get player using jQuery selectors ***/
	this.getPlayer= function(domObject){
		return $(domObject.parentsUntil(".media-container").find(".media"));
	};
	/*** get control area using jQuery selectors ***/
	this.controls= function(domObject){
		return $(domObject.parentsUntil(".media-container").find(".controls"));
	};
	/*** play or pause and chenge play button icon ***/
    this.play = function(event){
		var button=$(event.target);
		var player=that.getPlayer(button);
		if(button.hasClass("playing")) {
			player[0].pause();	
			button.removeClass("playing");			
		} else {					
			player[0].play();
			button.addClass("playing");				
		}
    };
	/*** set on and off fullscreen mode ***/
	this.fullScreen = function(event){
		var button=$(event.target);
		var player=that.getPlayer(button);
		if(document.fullScreen){
			document.exitFullScreen();		
		} else {						
			player[0].requestFullScreen();			
		}
	};
	this.mozFullScreen = function(event){
		var button=$(event.target);
		var player=that.getPlayer(button);
		if(document.mozfullScreen){
			document.mozCancelFullScreen();		
		} else {						
			player[0].mozRequestFullScreen();			
		}
	};
	this.webkitFullScreen = function(event){
		var button=$(event.target);
		var player=that.getPlayer(button);
		if(document.webkitIsFullScreen){
			document.webkitCancelFullScreen();		
		} else {						
			player[0].webkitEnterFullScreen();			
		}
	};
	/*** set time format to mm:ss ***/
	this.timeFormat=function(seconds){
		var m=Math.floor(seconds/60)<10?"0"+Math.floor(seconds/60):Math.floor(seconds/60);
		var s=Math.floor(seconds-(m*60))<10?"0"+Math.floor(seconds-(m*60)):Math.floor(seconds-(m*60));
		return m+":"+s;
	};
	/*** use by seek slider, change slider position and time on controllers ***/
	this.sliderTime = function(event, ui) {
		var mediaArea=that.getPlayer($(event.target));
		var controls=that.controls(mediaArea);
		mediaArea[0].currentTime=ui.value;
	};
	/*** use by timeupdate event, change slider position and time on controllers ***/
	this.timeUpdate = function(event) {
		var mediaArea=$(event.target);
		var controls=that.controls(mediaArea);
		var currentTime=mediaArea[0].currentTime;
		var duration=mediaArea[0].duration;
		var timer=$(controls.find(".timer"));
		if(currentTime>=0)timer.html(that.timeFormat(currentTime));
		if(!mediaArea.hasClass("seeking")){
			var seekSlider=$(controls.find(".seek"));
			
			/*** some players (like safari) don't have duration when a player is 
			     initialized, this verify duration and assigned again to max property on slider ***/
			if(seekSlider.slider("option","max")==0){
				var newDuration=mediaArea[0].duration;
				newDuration=newDuration?newDuration:0;
				seekSlider.slider("option","max", newDuration);
			}
			seekSlider.slider("value", currentTime);	
		}
	};
	/*** change play button when reproduction ends ***/
	this.endReproduction = function(event) {
		var mediaArea=$(event.target);
		$(that.controls(mediaArea)).find(".play-button").removeClass("playing");	
	};
})();