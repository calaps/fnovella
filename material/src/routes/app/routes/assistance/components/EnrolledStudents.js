import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {bindActionCreators} from 'redux';
import {
  participantsGetRequestBySearch,
  participantGetRequest,
  inscriptionParticipantGetRequest,
  inscriptionGetRequest,
  inscriptionGetByGroupId,
  groupGetByIdRequest,
  assistanceGetRequest,
  assistanceParticipantGetRequest,
  catalogsGetByCategoryRequest,
  inscriptionParticipantGetByGroupId
} from '../../../../../actions';
import EnrolledStudentListItem from './EnrolledStudentListItem';

class EnrolledStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incriptions: []
    };
  }
  componentWillMount() {
    this.props.query.id ? this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id, 0, 10000) : null;
    this.props.actions.assistanceGetRequest(0, 10000);
    this.props.actions.assistanceParticipantGetRequest(0, 10000);
    this.props.actions.catalogsGetByCategoryRequest(10, 0, 10000);
    this.props.actions.participantGetRequest(0, 10000);
  }
  handleBack() {
    this.props.changeView('VIEW_ELEMENTS');
  }
  render() {
    const renderMonth = () => {
      switch (this.props.enrolledStudentData.month.toLowerCase()) {
        case 'enero':
          return 1;
        case 'febrero':
          return 2;
        case 'marzo':
          return 3;
        case 'abril':
          return 4;
        case 'mayo':
          return 5;
        case 'junio':
          return 6;
        case 'julio':
          return 7;
        case 'agosto':
          return 8;
        case 'septiembre':
          return 9;
        case 'octubre':
          return 10;
        case 'noviembre':
          return 11;
        case 'diciembre':
          return 12;
        default:
          return null;
      }
    };
    const renderAssisance = () => {
      let i = 0;
      // Button context data
      const enrolledStudentData = this.props.enrolledStudentData;
      // List fo all the assistance records
      const assistance = this.props.assistance.content || [];
      // List fo all the assistance records
      const inscriptionParticipants = this.props.inscriptionParticipants.content || [];
      const participants = this.props.participants.content || [];
      const assistanceParticipant = this.props.assistanceParticipant.content || [];
      const catalogs = this.props.catalogs.content || [];
      return assistance.map((_assistance) => {
        if (_assistance.session == enrolledStudentData.session && _assistance.month == renderMonth()) {
          let inscriptionParticipant = () => {
            let i;
            for (i = 0; i < inscriptionParticipants.length; i++) {
              if (inscriptionParticipants[i].inscription==_assistance.inscription)
                return inscriptionParticipants[i];
            }
          };
          let participant = () =>{
              if(inscriptionParticipant()){
                for(var i=0; i<participants.length;i++){
                  if(participants[i].id==inscriptionParticipant().participant)
                    return participants[i];
                }
              }
            }
            let _assistanceParticipant = assistanceParticipant.find((_ap)=>{
              return _ap.assistance == _assistance.id ;
            });
            let catalog = catalogs.find((catalog)=>{
              return  catalog.type == _assistanceParticipant.value;
            });

            if (inscriptionParticipant()&& participant() && _assistanceParticipant && catalog) {
              return (
                <EnrolledStudentListItem
                  catalogData={catalog}
                  key={_assistance.id}
                  changeView={this.props.changeView}
                  number={i++}
                  assistanceData={_assistance}
                  participantData={participant()}
              />)
            }
          }
          })
        };
    return (
      <article className="article">
        <h2 className="article-title">
          <FlatButton onTouchTap={this.handleBack.bind(this)}><i className="material-icons">keyboard_backspace</i></FlatButton>
          Historial de {this.props.enrolledStudentData.month} sesión {this.props.enrolledStudentData.session} </h2>
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
                        <th className="mdl-data-table__cell--non-numeric">Participante</th>
                        <th className="mdl-data-table__cell--non-numeric">Fecha</th>
                        <th className="mdl-data-table__cell--non-numeric">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      { renderAssisance() }
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
  return {
    participants: state.participants,
    inscriptionParticipants: state.inscriptionParticipants,
    assistance: state.assistance,
    assistanceParticipant: state.assistanceParticipant,
    catalogs: state.catalogs
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantGetRequest,
      participantsGetRequestBySearch,
      inscriptionParticipantGetRequest,
      inscriptionGetByGroupId,
      inscriptionGetRequest,
      groupGetByIdRequest,
      assistanceGetRequest,
      assistanceParticipantGetRequest,
      catalogsGetByCategoryRequest,
      inscriptionParticipantGetByGroupId
    }, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(EnrolledStudents);
