import { observer } from 'mobx-react-lite';
import SyncPanel from '../Panels/SyncPanel';
import SettingPanel from '../Panels/SettingPanel';

const ApiTab = observer( () => {

	return (
		<>
			<SettingPanel/>
			<SyncPanel/>
		</>
	);
} );

export default ApiTab;