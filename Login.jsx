//login
React = require('react');

var Login = React.createClass({
  render: function(){
    return(
      <div id='loginContainer'>
        <div id='banner'>
          <h1>Text text text</h1>
        </div>
        <div id='credentials'>
          <input id='userName' type='text'>
          <input id='password' >
          <button id='button' type='submit'>Login</submit>
        </div>

      </div>
    );
  }
});

module.exports = Login;