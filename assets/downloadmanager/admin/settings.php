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
define('THIS_PAGE', 'SETTINGS');

// Require the settings file
require '../ccount_settings.php';

// Load functions
require '../inc/common.inc.php';

// Start session
pj_session_start();

// Are we logged in?
pj_isLoggedIn(true);

// The settings file is in parent folder
$ccount_settings['db_file_admin'] = '../' . $ccount_settings['db_file'];

$error_buffer = array();

// Save settings?
if ( pj_POST('action') == 'save' && pj_token_check() )
{
	// Check demo mode
	pj_demo('settings.php');

	// Admin password
	$ccount_settings['admin_pass'] = pj_input( pj_POST('admin_pass') ) or $error_buffer['admin_pass'] = 'Choose a password you will use to access admin pages.';

	// click.php URL
	$ccount_settings['click_url'] = pj_validateURL( pj_POST('click_url') ) or $error_buffer['click_url'] = 'Enter a valid URL address of the click.php file on your server.';

	// Database file
	$ccount_settings['db_file'] = pj_input( pj_POST('db_file', 'ccount_database.php') );

	// Check database file
	if ( preg_match('/[^0-9a-zA-Z_\-\.]/', $ccount_settings['db_file']) )
	{
		$error_buffer['db_file'] = 'Invalid file name. Use only these chars: a-z A-Z 0-9 _ - .';
	}

	// Unique hours
	$ccount_settings['unique_hours'] = intval( pj_POST('unique_hours', 24) );
	if ($ccount_settings['unique_hours'] < 0)
	{
		$ccount_settings['unique_hours'] = 0;
	}

	// Notation
	$ccount_settings['notation'] = pj_input( pj_POST('notation', 'US') );
	if ( ! in_array($ccount_settings['notation'], array('US', 'UK', 'FR', 'X1', 'X2') ) )
	{
		$ccount_settings['notation'] = 'US';
	}

	// Ignore IPs
	$ccount_settings['ignore_ips'] = array();
	preg_match_all('/([0-9]{1,3}(\.[\*0-9]{1,3}){1,3})/', pj_POST('ignore_ips'), $ips);

	foreach ($ips[0] as $ip)
	{
		$ip = str_replace('.*', '', $ip);
		$ccount_settings['ignore_ips'][] = substr_count($ip, '.') != 3 ? $ip . "." : $ip;
	}

	$ccount_settings['ignore_ips'] = implode(',', $ccount_settings['ignore_ips']);

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
			$_SESSION['PJ_MESSAGES']['SUCCESS'] = 'Settings have been saved.';
		}
    }
}

if ( count($error_buffer) )
{
	$_SESSION['PJ_MESSAGES']['ERROR'] = 'Missing or invalid data, see below for details.';
}

// Require admin header
require 'admin_header.inc.php';

?>

<?php pj_processMessages(); ?>

<div class="row">
	<div class="col-lg-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Edit settings</h3>
			</div>
			<div class="panel-body">
                <form action="settings.php" method="post" name="settingsform" class="form-horizontal">

                    <div class="form-group">
                        <label class="col-lg-3 control-label">License:</label>
                        <div class="col-lg-9" style="padding-top:7px">
