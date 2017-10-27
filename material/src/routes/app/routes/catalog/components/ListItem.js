import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.catalogData.id}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.catalogData.name}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.catalogData.type}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.category[0].name}</td>
            <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
              <button
                onClick={()=>{this.props.onDelete(this.props.catalogData.id)}}

                type="submit" className="btn btn-primary">Delete</button>
              &nbsp;
              &nbsp;
              <button
                onClick={()=>{this.props.onEdit(this.props.catalogData)}}

                type="submit" className="btn btn-primary">Edit</button>
            </td>
          </tr>
          );
  }
}

export default ListItem;
