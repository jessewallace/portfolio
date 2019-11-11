<?php
if(isset($_POST["submit"])) {
    $recipient = "Jesse.Wallace@tritondigital.com";
    $subject="AMP Rewards for Newspapers Demo Request";
    $sender=$_POST["sender"];
    $senderEmail=$_POST["senderEmail"];
    $message=$_POST["message"];

    $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

    mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>AMP Rewards for Newspaper</title>
        <meta name="viewport" content="initial-scale=1">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/animate.css/3.1.0/animate.min.css"/>
        <link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,900' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="style.css"/>
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon">
    </head>

    <body style="z-index:0;">
        <header class="header row row--a">
            <div class="cell well--s">
                <img class="header-logo" src="images/logo.png">
                <h2 class="header-title">AMP Rewards for Newspaper</h2>
                <!-- <a class="header-button button-positive" id="action-button" href="mailto:solutions@tritondigital.com?subject=AMP Rewards for Newspapers Demo Request&body=I'd like to learn more about AMP Rewards for Newspapers.">Request A Demo!</a> -->
                <a class="header-button button-positive" id="action-button"><i class="fa fa-comments-o"></i> Contact Us</a>
            </div>
        </header>

        <section class="hero hero--a row row--b">
            <div class="cell well--l center-text" data-type="background" data-speed="10">
                <div class="container wow fadeIn invisible">
                    <h1 class="hero-header">Looking To Increase Reader Retention?</h1>
                    <p class="hero-tagline">Integrate AMP Rewards into your newspaper&#8217;s audience development and advertising sales strategies to engage your readers, increase loyalty, and drive retention.</p>
                </div>
                <div class="hero-graphic wow fadeInUp invisible" data-wow-delay="1s">
                    <img class="hero-image" src="images/jumbotron.png">
                </div>
            </div>
        </section>

        <section class="feature-1 row row--a">
        	<div class="bucket  cell cell--l wow fadeInUp invisible" data-wow-offset="250">
        		<div class="bucket-content col-1-2">
        			<h2 class="feature-title">Reward Your Readers</h2>
        			<p class="feature-description">Reward your most loyal readers for connecting with and staying loyal to your brand using points-based rewards. The more your members interact with your newspaper, the more points they gain, enabling them to enter to win exciting contests and unlock exclusive prizes including trips, tickets, and more.</p>
        			
        		</div>
        		<div class="bucket-media col-1-2">
                    
        			<div class="feature-image feature-image-1" style="background-image: url('images/feature1.png')"></div>
                    
        		</div>
        	</div>
        </section>

        <section class="feature-2 row row--a">
        	<div class="bucket bucket--alternate cell cell--l wow fadeInUp invisible" data-wow-offset="250">
        		<div class="bucket-content col-1-2">
        			<h2 class="feature-title">Incentivize Actions</h2>
        			<p class="feature-description">Leverage rewards and prizes to encourage your readers to take certain actions, including subscribing to your newsletter, activating their online accounts, and renewing their membership for another year.</p>
        			
        		</div>
        		<div class="bucket-media col-1-2">
                    
        			<div class="feature-image feature-image-2" style="background-image: url('images/feature2.png')"></div>
                    
        		</div>
        	</div>
        </section>

        <section class="feature-3 row row--a">
        	<div class="bucket  cell cell--l wow fadeInUp invisible" data-wow-offset="250">
        		<div class="bucket-content col-1-2">
        			<h2 class="feature-title">Gamify the Experience</h2>
        			<p class="feature-description">Increase time spent with your content through a continuous stream of games and promotions, several of which encourage readers to engage directly with the articles, including Read &amp; Win and Trivia.</p>
        			
        		</div>
        		<div class="bucket-media col-1-2">
                    
        			<div class="feature-image feature-image-3" style="background-image: url('images/feature3.2.png')"></div>
                    
        		</div>
        	</div>
        </section>

        <section class="row row--c">
            <div class="cell well center-text">
                <ul id="clientQuotes" class="carousel quotes zerolist">
                    
                    <li class="quote">
                        AMP Rewards offers you a platform to interact with your audience.
                        <i class="quote-author"></i>
                    </li>
                    
                    <li class="quote">
                        Modify user behavior with high-quality and high-value interactions, converting readers into fans.
                        <i class="quote-author"></i>
                    </li>
                    
                    <li class="quote">
                        Increase time spent with your content by utilizing fun games that keep your readers engaged and coming back for more.
                        <i class="quote-author"></i>
                    </li>
                    
                </ul>
            </div>
        </section>

        <section class="feature-4 row row--a">
        	<div class="bucket bucket--alternate cell cell--l wow fadeInUp invisible" data-wow-offset="250">
        		<div class="bucket-content col-1-2">
        			<h2 class="feature-title">Connect Readers and Advertisers</h2>
        			<p class="feature-description">Reward your readers for interacting with your advertisers&#8217; content. Plus, through the use of the Survey feature, learn more about your readers and their interests to improve campaign targetability.</p>
        			
        		</div>
        		<div class="bucket-media col-1-2">
                    
        			<div class="feature-image feature-image-4" style="background-image: url('images/feature3.1.png')"></div>
                    
        		</div>
        	</div>
        </section>

        <section class="feature-5 row row--a">
        	<div class="bucket  cell cell--l wow fadeInUp invisible" data-wow-offset="250">
        		<div class="bucket-content col-1-2">
        			<h2 class="feature-title">Generate Revenue</h2>
        			<p class="feature-description">Offer advertisers unique, interactive solutions to engage with your readers. Advertising beyond the standard print and banner ads will improve advertising efficacy and drive higher CPMs.</p>
        		</div>

        		<div class="bucket-media col-1-2">
        			<div class="feature-image feature-image-5" style="background-image: url('images/feature4.1.png')"></div>
        		</div>
        	</div>
        </section>

    <!-- Case Study -->
        <section class="row row--c" id="case-study">
            <div class="cell well bucket bucket--alternate">
                <div class="col-1-2 bucket-content bucket-content--a">
                    <h2 class="bucket-header">Download our Case Study to see how AMP Rewards has helped the Sacramento Bee increase retention.</h2>
                    <!-- <a class="button-positive button-large bucket-button" href="mailto:solutions@tritondigital.com?subject=AMP Rewards for Newspapers Demo Request&body=I'd like to learn more about AMP Rewards for Newspapers.">Request A Demo!</a>
                    <span>or</span> -->
                    <form method="get" target="_blank" action="AMP_Rewards_for_Publishers-Sacramento_Bee_Case_Study.pdf">
                        <button class="button-highlight button-large" type="submit">Download Case Study</button>
                    </form>
                </div>

                <div class="col-1-2 bucket-media">
                    <div class="promotional-video vimeo">
                        <iframe src="https://player.vimeo.com/video/132133594" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </section>

    <!-- Multi-Featured Section -->
        
        <section class="hero hero--b row row--b subfeatures">
            <div class="cell well">
                <div class="container center-text">
                    <h1 class="hero-header">AMP Rewards has all the tools you need to minimize workflow and maximize engagement.</h1>
                    <p class="hero-tagline"></p>
                </div>
                <div class="grid container">
                
                    <article class="card card-1 wow fadeInUp " data-wow-offset="250">
                    	<section class="card-content">
                    		<h1 class="card-title">Engagement Tools</h1>
                    		<p class="card-description">AMP Rewards gives you access to AMP Club, AMP Contesting, AMP Research, AMP Email, Trivia &amp; Games.</p>
                    	</section>
                    </article>

                    <article class="card card-2 wow fadeInUp " data-wow-offset="250">
                    	<section class="card-content">
                    		<h1 class="card-title">Turnkey Solutions</h1>
                    		<p class="card-description">Choose from a rich selection of digital sales opportunities. Plus, take advantage of our resource library, sales kits and &quot;campaigns in a can&quot;.</p>
                    	</section>
                    </article>
                
                </div>

                <div class="grid container">
                    <article class="card card-3 wow fadeInUp" data-wow-offset="250">
                    	<section class="card-content">
                    		<h1 class="card-title">Enterprise Management</h1>
                    		<p class="card-description">Create content, trivia, surveys, and polls and syndicate them to other properties with their own look and branding.</p>
                    	</section>
                    </article>

                    <article class="card card-4 wow fadeInUp " data-wow-offset="250">
                    	<section class="card-content">
                    		<h1 class="card-title">Customization</h1>
                    		<p class="card-description">Easily reflect your brand or your sponsors brand through customized, advanced themes giving you ultimate control. Or, utilize our pre-configured themes for a more out-of-the-box solution.</p>
                    	</section>
                    </article>
                </div>
            </div>
        </section>

        <section class="row row--c" id="signuparea">
            <div class="cell well bucket bucket--alternate">
                <div class="bucket-content bucket-content--a">

                   <h2 class="bucket-header">Contact us today to start making meaningful connections with your readers!</h2>

                    <div id="form-div">
                        <form id="amp-newspapers-contact-form" class="form" name="amp-newspapers-contact-form" method="post" action="index.php">
                            
                            <p class="name">
                                <input class="feedback-input" type="text" placeholder="Name" name="sender" />
                            </p>

                            <p class="email">
                                <input class="feedback-input" type="email" placeholder="Email" name="senderEmail" />
                            </p>

                            <p class="email">
                                <textarea class="feedback-input" placeholder="Comment" name="message"></textarea>
                            </p>
                            
                            <div class="submit">
                                <input id="button-blue" class="feedback-input" type="submit" name="submit" />
                                <div class="ease"></div>
                            </div>
                        </form>

                        <div id="success">
                          <span>
                            <p>Your message was sent succssfully!</p>
                          </span>
                        </div>

                        <div id="error">
                          <span>
                            <p>Something went wrong, try refreshing and submitting the form again.</p>
                          </span>
                        </div>
                    </div>
                </div> 
            </div>
        </section>

        <footer class="footer center-text">
            <div class="cell well">
                <a href="http://www.tritondigital.com" target="_blank">
                    <img src="images/logo.png" alt="Triton Digital Logo">
                </a>
                <nav class="footer-nav">
                    <a href="http://www.tritondigital.com" target="_blank">Triton Digital</a>
                    <a href="http://www.tritondigital.com/support" target="_blank">Support</a>
                    <a href="http://twitter.com/TritonDigital" target="_blank">Twitter</a>
                    <a href="http://www.facebook.com/pages/Triton-Digital/167664343282537" target="_blank">Facebook</a>
                </nav>
                <div class="footer-copyright">
                     <span id="year"></span> Triton Digital
                </div>
            </div>
        </footer>
        <span class="scroll-to pill is-clickable" id="back-top" style="display: none">Scroll to Top</span>
        <div class="loading">
            <div class="spinner">
                <div class="spinner-container container1">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
            </div>
        </div>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        <script src="//cdn.jsdelivr.net/bxslider/4.1.1/jquery.bxslider.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/wow/0.1.12/wow.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js"></script>
        <script src="http://cdn.jsdelivr.net/jquery.validation/1.14.0/jquery.validate.js"></script>
        <script>
            $(window).load(function() {
                var wow = new WOW({
                    mobile: false
                });

                wow.init();
            });

            // Return today's date and time
            var currentTime = new Date();

            var elem = document.getElementById("year");

            // returns the year (four digits)
            var year = currentTime.getFullYear();

            elem.innerHTML = year;

        </script>
        <script src="script.js"></script>
    </body>
</html>
