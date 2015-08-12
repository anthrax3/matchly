var React=require('react');

var Match = React.createClass({
  match:function(){
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: '/match',
      success: function(data) {
        console.log("data", data);
      }
    });
  },

  render:function(){
    return(
      <div id='workBox'>
        <div id='tabs'>
          <ul>
            <li onClick={this.props.setWorkArea.bind(this,0)}>Match</li>
            <li onClick={this.props.setWorkArea.bind(this,1)}>Available</li>
            <li onClick={this.props.setWorkArea.bind(this,2)}>Upload</li>
          </ul>
        </div>
        <div id='workArea'>
          <div id='list-of-visitors'>
            <h1>list of visitors</h1>
          </div>
          <div id='schedule'>
            <h1>schedule</h1>
          </div>
          <button onClick={this.match}>match</button>
        </div>
      </div>
    );
  }
});

module.exports=Match;