import apiFetch from '@wordpress/api-fetch';

class SyncService {

	static async syncToApi() {
		return await apiFetch( {
			path: '/acai/v1/sync',
			method: 'POST'
		} );
	}

	static async pingToApi() {
		try {
			await apiFetch( {
				path: '/acai/v1/ping'
			} );

			return { success: true, message: 'Успешное соединение' };
		} catch ( error ) {
			return { success: false, message: 'Ошибка соединения: ' + error.message };
		}
	}

	static async getAllAdditionals() {
		try {
			const result = await apiFetch( {
				path: '/acai/v1/all-additionals',
				method: 'GET',
			} );

			console.log( 'SyncService: ' + result );
			return { success: true, message: 'Успешное получение' };
		} catch ( error ) {
			return { success: false, message: 'Ошибка соединения: ' + error.message };
		}
	}
}

export default SyncService;