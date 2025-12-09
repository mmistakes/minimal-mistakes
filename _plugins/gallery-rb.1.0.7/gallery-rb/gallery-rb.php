<?php
/*
Plugin Name: Gallery RB
Plugin URI: https://profiles.wordpress.org/rbplugins#content-plugins
Description: Gallery plugin create grid layout for your photos in post/page. Galley rb have functionality to rewrite settings of standard wordpress gallery.
Version: 1.0.7
Author: Gallery RB Plugins
Author URI: https://profiles.wordpress.org/rbplugins
License: GPL2
Text Domain: gallery-rb
Domain Path: /languages/
*/

if( !defined('WPINC') || !defined("ABSPATH") ) die();

define("GALLERY_RB_CONST_PATH", 	plugin_dir_path( __FILE__ ) );
define("GALLERY_RB_CONST_VERSION", 	'1.0.7' );

include_once( GALLERY_RB_CONST_PATH .'class-gallery-rb.php');

$Gallert_RB = new Robo_Gallery_RB();
