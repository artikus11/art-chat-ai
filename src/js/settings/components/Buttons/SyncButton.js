
import { Button } from '@wordpress/components';
import SettingsService from '../../services/SettingsService';
import { useDispatch } from '@wordpress/data';

const SyncButton = () => {
	//const { createNotice } = useDispatch('core/notices');

	const handleSync = async () => {
		try {
			const response = await SettingsService.syncToChatbot();
			createNotice('Синхронизация успешна!', { type: 'snackbar', status: 'success' });
		} catch (error) {
			createNotice('Ошибка синхронизации: ' + error.message, { type: 'snackbar', status: 'error' });
		}
	};

	return (
		<Button
			variant="secondary">
			Синхронизировать с ботом
		</Button>
	);
};

export default SyncButton;