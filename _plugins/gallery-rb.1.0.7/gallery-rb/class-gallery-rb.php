<?php
/*  
 * RB Gallery
 * Author:            rbplugins
 */

if( !defined('WPINC') || !defined("ABSPATH") ){
	die();
}


class Robo_Gallery_RB {

	private $options;
	private $options_name = 'gallery_rb';
	private $modified_types = array();
	private $active= 0;


	public function __construct() {
		$this->options = get_option( $this->options_name , array() );
		
		if( isset($this->options['enable']) && $this->options['enable'] ) $this->active = 1;

		$this->hooks();
	}



	private function save_options() {
		update_option( $this->options_name, $this->options );
	}


	private function hooks() {
		if($this->active){
			add_filter( 'shortcode_atts_gallery', array( $this, 'shortcode_atts_gallery' ), 999, 3 );	
		}
		
		add_action( 'plugins_loaded', array( $this, 'register_text_domain' ) );

		if( is_admin() ) {
			add_action( 'admin_menu', array( $this, 'settings_menu' ) );
			add_filter( 'plugin_action_links', array( $this, 'plugin_actions_links'), 10, 2 );
		}

		if( !$this->active && is_admin() ) {
			add_action( 'all_admin_notices', array( $this, 'setup_notice' ) );
		}
	}

	public function shortcode_atts_gallery( $out, $pair, $atts ){
		if( isset($this->options['cols']) ) $out['columns'] = $this->options['cols'];
		if( isset($this->options['size']) ) $out['size'] = $this->options['size'];
		return $out;
	}


	public function register_text_domain() {
		load_plugin_textdomain( 'gallery-rb', false, GALLERY_RB_CONST_PATH . 'languages' );
	}

	
	private function settings_page_url() {
		return add_query_arg( 'page', 'rb_gallery_settings', admin_url( 'options-general.php' ) );
	}


	public function setup_notice(){
		if( strpos( get_current_screen()->id, 'settings_page_rb_gallery_settings' ) === 0 )
			return;
		$hascaps = current_user_can( 'manage_options' );
		if( $hascaps ) {
			echo '<div class="updated fade"><p>' . sprintf( __( 'The <em>Gallery RB</em> plugin is active, but isn\'t configured to do anything yet. Visit the <a href="%s">configuration page</a> to choose options to setup.', 'gallery-rb'), esc_attr( $this->settings_page_url() ) ) . '</p></div>';
		}
	}



	public function plugin_actions_links( $links, $file ) {
		static $plugin;

		if( $file == 'gallery-rb/gallery-rb.php' && current_user_can('manage_options') ) {
			array_unshift(
				$links,
				sprintf( '<a href="%s">%s</a>', esc_attr( $this->settings_page_url() ), __( 'Settings' ) )
			);
		}

		return $links;
	}


	public function settings_menu() {
		$title = __( 'RB Gallery', 'gallery-rb' );
		add_submenu_page( 'options-general.php', $title, $title, 'manage_options', 'rb_gallery_settings', array( $this, 'options' ) );
	}


	public function options() {
		include( GALLERY_RB_CONST_PATH .'options.php');
	}

}