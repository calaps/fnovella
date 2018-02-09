import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  participantGetRequest,
  inscriptionUpdateRequest,
  inscriptionGetByGroupId,
  inscriptionParticipantGetByGroupId
} from '../../../../../actions';
import ListItem from './ListItem';


class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'Name',
      inputValue: '',
    };
    this.approveInscription = this.approveInscription.bind(this);
  }

  componentWillMount() {
    this.props.actions.inscriptionGetByGroupId(this.props.query.id).then((res) => {
      this.setState({inscriptions: res.data}); // Get inscriptions by group ID
    });
    this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id).then((res) => {
      this.setState({participants: res.data}); // Get inscription_participants by group ID
    });
    this.props.actions.participantGetRequest(0, 1000); // Get All Participants
  }


  approveInscription(inscriptionData) { // When approve inscription change the default value to 1
    const data = {
      ...inscriptionData,
      status: 1
    };
    this.props.actions.inscriptionUpdateRequest(data);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de participantes</h2>
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
                        <th className="mdl-data-table__cell--non-numeric">Group</th>
                        <th className="mdl-data-table__cell--non-numeric">Period</th>
                        <th className="mdl-data-table__cell--non-numeric">Year</th>
                        <th className="mdl-data-table__cell--non-numeric">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.inscriptions
                          ? this.state.inscriptions.map((inscription) => {
                            return (<ListItem
                              handleInscriptionParticipant={this.props.handleInscriptionParticipant}
                              key={inscription.id}
                              number={i++}
                              inscriptionData={inscription}
                              approveInscription={this.approveInscription}
                            />);
                          }) : null
                      }
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
    inscriptions: state.inscriptions,
    inscriptionParticipants: state.inscriptionParticipants
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantGetRequest,
      inscriptionUpdateRequest,
      inscriptionGetByGroupId,
      inscriptionParticipantGetByGroupId
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);
