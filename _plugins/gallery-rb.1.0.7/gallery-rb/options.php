<?php
/*  
 * RB Gallery
 * Author:            rbplugins
 */

if( !defined('WPINC') || !defined("ABSPATH") ){
	die();
}


if ( isset( $_POST['submit'] ) ) {

	check_admin_referer( 'gallery-rb-options' );

	$this->options['enable'] = ( $_POST['mode'] == 'enableOverwrite' );

	$this->options['cols'] = (int) $_POST['cols'];

	if( isset($_POST['size'])  ){
		switch ( $_POST['size'] ){
			case 'medium':
					$this->options['size'] = 'medium';
				break;
			case 'large':
					$this->options['size'] = 'large';
				break;
			case 'thumbnail':
					$this->options['size'] = 'thumbnail';
				break;
			case 'full':
					$this->options['size'] = 'full';
				break;
		} 
	} else $this->options['size'] = '';

	$this->save_options();
}
?>
<style> .indent {padding-left: 2em} </style>
<div class="wrap">
	<h1><?php _e( 'Gallery RB', 'gallery-rb'); ?></h1>
	<p>
		Here you can configure gallery rb.
	</p>
	<form action="" method="post" id="disable-comments">

		<table class="form-table">
			<tr>
				<th scope="row"><?php _e('Gallery Overwrite') ?></th>
				<td>
					<fieldset>
						<label for="enableOverwrite">
							<input type="radio" id="enableOverwrite" name="mode" value="enableOverwrite" <?php checked( $this->options['enable'] );?> /> 					
								<?php _e( 'Enable', 'gallery-rb'); ?>
						</label>			
						<br />
						<label for="disableOverwrite">
							<input type="radio" id="disableOverwrite" name="mode" value="disableOverwrite" <?php checked( !$this->options['enable'] );?> /> 
								<?php _e( 'Disable'); ?>
						</label>
					</fieldset>
				</td>
			</tr>
			<tr>
				<th scope="row"><?php _e('Cols count') ?></th>
				<td>
					<fieldset>
						<?php 
						for ($i=0; $i < 10; $i++) { 
							echo '
								<legend class="screen-reader-text"><span>'.($i?$i:'Auto').'</span></legend>
								<label>
									<input type="radio" '. checked( $this->options['cols']==$i, true, false) .' name="cols" value="'.$i.'"/> 
									<span>'.($i?$i:'Auto').'</span>
								</label><br />';
						} ?>
					</fieldset>
				</td>
			</tr>
			<tr>
				<th scope="row"><?php _e('Image Size') ?></th>
				<td>
					<fieldset>
						
						<legend class="screen-reader-text"><span>Off</span></legend>
						<label>
							<input type="radio" <?php checked( !$this->options['size'], true); ?> name="size" value=""/> 
							<span>Off</span>
						</label><br />
						
						<legend class="screen-reader-text"><span>Full</span></legend>
						<label>
							<input type="radio" <?php checked( $this->options['size']=='full', true); ?> name="size" value="full"/> 
							<span>Full</span>
						</label><br />

						<legend class="screen-reader-text"><span>Large</span></legend>
						<label>
							<input type="radio" <?php checked( $this->options['size']=='large', true); ?> name="size" value="large"/> 
							<span>Large</span>
						</label><br />

						<legend class="screen-reader-text"><span>Medium</span></legend>
						<label>
							<input type="radio" <?php checked( $this->options['size']=='medium', true); ?> name="size" value="medium"/> 
							<span>Medium</span>
						</label><br />

						<legend class="screen-reader-text"><span>Thumbnail</span></legend>
						<label>
							<input type="radio" <?php checked( $this->options['size']=='thumbnail', true); ?> name="size" value="thumbnail"/> 
							<span>Thumbnail</span>
						</label><br />

					</fieldset>
				</td>
			</tr>

			</table>
			
		<?php wp_nonce_field( 'gallery-rb-options' ); ?>
		<p class="submit">
			<input class="button-primary" type="submit" name="submit" value="<?php _e( 'Save Changes') ?>">
		</p>
	</form>
</div>
