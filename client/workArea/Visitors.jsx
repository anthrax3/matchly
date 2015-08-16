var React=require('react');

var Visitor=React.createClass({
  render:function(){
  console.log(this.props.visitor,'visitor');
    return(
      <div className='tableDive'>
        <table>
          <td>
            {this.props.visitor.visitorName}
          </td>
          <td>
            {this.props.visitor.hostName}
          </td>
          <td>
            {this.props.visitor.hostEmail}
          </td>
          <td>
            {this.props.visitor.section}
          </td>
          <td>
            {this.props.visitor.visitTime}
          </td>
        </table>
      </div>
    );
  }
}); 

module.exports=Visitor;