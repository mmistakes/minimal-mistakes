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
define('THIS_PAGE', 'DASHBOARD');

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

// Get links
if ( file_exists($ccount_settings['db_file']) )
{
	// Get links database
	$data = explode('//', file_get_contents($ccount_settings['db_file']), 2);

	// Convert contents into an array
	$ccount_database = isset($data[1]) ? unserialize($data[1]) : array();
	unset($data);

	// Any special actions?
	$action = pj_GET('action');

	if ($action && pj_token_check() )
	{
		// Check demo mode
		pj_demo();

		// Link ID
		$modified_id = preg_replace('/[^0-9a-zA-Z_\-\.]/', '', pj_GET('id') );

		// Link ID exists?
		if ( $action != 'reset_all' && ( strlen($modified_id) < 1 || ! isset($ccount_database[$modified_id]) ) )
		{
			$_SESSION['PJ_MESSAGES']['ERROR'] = 'Invalid link ID';
			header('Location: admin.php');
			exit();
		}

		// Do the action
		if ($action == 'reset')
		{
			$ccount_database[$modified_id]['C'] = 0;
			$ccount_database[$modified_id]['U'] = 0;
			$success_message = 'Link with ID ' . $modified_id . ' has been reset';
		}
		elseif ($action == 'delete')
		{
			unset($ccount_database[$modified_id]);
			$success_message = 'Link with ID ' . $modified_id . ' has been deleted';
		}
		elseif ($action == 'reset_all')
		{
			foreach ($ccount_database as $id => $link)
			{
				$ccount_database[$id]['C'] = 0;
				$ccount_database[$id]['U'] = 0;
			}
			$success_message = 'Clicks for all links have been reset to 0';
		}
		else
		{
			$_SESSION['PJ_MESSAGES']['ERROR'] = 'Invalid action';
			header('Location: admin.php');
			exit();
		}

		// Update database file
		if ( @file_put_contents($ccount_settings['db_file'], "<?php die();//" . serialize($ccount_database), LOCK_EX) === false)
		{
			$_SESSION['PJ_MESSAGES']['ERROR'] = 'Error writing to database file, please try again later.';
		}
		else
		{
			$_SESSION['PJ_MESSAGES']['SUCCESS'] = $success_message;
		}

		// Redirect
		header('Location: admin.php');
		exit();

	} // END if $action
}

// Require admin header
require 'admin_header.inc.php';

?>

<?php pj_processMessages(); ?>

