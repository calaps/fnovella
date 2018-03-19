import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FlatButton from 'material-ui/FlatButton';
import {
  participantsGetRequestBySearch,
  participantGetRequest,
  inscriptionParticipantGetRequest,
  inscriptionGetRequest,
  inscriptionGetByGroupId,
  groupGetByIdRequest,
  assistanceGetByGroupId,
  inscriptionParticipantGetByGroupId
} from '../../../../../actions';
import PastAssistance from './PastAssistance';

const style = {
  background: '#66bb6a',
  color: 'white'
};
const size = 10; // limit
const number = 0; // page

class ConsolitateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      inscriptions: [],
      group: {}
    };
  }
  handleBack() {
    this.props.changeView('VIEW_ELEMENTS');
  }
  componentWillMount() {
    this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id, number, size);
    this
      .props
      .actions
      .inscriptionGetByGroupId(this.props.query.id)
      .then((response) => {
        if (response) {
          this.setState({inscriptions: response.data});
        }
      });
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
      });
    this
      .props
      .actions
      .assistanceGetByGroupId(this.props.query.id, 0, 10000);
  }
  render() {
    const arr = [];
    const assistance = this.props.assistance.content || [];
    const date = this.state.date;
    const currentMonth = date.getMonth();
    const NumOfSessions = () => {
      switch (currentMonth + 1) {
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
          return this.state.group.nsDec;
        default:
          return null;
      }
    };
    const renderSessionButtons = () => {
      let i = 0;
      for (i = 1; i <= NumOfSessions(); i++) {
        arr.push(i);
      }
      return arr.map((arr) => {
        var _assistance = assistance.find((_assistance) => {
          return _assistance.session == arr && _assistance.month == currentMonth + 1
        });
        if (_assistance) {
          return null;
        } else {
          return (
            <td key={arr} className="mdl-data-table__cell--non-numeric">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => {
                  this
                    .props
                    .changeView('ADD_ASSISTANCE', arr)
                }}>
                { 'Pasar evaluación ' + arr}
              </button>
            </td>
          );
        }
      });
    };

    const renderCurrentMonth = (month) => {
      switch (month + 1) {
        case 1:
          return 'Enero';
        case 2:
          return 'Febrero';
        case 3:
          return 'Marzo';
        case 4:
          return 'Abril';
        case 5:
          return 'Mayo';
        case 6:
          return 'Junio';
        case 7:
          return 'Julio';
        case 8:
          return 'Agosto';
        case 9:
          return 'Spetiembre';
        case 10:
          return 'Octubre';
        case 11:
          return 'Noviembre';
        case 12:
          return 'Diciembre';
        default:
          return null;
      }
    };
    return (
      <article className="article">
        <h3 className="article-title">
          <FlatButton onTouchTap={this.handleBack.bind(this)}><i className="material-icons">keyboard_backspace</i></FlatButton>
          Vista consolidada</h3>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">

              <div className="box box-default">
                <div className="box-body">

                  <table className="table table-bordered">
                    <thead>
                    <tr>
                      <th colSpan="2" style={style}>Indicadores</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Participantes iniciales</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Participantes activos al final del período</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>% de deserción</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={style}>-</td>
                    </tr>
                    <tr>
                      <td>% de retención anual</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>% de deserción bimestral / mensual</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>% de asistencia sostenida</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>% de asistencia sostenida con justificación</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>% de estudiantes que aprobarón la materia</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Cumplimiento de llenado</td>
                      <td>1</td>
                    </tr>
                    </tbody>
                  </table>

                </div>
              </div>

            </div>
          </div>
        </div>

        <PastAssistance changeView={this.props.changeView} query={this.props.query} />
      </article>

    );
  }
}
function mapStateToProps(state) {
  // pass the providers
  return {
    participants: state.participants,
    inscriptions: state.inscriptions,
    inscriptionParticipants: state.inscriptionParticipants,
    assistance: state.assistance
  };
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
      assistanceGetByGroupId,
      inscriptionParticipantGetByGroupId
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConsolitateView);
