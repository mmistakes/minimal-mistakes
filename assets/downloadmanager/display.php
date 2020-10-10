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

// Set the correct MIME type
header("Content-type: text/javascript");

// Tell browsers not to cache the file output
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Start Javascript variable
echo 'var ccount={';

// Require the settings file
require 'ccount_settings.php';

// Get links database
$data = explode('//', file_get_contents($ccount_settings['db_file']), 2);

// Convert contents into an array
$ccount_database = isset($data[1]) ? unserialize($data[1]) : array();
unset($data);

// List all links in a Javascript array
foreach ($ccount_database as $id => $link)
{
	echo "'{$id}':{c:{$link['C']},u:{$link['U']}},";
}

// Print the rest of Javascript
?>'':{}};

// Outputs a formatted number to the browser
function ccount_write(sum)
{
	document.write(sum.formatThousands('<?php echo $ccount_settings['notation']; ?>'));
}

// Displays total clicks for an ID
function ccount_display(id)
{
	ccount_write(ccount[id]['c']);
}

// Displays unique clicks for an ID
function ccount_unique(id)
{
	ccount_write(ccount[id]['u']);
}

// Sums total clicks for IDs passed as arguments
function ccount_sum()
{
	var sum = 0;

	for (var i=0; i<arguments.length; i++) { // >
		if (typeof ccount[arguments[i]]!=='undefined') {
			sum += ccount[arguments[i]]['c'];
		}
	}

	ccount_write(sum);
}

// Sums unique clicks for IDs passed as arguments
function ccount_sum_unique()
{
	var sum = 0;

	for (var i=0; i<arguments.length; i++) { // >
		if (typeof ccount[arguments[i]]!=='undefined') {
			sum += ccount[arguments[i]]['u'];
		}
	}

	ccount_write(sum);
}

// Displays total clicks count
function ccount_total()
{
	var sum = 0;

	for (var key in ccount) {
		if (ccount.hasOwnProperty(key) && key !== '') {
			sum += ccount[key]['c'];
		}
	}

	ccount_write(sum);
}

// Displays total unique clicks count
function ccount_total_unique()
{
	var sum = 0;

	for (var key in ccount) {
		if (ccount.hasOwnProperty(key) && key !== '') {
			sum += ccount[key]['u'];
		}
	}

	ccount_write(sum);
}

// Adds a thousands separator to a number
Number.prototype.formatThousands = function(notation)
{
	var n = this, separator = "";
	switch (notation)
	{
		case "US":
			separator = ",";
			break;
		case "UK":
			separator = ".";
			break;
		case "FR":
			separator = " ";
			break;
		default:
			return n;
	}
	n = parseInt(n) + "";
	j = (j = n.length) > 3 ? j % 3 : 0;
	return (j ? n.substr(0, j) + separator : "") + n.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + separator);
}
