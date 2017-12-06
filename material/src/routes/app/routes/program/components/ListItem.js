import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.programData.name}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.programData.audience}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.programData.description}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.programData.clasification}</td>
            <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
              <button
                onClick={()=>{this.props.onDelete(this.props.programData.id)}}

                type="submit" className="btn btn-danger">Eliminar</button>
           &nbsp;
              &nbsp;
              <button
                onClick={()=>{this.props.onEdit(this.props.programData)}}

                type="submit" className="btn btn-primary">Editar</button>
            </td>
          </tr>
          );
  }
}

export default ListItem;
