import SkeletonPreloadText from './SkeletonPreloadText';

const SkeletonTab = ( { isActive = false } ) => (

	<div
		className={ `acai-skeleton-tab ${ isActive ? 'acai-skeleton-tab-active' : '' }` }
		role="tab"
		aria-selected={ isActive }
		tabIndex={ -1 }

	>
		...
	</div>

);
export default SkeletonTab;