React = require('react');
Post = require('./post.js');

var Blog = React.createClass({
	handleSubmit: function() {
		var blogPost = $('#blogPost').val();
		console.log("hello blogPost");
		console.log(blogPost);
		var postObject={name: this.props.name, post: blogPost, votes:0 };
		$.ajax({
	        method: 'POST',
			contentType: 'application/json',
	        data: JSON.stringify(postObject),
	        url: '/makeBlogPost',
	        success: function(data) {
  			}     	
        });
	},
	render: function() {
		var postArray = this.props.post.map(function(blogPost) {
			return (
				<div>
					<Post data={blogPost}/>
				</div>
			);
		});
		console.log(postArray);
		return (
			<div>
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