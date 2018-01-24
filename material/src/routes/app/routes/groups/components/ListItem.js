import React from 'react';

class ListItem extends React.Component {

  selectCategoryId() {
    const groupData = this.props.groupData.typeCategory;
    switch (groupData) {
      case "workshop":
        return "Taller";
      case "division":
        return "Division";
      case "course":
        return "Curso";
      case "section":
        return "sección";
      default :
        return null;
    }
  }

  render () {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.groupData.correlativo}</td>
        <td className="mdl-data-table__cell--non-numeric">{ this.selectCategoryId() }</td>
        <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
          <button
            onClick={()=>{this.props.onView(this.props.groupData)}}

            type="submit" className="btn btn-info">Visualizar</button>
          &nbsp;
          &nbsp;
          {/*<button
            onClick={()=>{this.props.onDelete(this.props.groupData.id)}}

            type="submit" className="btn btn-primary">Eliminar</button>
          &nbsp;
          &nbsp;
          <button
            onClick={()=>{this.props.onEdit(this.props.groupData)}}

            type="submit" className="btn btn-primary">Editar</button>*/}
        </td>
      </tr>
    );
  }
}

export default ListItem;
