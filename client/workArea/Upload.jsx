var React=require('react');

var Upload=React.createClass({
  render:function() {
    return(
      <div id='Upload-box'>
        <h1>upload</h1>
        <div id='tabs'>
          <ul>
            <li onClick={this.props.setWorkArea.bind(this,0)}>Match</li>
            <li onClick={this.props.setWorkArea.bind(this,1)}>Available</li>
            <li onClick={this.props.setWorkArea.bind(this,2)}>Upload</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports=Upload;