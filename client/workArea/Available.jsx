React=require('react');

var Available=React.createClass({
  render:function() {
    return(
      <div id='avialable-box'>
        <div id='date'>
        </div>
        <div id='tabs'>
          <ul>
            <li onClick={this.props.setWorkArea.bind(this,0)}>Match</li>
            <li onClick={this.props.setWorkArea.bind(this,1)}>Available</li>
            <li onClick={this.props.setWorkArea.bind(this,2)}>Upload</li>
          </ul>
        </div>
        <div id='classAvailable'>
        </div>
        <button>Save Changes</button>
      </div>
    );
  }
});

module.exports=Available;