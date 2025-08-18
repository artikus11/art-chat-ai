import { ToggleControl } from '@wordpress/components';

const ToggleInput = ( { label, checked, onChange } ) => (
	<ToggleControl
		__nextHasNoMarginBottom={ true }
		label={ label }
		checked={ checked }
		onChange={ onChange }
		className="acai-field"
	/>

);

export default ToggleInput;