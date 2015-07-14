React = require('react');
Post = require('./post.js');


var Blog = React.createClass({
	handleSubmit: function() {
    var self = this;
		var blogPost = $('#blogPost').val();
		var postObject={name: this.props.name, post: blogPost, votes:0 };
    $.ajax({
      method: 'POST',
      contentType: 'application/json',
	    data: JSON.stringify(postObject),
      url: '/makeBlogPost',
      success: function(data) {
      	self.props.getBlogPosts();
		  }     	
    });
	},

	render: function() {
		var postArray = this.props.post.map(function(blogPost) {
      return (
				<div>
					<Post data={blogPost} getBlogPosts={this.props.getBlogPosts} sorter={this.props.sorter} name={this.props.name}/>
				</div>
			);
		}.bind(this));
		return (
			<div>
				<div>
					<h1>Hello, {this.props.name[1]}!</h1>
				</div>
				<div id='blogBox'>
					{postArray}
				</div>
				<div>
					<p>Submit your blog post</p>
					<input id='blogPost' type='text' ></input>
					<button id='blogSubmit' type='submit' onClick={this.handleSubmit}>Submit</button> 
				</div>
			</div>
		);	
	}
});

module.exports = Blog;