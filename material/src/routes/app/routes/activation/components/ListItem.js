import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.programActivationsData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.programActivationsData.programId}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.programActivationsData.year}</td>
        <td className="mdl-data-table__cell--non-numeric">
          {
            this.props.programActivationsData.activationStatus
              ?<div className="ibox-icon">
                <a href="javascript:;"><i className="material-icons">done</i></a>
              </div>
              :<div className="ibox-icon">
                <a href="javascript:;"><i className="material-icons">clear</i></a>
              </div>
          }
        </td>
      </tr>
    );
  }
}

export default ListItem;
