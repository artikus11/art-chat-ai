import { Flex, FlexItem } from '@wordpress/components';
import TextInput from '../Controls/TextInput';
import RangeInputDelay from '../Controls/RangeInputDelay';
import ToggleInput from '../Controls/ToggleInput';
import HelpButton from '../Buttons/HelpButton';

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
					default:
						return null;
				}
			} ) }
			<Flex as={ 'div' }>
				{ fields.map( ( fieldConfig ) => {

					const value = values[ fieldConfig.field ] || '';
					const handleChange = ( val ) => {
						onChange( fieldConfig.field, val )
					};

					switch ( fieldConfig.type ) {

						case 'toggle':
							return (
								<FlexItem as={ 'div' } key={ fieldConfig.field }>
									<ToggleInput

										label={ fieldConfig.label }
										checked={ !! value }
										onChange={ () => handleChange( ! value ) }
									/>
								</FlexItem>
							);
						case 'help':
							return (
								<FlexItem as={ 'div' } key={ fieldConfig.field }>
									<HelpButton
										modalTitle={ fieldConfig.title }
										modalContent={ fieldConfig.content }
									/>
								</FlexItem>
							);
						default:
							return null;
					}
				} ) }
			</Flex>
		</div>
	);
};

export default MessagePanel;