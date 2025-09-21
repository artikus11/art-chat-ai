import { observer } from 'mobx-react-lite';
import SyncPanel from '../Panels/SyncPanel';
import SettingPanel from '../Panels/SettingPanel';
import GeneralPanel from '../Panels/GeneralPanel';

const ApiTab = observer( () => {

	return (
		<>
			<SettingPanel/>
			<GeneralPanel/>
			<SyncPanel/>
		</>
	);
} );

export default ApiTab;