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

// Tell browsers not to cache the file output
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Require the settings file
require 'ccount_settings.php';

// Get the link ID; valid chars for the link ID are: 0-9 a-z A-Z - . and _
$id = isset($_REQUEST['id']) ? preg_replace('/[^0-9a-zA-Z_\-\.]/', '', $_REQUEST['id']) : die('Missing link ID');

// Open database file for reading and writing 
if ($fp = @fopen($ccount_settings['db_file'], 'r+'))
{
	// Lock database file from other scripts
	$locked = flock($fp, LOCK_EX);

	// Lock successful?
	if ($locked)
	{
		// Read file
		$data = explode('//', fread($fp, filesize($ccount_settings['db_file'])), 2);

		// Convert contents into an array
		$ccount_database = isset($data[1]) ? unserialize($data[1]) : die('Invalid log file');

		// Is this a valid link?
		if ( ! isset($ccount_database[$id]) )
		{
			die('Link with this ID not found');
		}

		// Check for excluded IP
		$ignore = false;
		$ccount_settings['ignore_ips'] = explode(',', $ccount_settings['ignore_ips']);
		foreach ($ccount_settings['ignore_ips'] as $ip)
		{
			if(strpos($_SERVER['REMOTE_ADDR'], $ip) === 0)
			{
				$ignore = true;
				break;
			}
		}

		if ( ! $ignore)
		{
			// Increse count by 1
			$ccount_database[$id]['C']++;

			// Is this a unique click or not?
			if ( ! isset($_COOKIE['ccount_unique_'.$id]) )
			{
				$ccount_database[$id]['U']++;
			}
		}

		// Update the database file
		rewind($fp);
		fwrite($fp, "<?php die();//" . serialize($ccount_database));
	}
	else
	{
		// Lock not successful. Better to ignore than to damage the log file
		die('Error locking file, please try again later.');
	}

	// Release file lock and close file handle
	flock($fp, LOCK_UN);
	fclose($fp);
}

// Print the cookie  for counting unique clicks and P3P compact privacy policy
header('P3P: CP="NOI NID"');
setcookie('ccount_unique_'.$id, 1, time() + 3600 * $ccount_settings['unique_hours']);

// Redirect to the link URL
header('Location: ' . str_replace('&amp;', '&', $ccount_database[$id]['L']) );
die();
