var React=require('react');

var ParsedDataVisitors=React.createClass({
  render:function(){
    return(
      <div>
        <h3>Contact Information</h3>
        <h3>First: {this.props.data.Contact.First}</h3>
        <h3>Last: {this.props.data.Contact.Last}</h3>
        <h3>Email: {this.props.data.Contact.Email}</h3>
        <h3>Time: {this.props.data.ClassVisitTime}</h3>
        <h2>Characteristics</h2>
        <h3>Military: {this.props.data.Characteristics.Military}</h3>
        <h3>Country: {this.props.data.Characteristics.Country}</h3>
        <h3>Citizenship: {this.props.data.Characteristics.Citizenship}</h3>
        <h3>Undergrad: {this.props.data.Characteristics.Undergrad}</h3>
        <h3>Employer: {this.props.data.Characteristics.Employer}</h3>
        <h3>Industry: {this.props.data.Characteristics.Industry}</h3>
        <h3>City: {this.props.data.Characteristics.City}</h3>
        <h3>State: {this.props.data.Characteristics.State}</h3>
      </div>
    );
  }
});

module.exports=ParsedDataVisitors;