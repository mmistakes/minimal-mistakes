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
define('THIS_PAGE', 'BACKUPS');

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

// Download backup?
if ( pj_GET('download') && pj_token_check() )
{
	// Check demo mode
	pj_demo('backups.php');

	// Send the backup file as an attachment
	header("Pragma: "); # To fix a bug in IE when running https
	header("Cache-Control: "); # To fix a bug in IE when running https
	header('Content-Description: File Transfer');
	header('Content-Type: application/octet-stream');
	header('Content-Length: ' . filesize( $ccount_settings['db_file']) );
	header('Content-Disposition: attachment; filename=CCount_backup_'.date('Y-M-d').'.php');
	readfile($ccount_settings['db_file']);
	exit();
}

// Restore backup?
if ( pj_POST('restore') && pj_token_check() )
{
	// Check demo mode
	pj_demo('backups.php');

	// File uploaded?
	if ( empty($_FILES['backupfile']['name']) )
	{
		$_SESSION['PJ_MESSAGES']['ERROR'] = 'No backup file uploaded.';
	}
    else
    {
		$restore_existing = false;

    	// Save current contents just in case
        $existing = file_get_contents($ccount_settings['db_file']);

        // Replace existing with new file
		if ( ! move_uploaded_file($_FILES['backupfile']['tmp_name'], dirname(dirname(__FILE__)).'/'. substr($ccount_settings['db_file'], 3) ) )
		{
		    $_SESSION['PJ_MESSAGES']['ERROR'] = 'Could not copy uploaded backup file over the existing one.';
		}
        else
        {
        	// Verify backup file
			$data = explode('//', file_get_contents($ccount_settings['db_file']), 2);

            if ( ! isset($data[1]) )
            {
                $restore_existing = true;
                $_SESSION['PJ_MESSAGES']['ERROR'] = 'This is not a valid CCount backup file.';
            }
            elseif ( ($ccount_database = @unserialize($data[1]) ) === false )
            {
                $restore_existing = true;
                $_SESSION['PJ_MESSAGES']['ERROR'] = 'Could not unserialize backup data, this is not a valid CCount backup file.';
            }
            else
            {
				$_SESSION['PJ_MESSAGES']['SUCCESS'] = 'Backup file has been restored';
            }
        }

		if ($restore_existing)
        {
			// Update database file
			if ( @file_put_contents($ccount_settings['db_file'], $existing, LOCK_EX) === false)
			{
				$_SESSION['PJ_MESSAGES']['ERROR'] = 'Could not restore: Error writing to database file, please try again later.';
			}
		}

        unset($existing);
        unset($data);
    }
} // END restore backup

// Import legacy backup?
if ( pj_POST('legacy') && pj_token_check() )
{
	// Check demo mode
	pj_demo('backups.php');

	// File uploaded?
	if ( empty($_FILES['backupfile']['name']) )
	{
		$_SESSION['PJ_MESSAGES']['ERROR'] = 'No legacy backup file uploaded.';
	}
    else
    {
		$restore_existing = false;

    	// Save current contents just in case
        $existing = file_get_contents($ccount_settings['db_file']);

        // Replace existing with new file
		if ( ! move_uploaded_file($_FILES['backupfile']['tmp_name'], dirname(dirname(__FILE__)).'/'. substr($ccount_settings['db_file'], 3) ) )
		{
		    $_SESSION['PJ_MESSAGES']['ERROR'] = 'Could not copy uploaded backup file over the existing one.';
		}
        else
        {
			$data = array();

        	// Verify backup file
			$lines = file($ccount_settings['db_file']);
			foreach ($lines as $line)
			{
				$line = trim($line);
				if ( strlen($line) < 1 )
				{
					continue;
				}

				$link = explode('%%', $line, 5);
				if ( count($link) != 5 || isset($data[$link[0]]) )
				{
					continue;
				}

				$data[$link[0]] = array('D'=>$link[1],'L'=>$link[2],'C'=>$link[3],'U'=>$link[3],'T'=>$link[4],'P'=>false);
			}


            if ( count($data) == 0 )
            {
                $restore_existing = true;
                $_SESSION['PJ_MESSAGES']['ERROR'] = 'No valid CCount 1.x links found, nothing imported.';
            }
            elseif ( @file_put_contents($ccount_settings['db_file'], "<?php die();//" . serialize($data), LOCK_EX) === false )
            {
                $restore_existing = true;
                $_SESSION['PJ_MESSAGES']['ERROR'] = 'Could not restore: Error writing to database file, please try again later.';
            }
            else
            {
				$_SESSION['PJ_MESSAGES']['SUCCESS'] = 'Number of links restored from a legacy backup file: ' . count($data);
            }
        }

		if ($restore_existing)
        {
			// Update database file
			if ( @file_put_contents($ccount_settings['db_file'], $existing, LOCK_EX) === false)
			{
				$_SESSION['PJ_MESSAGES']['ERROR'] = 'Could not restore: Error writing to database file, please try again later.';
			}
		}

        unset($existing);
        unset($data);
    }
} // END import legacy

// Require admin header
require 'admin_header.inc.php';

?>

<?php pj_processMessages(); ?>

<div class="row">
	<div class="col-lg-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Download backup</h3>
			</div>
			<div class="panel-body">
				<p>You may download a backup of the links database file and restore it at any time in the future if needed.</p>
				<a href="backups.php?download=1&amp;token=<?php echo pj_token_get(); ?>" class="btn btn-primary" role="button"><i class="glyphicon glyphicon-save"></i>&nbsp;Download backup</a>
			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-lg-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Restore backup</h3>
			</div>
			<div class="panel-body">
				<form action="backups.php" method="post" enctype="multipart/form-data">
					<p>Restore a previously downloaded backup file. <span class="text-danger">This will delete any existing links!</span></p>

					<div class="form-group<?php echo empty($restore_existing) ? '' : ' has-error'; ?>">
						<label for="backupfile" class="control-label bold">Select a backup file:</label>
						<input type="file" class="input-file" id="backupfile" name="backupfile">
					</div>
					<input type="hidden" name="restore" value="1" />
					<input type="hidden" name="token" value="<?php echo pj_token_get(); ?>">
	                <button type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-open"></i>&nbsp;Restore backup</button>
                </form>
			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-lg-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Import legacy backup</h3>
			</div>
			<div class="panel-body">
				<form action="backups.php" method="post" enctype="multipart/form-data">
					<p>Import a CCount version 1.x backup file. <span class="text-danger">This will delete any existing links!</span></p>

					<div class="form-group<?php echo empty($restore_existing) ? '' : ' has-error'; ?>">
						<label for="backupfile" class="control-label bold">Select a backup file:</label>
						<input type="file" class="input-file" id="backupfile" name="backupfile">
					</div>
					<input type="hidden" name="legacy" value="1" />
					<input type="hidden" name="token" value="<?php echo pj_token_get(); ?>">
	                <button type="submit" class="btn btn-primary"><i class="glyphicon glyphicon-open"></i>&nbsp;Import legacy backup</button>
                </form>
			</div>
		</div>
	</div>
</div>

<?php

// Get footer
include('admin_footer.inc.php');
