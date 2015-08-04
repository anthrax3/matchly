var React = require('react');

var Register = React.createClass({

handleRegister:function(){
  var schoolCode=$('#schoolCode').val();
  var firstName=$('#firstName').val();
  var lastName=$('#lastName').val();
  var emailAddress=$('#emailAddress').val();
  var username=$('#username').val();
  var password=$('#password').val();
  var confirmPassword=$('#confirmPassword').val();
  if(password !== confirmPassword){
    alert("Please make sure your passwords match");
  } else if(!/.+@.+\..+/i.test(emailAddress)){
    alert("Please enter a valid email address");
  } else{
    var profileObject={
      schoolCode: schoolCode,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      username: username,
      password: password,
      matchlycookie: document.cookie
    };
    console.log(profileObject,'profile profileObject');
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profileObject),
        url: '/registerUser',
          success: function(data) {
            console.log("data", data);
           if(data.errors !== undefined) {
            alert('registration failed, please try again');
           } else {
            window.location='/#/';
           }
          }.bind(this)      
        });
    }
},

render: function(){
  return(
    <div id='registerBox'>
      <div id='registerInput'>
        <h3>School Registration Code</h3>
        <input id='schoolCode' type='text' required />
        <h3>First Name</h3>
        <input id='firstName' type='text' />
        <h3>Last Name</h3>
        <input id='lastName' type='text' />
        <h3>email address</h3>
        <input id='emailAddress' type='text'/>
        <h3>Username</h3>
        <input id='username' type='text' />
        <h3>Password</h3>
        <input id='password' type='text' />
        <h3>Confrim password</h3>
        <input id='confirmPassword' type='text' />
        <br></br>
        <button id='submitRegister' type='submit' onClick={this.handleRegister}>Submit</button>
      </div>
    </div>
  );
}

});

module.exports = Register;