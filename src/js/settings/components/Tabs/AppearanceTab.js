import { PanelBody } from '@wordpress/components';
import SelectInput from '../Controls/SelectInput';
import ColorPickerInput from '../Controls/ColorPickerInput';
import ToggleInput from '../Controls/ToggleInput';

class AppearanceTab extends wp.element.Component {
	render() {
		const { settings, updateSetting } = this.props;

		return (
			<PanelBody title="Настройки внешнего вида" initialOpen={ true }>
				<SelectInput
					label="Расположение окна чата"
					value={ settings.chatPosition }
					onChange={ ( value ) => updateSetting( 'chatPosition', value ) }
					options={ [
						{ label: 'Справа', value: 'right' },
						{ label: 'Слева', value: 'left' },
					] }
				/>
				<ColorPickerInput
					label="Цвет чата"
					color={ settings.chatColor }
					onChange={ ( color ) => updateSetting( 'chatColor', color ) }
				/>
				<ToggleInput
					label="Показывать аватар"
					checked={ settings.showAvatar }
					onChange={ ( value ) => updateSetting( 'showAvatar', value ) }
				/>
			</PanelBody>
		);
	}
}

export default AppearanceTab;