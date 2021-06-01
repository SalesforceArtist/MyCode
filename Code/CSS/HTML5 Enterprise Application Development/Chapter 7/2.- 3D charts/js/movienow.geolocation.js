/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * MovieNow Geolocation Handler
*/
var movienow = movienow || {};
movienow.geolocation = (function(){
    var that = this;
    this.getLocation = function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationCallback);
        }
    };
    this.locationCallback = function(loc){
        that.reverseGeocode(loc);
    };
    this.reverseGeocode = function(loc){
        $.ajax({
            url: 'http://api.geonames.org/findNearbyPostalCodesJSON',
            data: 'lat=' + loc.coords.latitude + '&lng=' + loc.coords.longitude + '&username=demo', //Swap in with your geonames.org username
            success: function(payload){
                var data = that.objectifyJSON(payload);
                var postalCodes = [];
                for (var i=0; i<data.postalCodes.length; ++i) {
                    postalCodes.push(data.postalCodes[i].postalCode);
                }
                that.getShowtimes(postalCodes);
            },
            error: function(error){
                alert(error.responseText);
            }
        });
		
    };
    this.objectifyJSON = function(json) {
        if (typeof(json) == "object") {
            return json;
        }
        else {
            return $.parseJSON(json);
        }
    };
    this.getShowtimes = function(postalCodes) {
        $.ajax({
            url: 'movielistings.php',
            data: 'zip=' + postalCodes.join(','),
            success: function(payload){
                var data = that.objectifyJSON(payload);
                that.displayShowtimes(that.constructMoviesArray(data));
            },
            error: function(error){
                alert(error.responseText);
            }
        });
    };
    this.constructMoviesArray = function(data) {
        var key, movie, theater = null;
        var movies = {};
        movies.items = {};
        movies.length = 0;
        for (var j=0; j<data.length; ++j) {
            if (data[j].movie) {
                theater = data[j].theater;
                for (var i=0; i<data[j].movie.length; ++i) {
                    movie = data[j].movie[i];
                    key = movie.movieId + '|'+ theater.theaterId;
                    if (!movies.items[key]) {
                        movie.theater = theater;
                        movies.items[key] = movie;
                        movies.length++;
                    }
                }
            }
        }
        return movies;
    };
	this.showCharts = function(event) {
		that.charts($(event.target).parent().parent().removeClass("desc").addClass("open").find("canvas")[0], "3DChart");
	};
	this.showDetails = function(event) {
		$(event.target).parent().parent().addClass("desc").addClass("open");
	};
    this.displayShowtimes = function(movies) {
        var movie = null;
        var html = '<ul>';
        for (var item in movies.items) {
            movie = movies.items[item];
			var movieDesc=(movie.synopsis&&movie.synopsis.length>200)?movie.synopsis.substr(0,200)+"...": movie.synopsis;
           	var movieHTML='<li itemscope itemtype="http://schema.org/Movie">';
		   	movieHTML+='<img src="'+movie.poster+'" alt="'+movie.title+'" width="120" />';
			movieHTML+='<section class="main-info">';
			movieHTML+='<input type="button" class="charting-button" />';
			movieHTML+='<input type="button" class="details-button" />';
			movieHTML+='<h3 itemprop="name">'+movie.title+'</h3>';
			movieHTML+='<p class="details genre" itemprop="genre">'+Array(movie.genre).join(', ')+'</p>';
			movieHTML+='<p class="details">'+movie.mpaaRating+'</p>';
            movieHTML+='<p class="theater">'+movie.theater.title+" "+movie.theater.address+'</p>';
			movieHTML+='<p class="actors">'+Array(movie.selectedStar).join(', ')+'</p>';
			movieHTML+='</section>';
			movieHTML+='<section class="description">';
			movieHTML+='<h3 itemprop="name">'+movie.title+'</h3>';
			movieHTML+='<p>'+movieDesc+'</p>';
			movieHTML+='</section>';  
			movieHTML+='<section class="charting">';
			movieHTML+='<h3 itemprop="name">'+movie.title+'</h3>';
			movieHTML+='<p><canvas data-feed="MetaCritic:'+movie.avgMetaCriticRating+",EditorBoost:"+movie.editorBoost+",User Rating:"+movie.avgUserRating+'"></canvas></p>';
			movieHTML+='</section>';                     
            movieHTML+='</li>';
			html+=movieHTML;
        }
		html+= '</ul>';
        $('#movies-near-me').html(html);
		$("#movies-near-me li .details-button").click(that.showDetails);
		$("#movies-near-me li .description, #movies-near-me li .charting").click(function(){$(this).parent().removeClass("open")});
		$("#movies-near-me li .charting-button").click(that.showCharts);
    };
	this.getLocation();
})();