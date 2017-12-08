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
    console.log(this.props.participantData.content);
    let {showInscriptions} = this.props;
    var renderParticipant = () => {
      for (let i=0;i<=this.props.participantData.content.length;i++){
          if(this.props.inscriptionParticipant.participant===this.props.participantData.content[i].id){
            return <td className="mdl-data-table__cell--non-numeric" >{
              this.props.participantData.content[i].firstName + " " + this.props.participantData.content[i].firstLastname
            }</td>            
          }
      }
    }
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.inscriptionParticipant.id}</td>
        <td className="mdl-data-table__cell--non-numeric" >{this.props.inscriptionParticipant.inscription}</td>
        {renderParticipant()}
      </tr>
    );
  }
}

export default ListItem;
