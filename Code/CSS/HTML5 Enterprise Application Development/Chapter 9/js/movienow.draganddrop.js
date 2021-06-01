/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * MovieNow Drag and Drop Handler
*/
var movienow = movienow || {};
movienow.draganddrop = (function(){
    var that = this;
    this.init = function() {
		var iOS = !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad');
		if(('draggable' in document.createElement('span'))&&!iOS) {
			var dragItems = $('[draggable=true]');
			for (var i=0; i<dragItems.length; i++) {
				$(dragItems[i])[0].addEventListener('dragstart', function(event){
					$('#dropzone').show();
					event.dataTransfer.setData('Text', this.outerHTML);
					event.dataTransfer.setData('Title', $(this)[0].title);
					event.dataTransfer.setData('Time', $(this).html());
					return false;
				});
				$(dragItems[i])[0].addEventListener('dragend', function(event) {
					$('#dropzone').hide();
					return false;
				});
			};
			$(dragItems).bind('selectstart', function() {
				this.dragDrop(); return false;
			});
			$('#dropzone')[0].addEventListener('drop', function(event) {
				if (event.stopPropagation) event.stopPropagation();
				if (event.preventDefault) event.preventDefault();
				var html='<div class="selected-time">';
				html+='<div class="title">'+event.dataTransfer.getData('Title')+'</div>';
				html+='<div class="time">'+event.dataTransfer.getData('Time')+'</div>';
				html+='</div>';
				$('#dropstage').append(html).show();
				that.showTweetArea(event.dataTransfer.getData('Title'),event.dataTransfer.getData('Time'));
				return false;
			});
			$('#dropzone')[0].addEventListener('dragover', function(event) {
				if (event.preventDefault) event.preventDefault();
				return false;
			});
			$('#dropzone')[0].addEventListener('dragenter', function(event) {
				if (event.preventDefault) event.preventDefault();
				return false;
			});
		}else{
			$(".showtime").bind('click', function(event){
				var info=$(this)[0].title;
				var time=$(this).html();
				that.showTweetArea(info,time);
			});
		}
    };
})();