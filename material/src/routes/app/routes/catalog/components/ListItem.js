import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.catalogData.name}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.catalogData.type}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.catalogData.category}</td>
            <td className="mdl-data-table__cell--non-numeric" >
              <button
                onClick={()=>{this.props.onDelete(this.props.catalogData.id)}}

                type="submit" className="btn btn-primary">Delete</button>
            </td>
            <td>
              <button
                onClick={()=>{this.props.onEdit(this.props.catalogData)}}

                type="submit" className="btn btn-primary">Edit</button>
            </td>
          </tr>
          );
  }
}

export default ListItem;
