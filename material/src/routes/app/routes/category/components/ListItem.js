import React from 'react';

class ListItem extends React.Component {

  render() {
    const isFromSystem = (
      this.props.categoryData.id === 1 ||
      this.props.categoryData.id === 2 ||
      this.props.categoryData.id === 3 ||
      this.props.categoryData.id === 4 ||
      this.props.categoryData.id === 5 ||
      this.props.categoryData.id === 6 ||
      this.props.categoryData.id === 7 ||
      this.props.categoryData.id === 8 ||
      this.props.categoryData.id === 9 ||
      this.props.categoryData.id === 10);
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.categoryData.id}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.categoryData.name}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.categoryData.description}</td>
            <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
              {!isFromSystem ?
              <div>
                <button
                  onClick={()=>{this.props.onDelete(this.props.categoryData.id)}}

                  type="submit" className="btn btn-danger">Eliminar</button>
                &nbsp;
                &nbsp;
                <button
                  onClick={()=>{this.props.onEdit(this.props.categoryData)}}

                  type="submit" className="btn btn-primary">Editar</button>
              </div>
                :
                <p className={"text-info"}>categoria del sistema</p>
              }
            </td>
          </tr>
          );
  }
}

export default ListItem;
