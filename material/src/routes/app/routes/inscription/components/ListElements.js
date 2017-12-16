import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import {
  participantsGetRequestBySearch,
  participantGetRequest,
  inscriptionParticipantGetByGroupId,
  inscriptionGetByGroupId} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'Name',
      inputValue: '',
      inscriptions:[],
    };
    this.onDeleteButton = this
      .onDeleteButton
      .bind(this);
    this.handleSearch = this
      .handleSearch
      .bind(this);
  }

  componentWillMount() {
    this
    .props
    .actions
    .inscriptionGetByGroupId(this.props.query.id)
    .then((res)=>{
      if(!res.errors){
        this.setState({inscriptions : res.data});
      }
    })
    if (this.props.showInscriptions) {
      this
        .props
        .actions
        .inscriptionParticipantGetByGroupId(this.props.query.id,number, size);
      this
        .props
        .actions
        .participantGetRequest(0, 1000);
    } else {
      this
      .props
      .actions
      .inscriptionParticipantGetByGroupId(this.props.query.id,0, 1000);
      this
        .props
        .actions
        .participantGetRequest(number, size);
    }
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this
      .props
      .actions
      .participantDeleteRequest(id);
  }

  handleSearch(e) {
    e.preventDefault();
    switch (this.state.searchValue) {
      case "Id":
        this
          .props
          .actions
          .participantsGetRequestBySearch(this.state.inputValue, null, null);
        break;
      case "Name":
        this
          .props
          .actions
          .participantsGetRequestBySearch(null, this.state.inputValue, null);
        break;
      case "Code":
        this
          .props
          .actions
          .participantsGetRequestBySearch(null, null, this.state.inputValue);
        break;
      default:
        this
          .props
          .actions
          .participantsGetRequestBySearch();
        break;
    }
  }

  render() {
    console.log("idddddddddddddd",this.props);
    let i = 1;
    let {showInscriptions} = this.props;
    let renderRegistration = () => {
      let inscriptionParticipants = this.props.inscriptionParticipants.content || [];
      let inscriptions = this.state.inscriptions;
      let participants = this.props.participants.content || [];

      return inscriptionParticipants.map((inscriptionParticipant) => {
        let inscription = inscriptions.find(_inscription => {
          return (_inscription.id == inscriptionParticipant.inscription)
        });
        let participant = participants.find(_participant => {
          return (_participant.id == inscriptionParticipant.participant)
        });
        if (inscription && participant) {
          return <ListItem
            key={inscriptionParticipant.id}
            number={i++}
            onInscribe={this.props.onInscribe}
            participantData={participant}
            inscriptionData={inscription}
            inscriptionParticipantId={inscriptionParticipant.id}
            onEdit={this.props.onEdit}
            showInscriptions={showInscriptions}/>
        }
      })
    }
    let hideInscribe = (participantId)=>{
      let inscriptionParticipants = this.props.inscriptionParticipants.content || [];
      let inscriptions = this.state.inscriptions;
      console.log("INS", inscriptions);
      let inscriptionParticipant = inscriptionParticipants.find(inscriptionParticipant =>{
        return inscriptionParticipant.participant == participantId;
      })
      if(inscriptionParticipant){
        let inscription = inscriptions.find(inscription =>{
          return inscription.id == inscriptionParticipant.inscription;
        })
        console.log("dadadadadasda",participantId, inscriptionParticipant,inscription);
        return ( (inscription)? true : false );
      }
      return false;
    }
    if (showInscriptions) {
      return (
        <article className="article">
          <h2 className="article-title">Alumnos inscritos al grupo:</h2>
          <div className="row">
            <div className="col-xl-12">
              <div className="box box-transparent">

                <div className="box-body no-padding-h">

                  <div className="box box-default table-box mdl-shadow--2dp">
                    <table className="mdl-data-table">
                      <thead>
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric">#</th>
                          <th className="mdl-data-table__cell--non-numeric">Nombre de participante</th>
                          <th className="mdl-data-table__cell--non-numeric">Email</th>
                          <th className="mdl-data-table__cell--non-numeric">Genero</th>
                          <th className="mdl-data-table__cell--non-numeric">Departamento</th>
                          <th className="mdl-data-table__cell--non-numeric">Status de inscripcione</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderRegistration()}
                      </tbody>
                    </table>
                    <Pagination
                      totalPages={this.props.inscriptionParticipants.totalPages}
                      totalElements={this.props.inscriptionParticipants.totalElements}
                      getRequest={this.props.actions.inscriptionParticipantGetByGroupId}/>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </article>

      );
    }
    return (
      <article className="article">
        <h2 className="article-title">Lista de participantes</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">

              <form onSubmit={this.handleSearch}>

                <div className="row">
                  <div className="col-xl-5">
                    <div >Búsqueda avanzada</div>
                  </div>
                  <div className="col-xl-7 text-right">
                    <input
                      style={{
                      margin: 5,
                      padding: 5
                    }}
                      type='text'
                      value={this.state.inputValue}
                      onChange={(e) => {
                      this.setState({inputValue: e.target.value})
                    }}/>
                    <select
                      style={{
                      padding: 5,
                      margin: 5,
                      height: 34
                    }}
                      onChange={(e) => {
                      this.setState({searchValue: e.target.value})
                    }}
                      value={this.state.searchValue}>
                      <option value="Name">por Nombre</option>
                      <option value="Id">por ID</option>
                      <option value="Code">por Código</option>
                    </select>
                    <IconButton
                      iconStyle={{
                      color: 'white'
                    }}
                      style={{
                      margin: 5,
                      height: 34,
                      width: 34,
                      backgroundColor: '#49a54e',
                      padding: 5
                    }}
                      type="submit"
                      className="btn btn-primary"><Search/></IconButton>
                  </div>
                </div>
              </form>

              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Nombre</th>
                        <th className="mdl-data-table__cell--non-numeric">Email</th>
                        <th className="mdl-data-table__cell--non-numeric">Genero</th>
                        <th className="mdl-data-table__cell--non-numeric">Departamento</th>
                        <th className="mdl-data-table__cell--non-numeric">Celular</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.participants.content
                        ? this
                          .props
                          .participants
                          .content
                          .map((participant) => {
                            return <ListItem
                              key={participant.id}
                              query={this.props.query}
                              number={i++}
                              onInscribe={this.props.onInscribe}
                              participantData={participant}
                              showInscriptions={showInscriptions}
                              hideInscribe={hideInscribe(participant.id)}/>
                          })
                        : null
}
                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.participants.totalPages}
                    totalElements={this.props.participants.totalElements}
                    getRequest={this.props.actions.participantGetRequest}/>
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
  return {participants: state.participants, inscriptions: state.inscriptions, inscriptionParticipants: state.inscriptionParticipants}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantGetRequest,
      participantsGetRequestBySearch,
      inscriptionParticipantGetByGroupId,
      inscriptionGetByGroupId
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);
