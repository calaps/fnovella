import React from 'react';

class ListItem extends React.Component {
  render () {
    console.log("dsdadadasdsada",this.props.showAssistButton(this.props.inscriptionData))
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.inscriptionData.id}</td>
        <td className="mdl-data-table__cell--non-numeric" >
          {this.props.participantData.firstName + " " + this.props.participantData.firstLastname}
        </td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.inscriptionData.id}</td>
        {/* {
          this.props.showAssistButton(this.props.inscriptionData) ?
          null : */}
          <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
          <button
            onClick={()=>this.props.changeView('ADD_ASSISTANCE',this.props.participantData,this.props.inscriptionData)}

            type="submit" className="btn btn-primary">Assist</button>
        </td>
        {/* } */}
       </tr>
    );
  }
}

export default ListItem;
