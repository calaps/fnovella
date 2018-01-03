import React from 'react';

import {connect} from 'react-redux';
import {RaisedButton} from "material-ui";
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
class EnrolledStudents extends React.Component{
  constructor(props){
    super(props);
    this.state={
      incriptions:[]
    }
  }
  componentWillMount(){
    this.props.query.id
    ?
      this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id,0,10000)
    : null

    this.props.actions.assistanceGetRequest(0, 10000);
    this.props.actions.assistanceParticipantGetRequest(0,10000);
    this.props.actions.catalogsGetByCategoryRequest(10,0,10000);
    this.props.actions.participantGetRequest(0,10000);
  }
    render(){
        var renderMonth = ()=> {
          switch (this.props.enrolledStudentData.month.toLowerCase()) {
            case "Enero":
                return 1;
            case "Febrero":
                return 2;
            case "Marzo":
                return 3;
            case "Abril":
                return 4;
            case "Mayo":
                return 5;
            case "Junio":
                return 6;
            case "Julio":
                return 7;
            case "Agosto":
                return 8;
            case "Septiembre":
                return 9;
            case "Octubre":
                return 10;
            case "Noviembre":
                return 11;
            case "Diciembre":
                return 12;
        }
      }


        let renderAssisance = () => {
          var i=0;
          let enrolledStudentData = this.props.enrolledStudentData;
          let assistance = this.props.assistance.content || [];
          let inscriptionParticipants = this.props.inscriptionParticipants.content || [];
          let participants = this.props.participants.content || [];
          let assistanceParticipant=this.props.assistanceParticipant.content || [];
          let catalogs = this.props.catalogs.content || [];

          return assistance.map((_assistance) => {
            if (_assistance.session == enrolledStudentData.session && _assistance.month == renderMonth())
            {
              let inscriptionParticipant = () =>{
                for(var i=0; i<inscriptionParticipants.length;i++){
                  if(inscriptionParticipants[i].inscription==_assistance.inscription)
                    return inscriptionParticipants[i];
                }
              }
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
              return<EnrolledStudentListItem
              catalogData={catalog}
              key={_assistance.id}
              changeView={this.props.changeView}
              number={i++}
              assistanceData={_assistance}
              participantData={participant()}
              />
            }
          }
          })
        }
        return(
            <article>
            <h2 className="article-title">Historial:</h2>
            <h2 className="article-title">{this.props.enrolledStudentData.month} Session {this.props.enrolledStudentData.session} </h2>
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
                          {renderAssisance()}
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
    inscriptionParticipants: state.inscriptionParticipants,
    assistance: state.assistance,
    assistanceParticipant: state.assistanceParticipant,
    catalogs:state.catalogs
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
      assistanceGetRequest,
      assistanceParticipantGetRequest,
      catalogsGetByCategoryRequest,
      inscriptionParticipantGetByGroupId
    }, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(EnrolledStudents);
