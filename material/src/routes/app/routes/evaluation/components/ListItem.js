import React from 'react';

class ListItem extends React.Component {
  render() {

    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.evaluationActivityParticipantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.evaluationActivityParticipantData.activity.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.evaluationActivityParticipantData.participant.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.evaluationActivityParticipantData.participant.email}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.evaluationActivityParticipantData.participant.gender}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.evaluationActivityParticipantData.gradeInitial}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.evaluationActivityParticipantData.gradeFinal}</td>
      </tr>
    );
  }
}

export default ListItem;
