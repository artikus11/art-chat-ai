import apiFetch from '@wordpress/api-fetch';

class SettingsService {
	static async getSettings() {
		try {
			const data = await apiFetch( { path: '/wp/v2/settings' } );
			return data[ 'acai_settings' ] || {};
		} catch ( error ) {
			console.error( 'Ошибка загрузки настроек:', error );
			throw error;
		}
	}

	static async saveSettings( settings ) {

		try {
			await apiFetch( {
				path: '/wp/v2/settings',
				method: 'POST',
				data: { acai_settings: settings },
			} );
			return { success: true, message: 'Настройки сохранены!' };
		} catch ( error ) {
			return { success: false, message: 'Ошибка сохранения: ' + error.message };
		}
	}
}

export default SettingsService;