var React = require('react');
var SubmitButton = require('./submitButton');
var RegisterButton = require('./RegisterButton');

var LoginBox = React.createClass({
	handleSubmit: function(e) {
		var password = $('#password').val();
		var userName = $('#userName').val();
		var profileObject = {userName: userName, password: password};
		var self = this;
		// console.log(profileObject);
		$.ajax({
            method: 'POST',
			contentType: 'application/json',
            data: JSON.stringify(profileObject),
            url: '/login',
            success: function(data) {
      		if(data==="check");
      		console.log(data);
			//this sorts the blogposts before rendering
			self.props.sort(self.props.blog);
      		self.props.setName()
      		self.props.page(1);
      		
      		}     	
        });

	},
	handleRegister: function(e) {
		//this turns the page
		this.props.page(2);

	},

	render: function() {
		return (
		  <div>
		  	<div id='loginPassword'>
		  		<input placeholder='Username' id='userName'></input>
		  		<input placeholder='Password' id='password'></input>
		 	</div>
			<div id='loginButtonHolder'>
			    <SubmitButton handleSubmit={this.handleSubmit} />
			    <RegisterButton handleRegister={this.handleRegister} />
			</div>  
		  </div>

		);
	}
});

module.exports = LoginBox;