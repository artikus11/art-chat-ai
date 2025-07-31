import { TextControl } from '@wordpress/components';

const TextInput = ( { label, value, onChange, ...props } ) => (
	<TextControl
		label={ label }
		value={ value }
		onChange={ onChange }
		{ ...props }
		__next40pxDefaultSize={ true }
		__nextHasNoMarginBottom={ true }
		className="acai-field acai-field--text"
	/>
);

export default TextInput;