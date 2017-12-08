import React from 'react';

class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.submitApprove=this.submitApprove.bind(this);
  }
  submitApprove(e) {
    e.preventDefault();
    this.props.approveInscription(this.props.inscriptionData);
  }
  
  render () {
    let {showInscriptions} = this.props;
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.inscriptionData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.inscriptionData.group}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.inscriptionData.period}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.inscriptionData.year}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.inscriptionData.status?"True":"False"}</td>
        <td className="mdl-data-table__cell--non-numeric" >
          <button
            onClick={()=>{this.props.handleInscriptionParticipant(this.props.inscriptionData.id)}}
            type="submit" className="btn btn-primary">Enrolled Students Visualization</button>
          
          &nbsp;
          &nbsp;
          {
          this.props.inscriptionData.status?null:
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
