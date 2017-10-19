import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.program.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.program.name}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.program.description}</td>
      </tr>
    );
  }
}

export default ListItem;
