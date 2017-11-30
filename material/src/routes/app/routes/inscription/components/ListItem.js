import React from 'react';

class ListItem extends React.Component {
  render () {
    let {showInscriptions} = this.props;
    if(showInscriptions){
      return (
        <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.firstName}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.email}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.gender}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.department}</td>
        <td className="mdl-data-table__cell--non-numeric" >{(this.props.inscriptionData.status == 1) ? 'True': 'False'}</td>
        <td className="mdl-data-table__cell--non-numeric" >
          <button
            onClick={()=>{this.props.onEdit(this.props.inscriptionParticipantId)}}

            type="submit" className="btn btn-primary">Visualizar participante</button>
        </td>
      </tr>
      );
    }
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.firstName}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.email}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.gender}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.department}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.cellPhone}</td>

        <td className="mdl-data-table__cell--non-numeric" >
          {this.props.hideInscribe? null: <button
            onClick={()=>{this.props.onInscribe(this.props.participantData , this.props.participantData.id )}}

            type="submit" className="btn btn-primary">Inscribe</button>}
        </td>
      </tr>
    );
  }
}

export default ListItem;
