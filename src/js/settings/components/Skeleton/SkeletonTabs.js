import SkeletonTab from './SkeletonTab';

const SkeletonTabs = () => (
	<div className="acai-skeleton-tabs components-tab-panel__tabs" role="tablist">
		<SkeletonTab isActive/>
		<SkeletonTab/>
	</div>
);

export default SkeletonTabs;