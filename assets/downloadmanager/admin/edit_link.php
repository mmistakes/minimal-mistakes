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
define('THIS_PAGE', 'EDITLINK');

// Require the settings file
require '../ccount_settings.php';

// Load functions
require '../inc/common.inc.php';

// Start session
pj_session_start();

// Are we logged in?
pj_isLoggedIn(true);

// The settings file is in parent folder
$ccount_settings['db_file'] = '../' . $ccount_settings['db_file'];

// Pre-set values
$error_buffer = array();
$warn_new_link = false;

// Get links database
$data = explode('//', file_get_contents($ccount_settings['db_file']), 2);

// Convert contents into an array
$ccount_database = isset($data[1]) ? unserialize($data[1]) : array();
unset($data);

// Link ID
$id_old = preg_replace('/[^0-9a-zA-Z_\-\.]/', '', pj_REQUEST('id') );

// Link ID exists?
if ( strlen($id_old) < 1 || ! isset($ccount_database[$id_old]) )
{
	$_SESSION['PJ_MESSAGES']['ERROR'] = 'Invalid link ID';
	header('Location: admin.php');
	exit();
}

$id_new = $id_old;

// Add a new link?
if ( pj_POST('action') == 'save' && pj_token_check() )
{
	// Check demo mode
	pj_demo('edit_link.php?id='.$id_old);

	// Link URL
	$ccount_database[$id_old]['L'] = pj_validateURL( pj_POST('url') ) or $error_buffer['url'] = 'Enter a valid URL address.';

	// Link title
	$ccount_database[$id_old]['T'] = stripslashes( pj_input( pj_POST('title') ) ) or $title = '';

	// Link ID
	$id_new = pj_input( pj_POST('newid') );

	// Check ID syntax
	if ( preg_match('/[^0-9a-zA-Z_\-\.]/', $id_new) )
	{
		$error_buffer['id'] = 'Invalid link ID. Leave it empty or use only these chars: a-z A-Z 0-9 _ - .';
	}
	// ID is not empty and has been modified
	elseif ( strlen($id_new) > 0 && $id_new != $id_old)
	{
		// A duplicate ID?
		if ( isset($ccount_database[$id_new]) )
		{
			$error_buffer['id'] = 'Link with this ID already exists! Each link requires a unique ID (leave empty to use current one).';
		}
		// Use new ID, but show notice that tracking URL has changed.
		else
		{
			$warn_new_link = true;
		}
	}

    // Total clicks
    $ccount_database[$id_old]['C'] = intval( pj_POST('total', 0) );

    // Unique clicks
    $ccount_database[$id_old]['U'] = intval( pj_POST('unique', 0) );

    // If no errors, save changes
	if ( count($error_buffer) == 0 )
    {
		// Replace ID?
		if ($warn_new_link)
		{
			$ccount_database = pj_array_key_replace($ccount_database, $id_old, $id_new);
		}

		// Update database file
		if ( @file_put_contents($ccount_settings['db_file'], "<?php die();//" . serialize($ccount_database), LOCK_EX) === false)
		{
			$_SESSION['PJ_MESSAGES']['ERROR'] = 'Error writing to database file, please try again later.';
		}
		else
		{
			$_SESSION['PJ_MESSAGES']['SUCCESS'] = 'Link changes saved.';

			if ($warn_new_link)
			{
				$_SESSION['PJ_MESSAGES']['WARNING'] = 'Link ID has changed to: <b>'.$id_new.'</b><br /><br />' .
				'<b>Make sure you update your tracking link to use the new ID:</b><br />' .
				'<input value="' . $ccount_settings['click_url'] . '?id=' . $id_new . '" class="form-control" />';
			}

			header('Location: admin.php');
			exit();
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
				<h3 class="panel-title">Editing link ID <?php echo $id_old; ?></h3>
			</div>
			<div class="panel-body">
                <form action="edit_link.php" method="post" name="addlinkform" class="form-horizontal">
                    <div class="form-group<?php echo isset($error_buffer['url']) ? ' has-error' : ''; ?>">
                        <label for="url" class="col-lg-3 control-label bold">Link URL:</label>
                        <div class="col-lg-9">
                            <input type="url" id="url" name="url" value="<?php echo $ccount_database[$id_old]['L']; ?>" size="50" maxlength="255" class="form-control" placeholder="http://www.example.com">
                            <p class="help-block"><?php echo isset($error_buffer['url']) ? $error_buffer['url'] : 'URL of the link you wish to count clicks on.'; ?></p>
                        </div>
                    </div>
                    <div class="form-group<?php echo isset($error_buffer['title']) ? ' has-error' : ''; ?>">
                        <label for="title" class="col-lg-3 control-label">Link title:</label>
                        <div class="col-lg-9">
                            <input type="text" id="title" name="title" value="<?php echo $ccount_database[$id_old]['T']; ?>" maxlength="255" size="50" class="form-control" placeholder="(optional) My page title">
                            <p class="help-block"><?php echo isset($error_buffer['title']) ? $error_buffer['title'] : 'Title of the page for the link list.'; ?></p>
                        </div>
                    </div>
                    <div class="form-group<?php echo isset($error_buffer['id']) ? ' has-error' : ''; ?>">
                        <label for="title" class="col-lg-3 control-label">Link ID:</label>
                        <div class="col-lg-9">
                            <input type="text" id="newid" name="newid" value="<?php echo $id_new; ?>" maxlength="255" size="30" class="form-control" placeholder="(optional) my_page_1">
                            <p class="help-block"><?php echo isset($error_buffer['id']) ? $error_buffer['id'] : 'Page ID for the tracking URL (click.php?id=<b>page_id</b>). Allowed chars: a-z A-Z 0-9 - _ .'; ?></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-lg-3 control-label">Clicks (total):</label>
                        <div class="col-lg-9">
                            <input type="text" id="total" name="total" value="<?php echo $ccount_database[$id_old]['C']; ?>" maxlength="10" size="5" class="form-control" style="width:80px;">
                            <p class="help-block"><?php echo isset($error_buffer['total']) ? $error_buffer['total'] : 'Total number of clicks.'; ?></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-lg-3 control-label">Clicks (unique):</label>
                        <div class="col-lg-9">
                            <input type="text" id="unique" name="unique" value="<?php echo $ccount_database[$id_old]['U']; ?>" maxlength="10" size="5" class="form-control" style="width:80px;">
                            <p class="help-block"><?php echo isset($error_buffer['unique']) ? $error_buffer['unique'] : 'Number of unique clicks.'; ?></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-offset-3 col-lg-9">
                            <input type="hidden" name="action" value="save">
							<input type="hidden" name="id" value="<?php echo $id_old; ?>">
							<input type="hidden" name="token" value="<?php echo pj_token_get(); ?>">
                            <button type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;Save changes</button>
                            <a href="admin.php" class="btn btn-default" role="button"><i class="glyphicon glyphicon-remove"></i>&nbsp;Cancel changes</a>
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

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function pj_array_key_replace($array, $key1, $key2)
{
	$keys = array_keys($array);
	$index = array_search($key1, $keys);

	if ($index !== false)
	{
		$keys[$index] = $key2;
		$array = array_combine($keys, $array);
	}

	return $array;
} // END pj_array_key_replace()
