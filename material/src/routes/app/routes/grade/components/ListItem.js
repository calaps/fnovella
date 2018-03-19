import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.gradeData.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.gradeData.level}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.gradeData.nameProgram}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.gradeData.description}</td>
        <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
          <button
            onClick={()=>{this.props.onEdit(this.props.gradeData)}}

            type="submit" className="btn btn-primary">Editar</button>
          &nbsp;
          &nbsp;
          <button
            onClick={()=>{this.props.onDelete(this.props.gradeData.id)}}

            type="submit" className="btn btn-danger">Eliminar</button>
        </td>
      </tr>
    );
  }
}

export default ListItem;
