var React = require('react');
var Day = require('./Day.jsx');
var Match = require('./workArea/Match.jsx');
var Available = require('./workArea/Available.jsx');
var Upload = require('./workArea/Upload.jsx');

var Home = React.createClass({
  getInitialState: function() {
    return {
      name:null,
      indexNumber: 0,
      workNumber:0,
      matchData:null
    };
  },

  exportCSV:function(matchData){
    // var data = [["Minsk",100000], ["Riga",200000]];
    console.log('export csv in home fires');
    console.log(matchData, 'matchData');
    window.exportData = function exportData() {
        alasql("SELECT * INTO CSV('matchData.csv') FROM ?",[matchData]);
    };
    window.exportData();
  },

  setName:function(name){
    this.setState({name:name});
  },
  setMatchData: function(data) {
    console.log('setMatchData fires');
    this.setState({matchData:data});
  },

  setIndexNumber:function(number) {
    this.setState({indexNumber:number});
  },
  setWorkArea:function(number) {
    this.setState({workNumber:number});
  },

  render: function(){
  console.log('matchData',this.state.matchData);
  var self=this;
  var workArea=<div></div>
  var workNumber=this.state.workNumber;
  if(workNumber===0) {
    workArea=<Match workNumber={this.state.workNumber} 
    setWorkArea={this.setWorkArea} 
    indexNumber={this.state.indexNumber} 
    setMatchData={this.setMatchData}
    exportCSV={this.exportCSV} 
    matchData={this.state.matchData}/>;
  } else if(workNumber===1) {
    workArea=<Available workNumber={this.state.workNumber}
    setWorkArea={this.setWorkArea}
    indexNumber={this.state.indexNumber} />;
  } else if(workNumber===2) {
    workArea=<Upload workNumber={this.state.workNumber}
    setWorkArea={this.setWorkArea}
    indexNumber={this.state.indexNumber} />;
  }

    return(
      <div>
        <h1 id="header">MATCHLY</h1>
        <div id='workArea'>
          {workArea}
        </div>
      </div>
    );
  }
});

module.exports=Home;
