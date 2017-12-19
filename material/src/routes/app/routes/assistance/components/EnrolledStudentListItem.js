import React from 'react';

class EnrolledStudentListItem extends React.Component {


  render() {
    var date=new Date(this.props.assistanceData.date);
    var participantData=this.props.participantData || {};
    var assistanceData = this.props.assistanceData || {};
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.firstName+ " "+this.props.participantData.firstLastname }</td>        
        <td className="mdl-data-table__cell--non-numeric">{date.toLocaleDateString()}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.status?"True":"False"}</td>        
      </tr>
    );
  }
}

export default EnrolledStudentListItem;
