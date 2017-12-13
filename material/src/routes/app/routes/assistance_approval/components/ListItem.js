import React from 'react';

class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.submitApprove=this.submitApprove.bind(this);
  }
  submitApprove(e) {
    e.preventDefault();
    this.props.approveAssistance(this.props.assistanceData);
  }
  
  render () {
    let {showInscriptions} = this.props;
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.inscription}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.session}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.assistanceData.month}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.assistanceData.status?"True":"False"}</td>
        <td className="mdl-data-table__cell--non-numeric" >
          {/* <button
            onClick={()=>{this.props.handleInscriptionParticipant(this.props.inscriptionData.id)}}
            type="submit" className="btn btn-primary">Enrolled Students Visualization</button>
          
          &nbsp;
          &nbsp; */}
          {
          this.props.assistanceData.status?null:
          <button
          onClick={this.submitApprove}

          className="btn btn-primary">Approve Inscription</button>
        }
          
        </td>
      </tr>
    );
  }
}

export default ListItem;
