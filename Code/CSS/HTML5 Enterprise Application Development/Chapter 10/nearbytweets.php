<?php 
/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * Nearby Tweets Handler
 */
    $latitude = $_GET['latitude'];
    $longitude = $_GET['longitude'];
	if (strpos($latitude, '.') == false) {
		$latitude = substr($latitude, 0, -4) . '.' . substr($latitude, -4);
	}
	if (strpos($longitude, '.') == false) {
		$longitude = substr($longitude, 0, -4) . '.' . substr($longitude, -4);
	}
	$tweets = file_get_contents('http://search.twitter.com/search.json?include_entities=true&result_type=mixed&geocode=' . $latitude . ',' . $longitude . ',0.25mi'); 
    echo $tweets;
?>