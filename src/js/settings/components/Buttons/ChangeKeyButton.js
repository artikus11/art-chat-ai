import { Button, Modal } from '@wordpress/components';
import { useStores } from '../../stores/RootStoreContext';
import { observer } from 'mobx-react-lite';

const ChangeKeyButton = observer( () => {
	const { syncStore, uiStore } = useStores();
	const isLoading = uiStore.isChangingKey;

	const handleClick = () => {
		uiStore.openModal( {
			title: 'Подтвердите обновление',
			content: 'Вы уверены, что хотите изменить ключ API?',
			actions: [
				{
					label: 'Отмена',
					variant: 'tertiary',
					onClick: () => uiStore.closeModal(),
				},
				{
					label: 'Да, обновить',
					variant: 'primary',
					isBusy: isLoading,
					disabled: isLoading,
					async onClick() {
						try {
							await syncStore.changeKey(); // ← чистый вызов
							window.location.reload();
						} catch ( error ) {
							uiStore.showError( 'Не удалось обновить ключ' );
						}
					},
				},
			],
		} );
	};

	return (
		<Button
			variant="secondary"
			onClick={ handleClick }
			isBusy={ isLoading }
			disabled={ isLoading }
		>
			{ isLoading ? 'Обновляем...' : 'Обновить ключ API' }
		</Button>
	);
} );

export default ChangeKeyButton;