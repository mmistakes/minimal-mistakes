<?php
/*
 * This file is part of CCount - PHP Click Counter.
 *
 * (c) Copyright 2016 by Klemen Stirn. All rights reserved.
 * http://www.phpjunkyard.com
 * http://www.phpjunkyard.com/php-click-counter.php
 *
 * For the full copyright and license agreement information, please view
 * the docs/index.html file that was distributed with this source code.
 */

define('IN_SCRIPT',1);
define('THIS_PAGE', 'INDEX');

// Require the settings file
require '../ccount_settings.php';

// Load functions
require '../inc/common.inc.php';

// Start session
pj_session_start();

// Is this a LOGOUT request?
if ( pj_GET('logout', false) !== false && pj_token_check() )
{
	// Expire session variable
	$_SESSION['LOGGED_IN'] = false;

	// Delete cookie
	setcookie('ccount_hash', '');

	// Stop session
	pj_session_stop();

	// Define a success message
    $_SESSION['PJ_MESSAGES']['SUCCESS'] = 'You have logged out successfuly.';
}

// Are we logged in? Go to admin if yes
elseif ( pj_isLoggedIn() )
{
	header('Location: admin.php');
	die();
}

// Is this a LOGIN attempt?
elseif ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	// Check password etc
	if ( stripslashes( pj_input( pj_POST('pass', false) ) ) == $ccount_settings['admin_pass'])
	{
		// Set session variable
		$_SESSION['LOGGED_IN'] = true;

		// Remember user?
		if ( pj_POST('remember') == 'yes' )
		{
			setcookie('ccount_hash', pj_Pass2Hash($ccount_settings['admin_pass']), strtotime('+1 year'));
		}

		// Redirect to admin
		header('Location: admin.php');
		die();
	}
    else
    {
		$_SESSION['PJ_MESSAGES']['ERROR'] = 'Invalid password.';
    }
}

// Session expired?
elseif ( isset($_GET['notice']) )
{
	$_SESSION['PJ_MESSAGES']['INFO'] = 'Session expired, please login again.';
}

// Nothing of above, print the sign in form...

// Get header
include('admin_header.inc.php');

// Sign in form
?>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="collapse navbar-collapse navbar-ex1-collapse">
			<ul class="nav navbar-nav">
				<li><a href="#" class="text-center">
				<i class="glyphicon glyphicon-user"></i>&nbsp;Sign in</a></li>
			</ul>
			</div><!-- /.navbar-collapse -->
		</div>
	</nav>

	<div class="container">

		<div class="row">
			<div class="col-lg-12">
				<div class="panel">
					<div class="panel-body">

						<?php pj_processMessages(); ?>

						<p>&nbsp;</p>
						<form method="POST" action="index.php" class="form-signin">
							<h2 class="form-signin-heading">Your password:</h2>
							<input type="password" name="pass" class="input-block-level" value="<?php echo defined('PJ_DEMO') ? $ccount_settings['admin_pass'] : ''; ?>" >
							<div class="checkbox">
								<label class="checkbox">
									<input type="checkbox" name="remember" value="yes"> Remember me
								</label>
							</div>
							<button class="btn btn-large btn-primary" type="submit">Sign in</button>
						</form>
						<p>&nbsp;</p>
					</div>
				</div>
			</div>
		</div>

<?php

// Get footer
include('admin_footer.inc.php');
