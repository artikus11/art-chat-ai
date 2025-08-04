import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import SkeletonLine from './SkeletonLine';
import SkeletonButton from './SkeletonButton';
import SkeletonTabs from './SkeletonTabs';

const SkeletonLoader = () => (
	<div className="acai-skeleton-wrapper">
		<SkeletonTabs/>
		<Panel>
			<PanelBody title="..." initialOpen={ true }>
				<PanelRow><SkeletonLine/></PanelRow>
				<PanelRow><SkeletonLine large/></PanelRow>
			</PanelBody>

			<PanelBody title="..." initialOpen={ true }>
				<PanelRow>
					<SkeletonButton/>
				</PanelRow>
			</PanelBody>

			<PanelBody>
				<PanelRow><SkeletonButton/></PanelRow>
			</PanelBody>
		</Panel>
	</div>

);

export default SkeletonLoader;