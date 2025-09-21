/* global acai_settings*/
import apiFetch from '@wordpress/api-fetch';

class ApiService {

	constructor( basePath ) {
		this.BASE_PATH = basePath;

		if ( ! window.apiFetchInitialized ) {
			apiFetch.use( apiFetch.createNonceMiddleware( acai_settings.rest.nonce ) );
			window.apiFetchInitialized = true;
		}
	}

	/**
	 * Общий метод для API-запросов
	 * @param {Object} params
	 * @param {string} params.endpoint
	 * @param {'GET'|'POST'|'PUT'|'DELETE'} params.method
	 * @param {string} params.successMessage
	 * @param {Object} [params.body]
	 * @returns {Promise<{success: boolean, message: string, data: any}>}
	 */
	async _makeRequest( {
		                    endpoint,
		                    method,
		                    successMessage,
		                    body = undefined,
	                    } ) {
		try {
			const result = await apiFetch( {
				path: `${ this.BASE_PATH }/${ endpoint }`,
				method,
				data: body,
			} );

			console.log( `${ this.constructor.name }:${ endpoint }`, result );

			return {
				success: true,
				message: result.message || successMessage,
				data: result.data ?? result,
			};
		} catch ( error ) {
			console.error( `${ this.constructor.name } error:${ endpoint }`, error );
			return {
				success: false,
				message: error.message || 'Ошибка соединения',
				data: null,
			};
		}
	}

	static setBasePath( path ) {
		this.BASE_PATH = path;
	}
}

export default ApiService;