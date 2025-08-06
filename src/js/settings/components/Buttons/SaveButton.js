import { Button } from '@wordpress/components';

const SaveButton = ( { onClick, isLoading } ) => (
	<Button
		isPrimary
		onClick={ onClick }
		isBusy={ isLoading }
		disabled={ isLoading }
	>
		{ isLoading ? 'Сохранение...' : 'Сохранить настройки' }
	</Button>
);

export default SaveButton;