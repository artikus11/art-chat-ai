import apiFetch from '@wordpress/api-fetch';

class SyncService {

	static async syncToApi() {

		try {
			const result = await apiFetch( {
				path: '/acai/v1/sync-additional',
				method: 'POST'
			} );

			console.log( 'SyncService:syncToApi' );
			console.log( result );

			return {
				success: true,
				message: result.message || 'База знаний успешно обновлены'
			};
		} catch ( error ) {
			return {
				success: false,
				message: 'Ошибка соединения: ' + error.message
			};
		}
	}

	static async pingToApi() {
		try {
			const result = await apiFetch( {
				path: '/acai/v1/ping',
				method: 'GET',
			} );

			console.log( 'SyncService:pingToApi' );
			console.log( result );

			return {
				success: true,
				message: result.message || 'Успешное соединение'
			};
		} catch ( error ) {
			return {
				success: false,
				message: 'Ошибка соединения: ' + error.message
			};
		}
	}

	static async getAllAdditionals() {
		try {
			const result = await apiFetch( {
				path: '/acai/v1/all-additionals',
				method: 'GET',
			} );
			console.log( 'SyncService:getAllAdditionals' );
			console.log( result );
			return {
				success: true,
				message: result.message || 'Дополнения получены'
			};
		} catch ( error ) {
			return {
				success: false,
				message: 'Ошибка соединения: ' + error.message
			};
		}
	}

	static async getAdditional() {
		try {
			const result = await apiFetch( {
				path: '/acai/v1/additional',
				method: 'GET',
			} );

			console.log( 'SyncService:getAdditional' );
			console.log( result );
			return {
				success: true,
				message: result.message || 'Успешное соединение'
			};
		} catch ( error ) {
			return {
				success: false,
				message: 'Ошибка соединения: ' + error.message
			};
		}
	}

	static async addAdditional() {
		try {
			const result = await apiFetch( {
				path: '/acai/v1/additional',
				method: 'POST',
			} );

			console.log( 'SyncService:addAdditional' );
			console.log( result );
			return {
				success: true,
				message: result.message || 'Файл создан'
			};
		} catch ( error ) {
			return {
				success: false,
				message: 'Ошибка соединения: ' + error.message
			};
		}
	}

	static async updateAdditional() {
		try {
			const result = await apiFetch( {
				path: '/acai/v1/additional',
				method: 'PUT',
			} );

			console.log( 'SyncService:updateAdditional' );
			console.log( result );
			return {
				success: true,
				message: result.message || 'Данные обновлены'
			};
		} catch ( error ) {
			return {
				success: false,
				message: 'Ошибка соединения: ' + error.message
			};
		}
	}

	static async deleteAdditional() {
		try {
			const result = await apiFetch( {
				path: '/acai/v1/additional',
				method: 'PUT',
			} );

			console.log( 'SyncService:deleteAdditional' );
			console.log( result );
			return {
				success: true,
				message: result.message || 'Данные удалены'
			};
		} catch ( error ) {
			return {
				success: false,
				message: 'Ошибка соединения: ' + error.message
			};
		}
	}
}

export default SyncService;