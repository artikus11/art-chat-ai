const HtmlContent = ( { html } ) => (
	<div dangerouslySetInnerHTML={ { __html: html } }/>
);

export default HtmlContent;