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
            onClick={() => { this.props.onEmergencyView(this.props.participantData.id) }}

            type="submit" className="btn btn-primary">Contacto de emergencia</button>
          &nbsp;
<<<<<<< HEAD
          &nbsp;
          {this.props.permission.pinformationEntry &&
            <button
              onClick={() => { this.props.onDelete(this.props.participantData.id) }}
=======
          {/* &nbsp; */}
          <button
            onClick={()=>{this.props.onDelete(this.props.participantData.id)}}
>>>>>>> 8c0163b4cf3cbe33fd4ae46c81c9ed1f3b56db35

              type="submit" className="btn btn-primary">Eliminar</button>
          }
          &nbsp;
<<<<<<< HEAD
          &nbsp;
          {this.props.permission.pinformationEntry &&
            <button
              onClick={() => { this.props.onEdit(this.props.participantData) }}

              type="submit" className="btn btn-primary">Editar</button>
          }
=======
          {/* &nbsp; */}
          <button
            onClick={()=>{this.props.onEdit(this.props.participantData)}}

            type="submit" className="btn btn-primary">Editar</button>
            &nbsp;
          {/* &nbsp; */}
          <button
            onClick={()=>{this.props.onView(this.props.participantData)}}
            type="submit" className="btn btn-primary">Visualizar</button>
>>>>>>> 8c0163b4cf3cbe33fd4ae46c81c9ed1f3b56db35
        </td>
      </tr>
    );
  }
}

export default ListItem;
