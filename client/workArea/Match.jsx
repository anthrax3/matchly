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

  exportToCSV:function(){
    console.log('export fires');
    console.log('data',this.props.matchData);
    console.log('export to csv',this.props.exportCSV);
    this.props.exportCSV(this.props.matchData);
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
          <button onClick={this.exportToCSV}>Export data to CSV file</button>
        </div>
        <div>
          {data}
        </div>
      </div>
    );
  }
});

module.exports=Match;