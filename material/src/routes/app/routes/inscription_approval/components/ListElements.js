import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  participantGetRequest,
  inscriptionUpdateRequest,
  inscriptionGetByGroupId,
  inscriptionParticipantGetByGroupId
} from '../../../../../actions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  }
};
const style = {
  containerStyle: {
    float: 'right',
    marginTop: 10,
  },
};


class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'Name',
      inputValue: '',
      selectedRows: [],
      doneEditin: true
    };
    this.approveInscription = this.approveInscription.bind(this);
    this.onRowSelection = this.onRowSelection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.actions.inscriptionGetByGroupId(this.props.query.id).then((res) => {
      this.setState({
        inscriptions: res.data
      }); // Get inscriptions by group ID
    });
    this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id).then((res) => {
      this.setState({participants: res.data}); // Get inscription_participants by group ID
    });
    this.props.actions.participantGetRequest(0, 1000); // Get All Participants
  }

  onRowSelection(selectedRows) {
    if (selectedRows.length === 0) { // due to a bug in material-ui
      setTimeout(() => { this.setState({ selectedRows: this.state.selectedRows }) }, 100);
      return;
    };
    this.setState({ selectedRows });
  }

  onSubmit() {
    const inscriptionParticipants = this.props.inscriptionParticipants.content || []; // list of users asociated to inscriptions (one per user)
    const selected = this.state.selectedRows.map((item) => {
      return inscriptionParticipants[item].inscription;
    });
    // Make a new copy of the array
    let newState = this.state.inscriptions;
    selected.map((inscriptionID) => {
      // Here is based on the ID i get all the inscription table data
      const inscriptionData = this.state.inscriptions.findIndex((item) => {
        return (item.id === inscriptionID);
      });
      // Inscription ObjectData
      this.approveInscription(this.state.inscriptions[inscriptionData]);
      newState[inscriptionData].status = 1;
    });
    // Update fields
    this.setState({
      inscriptions: newState
    });
    this.forceUpdate();
  }

  approveInscription(inscriptionData) { // When approve inscription change the default value to 1
    const data = {
      ...inscriptionData,
      status: 1
    };
    this.props.actions.inscriptionUpdateRequest(data);
  }

  render() {
    let i = -1;
    /** try to render **/
    const renderRegistration = () => {

      let inscriptions = (this.state.inscriptions) ? this.state.inscriptions : []; // list of table inscriptions (one per user) filtered by ID
      const inscriptionParticipants = this.props.inscriptionParticipants.content || []; // list of users asociated to inscriptions (one per user)
      const participants = this.props.participants.content || []; // A complete list of all students with complete data

      return inscriptionParticipants.map((inscriptionParticipant) => {
        const inscription = inscriptions.find(_inscription => {
          return (_inscription.id === inscriptionParticipant.inscription)
        });
        let participant = participants.find(_participant => {
          return (_participant.id === inscriptionParticipant.participant)
        });
        if (inscription && participant) {
          i++;
          return (
            <TableRow
              key={i}
              selected={this.state.selectedRows.indexOf(i) !== -1} >
              <TableRowColumn>{i}</TableRowColumn>
              <TableRowColumn>
                <Chip
                  style={styles.chip}>
                  {participant.firstName} {participant.firstLastname}
                </Chip>
              </TableRowColumn>
              <TableRowColumn><a href={participant.email}>{participant.email}</a></TableRowColumn>
              <TableRowColumn>{(participant.gender === 'male') ? 'hombre' : 'mujer'}</TableRowColumn>
              <TableRowColumn>{inscription.id}</TableRowColumn>
              <TableRowColumn>{(inscription.status === 1) ? <label className={'text-success'}>Aprovado</label> :
              <label className={'text-warning'}>Pendiente</label>}</TableRowColumn>
            </TableRow>
          ); // aprobar acción
        }
      });
    };
    /** **/
    return (
      <article className="article">
        <h2 className="article-title">Selecciona para aprobar</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">

              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <Table
                    multiSelectable
                    deselectOnClickaway={false}
                    onRowSelection={this.onRowSelection}
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>#</TableHeaderColumn>
                        <TableHeaderColumn>Nombre</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Genero</TableHeaderColumn>
                        <TableHeaderColumn>Inscripción ID</TableHeaderColumn>
                        <TableHeaderColumn>Estatus</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {this.state.doneEditing ? renderRegistration() : renderRegistration()}
                    </TableBody>
                  </Table>
                </div>
                <div style={style.containerStyle}>
                  <button
                    onClick={this.onSubmit}
                    className='btn btn-primary'>Aprovar inscripciones</button>
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
