/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * MovieNow Charts
*/
var movienow = movienow || {};
movienow.charts = (function(){
    var that = this;
	this.charts = function(canvas, type){
		switch(type){
			case "3DChart":
				that.draw3DChart(canvas);
				break;
			case "barChart":
			default:
				that.drawBarChart(canvas);
				break;
		}
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
	/*** Redraws 3D Canvas using webGL and Three.js ***/
	this.animate3DChart = function(lastTime, three){
		var angularSpeed = 1.2;
        var date = new Date();
        var time = date.getTime();
        var timeDiff = time - lastTime;
        var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
		var isReady=false;
        for(var i=0; i<three.bars.length; i++){
			if(three.bars[i].object.scale.x<1){
				three.bars[i].object.scale.x+=.03;
				three.bars[i].object.position.x=-500+(three.bars[i].width/2)*three.bars[i].object.scale.x;
			}
			//isReady=(three.bars[i].object.scale.x>=1);
			three.bars[i].object.rotation.x += angleChange;
		}
		lastTime = time;
        /*** SCENE RENDER USING THREE.JS ***/
        three.renderer.render(three.scene, three.camera);
 		if(!isReady){
			requestAnimFrame(function(){
				that.animate3DChart(lastTime, three);
			});
		}
    }
	/*** Draws a 3D chart using canvas data values ***/
	this.draw3DChart = function(canvas) {
		var myCanvas=$(canvas);
		var myCanvasParent=myCanvas.parent();
		if(!myCanvas.hasClass("painted")){
			var webGlSupport=false;
			try {
				/*** VERIFICATION OF WEBGL SUPPORT ***/
				webGlSupport = !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
			}catch(e){
			}
			if (webGlSupport){
				var data=myCanvas.attr("data-feed")
				var values=data.split(",");
				var context;
				var w = myCanvas.width();
				var h = myCanvas.height();
				var lastTime = 0;
				var renderer = new THREE.WebGLRenderer();
				renderer.setSize(w, h);
				var newCanvas=$(renderer.domElement);
				newCanvas.attr("data-feed",data);
				myCanvas.addClass("painted");
				/*** REPLACES ORIGINAL CANVAS WITH THREE.JS CANVAS ***/
				myCanvas.replaceWith(newCanvas);
				/*** CAMERA DEFINITION ***/
				var camera = new THREE.PerspectiveCamera(45, w/h, 1, 1000);
				camera.position.z = 700;
				/*** SCENE DEFINITION ***/
				var scene = new THREE.Scene();
				var bars=[]
				var index=0;
				var labels="<div class='chart-labels'>"
				for(var i=0; i<values.length; i++){
					var info=values[i].split(":");
					var val=info[1];
					if(val>0){
						var mainColor=that.getChartColor(val).replace("#", "0x");
						var colors = [mainColor, mainColor, mainColor, mainColor, mainColor, mainColor];
						var materials = [];
						labels+="<div>"+info[0]+"</div>";
						for (var n = 0; n < 6; n++) {
							materials.push([
								new THREE.MeshLambertMaterial({
									color: colors[n],
									opacity:0.6,
									transparent: true,
									shading: THREE.FlatShading,
									vertexColors: THREE.VertexColors
								}),
								new THREE.MeshBasicMaterial({
									color: colors[n],
									shading: THREE.FlatShading,
									wireframe: true,
									transparent: true
								})
							]);
						}
						var myWidth=val*8;
						var bar = new THREE.Mesh(new THREE.CubeGeometry(myWidth, 90, 90, 1, 1, 1, materials), new THREE.MeshFaceMaterial());
						bar.scale.x=.01;
						bar.position.y=200-(index*140);
						bar.position.x=-500+(myWidth/2)*bar.scale.x;
						bar.overdraw = true;
						scene.add(bar); 
						bars.push({object:bar, width:myWidth});
						index++;
					}
				}
				labels+"</div>"
				myCanvasParent.append(labels);
				/*** SAVE INFORMATION REQUIRED TO RENDER SCENE ***/
				var three = {
					renderer: renderer,
					camera: camera,
					scene: scene,
					bars: bars
				};
				that.animate3DChart(lastTime, three);
			}
			else{
				/** IF NOT WEBGL SUPPORT RENDERS CHART IN 2D ***/
				that.drawBarChart(canvas);
			}
		}
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
/*** SETS TIMEOUT FOR ANIMATION ***/
window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		/* Using 60FPS */
		window.setTimeout(callback, 1000 / 60); 
	};
})();