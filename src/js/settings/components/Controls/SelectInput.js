import { SelectControl } from '@wordpress/components';

const SelectInput = ( { label, value, options, onChange } ) => (
	<SelectControl
		label={ label }
		value={ value }
		options={ options }
		onChange={ onChange }
	/>
);

export default SelectInput;