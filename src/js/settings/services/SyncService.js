import apiFetch from '@wordpress/api-fetch';

class SyncService {

	static async syncToApi() {
		return await apiFetch( {
			path: '/acai/v1/sync',
			method: 'POST'
		} );
	}

	static async pingToApi( apiKey ) {
		return await apiFetch( {
			path: '/acai/v1/ping',
			method: 'GET',
			data: { api_key: apiKey }
		} );
	}
}

export default SyncService;