<?php
/**
 * Plugin Name: Art Chat Ai
 * Plugin URI: https://wpruse.ru/my-plugins/art-feedback-button/
 * Text Domain: art-feedback-button
 * Domain Path: /languages
 * Description: Плагин чата подбора товаров
 * Version: 1.0.0
 * Author: Artem Abramovich
 * Author URI: https://wpruse.ru/
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * RequiresWP: 6.0
 * RequiresPHP: 7.4
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const ACA_PLUGIN_DIR = __DIR__;
const ACA_PLUGIN_AFILE = __FILE__;
define( 'ACA_PLUGIN_URI', plugin_dir_url( __FILE__ ) );
define( 'ACA_PLUGIN_FILE', plugin_basename( __FILE__ ) );
const ACA_PLUGIN_VER = '1.0.0';

require ACA_PLUGIN_DIR . '/vendor/autoload.php';

