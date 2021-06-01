/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * MovieNow Charts
*/
var movienow = movienow || {};
movienow.charts = (function(){
    var that = this;
	this.charts = function(canvas){
		that.drawBarChart(canvas);
    };
	/*** Returns the color using a value from 0 to 100 ***/
	this.getChartColor =function(val){
		var result="";
		if(val<40){
			result="#FF0066";
		}
		else{
			if(val<80){
				result="#FFCC33";
			}
			else{
				result="#66CC33";
			}
		}
		return result;
	};
	/*** Draws a bar chart using canvas data values ***/
	this.drawBarChart = function(canvas) {
		var myCanvas=$(canvas);
		if(!myCanvas.hasClass("painted")){
			var values=myCanvas.attr("data-feed").split(",");
			var context=canvas.getContext("2d");
			context.font = "bold 14px sans-serif";
			var index=0;
			for(var i=0; i<values.length; i++){
				var info=values[i].split(":");
				var val=info[1];
				if(val>0){
					var pos=index*36;
					context.fillStyle="#292929";
					context.fillRect(0,pos,290,26);
					context.fillStyle=that.getChartColor(val);
					context.fillRect(0,pos,val*2.9,26);
					context.fillStyle = "rgba(255, 255, 255, .9)";
					context.fillText(info[0]+" "+val+"%", 10, pos+18);
					index++
				}
			}
			if(index==0){
				context.font = "bold 14px sans-serif";
				context.fillStyle = "#FFFFFF";
				context.fillText("No Data Available", 40, 50);
			}
			myCanvas.addClass("painted");
		}
	};
})();