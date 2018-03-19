import React from 'react';

class InscribedParticipantsListItem extends React.Component {
  render() {

    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.inscriptionData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.firstName}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.email}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.gender}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <button
            type="submit" onClick={() => this.props.onParticipantSelection(this.props.participantData.id)}
            className="btn btn-primary">Evaluar
          </button>
        </td>
      </tr>
    );
  }
}

export default InscribedParticipantsListItem;
