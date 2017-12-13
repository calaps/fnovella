import React from 'react';
import Pagination from '../../../../../components/Pagination';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    participantsGetRequestBySearch, 
    participantGetRequest, 
    inscriptionParticipantGetRequest, 
    inscriptionGetRequest, 
    inscriptionGetByGroupId,
    groupGetByIdRequest,
    assistanceGetRequest
  } from '../../../../../actions';
import ListItem from './ListItem';

let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      inscriptions: [],
      group:{}
    }
    this.NumOfSessions=this.NumOfSessions.bind(this);
    this.showAssistButton = this.showAssistButton.bind(this);
  }
  componentWillMount() {
    this
      .props
      .actions
      .inscriptionGetByGroupId(this.props.query.id)
      .then((response) => {
        if (response) {
          this.setState({inscriptions: response.data})
        }
      });
    this
      .props
      .actions
      .inscriptionParticipantGetRequest(number, size);
    this
      .props
      .actions
      .inscriptionGetRequest(0, 1000);
    this
      .props
      .actions
      .participantGetRequest(0, 1000);
      this
      .props
      .actions
      .groupGetByIdRequest(this.props.query.id)
      .then((res) => {
          this.setState({group: res.data});
      })
      this.props.actions.assistanceGetRequest(0.1000).then(res => {console.log('ressponeeee',res)});
  }

  NumOfSessions() {
      switch (this.state.date.getMonth() + 1) {
          case 1:
              return this.state.group.nsJan;
          case 2:
              return this.state.group.nsFeb;
          case 3:
              return this.state.group.nsMar;
          case 4:
              return this.state.group.nsApr;
          case 5:
              return this.state.group.nsMay;
          case 6:
              return this.state.group.nsJun;
          case 7:
              return this.state.group.nsJul;
          case 8:
              return this.state.group.nsAug;
          case 9:
              return this.state.group.nsSep;
          case 10:
              return this.state.group.nsOct;
          case 11:
              return this.state.group.nsNov;
          case 12:
              return this.state.group.nsDec
      }
  }
//   showAssistButton(inscriptionData){
//     console.log("assistance: ",this.props.assistances)
//     let count = 0;
//     var assistances=this.props.assistances.content || []  
//     let checkCount = () => {
//       for(var i=0;i<assistances.length;i++){
//         if(assistances[i].inscription===inscriptionData.id){
//           count=count+1;
//         }
//       }
//       return count;
//     }
//     console.log("sessions",this.NumOfSessions(),checkCount());
//   if(checkCount() >= this.NumOfSessions){
//     alert('1')
//     return true;
//   } else {
//     return false;
//   }
// }
  render() {
    var i = 0;
    let showInscribedParticipantList = ()=>{
      let inscriptionParticipants = this.props.inscriptionParticipants.content || [];
      let inscriptions = this.state.inscriptions;
      let participants = this.props.participants.content || [];
      return inscriptionParticipants.map((inscriptionParticipant) => {
        let inscription = inscriptions.find(_inscription => {
          if(_inscription.status === 1){
            return (_inscription.id == inscriptionParticipant.inscription)
          }
        });
        let participant = participants.find(_participant => {
          return (_participant.id == inscriptionParticipant.participant)
        });
        if (inscription && participant) {
          return <ListItem
            changeView= {this.props.changeView}
            key={inscriptionParticipant.id}
            number={i++}
            showAssistButton={this.showAssistButton}
            participantData={participant}
            inscriptionData={inscription}
            />
        }
      })
    };
    return (
      <article className="article">
        <h2 className="article-title">Lista de assistance</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">ID</th>
                        <th className="mdl-data-table__cell--non-numeric">Participant</th>
                        <th className="mdl-data-table__cell--non-numeric">Inscription</th>
                      </tr>
                    </thead>
                    <tbody>

                    {showInscribedParticipantList()}

                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </article>

    );
  }
}
function mapStateToProps(state) {
  //pass the providers
  return {
    participants: state.participants, 
    inscriptions: state.inscriptions, 
    inscriptionParticipants: state.inscriptionParticipants,
    assistances: state.assistance
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantGetRequest,
      participantsGetRequestBySearch,
      inscriptionParticipantGetRequest,
      inscriptionGetByGroupId,
      inscriptionGetRequest,
      groupGetByIdRequest,
      assistanceGetRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);