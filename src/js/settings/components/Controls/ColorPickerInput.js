import { ColorPicker, BaseControl } from '@wordpress/components';

const ColorPickerInput = ({ label, color, onChange }) => (
	<BaseControl label={label}>
		<ColorPicker
			color={color}
			onChangeComplete={(newColor) => onChange(newColor.hex)}
			disableAlpha
		/>
	</BaseControl>
);

export default ColorPickerInput;