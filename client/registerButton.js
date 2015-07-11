var React = require('react');

var RegisterButton = React.createClass({
	render: function() {
		return (
			<div id='register'>
		    <button id='registerButton' type='button' onClick={this.props.handleRegister} value="2">Register</button>
			</div>
		);
	}
});

module.exports = RegisterButton;