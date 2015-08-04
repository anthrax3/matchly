var React=require('react');

var Match = React.createClass({
  render:function(){
    return(
      <div id='workBox'>
        <div id='date'>
          <h1>{this.props.indexNumber}</h1>
        </div>
        <div id='tabs'>
          <ul>
            <li onClick={this.props.setWorkArea.bind(this,0)}>Match</li>
            <li onClick={this.props.setWorkArea.bind(this,1)}>Available</li>
            <li onClick={this.props.setWorkArea.bind(this,2)}>Upload</li>
          </ul>
        </div>
        <div id='workArea'>
          {this.props.workNumber}
          <div id='list-of-visitors'>
            <h1>list of visitors</h1>
          </div>
          <div id='schedule'>
            <h1>schedule</h1>
          </div>
          <button>match</button>
        </div>
      </div>
    );
  }
});

module.exports=Match;