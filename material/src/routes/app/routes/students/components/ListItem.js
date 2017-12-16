import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.firstName}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.email}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.gender}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.department}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.participantData.cellPhone}</td>

        <td className="mdl-data-table__cell--non-numeric" >
          <button
            onClick={()=>{this.props.onView(this.props.participantData)}}
            type="submit" className="btn btn-info">Visualizar</button>
          &nbsp;
          {/* &nbsp; */}
          <button
            onClick={() => { this.props.onEmergencyView(this.props.participantData.id) }}

            type="submit" className="btn btn-primary">Contacto de emergencia</button>
          &nbsp;
          {/* &nbsp; */}
          <button
            onClick={()=>{this.props.onEdit(this.props.participantData)}}

            type="submit" className="btn btn-primary">Editar</button>
          &nbsp;
          {/* &nbsp; */}
          <button
            onClick={()=>{this.props.onDelete(this.props.participantData.id)}}

            type="submit" className="btn btn-danger">Eliminar</button>
          &nbsp;

        </td>
      </tr>
    );
  }
}

export default ListItem;
