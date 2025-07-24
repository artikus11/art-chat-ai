<?php
/**
 * Class Utils
 */

namespace Art\ChatAi\Helpers;

/**
 * Class Utils
 */
class Utils {

	/**
	 * Get plugin path.
	 *
	 * @return string
	 */
	public static function get_plugin_path(): string {

		return constant( 'ACA_PLUGIN_DIR' );
	}


	/**
	 * Get plugin version.
	 *
	 * @return string
	 */
	public static function get_plugin_version(): string {

		return constant( 'ACA_PLUGIN_VER' );
	}


	/**
	 * Get plugin URL.
	 *
	 * @return string
	 */
	public static function get_plugin_url(): string {

		return constant( 'ACA_PLUGIN_URI' );
	}


	/**
	 * Get plugin slug.
	 *
	 * @return string
	 */
	public static function get_plugin_slug(): string {

		return constant( 'ACA_PLUGIN_SLUG' );
	}


	/**
	 * Get plugin file.
	 *
	 * @return string
	 */
	public static function get_plugin_file(): string {

		return constant( 'ACA_PLUGIN_AFILE' );
	}


	/**
	 * Get plugin base name.
	 *
	 * @return string
	 */
	public static function get_plugin_basename(): string {

		return plugin_basename( ACA_PLUGIN_FILE );
	}


	/**
	 * Get plugin title.
	 *
	 * @return string
	 */
	public static function get_plugin_title(): string {

		return constant( 'ACA_PLUGIN_NAME' );
	}


	/**
	 * Get plugin prefix.
	 *
	 * @return string
	 */
	public static function get_plugin_prefix(): string {

		return constant( 'ACA_PLUGIN_PREFIX' );
	}


	/**
	 * @return string
	 */
	public static function get_minified_suffix(): string {

		return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
	}
}
