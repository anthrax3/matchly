var React=require('react');

var ParsedDataHosts=React.createClass({
  render:function(){
    console.log(this.props.data);
    return(
      <div>
        <h3>Contact Information</h3>
        <h3>First: {this.props.data.Contact.First}</h3>
        <h3>Last: {this.props.data.Contact.Last}</h3>
        <h3>Email: {this.props.data.Contact.Email}</h3>
        <h3>Section: {this.props.data.Section}</h3>
        <h2>Characteristics</h2>
        <h3>Military: {this.props.data.Characteristics.Military[0]}</h3>
        <h3>Country: {this.props.data.Characteristics.Country[0]}</h3>
        <h3>Citizenship: {this.props.data.Characteristics.Citizenship[0]}</h3>
        <h3>Undergrad: {this.props.data.Characteristics.Undergrad[0]}</h3>
        <h3>Employer: {this.props.data.Characteristics.Employer[0]}</h3>
        <h3>Industry: {this.props.data.Characteristics.Industry[0]}</h3>
        <h3>City: {this.props.data.Characteristics.City[0]}</h3>
        <h3>State: {this.props.data.Characteristics.State[0]}</h3>
      </div>
    );
  }
});

module.exports=ParsedDataHosts;