<div class="row">
	<div class="col-lg-12">
		<div class="panel panel-default" style="min-height: 300px">

			<?php
			// No links yet
			if ( ! isset($ccount_database) )
			{
				?>
				<div class="panel-body">
					<?php pj_showError('The database file is missing: '.$ccount_settings['db_file']); ?>
				</div>
				<?php
			}
			// No links yet
			elseif ( count($ccount_database) == 0 )
			{
				?>
				<div class="panel-body">
					<p>You are not counting any clicks yet.</p>
					<p><a href="new_link.php" class="text-center"><i class="glyphicon glyphicon-plus"></i>&nbsp;Click here to add a new link</a></p>
				</div>
				<?php
			}
			else
			{
				$table_rows = '';
                $total = 0;
                $total_unique = 0;
                $max = 1;

                foreach ($ccount_database as $id => $link)
                {
					$total += $link['C'];
                    $total_unique += $link['U'];

                    if ($link['C'] > $max)
                    {
                    	$max = $link['C'];
                    }
                }

                reset($ccount_database);

				foreach ($ccount_database as $id => $link)
				{
					$graph = round( $link['C']/$max * 100 );
					$graph = $link['C'] > 0 && $graph == 0 ? 1 : $graph;

					$link['T'] = strlen($link['T']) ? $link['T'] : ( strlen($link['L']) > 30 ? 'Click to visit' : $link['L']);

					$table_rows .= '
					<tr>
					<td>'.$id.'</td>
					<td>'.$link['D'].'</td>
					<td>'.pj_formatNumber($link['C']).'</td>
					<td>'.pj_formatNumber($link['U']).'</td>
					<td><a href="'.$link['L'].'">'.$link['T'].'</a></td>
					<td style="width:200px">
						<div class="progress">
							<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'.$link['C'].'" aria-valuemin="0" aria-valuemax="'.$max.'" style="width: '.$graph.'%">
							</div>
						</div>
					</td>
					<td class="text-center button_group_linkman" style="width:126px">
						<a href="edit_link.php?id='.$id.'" class="btn btn-default btn-xs" title="Edit"><i class="glyphicon glyphicon-pencil"></i></a>
						<a href="javascript:void(0)" onclick="document.getElementById(\'modaltxt\').value=\''.addslashes($ccount_settings['click_url'] . '?id=' . $id).'\';$(\'#modal\').modal(\'show\');" class="genlink btn btn-info btn-xs" title="Generate URL"><i class="glyphicon glyphicon-link"></i></a>
						<a href="admin.php?action=reset&amp;id='.$id.'&amp;token='.pj_token_get().'" class="btn btn-warning btn-xs" title="Reset" onclick="return confirm(\'Reset click count to 0?\');"><i class="glyphicon glyphicon-off"></i></a>
						<a href="admin.php?action=delete&amp;id='.$id.'&amp;token='.pj_token_get().'" class="btn btn-danger btn-xs" title="Delete" onclick="return confirm(\'Are you sure you want to delete this link?\');"><i class="glyphicon glyphicon-remove"></i></a>
					</td>
					</tr>
					';
				}

				?>
				<div class="table-responsive">

					<table class="table" id="linklist">

						<thead>
							<tr class="text-center">
							<th>ID</th>
							<th>Added</th>
							<th>Clicks (total)</th>
							<th>Clicks (unique)</th>
							<th>Link</th>
							<th>Graph</th>
							<th onclick="$('#modalLegend').modal('show');">Tools <a href="javascript:void(0)" title="Legend" style="float:right;"><span class="glyphicon glyphicon-question-sign"></span></a> </th>
							</tr>
						</thead>

						<tbody>
							<?php echo $table_rows; ?>
						</tbody>

						<tfoot>
							<tr>
								<th colspan="7" class="ts-pager form-horizontal">
									<button type="button" class="btn first"><i class="icon-step-backward glyphicon glyphicon-step-backward"></i></button>
									<button type="button" class="btn prev"><i class="icon-arrow-left glyphicon glyphicon-backward"></i></button>
									<span class="pagedisplay"></span>
									<button type="button" class="btn next"><i class="icon-arrow-right glyphicon glyphicon-forward"></i></button>
									<button type="button" class="btn last"><i class="icon-step-forward glyphicon glyphicon-step-forward"></i></button>
									<select class="pagesize input-mini" title="Select page size">
										<option value="10">10</option>
										<option selected="selected" value="20">20</option>
										<option value="30">30</option>
										<option value="40">40</option>
									</select>
									<select class="pagenum" title="Select page number"></select>
								</th>
							</tr>
						</tfoot>

					</table>

				</div>

				&nbsp;

				<dl class="dl-horizontal">
					<dt>Total clicks:</dt>
					<dd><b><?php echo pj_formatNumber($total); ?></b> &nbsp; (<?php echo pj_formatNumber($total / count($ccount_database), 1); ?> per link)</dd>
					<dt>Total unique clicks:</dt>
					<dd><b><?php echo pj_formatNumber($total_unique); ?></b> &nbsp; (<?php echo pj_formatNumber($total_unique / count($ccount_database), 1); ?> per link)</dd>
					<dt>&nbsp;</dt>
					<dd>&nbsp;<br /><?php echo '<a href="admin.php?action=reset_all&amp;token='.pj_token_get().'" class="btn btn-warning btn-xs" title="Reset all clicks to 0" onclick="return confirm(\'Reset click count for ALL links to 0?\');"><i class="glyphicon glyphicon-off"></i> Reset all clicks to 0</a>'; ?></dd>
				</dl>

				<!-- Modal HELP -->
				<div class="modal fade" id="modalLegend" tabindex="-1" role="dialog" aria-labelledby="Legend" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								<a class="btn btn-default btn-xs"><i class="glyphicon glyphicon-pencil"></i></a> = edit link<br />&nbsp;<br />
								<a class="btn btn-info btn-xs"><i class="glyphicon glyphicon-link"></i></a> = generate click tracking URL<br />&nbsp;<br />
								<a class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-off"></i></a> = reset count to 0<br />&nbsp;<br />
								<a class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-remove"></i></a> = delete link
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Modal -->
				<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="Generated_URL" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								Use this URL to count clicks on the link:<br />&nbsp;<br />
								<textarea id="modaltxt" style="width:100%"></textarea>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>

				<?php
			} // END if $ccount_database > 0
			?>

		</div>
	</div>
</div>

<?php

$settings['pj_license']('WYgKCFmaWxlX2V4aXN0cygnLi4vY2NvdW50X2xpY2Vuc2UucGhwJykp
DQp7DQplY2hvICcNCg0KPGRpdiBjbGFzcz0icm93Ij4NCgk8ZGl2IGNsYXNzPSJjb2wtbGctMTIiPg0K
CQk8ZGl2IGNsYXNzPSJwYW5lbCBwYW5lbC13YXJuaW5nIj4NCgkJCTxkaXYgY2xhc3M9InBhbmVsLWhl
YWRpbmciPg0KCQkJCTxoMyBjbGFzcz0icGFuZWwtdGl0bGUiPlN1cHBvcnQgZGV2ZWxvcG1lbnQsIGJ1
eSBhIGxpY2Vuc2U8L2gzPg0KCQkJPC9kaXY+DQoJCQk8ZGl2IGNsYXNzPSJwYW5lbC1ib2R5Ij4NCgkJ
CQk8cD5BIGxvdCBvZiB0aW1lIGFuZCBlZmZvcnQgd2VudCBpbnRvIGRldmVsb3BpbmcgQ0NvdW50LiBT
dXBwb3J0IG1lIGJ5IHB1cmNoYXNpbmcgYSBsaWNlbnNlIHRoYXQgcmVtb3ZlcyAmcXVvdDtQb3dlcmVk
IGJ5JnF1b3Q7IGNyZWRpdHMgZnJvbSB0aGUgc2NyaXB0ITwvcD4NCgkJCQk8cD48YSBocmVmPSJodHRw
Oi8vd3d3LnBocGp1bmt5YXJkLmNvbS9idXkucGhwP3NjcmlwdD1jY291bnQiIGNsYXNzPSJ0ZXh0LWNl
bnRlciI+DQoJCQkJPGkgY2xhc3M9ImdseXBoaWNvbiBnbHlwaGljb24tdGh1bWJzLXVwIj48L2k+Jm5i
c3A7Q2xpY2sgaGVyZSB0byBzdXBwb3J0IHRoaXMgc2NyaXB0PC9hPjwvcD4NCgkJCTwvZGl2Pg0KCQk8
L2Rpdj4NCgk8L2Rpdj4NCjwvZGl2Pg0KDQonOw0KfQ==',"\141");

// Get footer
include('admin_footer.inc.php');
