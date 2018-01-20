import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  }
};

class ListItem extends React.Component {
  render () {
    let {showInscriptions} = this.props;
    if(showInscriptions){
      return (
        <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Chip style={styles.chip}>
            {this.props.participantData.firstName} {this.props.participantData.firstLastname}
          </Chip>
        </td>
        <td className="mdl-data-table__cell--non-numeric" ><a href={this.props.participantData.email}>{this.props.participantData.email}</a></td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.gender}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.department}</td>
        <td className="mdl-data-table__cell--non-numeric" >{(this.props.inscriptionData.status == 1) ? <label className={"text-success"}>Aprovado</label> : <label className={"text-warning"}>Aún no es aprovado</label>}</td>
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
        <td className="mdl-data-table__cell--non-numeric">
          <Chip style={styles.chip}>
            {this.props.participantData.firstName} {this.props.participantData.firstLastname}
          </Chip>
        </td>
        <td className="mdl-data-table__cell--non-numeric" ><a href={this.props.participantData.email}>{this.props.participantData.email}</a></td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.gender}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.department}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.cellPhone}</td>

        <td className="mdl-data-table__cell--non-numeric" >
          {this.props.hideInscribe? null: <button
            onClick={()=>{this.props.onInscribe(this.props.participantData , this.props.participantData.id )}}

            type="submit" className="btn btn-info">Inscribir</button>}
        </td>
      </tr>
    );
  }
}

export default ListItem;
