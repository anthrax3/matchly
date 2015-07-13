React = require('react');
LoginBox = require('./client/loginBox.js');
Register = require('./client/register.js');
Blog = require('./client/blog.js');

var App = React.createClass({
	getInitialState: function() {
		return {pageCounter: 0,
			name: null,
			blogPosts: [{votes: 0}, {votes:1}]
		};
	},

	getBlogPosts: function() {
		var self = this;
		$.ajax({
      method: 'GET',
      dataType: 'json',
      url: '/makeBlogPost',
      success: function(data) {
      	self.setState({blogPosts: data});
				self.blogSorter();   		
   		}
    });
	},

	setName: function(name) {
		this.setState({name: name});
	},

	blogSorter: function() {
		if(this.state.blogPosts !== undefined) {
			var array = this.state.blogPosts;
			array.sort(function(a,b) {
				return b.votes - a.votes;
			});
			this.setState({blogPosts: array});
		}
 	},

	pageTurner: function(page) {
		this.setState({pageCounter: page});
	},

	registerNewUser: function(first) {
		this.setState({name: first});
	},

	render: function() {
		if(this.state.pageCounter === 0) {
			return(
				<div>
	   		  		<LoginBox page={this.pageTurner} name={this.state.name} sort={this.blogSorter} blog={this.state.blogPosts} setName={this.setName} getBlogPosts={this.getBlogPosts} />
				</div>);
		}
		else if (this.state.pageCounter === 1) {
			return (
				<div>
					<Blog post={this.state.blogPosts} name={this.state.name} getBlogPosts={this.getBlogPosts} page={this.pageTurner} sorter={this.blogSorter} />
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