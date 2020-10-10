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

if (!defined('IN_SCRIPT')) {die('Invalid attempt!');}

// Folder names for includes
$bootstrap_version = '3.3.6';
$tablesorter_version = '2.17.8';

// Make sure installation folder is deleted
if ( is_dir('../install') && ! defined('INSTALL') )
{
	die('STEP 1: <a href="../install">Install click counter</a><br />STEP 2: <span style="color:red">delete the <b>install</b> folder from your server for security reasons</span><br />STEP 3: <a href="index.php">Reload this page</a>');
}

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title>CCount admin panel</title>

		<!-- Bootstrap core CSS -->
		<link href="../inc/bootstrap/<?php echo $bootstrap_version; ?>/css/bootstrap.min.css" rel="stylesheet">
		<!-- Bootstrap theme -->
		<link href="../inc/bootstrap/<?php echo $bootstrap_version; ?>/css/bootstrap-theme.min.css" rel="stylesheet">

		<!-- Custom styles for this template -->
		<link href="../admin/admin.css" rel="stylesheet">

		<!-- jQuery -->
		<script src="../inc/jquery/jquery-1.12.0.min.js"></script>

		<?php
		if (THIS_PAGE == 'DASHBOARD')
		{
		?>
		<!-- Tablesorter -->
		<script src="../inc/tablesorter/<?php echo $tablesorter_version; ?>/js/jquery.tablesorter.min.js"></script>
		<script src="../inc/tablesorter/<?php echo $tablesorter_version; ?>/js/jquery.tablesorter.widgets.min.js"></script>
		<link rel="stylesheet" href="../inc/tablesorter/<?php echo $tablesorter_version; ?>/css/theme.bootstrap.css">

		<!-- Tablesorter: pager -->
		<link rel="stylesheet" href="../inc/tablesorter/<?php echo $tablesorter_version; ?>/addons/pager/jquery.tablesorter.pager.css">
		<script src="../inc/tablesorter/<?php echo $tablesorter_version; ?>/addons/pager/jquery.tablesorter.pager.min.js"></script>

		<script>
		$(function() {

			$.extend($.tablesorter.themes.bootstrap, {
				table      : 'table table-bordered',
				header     : 'bootstrap-header', // give the header a gradient background
				footerRow  : '',
				footerCells: '',
				icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
				sortNone   : 'bootstrap-icon-unsorted',
				sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',     // includes classes for Bootstrap v2 & v3
				sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down', // includes classes for Bootstrap v2 & v3
				active     : '', // applied when column is sorted
				hover      : '', // use custom css here - bootstrap class may not override it
				filterRow  : '', // filter row class
				even       : '', // odd row zebra striping
				odd        : ''  // even row zebra striping
			});

			// call the tablesorter plugin and apply the uitheme widget
			$("#linklist").tablesorter({

			theme : "bootstrap",

				widthFixed: true,

				usNumberFormat: <?php echo $ccount_settings['notation'] == 'US' ? 'true' : 'false'; ?>,

				headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

				widgets : [ "uitheme" ],

				headers: {
					// assign the secound column (we start counting zero)
					5: {
						// disable it by setting the property sorter to false
						sorter: false
					},
					6: {
						// disable it by setting the property sorter to false
						sorter: false
					},
				}

			})

			.tablesorterPager({

				// target the pager markup - see the HTML block below
				container: $(".ts-pager"),

				// target the pager page select dropdown - choose a page
				cssGoto  : ".pagenum",

				// Number of visible rows - default is 10
				size: 20,

				// remove rows from the table to speed up the sort of large tables.
				// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
				removeRows: false,

				// output string - default is '{page}/{totalPages}';
				// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
				// output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
				output: '{startRow} - {endRow} / ({totalRows})'

			});

		});
		</script>

		<?php
		} // END if DASHBOARD
		?>

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="../inc/bootstrap/<?php echo $bootstrap_version; ?>/assets/js/html5shiv.min.js"></script>
			<script src="../inc/bootstrap/<?php echo $bootstrap_version; ?>/assets/js/respond.min.js"></script>
		<![endif]-->
	</head>

	<body>

	<?php
    if (THIS_PAGE != 'INDEX')
	{
		?>
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				<div class="collapse navbar-collapse navbar-ex1-collapse">
					<ul class="nav navbar-nav">
						<li <?php echo THIS_PAGE == 'DASHBOARD' ? ' class="active"' : ''; ?> ><a href="admin.php" class="text-center">
						<i class="glyphicon glyphicon-home"></i>&nbsp;Dashboard</a></li>
						<li <?php echo THIS_PAGE == 'NEWLINK' ? ' class="active"' : ''; ?> ><a href="new_link.php" class="text-center">
						<i class="glyphicon glyphicon-plus"></i>&nbsp;New link</a></li>
						<li <?php echo THIS_PAGE == 'BACKUPS' ? ' class="active"' : ''; ?> ><a href="backups.php" class="text-center">
						<i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;Backups</a></li>
						<li <?php echo THIS_PAGE == 'INSTRUCTIONS' ? ' class="active"' : ''; ?> ><a href="instructions.php" class="text-center">
						<i class="glyphicon glyphicon-book"></i>&nbsp;Instructions</a></li>
						<li <?php echo THIS_PAGE == 'SETTINGS' ? ' class="active"' : ''; ?> ><a href="settings.php" class="text-center">
						<i class="glyphicon glyphicon-wrench"></i>&nbsp;Settings</a></li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<li><a href="index.php?logout=yes&amp;token=<?php echo pj_token_get(); ?>" class="text-center">
						<i class="glyphicon glyphicon-log-out"></i>&nbsp;Logout</a></li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div>
		</nav>
		<?php
	}
	?>

	<div class="container theme-admin">
