import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
      <tr key={this.props.number}>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.divisionData.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.divisionData.description}</td>
        <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
          {
            (this.props.divisionData.createdGroup)
              ?
              <button
                onClick={()=>{this.props.onViewGroup(this.props.divisionData.id)}}

                type="submit" className="btn btn-primary">Visualizar grupo</button>
              :
              <button
                onClick={()=>{this.props.onCreateGroup(this.props.divisionData.id)}}

                type="submit" className="btn btn-primary">Crear grupo</button>
          }
          &nbsp;
          &nbsp;
          <button
            onClick={()=>{this.props.onDelete(this.props.divisionData.id)}}

            type="submit" className="btn btn-primary">Eliminar</button>
          &nbsp;
          &nbsp;
          <button
            onClick={()=>{this.props.onEdit(this.props.divisionData)}}

            type="submit" className="btn btn-primary">Editar</button>
        </td>
      </tr>
    );
  }
}

export default ListItem;
