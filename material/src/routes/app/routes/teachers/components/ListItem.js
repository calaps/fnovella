import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.teacherData.id}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.teacherData.firstName}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.teacherData.email}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.teacherData.gender}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.teacherData.department}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.teacherData.cellphone}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.teacherData.appCode}</td>

            <td className="mdl-data-table__cell--non-numeric" >
              <button
                onClick={()=>{this.props.onDelete(this.props.teacherData.id)}}

                type="submit" className="btn btn-primary">Eliminar</button>
            &nbsp;
              &nbsp;
              <button
                onClick={()=>{this.props.onEdit(this.props.teacherData)}}

                type="submit" className="btn btn-primary">Editar</button>
            </td>
          </tr>
          );
  }
}

export default ListItem;
