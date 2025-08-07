import ApiService from './ApiService';

class SyncService extends ApiService {

	constructor() {
		super( '/acai/v1' );
	}

	async syncToApi() {
		return this._makeRequest( {
			endpoint: 'sync-additional',
			method: 'POST',
			successMessage: 'База знаний успешно обновлена',
		} );
	}

	async pingToApi() {
		return this._makeRequest( {
			endpoint: 'ping',
			method: 'GET',
			successMessage: 'Соединение с сервером установлено',
		} );
	}

	async getAllAdditionals() {
		return this._makeRequest( {
			endpoint: 'all-additionals',
			method: 'GET',
			successMessage: 'Список дополнений успешно получен',
		} );
	}

	async getAdditional() {
		return this._makeRequest( {
			endpoint: 'additional',
			method: 'GET',
			successMessage: 'Дополнение успешно получено',
		} );
	}

	async addAdditional() {
		return this._makeRequest( {
			endpoint: 'additional',
			method: 'POST',
			successMessage: 'Файл успешно создан',
		} );
	}

	async updateAdditional() {
		return this._makeRequest( {
			endpoint: 'additional',
			method: 'PUT',
			successMessage: 'Файл успешно обновлен',
		} );
	}

	async deleteAdditional() {
		return this._makeRequest( {
			endpoint: 'additional',
			method: 'DELETE',
			successMessage: 'Файл успешно удален',
		} );
	}

	async changeKey() {

		return this._makeRequest( {
			endpoint: 'change-key',
			method: 'POST',
			successMessage: 'Ключ успешно изменен',
		} );
	}
}

export default SyncService;