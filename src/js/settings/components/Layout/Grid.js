const Grid = ( { columns = 2, rows, children } ) => {

	const childrenArray = React.Children.toArray( children );

	const displayedChildren = rows
	                          ? childrenArray.slice( 0, rows * columns )
	                          : childrenArray;

	const gridClass = `acai-settings-grid columns-${ columns }`;

	return (
		<div className={ gridClass }>
			{ displayedChildren }
		</div>
	);
};

export default Grid;