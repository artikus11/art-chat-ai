<?php
/**
 * Plugin Name: Art Chat Ai
 * Plugin URI: https://wpruse.ru/my-plugins/art-feedback-button/
 * Text Domain: art-chat-ai
 * Domain Path: /languages
 * Description: Плагин чата подбора товаров
 * Version: 1.3.0
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

const ACA_PLUGIN_DIR   = __DIR__;
const ACA_PLUGIN_AFILE = __FILE__;

const ACA_PLUGIN_VER    = '1.3.0';
const ACA_PLUGIN_NAME   = 'Art Chat Ai';
const ACA_PLUGIN_SLUG   = 'art-chat-ai';
const ACA_PLUGIN_PREFIX = 'acai';

define( 'ACA_PLUGIN_URI', untrailingslashit( plugin_dir_url( ACA_PLUGIN_AFILE ) ) );
define( 'ACA_PLUGIN_FILE', plugin_basename( __FILE__ ) );

require ACA_PLUGIN_DIR . '/vendor/autoload.php';

if ( ! function_exists( 'acai' ) ) {
	/**
	 * @return object Main class object.
	 * @since 1.0.0
	 */
	function acai(): object {

		return \Art\ChatAi\Main::instance();
	}
}

acai();


