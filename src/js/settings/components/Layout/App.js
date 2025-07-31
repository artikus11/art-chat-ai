import { Panel, Notice, PanelBody, Snackbar, ProgressBar, Button, PanelRow } from '@wordpress/components';
import SettingsTabPanel from '../Tabs/TabPanel';
import SaveButton from '../Controls/SaveButton';
import ApiTab from '../Tabs/ApiTab';
import AppearanceTab from '../Tabs/AppearanceTab';
import Badge from '../Controls/Badge';

class App extends wp.element.Component {
	render() {
		const { store } = this.props;
		const { settings, isLoading, isSaving, notice } = store.state;

		return (

			<div className="acai-settings-wrapper">
				{ notice && (
					<div
						style={ {
							position: 'fixed',
							bottom: '16px',
							left: '16px',
							zIndex: 100000,
							maxWidth: 'calc(100vw - 32px)',
						} }
						key={ notice.message }
					>
						<Snackbar>
							{ notice.message }
						</Snackbar>
					</div>
				) }
				{ isLoading ? (
					<ProgressBar className="acai-progress-bar"/>
				) : (
					  <Panel>
						  <SettingsTabPanel
							  activeKey={ this.props.activeTab }
							  onSelect={ ( tab ) => this.props.onTabChange( tab ) }
						  >
							  { ( tab ) => {
								  if ( tab.name === 'api' ) {
									  return <ApiTab settings={ settings } updateSetting={ store.updateSetting }/>;
								  }
								  if ( tab.name === 'appearance' ) {
									  return <AppearanceTab settings={ settings } updateSetting={ store.updateSetting }/>;
								  }
							  } }
						  </SettingsTabPanel>

						  <PanelBody>

							  <PanelRow>
								  <SaveButton
									  onClick={ store.saveSettings }
									  disabled={ isLoading || isSaving }
									  isSaving={ isSaving }
								  />

							  </PanelRow>

						  </PanelBody>
					  </Panel>
				  ) }
			</div>

		);
	}
}

export default App;