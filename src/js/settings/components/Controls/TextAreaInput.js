import { TextareaControl } from '@wordpress/components';

const TextAreaInput = ( { label, value, onChange, ...props } ) => (
	<TextareaControl
		label={ label }
		value={ value }
		onChange={ onChange }
		help={ props.help }
		__nextHasNoMarginBottom={ true }
		className="acai-field acai-field--textarea"
	/>
);

export default TextAreaInput;