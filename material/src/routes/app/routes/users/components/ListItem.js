import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.firstName}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.firstLastName}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.email}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.cellphone}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.gender}</td>
            <td className="mdl-data-table__cell--non-numeric" >{this.props.bornDate}</td>
          </tr>
          );
  }
}

export default ListItem;
