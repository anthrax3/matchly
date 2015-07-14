var React = require('react');

var SubmitButton = React.createClass({
	render: function() {
		return (
			<div id='submitButtonHolder'>
		    	<button id='submitButton' type='button' onClick={this.props.handleSubmit} value="3" >Submit</button>
			</div>
		);
	}
});

module.exports = SubmitButton;