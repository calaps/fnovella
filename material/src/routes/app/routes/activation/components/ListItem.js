import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.activationData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.activationData.programId}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.activationData.year}</td>
        <td className="mdl-data-table__cell--non-numeric">
          {
            this.props.activationData.activationStatus
              ?<div className="ibox-icon">
                <a href="javascript:;"><i className="material-icons">done</i></a>
              </div>
              :<div className="ibox-icon">
                <a href="javascript:;"><i className="material-icons">clear</i></a>
              </div>
          }
        </td>
        <td className="mdl-data-table__cell--non-numeric"style={{textAlign:'center'}}>
          {/* <button
            onClick={()=>{this.props.onDelete(this.props.activationData.id)}}

            type="submit" className="btn btn-primary">Delete</button> */}
          &nbsp;
          &nbsp;
          <button
            onClick={()=>{this.props.onEdit(this.props.activationData)}}

            type="submit" className="btn btn-primary">Modificar</button>
        </td>
      </tr>
    );
  }
}

export default ListItem;
