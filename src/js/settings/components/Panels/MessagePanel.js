import { Flex, FlexBlock, FlexItem } from '@wordpress/components';
import TextInput from '../Controls/TextInput';
import RangeInputDelay from '../Controls/RangeInputDelay';
import ToggleInput from '../Controls/ToggleInput';
import Grid from '../Layout/Grid';


const MessagePanel = ( { fields, values, onChange } ) => {

	return (
		<div>
			{ fields.map( ( fieldConfig ) => {
				const value = values[ fieldConfig.field ] || '';
				const handleChange = ( val ) => {
					onChange( fieldConfig.field, val )
				};

				switch ( fieldConfig.type ) {
					case 'text':
						return (
							<TextInput
								key={ fieldConfig.field }
								label={ fieldConfig.label }
								value={ value }
								onChange={ handleChange }
							/>
						);
					default:
						return null;
				}
			} ) }
			<Grid columns={ 1 } rows={ 4 } gap={ 4 }>
				{ fields.map( ( fieldConfig ) => {
					const value = values[ fieldConfig.field ] || '';
					const handleChange = ( val ) => {
						onChange( fieldConfig.field, val )
					};

					switch ( fieldConfig.type ) {

						case 'range':
							return (
								<RangeInputDelay
									key={ fieldConfig.field }
									label={ fieldConfig.label }
									value={ value }
									onChange={ handleChange }
									min={ fieldConfig.min }
									max={ fieldConfig.max }
									step={ fieldConfig.step }
									initialPosition={ fieldConfig.initialPosition }
								/>
							);
						case 'toggle':
							return (
								<ToggleInput
									key={ fieldConfig.field }
									label={ fieldConfig.label }
									checked={ !! value }
									onChange={ () => handleChange( ! value ) }
								/>
							);
						default:
							return null;
					}
				} ) }
			</Grid>
		</div>
	);
};

export default MessagePanel;