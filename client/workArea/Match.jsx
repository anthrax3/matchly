var React=require('react');
var Visitor=require('./Visitors.jsx');
var Match = React.createClass({
  match:function(){
    console.log(this.props,'props');
    var self=this;
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: '/match',
      success: function(data) {
        console.log("data", data);
        console.log(self, 'self');
        self.props.setMatchData(data);
      }
    });
  },

  render:function(){
    var data=[];
    if(this.props.matchData!==null){
      console.log('if statement fires');
      data=this.props.matchData.map(function(visitor){
        return (<div><Visitor visitor={visitor} /></div>);
      });
    }
    return(
        <div id='workBox'>
          <div id='tabs'>
            <ul>
              <li id="match" onClick={this.props.setWorkArea.bind(this,0)}>Match</li>
              <li id="available" onClick={this.props.setWorkArea.bind(this,1)}>Available</li>
              <li id="upload" onClick={this.props.setWorkArea.bind(this,2)}>Upload</li>
            </ul>
          </div>
          <div id='workArea'>
            <div id='list-of-visitors'>
              <h2>list of visitors</h2>
            </div>
            <div id='schedule'>
              <h2>schedule</h2>
            </div>
            <button id='matchButton' onClick={this.match}>match</button>
          </div>
          <div id='data'>
            {data}
          </div>
        </div>

    );
  }
});

module.exports=Match;
