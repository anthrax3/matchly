React = require('react');

var Post = React.createClass({
	vote: function(number) {
    var self=this;
    var name = this.props.data.name;
    var id = this.props.data._id;
    var VoteObject = {_id: id, vote: number, voter_id: this.props.name[0] };
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
    var dataName="Travis";
    if(this.props.data.name !== undefined) {
      dataName=this.props.data.name;
      var afterComma = dataName.substr(dataName.indexOf(",") + 1);
      dataName=afterComma;
    }
		return (
			<div id='blogPostContainer'>
				<div id='blogPostHolder'>
					<div id='votes'>
						<button id='upvote' onClick={this.vote.bind(this,1)} >UP</button>
						<button id='downvote' onClick={this.vote.bind(this,-1)} >DOWN</button>
					</div>
          <div id='postBody'>
            {this.props.data.post}
          </div>
          <div id='posterName'>
            <p id='userNameParagraph'>User: {dataName}</p>
          </div>
				</div>
				<br></br>
				<div id='postVotes'>
					<p id='userVotes'>Votes: {this.props.data.votes}</p>
				</div>
			</div>
		);
	}
});

module.exports = Post;