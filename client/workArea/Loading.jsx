var React=require('react');


var Loading=React.createClass({
  render:function(){
    return(
      <div className='loading'>
        <div id="loading">
          <img src="https://github.com/tsorensen23/blogWithUpVoting/blob/master/assets/loading.gif" alt="Match Loading..." />
        </div>
      </div>
    );
  }
});

module.exports=Loading;
