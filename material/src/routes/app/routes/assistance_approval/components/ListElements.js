import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import {
  assistanceGetRequest,
  inscriptionGetByGroupId,
  participantsGetRequestBySearch,
  participantGetRequest,
  inscriptionParticipantGetRequest,
  inscriptionGetRequest,
  assistanceUpdateRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

let size = 5; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inscriptions: [],
      assistances:{}
    };
    this.approveAssistance=this.approveAssistance.bind(this);
  }
  componentWillMount() {
      this
        .props
        .actions
        .assistanceGetRequest(0, 1000);
        this.props.actions.inscriptionGetByGroupId(this.props.query.id)
        .then((res)=>{
          this.setState({
            inscriptions:res.data
          })
        })
    }


  approveAssistance(assistanceData){
    console.log("dadasd",assistanceData);
    let data= {
      ...assistanceData,
      status: 1
    }
    this.props.actions.assistanceUpdateRequest(data);
  }

  render() {
    var i= 1;
    let renderAssisance = () => {
      let assistance = this.props.assistance.content || [];
      let inscriptions = this.state.inscriptions;
      // let participants = this.props.participants.content || [];

      return assistance.map((_assistance) => {
        let inscription = inscriptions.find(_inscription => {
          return (_inscription.id == _assistance.inscription)
        });
        // let participant = participants.find(_participant => {
        //   return (_participant.id == inscriptionParticipant.participant)
        // });
        if (inscription) {
          return<ListItem
          key={_assistance.id}
          changeView={this.props.changeView}
          number={i++}
          assistanceData={_assistance}
          approveAssistance={this.approveAssistance}
          />
        }
      })
    }
    return (
      <article className="article">
        <h2 className="article-title">Lista de Asistencias</h2>
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
                        <th className="mdl-data-table__cell--non-numeric">Inscripción</th>
                        <th className="mdl-data-table__cell--non-numeric">Sesión</th>
                        <th className="mdl-data-table__cell--non-numeric">Mes</th>
                        <th className="mdl-data-table__cell--non-numeric">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      renderAssisance()
                  //     this.props.assistance.content? this.props.assistance.content.map((assistance) => {
                  //       return <ListItem
                  //       key={assistance.id}
                  //       changeView={this.props.changeView}
                  //       number={i++}
                  //       assistanceData={assistance}
                  //       approveAssistance={this.approveAssistance}
                  //       />
                  // }):null
                  }
                    </tbody>
                  </table>
                    <Pagination
                    totalPages={this.props.assistance.totalPages}
                    totalElements={this.props.assistance.totalElements}
                    getRequest={this.props.actions.assistanceGetRequest}
                    />
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
    assistance:  state.assistance,
    participants: state.participants,
    inscriptions: state.inscriptions,
    inscriptionParticipants: state.inscriptionParticipants
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      assistanceGetRequest,
      participantGetRequest,
      inscriptionGetByGroupId,
      participantsGetRequestBySearch,
      inscriptionParticipantGetRequest,
      assistanceUpdateRequest,
      assistanceGetRequest
    }, dispatch)
  };
}

  module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);
