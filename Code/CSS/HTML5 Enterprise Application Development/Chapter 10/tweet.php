<?php
	/* HTML5 Enterprise Application Development 
	 * by Nehal Shah & Gabriel Balda 
	 * Movie Listings Handler
	 */
	include 'lib/EpiCurl.php';
	include 'lib/EpiOAuth.php';
	include 'lib/EpiTwitter.php';
	include 'lib/secret.php';
	$result = array('status' => 'ok');
	$twitterObj = new EpiTwitter($consumer_key, $consumer_secret);
	if(isset($_SESSION['oauth_token']) && isset($_SESSION['oauth_token_secret'])){
		$twitterObj->setToken($_SESSION['oauth_token'],$_SESSION['oauth_token_secret']);
		$twitterInfo= $twitterObj->get_accountVerify_credentials();
		if($_REQUEST['tweet']){
			$msg = stripcslashes($_REQUEST['tweet']);
			$twitterObj->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
			$update_status = $twitterObj->post_statusesUpdate(array('status' => $msg));
			$temp = $update_status->response;
		}
	}
	else{
		$result["status"]="error";
	}
	if($temp["error"])$result["status"]="error";
	echo json_encode($result);
?> 