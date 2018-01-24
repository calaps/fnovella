import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FlatButton from 'material-ui/FlatButton';
import {
  assistanceAddRequest,
  assistanceParticipantAddRequest,
  categoriesGetRequest,
  catalogsGetByCategoryRequest,
  participantsGetRequestBySearch,
  participantGetRequest,
  inscriptionParticipantGetRequest,
  inscriptionGetRequest,
  groupGetByIdRequest,
  inscriptionParticipantGetByGroupId,
  inscriptionGetByGroupId
} from '../../../../../actions';
import ListItem from './ListItem';

const size = 10; // limit
const number = 0; // page

class AddAssistance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      catalogs: [],
      inscriptions: [],
      errors: {},
      dataCount: 0,
      sessionValue: 0,
      session: 1,
      group: '',
      assistanceData: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.AddData = this.AddData.bind(this);
    this.addRequest = this.addRequest.bind(this);
  }
  componentWillMount() {
    this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id, number, size);
    this.props.actions.inscriptionGetByGroupId(this.props.query.id).then((response) => {
      if (response) {
        this.setState({inscriptions: response.data});
      }
    });
    this.props.actions.inscriptionGetRequest(0, 1000);
    this.props.actions.participantGetRequest(0, 1000);
    this.props.actions.groupGetByIdRequest(this.props.query.id).then((res) => {
      this.setState({group: res.data});
    });
    this.props.actions.categoriesGetRequest().then((res) => {
      let i;
      for (i = 0; i < res.data.length; i++) {
        if (res.data[i].name === 'asistencia') {
          this.props.actions.catalogsGetByCategoryRequest(res.data[i].id).then((res) => {
            this.setState({catalogs: res.data.content});
          });
        }
      }
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  isValid(data) {
    let i;
    for (i = 0; i < data.length; i++) {
      if (data[i].value === '') {
        this.setState({
          errors: {
            catalog: 'Uno de los catalogos falta'
          }
        });
        // alert(false);
        return false;
      }
    }
    return true;
  }
  async addRequest(assistanceData) {
    const data = {
      inscription: assistanceData.inscription,
      date: assistanceData.date,
      month: assistanceData.month,
      session: assistanceData.session,
    };
    await this.props.actions.assistanceAddRequest(data).then((res) => {
      const assistanceParticipantData = {
        assistance: res.data.id,
        participant: assistanceData.participant,
        value: assistanceData.value
      };
      this.props.actions.assistanceParticipantAddRequest(assistanceParticipantData);
    });
  }
  handleBack() {
    this.props.changeView('VIEW_ELEMENTS');
  }

  onSubmit(e) {
    e.preventDefault();
    const { assistanceData } = this.state;
    if (this.isValid(assistanceData)) {
      let i;
      for (i = 0; i < assistanceData.length;i++) {
        this.addRequest(assistanceData[i]);
      }
      //Reloads page to prevent button again
      window.location.reload();
    }
  }
  AddData(data) {
    let assistance = this.state.assistanceData.find((element) => { return element.inscription == data.inscription });
    let _assistanceData = this.state.assistanceData;
    if (assistance) {
      _assistanceData = _assistanceData.map((element) => element.inscription ==  assistance.inscription ? {...element, value : data.value} : element);
    } else {
      _assistanceData.push(data);
    }
    this.setState({
      assistanceData: _assistanceData
    });
  }
  render() {
    const {errors} = this.state;
    let i = 0;
    const renderCurrentMonth = (month) => {
      switch (this.state.date.getMonth() + 1) {
        case 1:
          return 'enero';
        case 2:
          return 'febrero';
        case 3:
          return 'marzo';
        case 4:
          return 'abril';
        case 5:
          return 'mayo';
        case 6:
          return 'junio';
        case 7:
          return 'julio';
        case 8:
          return 'agosto';
        case 9:
          return 'septiembre';
        case 10:
          return 'octubre';
        case 11:
          return 'noviembre';
        case 12:
          return 'diciembre';
        default:
          return null;
      }
    };
    const showInscribedParticipantList = () => {
      // Students inscribed to the group just ID
      const inscriptionParticipants = this.props.inscriptionParticipants.content || [];
      // table inscription
      const inscriptions = this.state.inscriptions;
      // Students information data
      const participants = this.props.participants.content || [];
      return inscriptionParticipants.map((inscriptionParticipant) => {
        const inscription = inscriptions.find((_inscription) => {
          //The inscription must be previusly aproved
          if(parseInt(_inscription.status, 8) === 1){
            return (_inscription.id == inscriptionParticipant.inscription);
          }
        });
        const participant = participants.find(_participant => {
          return (_participant.id == inscriptionParticipant.participant);
        });
        if (inscription && participant) {
          return (<ListItem
            sessionNum={this.props.sessionNum}
            changeView={this.props.changeView}
            key={inscriptionParticipant.id}
            number={i++}
            catalogs={this.state.catalogs}
            participantData={participant}
            inscriptionData={inscription}
            AddAssistance={this.AddData}
          />);
        }
      });
    };
    return (
      <article className="article">
        <h2 className="article-title">
          <FlatButton onTouchTap={this.handleBack.bind(this)}><i className="material-icons">keyboard_backspace</i></FlatButton>
          Asistencia para {renderCurrentMonth()} sesión {this.props.sessionNum}</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">
                <form onSubmit={this.onSubmit}>
                  <div className="box box-default table-box mdl-shadow--2dp">
                    <table className="mdl-data-table">
                      <thead>
                        <tr>
                          <th className="mdl-data-table__cell--non-numeric">#</th>
                          <th className="mdl-data-table__cell--non-numeric">Participante</th>
                          <th className="mdl-data-table__cell--non-numeric">Numero de sesión</th>
                          <th className="mdl-data-table__cell--non-numeric">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        { showInscribedParticipantList() }
                      </tbody>
                    </table>
                  </div>
                  <div className="form-group row">
                    { errors.catalog && <span className="help-block text-danger">{errors.catalog}</span> }
                  </div>
                  <button
                    className="btn btn-primary float-right"
                    type="submit"
                    onClick={this.onSubmit}
                  > Guardar evaluación </button>
                </form>
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
    catalogs: state.catalogs,
    inscriptionParticipants: state.inscriptionParticipants
  };
}
/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      catalogsGetByCategoryRequest,
      assistanceAddRequest,
      categoriesGetRequest,
      participantGetRequest,
      participantsGetRequestBySearch,
      inscriptionParticipantGetRequest,
      inscriptionGetRequest,
      assistanceParticipantAddRequest,
      groupGetByIdRequest,
      inscriptionParticipantGetByGroupId,
      inscriptionGetByGroupId
    }, dispatch)
  };
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(AddAssistance);
