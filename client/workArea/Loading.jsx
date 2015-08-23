var React=require('react');


var Loading=React.createClass({
  render:function(){
    return(
      <div className='loading'>
        <div id="loading">
          <img src="http://spiffygif.com/?color=000&length=10&radius=10" alt="Match Loading..." />
        </div>
      </div>
    );
  }
});

module.exports=Loading;