<?php
$settings['pj_license']('QppZiAoZmlsZV9leGlzdHMoJy4uL2Njb3VudF9saWNlbnNlLnBocCcp
KXtpbmNsdWRlKCcuLi9jY291bnRfbGljZW5zZS5waHAnKTt9DQoNCmlmICghaXNzZXQoJHNldHRpbmdz
WydjY291bnRfbGljZW5zZSddKXx8IWlzX2FycmF5KCRzZXR0aW5nc1snY2NvdW50X2xpY2Vuc2UnXSkp
DQp7DQoJZWNobyAnPHNwYW4gY2xhc3M9InRleHQtZGFuZ2VyIj48c3Ryb25nPkZSRUU8L3N0cm9uZz48
L3NwYW4+IFsgPGEgaHJlZj0iaHR0cDovL3d3dy5waHBqdW5reWFyZC5jb20vYnV5LnBocD9zY3JpcHQ9
Y2NvdW50IiBjbGFzcz0idGV4dC1jZW50ZXIiPmJ1eSBhIGxpY2Vuc2U8L2E+IF0nOw0KfQ0KZWxzZQ0K
ew0KCWVjaG8gJzxzcGFuIGNsYXNzPSJ0ZXh0LXN1Y2Nlc3MiPjxpIGNsYXNzPSJnbHlwaGljb24gZ2x5
cGhpY29uLXRodW1icy11cCI+PC9pPiBWYWxpZDwvc3Bhbj4nOw0KfQ0K',"\104");
?>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label">Script version:</label>
                        <div class="col-lg-9" style="padding-top:7px;margin-bottom:10px">
                            <?php echo $ccount_settings['version']; ?>
                            [ <a href="http://www.phpjunkyard.com/check4updates.php?s=ccount&amp;v=<?php echo $ccount_settings['version']; ?>">check for updates</a> ]
                        </div>
                    </div>

                    <div class="form-group<?php echo isset($error_buffer['admin_pass']) ? ' has-error' : ''; ?>">
                        <label for="url" class="col-lg-3 control-label bold">Admin password:</label>
                        <div class="col-lg-9">
                            <input type="password" id="admin_pass" name="admin_pass" value="<?php echo stripslashes($ccount_settings['admin_pass']); ?>" size="50" maxlength="255" class="form-control" placeholder="" autocomplete="off">
                            <p class="help-block"><?php echo isset($error_buffer['admin_pass']) ? $error_buffer['admin_pass'] : 'Password used to login to CCount admin pages.'; ?></p>
                        </div>
                    </div>
                    <div class="form-group<?php echo isset($error_buffer['click_url']) ? ' has-error' : ''; ?>">
                        <label for="url" class="col-lg-3 control-label bold">URL of click.php file:</label>
                        <div class="col-lg-9">
                            <input type="url" id="click_url" name="click_url" value="<?php echo stripslashes($ccount_settings['click_url']); ?>" size="50" maxlength="255" class="form-control" placeholder="http://www.example.com/ccount/click.php">
                            <p class="help-block"><?php echo isset($error_buffer['click_url']) ? $error_buffer['click_url'] : 'Location of the <b>click.php</b> file on your server.'; ?></p>
                        </div>
                    </div>
                    <div class="form-group<?php echo isset($error_buffer['db_file']) ? ' has-error' : ''; ?>">
                        <label for="text" class="col-lg-3 control-label bold">CCount database file:</label>
                        <div class="col-lg-9">
                            <input type="text" id="db_file" name="db_file" value="<?php echo $ccount_settings['db_file']; ?>" size="50" maxlength="255" class="form-control" placeholder="ccount_database.php">
                            <p class="help-block"><?php echo isset($error_buffer['db_file']) ? $error_buffer['db_file'] : 'Name of the CCount database file (defaults to <b>ccount_database.php</b>).'; ?></p>
                        </div>
                    </div>
                    <div class="form-group<?php echo isset($error_buffer['unique_hours']) ? ' has-error' : ''; ?>">
                        <label for="name" class="col-lg-3 control-label bold">Unique hours limit:</label>
                        <div class="col-lg-9">
                            <input type="text" id="unique_hours" name="unique_hours" value="<?php echo $ccount_settings['unique_hours']; ?>" maxlength="10" size="5" class="form-control" style="width:80px;">
                            <p class="help-block"><?php echo isset($error_buffer['unique_hours']) ? $error_buffer['unique_hours'] : 'Number of hours between clicks a visitor is again considered unique (defaults to <b>24</b>).'; ?></p>
                        </div>
                    </div>
                    <div class="form-group<?php echo isset($error_buffer['notation']) ? ' has-error' : ''; ?>">
                        <label for="name" class="col-lg-3 control-label bold">Number notation:</label>
                        <div class="col-lg-9">
							<div class="radio">
								<label>
									<input type="radio" name="notation" id="notation1" value="US" <?php echo $ccount_settings['notation'] == 'US' ? 'checked="checked"' : ''; ?> > 10<b>,</b>000<b>.</b>0
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="notation" id="notation1" value="UK" <?php echo $ccount_settings['notation'] == 'UK' ? 'checked="checked"' : ''; ?> > 10<b>.</b>000<b>,</b>0
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="notation" id="notation1" value="FR" <?php echo $ccount_settings['notation'] == 'FR' ? 'checked="checked"' : ''; ?> > 10<b> </b>000<b>,</b>0
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="notation" id="notation1" value="X1" <?php echo $ccount_settings['notation'] == 'X1' ? 'checked="checked"' : ''; ?> > 10000<b>.</b>0
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="notation" id="notation1" value="X2" <?php echo $ccount_settings['notation'] == 'X2' ? 'checked="checked"' : ''; ?> > 10000<b>,</b>0
								</label>
							</div>
						</div>
						&nbsp;
					</div>
					<div class="form-group<?php echo isset($error_buffer['ignore_ips']) ? ' has-error' : ''; ?>">
						<label for="text" class="col-lg-3 control-label bold">Ignore IP addresses:</label>
						<div class="col-lg-9">
							<textarea id="ignore_ips" name="ignore_ips" rows="4" cols="30" class="form-control"><?php
							$ccount_settings['ignore_ips'] = explode(',', $ccount_settings['ignore_ips']);
							foreach ($ccount_settings['ignore_ips'] as $ip)
							{
								echo substr($ip, -1) == '.' ? $ip . "*\n" : $ip . "\n";
							}
							?></textarea/>
							<p class="help-block">Ignore hits from these IP addresses, one per line. Valid examples:<br>127.0.0.1<br>123.123.123.*</p>
						</div>
					</div>
                    <div class="form-group">
                        <div class="col-lg-offset-3 col-lg-9">
                            <input type="hidden" name="action" value="save">
							<input type="hidden" name="token" value="<?php echo pj_token_get(); ?>">
                            <button type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;Save changes</button>
                        </div>
                    </div>
                </form>
			</div>
		</div>
	</div>
</div>

<?php

// Get footer
include('admin_footer.inc.php');
