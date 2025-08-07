import ApiService from './ApiService';

class SettingsService extends ApiService {

	constructor() {
		super( '/wp/v2' );
		this.SETTINGS_KEY = 'acai_settings';
	}

	async getSettings() {
		const response = await this._makeRequest( {
			endpoint: 'settings',
			method: 'GET',
			successMessage: 'Настройки загружены',
		} );

		if ( response.success ) {
			return response.data[ this.SETTINGS_KEY ] || {};
		}
		throw new Error( response.message );
	}

	async saveSettings( settings ) {
		return this._makeRequest( {
			endpoint: 'settings',
			method: 'POST',
			successMessage: 'Настройки сохранены',
			body: { [ this.SETTINGS_KEY ]: settings },
		} );
	}
}

export default SettingsService;