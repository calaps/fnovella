import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.courseData.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.courseData.description}</td>
        <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
          {
            (this.props.courseData.createdGroup)
              ?
              <button
                onClick={()=>{this.props.onViewGroup(this.props.courseData.id)}}

                type="submit" className="btn btn-info">Visualizar grupo</button>
              :
              <button
                onClick={()=>{this.props.onCreateGroup(this.props.courseData.id)}}

                type="submit" className="btn btn-primary">Crear grupo</button>
          }
          &nbsp;
          &nbsp;
          <button
            onClick={()=>{this.props.onEdit(this.props.courseData)}}

            type="submit" className="btn btn-primary">Editar</button>
          &nbsp;
          <button
            onClick={()=>{this.props.onDelete(this.props.courseData.id)}}

            type="submit" className="btn btn-danger">Eliminar</button>
          &nbsp;
        </td>
      </tr>
    );
  }
}

export default ListItem;
