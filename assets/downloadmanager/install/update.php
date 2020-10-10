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
define('NEW_VERSION', '2.1.2');

// Require the settings file
require '../ccount_settings.php';

// Load functions
require '../inc/common.inc.php';

// Start session
pj_session_start();

// We will use this later...
$ccount_settings['INSTALL_OK'] = false;
$error_buffer = array();

// ==> Update settings file
if ( ! is_writable('../ccount_settings.php') )
{
	$error_buffer['SETTINGS'] = 1;
}
else
{
	if ( ! isset($ccount_settings['ignore_ips']) )
	{
    	$ccount_settings['ignore_ips'] = '';
	}

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
\$ccount_settings['version']='" . NEW_VERSION . "';", LOCK_EX) === false)
	{
		$_SESSION['PJ_MESSAGES']['ERROR'] = 'Error writing to settings file, please try again later.';
	}
	else
	{
		pj_session_stop();
		$ccount_settings['INSTALL_OK'] = true;
	}
}

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
						<h3 class="panel-title">Update successful</h3>
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
						<h3 class="panel-title">Updating Click Counter</h3>
					</div>
					<div class="panel-body">

						<?php pj_processMessages(); ?>

						<p>&nbsp;</p>

						<form method="POST" action="update.php" class="form-horizontal">

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
		                        <div class="col-lg-offset-3 col-lg-9">
		                            <input type="hidden" name="action" value="save">
		                            <button type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;Try again</button>
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
