import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  inscriptionGetByGroupId,
  inscriptionParticipantGetRequest,
  participantGetRequest
} from '../../../../../actions';
import InscribedParticipantsListItem from './InscribedParticipantsListItem';

class InscribedParticipants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inscriptions: [],
    };

  }

  componentWillMount() {
    this.props.actions.inscriptionGetByGroupId(this.props.groupId)
      .then((response) => {
        if (response) {
          this.setState({
            inscriptions: response.data
          })
        }
      });
    this.props.actions.inscriptionParticipantGetRequest(0, 10000);
    this.props.actions.participantGetRequest(0, 10000);
  }

  render() {
    let i = 1;
    let showInscribedParticipantList = () => {
      let inscriptionParticipants = this.props.inscriptionParticipants.content || [];
      let inscriptions = this.state.inscriptions;
      let participants = this.props.participants.content || [];
      return inscriptionParticipants.map((inscriptionParticipant) => {
        let inscription = inscriptions.find(_inscription => {
          if (_inscription.status === 1) {
            return (_inscription.id == inscriptionParticipant.inscription)
          }
        });
        let participant = participants.find(_participant => {
          return (_participant.id == inscriptionParticipant.participant)
        });
        if (inscription && participant) {
          return <InscribedParticipantsListItem
            key={inscriptionParticipant.id}
            number={i++}
            participantData={participant}
            inscriptionData={inscription}
            onParticipantSelection={this.props.onParticipantSelection}
          />
        }
      })
    };

    return (

      <article className="article">
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">

              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Inscription id</th>
                      <th className="mdl-data-table__cell--non-numeric">Participant id</th>
                      <th className="mdl-data-table__cell--non-numeric">Nombre</th>
                      <th className="mdl-data-table__cell--non-numeric">Email</th>
                      <th className="mdl-data-table__cell--non-numeric">Genero</th>
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
    inscriptionParticipants: state.inscriptionParticipants,
    participants: state.participants,
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      inscriptionGetByGroupId,
      inscriptionParticipantGetRequest,
      participantGetRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(InscribedParticipants);
