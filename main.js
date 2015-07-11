React = require('react');
LoginBox = require('./client/loginBox.js');
Register = require('./client/register.js');
Blog = require('./client/blog.js');

var App = React.createClass({
	getInitialState: function() {
		return {pageCounter: 0,
			name: null,
			blogPosts: [["hello",1],["how are you?",3],["I am fine",2]]
		}
	},

	setName: function(name) {
		this.setState({name: name});
	},

	blogSorter: function(array) {
		array.sort(function(a,b) {
			return a[1] -b[1];
		});
	},
	pageTurner: function(page) {
		this.setState({pageCounter: page});
	},

	registerNewUser: function(first) {
		this.setState({name: first});
	},
	upVoter: function() {
	//this needs to be an ajax request to update the database and rerender the whole sytem including sorting the order	
	},

	render: function() {
		console.log(this.state.blogPosts, "blog post at render");

		if(this.state.pageCounter === 0) {
			return(
				<div>
	   		  		<LoginBox page={this.pageTurner} name={this.state.name} sort={this.blogSorter} blog={this.state.blogPosts} setName = {this.setName.bind(this)} />
				</div>);
		}
		else if (this.state.pageCounter === 1) {
			return (
				<div>
					<Blog post={this.state.blogPosts} name={this.state.name}/>
				</div>
			);
		}
		else if (this.state.pageCounter === 2) {
			return (
				<div>
					<Register page={this.pageTurner} newUser={this.registerNewUser}/>
				</div>
			);
		}				
	}

});

React.render(<App />, document.body);