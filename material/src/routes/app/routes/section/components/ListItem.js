import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.categoryData.id}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.categoryData.name}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.categoryData.description}</td>
            <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
              <button
                onClick={()=>{this.props.onDelete(this.props.categoryData.id)}}

                type="submit" className="btn btn-primary">Activar grupo</button>
              &nbsp;
              &nbsp;
              <button
                onClick={()=>{this.props.onDelete(this.props.categoryData.id)}}

                type="submit" className="btn btn-primary">Ver grupo</button>
              &nbsp;
              &nbsp;
              <button
                onClick={()=>{this.props.onDelete(this.props.categoryData.id)}}

                type="submit" className="btn btn-primary">Eliminar</button>
              &nbsp;
              &nbsp;
              <button
                onClick={()=>{this.props.onEdit(this.props.categoryData)}}

                type="submit" className="btn btn-primary">Editar</button>
            </td>
          </tr>
          );
  }
}

export default ListItem;
