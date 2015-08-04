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
      workNumber:0
    };
  },
  setName:function(name){
    this.setState({name:name});
  },

  setIndexNumber:function(number) {
    this.setState({indexNumber:number});
  },
  setWorkArea:function(number) {
    this.setState({workNumber:number});
  },

  render: function(){
  var self=this;
  var workArea=<div></div>
  var workNumber=this.state.workNumber;
  if(workNumber===0) {
    workArea=<Match workNumber={this.state.workNumber} setWorkArea={this.setWorkArea} indexNumber={this.state.indexNumber} />;
  } else if(workNumber===1) {
    workArea=<Available workNumber={this.state.workNumber} setWorkArea={this.setWorkArea} indexNumber={this.state.indexNumber} />;
  } else if(workNumber===2) {
    workArea=<Upload workNumber={this.state.workNumber} setWorkArea={this.setWorkArea} indexNumber={this.state.indexNumber} />;
  }

  var dayOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  dayOfWeek.map(function(day) {
    return(
      <div className='dayOfWeek'>
        day
      </div>
    );
  });
  var dayOfMonthComponents=[];
  for(var i=1; i<32;i++){
    dayOfMonthComponents.push(i);
  }
  var dayComponents=dayOfMonthComponents.map(function(day, i) {
    return(
      <div>
        <Day setIndexNumber={self.setIndexNumber} day={day} index={i+1} />
      </div>
    );
  });

    return(
      <div>
        <h1>Home page</h1>
        <div id='calendar'>
          {dayOfWeek}
        </div>
        <div className='days'>
          {dayComponents}
        </div>
        <div id='workArea'>
          {workArea}
        </div>
      </div>
    );
  }
});

module.exports=Home;