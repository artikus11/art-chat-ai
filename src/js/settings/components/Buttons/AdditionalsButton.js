import { Button } from '@wordpress/components';

const AdditionalsButton = ( { onClick, isLoading } ) => (
	<Button
		variant="secondary"
		onClick={ onClick }
		isBusy={ isLoading }
		disabled={ isLoading }
	>
		{ isLoading ? 'Проверяем...' : 'Получить' }
	</Button>
);

export default AdditionalsButton;