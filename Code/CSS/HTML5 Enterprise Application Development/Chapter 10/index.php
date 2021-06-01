<?php
	/* HTML5 Enterprise Applications 
  	 * by Nehal Shah & Gabriel Balda 
     * July 2012
  	 * HTML5 Shiv Example
  	*/
	session_start();
	include 'lib/EpiCurl.php';
	include 'lib/EpiOAuth.php';
	include 'lib/EpiTwitter.php';
	include 'lib/secret.php';
	$twitterObj = new EpiTwitter($consumer_key, $consumer_secret);
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>MovieNow</title>
        <!-- Charset Encoding -->
        <meta charset="utf-8" />
        <!-- Description of MovieNow -->
        <meta name="description" content="Your movie theater finder" />
        <!-- Author or Authors of MovieNow -->
        <meta name="author" content="Me" />
        <!-- Keyword (recognized by certain search engines, not google) -->
        <meta name="keywords" content="movie, hollywood" />
        <!-- Copyright information -->
        <meta name="copyright" content="Copyright &copy;  2012 MovieNow. All rights reserved." />
        <!-- favico -->
        <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
        <!-- Apple iOS icons -->
        <!-- iPhone 57x57 -->
        <link rel="apple-touch-icon-precomposed" href="img/touch-icon-iphone.png" />
        <!-- iPad 72x72 -->
        <link rel="apple-touch-icon-precomposed" href="img/touch-icon-ipad.png" sizes="72x72" />
        <!-- iPhone Retina Display 114x114 -->
        <link rel="apple-touch-icon-precomposed" href="img/touch-icon-iphone-rd.png" sizes="114x114" />
        <!-- iPad Retina Display 144x144 -->
        <link rel="apple-touch-icon-precomposed" href="img/touch-icon-ipad-rd.png" sizes="144x144" />
        <!-- Cascade Style Sheet import -->
        <link rel="stylesheet" href="css/styles.css" type="text/css" />
        <script src="js/modernizr.js" type="text/javascript"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body class="no-js">
        <section class="wrapper">
            <div class="main">
                <header>
                	<div class="logo"></div>
                	<div class="twitter-info">
					<?php
                        if(isset($_GET['oauth_token']) || (isset($_SESSION['oauth_token']) && isset($_SESSION['oauth_token_secret']))){
                            if(!isset($_SESSION['oauth_token']) || !isset($_SESSION['oauth_token_secret'])){
                                $twitterObj->setToken($_GET['oauth_token']);
                                $token = $twitterObj->getAccessToken();
                                $_SESSION['oauth_token']=$token->oauth_token;
                                $_SESSION['oauth_token_secret']=$token->oauth_token_secret;
                                $twitterObj->setToken($token->oauth_token, $token->oauth_token_secret);
                            }else{
                                $twitterObj->setToken($_SESSION['oauth_token'],$_SESSION['oauth_token_secret']);
                            }
                            $twitterInfo= $twitterObj->get_accountVerify_credentials();
							$username = $twitterInfo->screen_name;
							$avatar = $twitterInfo->profile_image_url;
							echo "<a href='http://www.twitter.com/$username' target='_blank' class='twitter-data'><img src='$avatar' width='30' height='30'/><span> $username</span></a>";
                        }else{
                            $url = $twitterObj->getAuthorizationUrl();
                            echo "<a href='$url'><div class='twitter-signin'></div></a>";
                        }
					?>
                    </div>
                </header>
                <nav>
                	<ul>
        				<li><a href="index.php">Home</a></li>
        			</ul>
        		</nav>
                <aside>
                	<div id="dropzone">Drop Here</div>
            		<div id="dropstage">
            			<h2>Selected Times</h2>
                	</div>
                    <h2>Top 5 Box Office</h2>
            		<ol>
                		<li itemscope itemtype="http://schema.org/Movie">
                            <h3 itemprop="name">Dark Knight Rises</h3>
                            <p itemprop="genre">Action</p>
                        </li>
                        <li itemscope itemtype="http://schema.org/Movie">
                            <h3 itemprop="name">Avengers</h3>
                            <p itemprop="genre">Action</p>
                        </li>
                        <li itemscope itemtype="http://schema.org/Movie">
                            <h3 itemprop="name">Ice Age: Continental Drift</h3>
                            <p itemprop="genre">Animation</p>
                        </li>
                        <li itemscope itemtype="http://schema.org/Movie">
                            <h3 itemprop="name">The Amazing Spider-Man</h3>
                            <p itemprop="genre">Action</p>
                        </li>
                        <li itemscope itemtype="http://schema.org/Movie">
                            <h3 itemprop="name">Dark Shadows</h3>
                            <p itemprop="genre">Comedy</p>
                        </li>
            		</ol>
            	</aside>
                <section>
                	<article>
                        <h1>In Theaters Now</h1>
                        <div id="movies-near-me">   
                        </div>
            		</article>
            	</section>
            <div>
            <div class="push"></div>
        </section>
    	<footer>Copyright &copy; 2012 MovieNow. All rights reserved.</footer>
        <div class="modal-background-color"></div>
        <section class="modal-background">
        	
        	<div class="tweet">
            	<div class="tweet-bar">
            		<h2>Tweet</h2>
                    <div id="close-tweet"></div>
            	</div>
                <form id="twitter">
					<textarea  name="tweet" rows="5" id="tweet" title="Tweet Required!" maxlength="140" required></textarea>
					<div class="char-counter">
                    	<input type='submit' value='tweet' name='submit' id='tweet-submit' />
 						<div id="count">140</div>
 					</div>
				</form>
            </div>
        </section>
        <script src="js/ios-orientationchange-fix.js"></script>
        <script src="js/jquery-1.8.0.min.js"></script>
        <script src="js/jquery.xdomainajax.js"></script>
        <script src="js/three.js"></script>
        <script src="js/movienow.nearbytweets.js"></script>
        <script src="js/movienow.tweet.js"></script>
        <script src="js/movienow.draganddrop.js"></script>
		<script src="js/movienow.charts.js"></script>
        <script src="js/movienow.geolocation.js"></script>
        <script src="js/movienow.js"></script>
    </body>
</html>