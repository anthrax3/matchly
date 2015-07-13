React = require('react');

var Post = React.createClass({
	vote: function(number) {
    var self=this;
    var name = this.props.data.name;
    var id = this.props.data._id;
    var VoteObject = {_id: id, vote: number };
		$.ajax({
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(VoteObject),
      url: '/vote',
      success: function(data) {
        this.props.getBlogPosts();
        this.props.sorter();
      }.bind(this)       
    });
	},

	render: function() {
		return (
			<div>
				<div>
					<div id='votes'>
						<button id='upvote' onClick={this.vote.bind(this,1)} >UP</button>
						<button id='downvote' onClick={this.vote.bind(this,-1)} >DOWN</button>
					</div>
					<div>
						{this.props.data.name}
					</div>
					<div>
						{this.props.data.post}
					</div>
				</div>
				<br></br>
				<div>
					{this.props.data.votes}
				</div>
			</div>
		);
	}
});

module.exports = Post;