import { Button } from '@wordpress/components';

const PingButton = ( { onClick, isLoading } ) => (
	<Button
		variant="secondary"
		onClick={ onClick }
		isBusy={ isLoading }
		disabled={ isLoading }
	>
		{ isLoading ? 'Проверяем...' : 'Проверить соединение' }
	</Button>
);

export default PingButton;