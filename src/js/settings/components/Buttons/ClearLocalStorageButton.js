import { Button } from '@wordpress/components';

const ClearLocalStorageButton = ( { onClick, isLoading } ) => (
	<Button
		variant="secondary"
		onClick={ onClick }
		isBusy={ isLoading }
		disabled={ isLoading }
	>
		{ isLoading ? 'Очистка...' : 'Очистить хранилище' }
	</Button>
);

export default ClearLocalStorageButton;