var React = require('react');

var Register = React.createClass({
	handleSubmit: function() {
		var self=this;
		var first = $('#firstName').val();
		var last = $('#lastName').val();
		var userName = $('#userName').val();
		var password = $('#passwordentry').val();
		var confirm = $('#confirmPassword').val();
		if(password === confirm) {
			this.props.newUser(first, last, password);
			var userProfileObject = {name: first, userName: userName, password: password}
			$.ajax({
	            method: 'POST',
	            contentType: 'application/json',
	            url: '/blog',
		        data: JSON.stringify(userProfileObject),
	            success: function(data) {
	                self.props.page(1);
	            }
	        });
		}
	},

	render: function() {
		return (
			<div>
				<div id='name'>
					<input id='firstName' placeholder='First Name'></input>
					<input id='lastName' placeholder='Last Name'></input>
				</div>
				<input id='userName' placeholder='userName'></input>
				<div id='password'>
					<input id='passwordentry' placeholder='Enter Password'></input>
					<input id='confirmPassword' placeholder='Confirm Password'></input>
				</div>
				<button type='button' onClick={this.handleSubmit}>Submit</button>
			</div>
		);
	}
});

module.exports = Register;