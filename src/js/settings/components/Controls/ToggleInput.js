import { ToggleControl } from '@wordpress/components';

const ToggleInput = ({ label, checked, onChange }) => (
	<ToggleControl
		label={label}
		checked={checked}
		onChange={onChange}
	/>
);

export default ToggleInput;