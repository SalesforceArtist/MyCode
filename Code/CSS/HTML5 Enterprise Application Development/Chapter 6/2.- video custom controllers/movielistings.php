<?php 
/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * Movie Listings Handler
 */
    $zips = $_GET['zip'];
	$zips = explode(',', $zips);
	$listings = array();
	for ($i=0; $i<count($zips); $i++) {
    	$listings[$i] = file_get_contents('http://gateway.moviefone.com/movies/pox/closesttheaters.xml?zip=' . $zips[$i]); 
    	$listings[$i] = simplexml_load_string($listings[$i]);
	}
    echo json_encode($listings);
?>