React = require('react');

var Post = React.createClass({
	upVote: function() {
		return 
		//this needs to be an ajax request to update the database and rerender the whole system				
	},

	render: function() {
		return (
			<div>
				<div>
					<div id='votes'>
						<button id='upvote' onClick={this.upvote}>UP</button>
						<button id='downvote'>DOWN</button>
					</div>
					{this.props.data[0]}
				</div>
				<br></br>
				<div>
					{this.props.data[1]}
				</div>
				
			</div>
		);
	}
});

module.exports = Post;