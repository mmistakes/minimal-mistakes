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
define('INSTALL',1);

// Require the settings file
require '../ccount_settings.php';

// Load functions
require '../inc/common.inc.php';

// Start session
pj_session_start();

// We will use this later...
$ccount_settings['SESSION_OK'] = false;
$ccount_settings['INSTALL_OK'] = false;
$error_buffer = array();

// Start tests

// ==> Settings file
if ( ! is_writable('../ccount_settings.php') )
{
	$error_buffer['SETTINGS'] = 1;
}

// ==> Database file
if ( ! file_exists('../' . $ccount_settings['db_file']) )
{
	$error_buffer['DATABASE'] = 0;
}
elseif ( ! is_writable('../' . $ccount_settings['db_file']) )
{
	$error_buffer['DATABASE'] = 1;
}

// Is this a POST?
if ( pj_POST('action') == 'save' )
{
	// Test PHP sessions
	if ( isset($_SESSION['TEST']) && $_SESSION['TEST'] == 1 )
	{
		$ccount_settings['SESSION_OK'] = true;
	}
	else
	{
		$error_buffer['SESSION'] = '<b>Session Failed</b><br />Contact your hosting company to verify why PHP Sessions aren\'t working.';
	}

	// Admin password
	$ccount_settings['admin_pass'] = pj_input( pj_POST('admin_pass') ) or $error_buffer['admin_pass'] = 'Choose a password you will use to access admin pages.';

	// Detect click.php URL
	if ( isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/install/index.php') !== false )
	{
		$ccount_settings['click_url'] = 'http://' . $_SERVER['HTTP_HOST'] . str_replace('/install/index.php', '/click.php', $_SERVER['REQUEST_URI']);
	}

    // If no errors, check for duplicates/generate a new ID
	if ( count($error_buffer) == 0 )
    {
		// Update settings file
		if ( @file_put_contents('../ccount_settings.php', "<?php
error_reporting(0);
if (!defined('IN_SCRIPT')) {die('Invalid attempt!');}

// Password hash for admin area
\$ccount_settings['admin_pass']='{$ccount_settings['admin_pass']}';

// URL of the click.php file
\$ccount_settings['click_url']='{$ccount_settings['click_url']}';

// Number of hours a visitor is considered as \"unique\"
\$ccount_settings['unique_hours']={$ccount_settings['unique_hours']};

// Sets the preferred number notation (US, UK, FR, X1, X2)
\$ccount_settings['notation']='{$ccount_settings['notation']}';

// Name of the log file
\$ccount_settings['db_file']='{$ccount_settings['db_file']}';

// IP addresses to ignore in the count
\$ccount_settings['ignore_ips']='{$ccount_settings['ignore_ips']}';

// Version information
\$ccount_settings['version']='{$ccount_settings['version']}';", LOCK_EX) === false)
		{
			$_SESSION['PJ_MESSAGES']['ERROR'] = 'Error writing to settings file, please try again later.';
		}
		else
		{
			pj_session_stop();        
			$ccount_settings['INSTALL_OK'] = true;
		}
    }

}

// Set test session variable
$_SESSION['TEST'] = 1;

// Get header
include('../admin/admin_header.inc.php');

// Load main installation page
?>
<div class="container">

	<div class="row">
		<div class="col-lg-12">
			<?php
			if ($ccount_settings['INSTALL_OK'])
			{
				?>
				<div class="panel panel-success">
					<div class="panel-heading">
						<h3 class="panel-title">Installation successful</h3>
					</div>
					<div class="panel-body">

						<h4>Next Steps:</h4>

						&nbsp;

						<ol>
							<li><span style="color:red">Important: </span> For security reasons, delete <b>install</b> folder from the server.<br />&nbsp;</li>
							<li><a href="../admin/index.php">Login to admin panel</a> to add new links to track, read instructions and manage settings.</li>
						</ol>

						<p>&nbsp;</p>

                	</div>
				</div>
				<?php
			} // END INSTALL OK
			else
			{
				?>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Installing Click Counter</h3>
					</div>
					<div class="panel-body">

						<?php pj_processMessages(); ?>

						<p>&nbsp;</p>

						<form method="POST" action="index.php" class="form-horizontal">

		                    <div class="form-group">
		                        <label class="col-lg-3 control-label">ccount_settings.php:</label>
								<?php
								if ( pj_test_error('SETTINGS', 1) )
								{
									?>
									<div class="col-lg-9" style="padding-top:7px;margin-bottom:10px;color:red">
										<b>Not writable</b><br />PHP needs permission to write to this file. On Linux servers CHMOD the file to 666 (rw-rw-rw-).
									</div>
									<?php
								}
								else
								{
									?>
									<div class="col-lg-9" style="padding-top:7px;margin-bottom:10px;color:green;font-weight:bold">
										OK
									</div>
									<?php
								}
								?>
		                    </div>
		                    <div class="form-group">
		                        <label class="col-lg-3 control-label"><?php echo pj_htmlspecialchars($ccount_settings['db_file']); ?>:</label>
								<?php
								if ( pj_test_error('DATABASE') )
								{
									?>
									<div class="col-lg-9" style="padding-top:7px;margin-bottom:10px;color:red">
										<b>File missing</b><br />A required file is missing. Upload all CCount files to the server.
									</div>
									<?php
								}
								elseif ( pj_test_error('DATABASE', 1) )
								{
									?>
									<div class="col-lg-9" style="padding-top:7px;margin-bottom:10px;color:red">
										<b>Not writable</b><br />PHP needs permission to write to this file. On Linux servers CHMOD the file to 666 (rw-rw-rw-).
									</div>
									<?php
								}
								else
								{
									?>
									<div class="col-lg-9" style="padding-top:7px;margin-bottom:10px;color:green;font-weight:bold">
										OK
									</div>
									<?php
								}
								?>
		                    </div>
		                    <div class="form-group">
		                        <label for="url" class="col-lg-3 control-label">Session test:</label>
		                        <div class="col-lg-9" style="padding-top:7px;margin-bottom:10px">
		                            <?php echo isset($error_buffer['SESSION']) ? '<span style="color:red">'.$error_buffer['SESSION'].'</span>' : ($ccount_settings['SESSION_OK'] ? '<span style="color:green"><b>OK</b></span>' : 'Started...'); ?>
		                        </div>
		                    </div>
		                    <div class="form-group<?php echo isset($error_buffer['admin_pass']) ? ' has-error' : ''; ?>">
		                        <label for="url" class="col-lg-3 control-label bold">Choose a password:</label>
		                        <div class="col-lg-9">
		                            <input type="text" id="admin_pass" name="admin_pass" value="<?php echo stripslashes(pj_POST('admin_pass')); ?>" maxlength="255" class="form-control" placeholder="" autocomplete="off" style="width:300px">
		                            <p class="help-block"><?php echo isset($error_buffer['admin_pass']) ? $error_buffer['admin_pass'] : 'Choose a password you will use to login.'; ?></p>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <div class="col-lg-offset-3 col-lg-9">
		                            <input type="hidden" name="action" value="save">
		                            <button type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;<?php echo ($_SERVER['REQUEST_METHOD'] == 'POST') ? 'Save changes &amp; Test again' : 'Continue to step 2'; ?></button>
		                        </div>
		                    </div>
						</form>

						<p>&nbsp;</p>

                	</div>
				</div>
				<?php
			} // END install not OK
			?>
		</div>
	</div>
<?php

// Get footer
include('../admin/admin_footer.inc.php');


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////


function pj_test_error($type, $value = 0)
{
	global $error_buffer;

	if ( isset($error_buffer[$type]) && $error_buffer[$type] == $value )
	{
		return true;
	}

	return false;
} // END pj_test_error()
