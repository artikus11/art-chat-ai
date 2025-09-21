import { RangeControl } from '@wordpress/components';

const RangeInputDelay = (
	{
		label,
		value,
		onChange,
		initialPosition = 100,
		max = 1000,
		min = 0,
		step = 100,
		...props
	} ) => (

	<RangeControl
		__nextHasNoMarginBottom
		__next40pxDefaultSize
		initialPosition={ initialPosition }
		max={ max }
		min={ min }
		step={ step }
		label={ label }
		value={ value }
		onChange={ onChange }
		{ ...props }
		className="acai-field acai-field--range"
	/>
);

export default RangeInputDelay;