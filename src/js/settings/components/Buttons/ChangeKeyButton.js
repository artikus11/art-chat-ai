import { Button } from '@wordpress/components';

const ChangeKeyButton = ( { onClick, isLoading } ) => (
	<Button
		variant="secondary"
		onClick={ onClick }
		isBusy={ isLoading }
		disabled={ isLoading }
	>
		{ isLoading ? 'Обновляем...' : 'Обновить ключ API' }
	</Button>
);

export default ChangeKeyButton;