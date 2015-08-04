//login
var React = require('react');

var Login = React.createClass({

  checkLogin: function(){
    console.log('checkLogin');
    var userName=$('#userName').val();
    var password=$('#password').val();
    var profileObject={
      username: userName,
      password: password,
      cookies: hatNumber
    };
    console.log(profileObject,"profileObject");
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profileObject),
        url: '/userLogin',
          success: function(data) {
            console.log(data, "data");
            window.location='/#/home';

          }.bind(this)      
        });
  },

  register: function(){
    console.log('register fire');
    window.location='/#/register';
  },

  render: function(){

    return(
      <div id='loginContainer'>
        <div id='banner'>
          <h1>Text text text</h1>
        </div>
        <div id='credentials'>
          <input id='userName' type='text' />
          <input id='password' type='password' />
          <button id='submit' type='submit' onClick={this.checkLogin}>Login</button>
          <button id='register' onClick={this.register}>Register</button>
        </div>    
        <div id='tabs'>
          <p className='tabs'>about us</p>
          <p className='tabs'>subscribe</p>
          <p className='tabs'>contact us</p>
          <p className='tabs'>careers</p>
        </div>  
        </div>
    );
  }
});

module.exports = Login;