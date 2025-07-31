import { Button } from '@wordpress/components';

const SaveButton = ( { onClick, isSaving } ) => (
	<Button
		isPrimary
		onClick={ onClick }
		isBusy={ isSaving }
		disabled={ isSaving }
	>
		{ isSaving ? 'Сохранение...' : 'Сохранить настройки' }
	</Button>
);

export default SaveButton;