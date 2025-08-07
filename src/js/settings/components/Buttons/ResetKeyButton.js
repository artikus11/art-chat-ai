import { Button } from '@wordpress/components';
import { useStores } from '../../stores/RootStoreContext';
import { observer } from 'mobx-react-lite';
import ResetKeyForm from '../Layout/ResetKeyForm';

const ResetKeyButton = observer( () => {
	const { syncStore, uiStore } = useStores();
	const isLoading = uiStore.isChangingKey;

	const handleClick = () => {
		uiStore.openModal( {
			title: 'Сбросить ключ API',
			content: () => (
				<ResetKeyForm
					onClose={ uiStore.closeModal }
					onReset={ async ( newKey ) => {
						try {
							// Здесь вызываем бизнес-логику
							await syncStore.resetKey( newKey ); // или changeKey
							uiStore.showSuccess( 'Ключ успешно сброшен' );
							//window.location.reload();
						} catch ( error ) {
							uiStore.showError( 'Не удалось сбросить ключ' );
						}
					} }
				/>
			),
			actions: [],
		} );
	};

	return (
		<Button
			variant="secondary"
			onClick={ handleClick }
			isBusy={ isLoading }
			disabled={ isLoading }
		>
			{ isLoading ? 'Обновляем...' : 'Сбросить ключ API' }
		</Button>
	);
} );

export default ResetKeyButton;