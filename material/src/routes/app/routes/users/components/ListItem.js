import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.userData.firstName}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.userData.firstLastName}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.userData.email}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.userData.cellphone}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.userData.gender}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.userData.bornDate}</td>
            <td className="mdl-data-table__cell--non-numeric" >
              <button
                onClick={()=>{this.props.onDelete(this.props.userData.id)}}

                type="submit" className="btn btn-primary">Delete</button>
            </td>
            <td>
              <button
                onClick={()=>{this.props.onEdit(this.props.userData)}}

                type="submit" className="btn btn-primary">Edit</button>
            </td>
          </tr>
          );
  }
}

export default ListItem;
