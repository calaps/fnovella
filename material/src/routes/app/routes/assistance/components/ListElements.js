import React from 'react';
import Pagination from '../../../../../components/Pagination';
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
  assistanceGetByGroupId,
  inscriptionParticipantGetByGroupId
} from '../../../../../actions';
import ListItem from './ListItem';
import PastAssistance from './PastAssistance';

let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      inscriptions: [],
      group: {}
    }
  }
  componentWillMount() {
    this
      .props
      .actions
      .inscriptionParticipantGetByGroupId(this.props.query.id, number, size);
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
    this
      .props
      .actions
      .assistanceGetByGroupId(this.props.query.id,0, 10000)
  }
  render() {
    var arr = [];
    var assistance = this.props.assistance.content || [];
    var date = this.state.date;
    var currentMonth = date.getMonth();
    var NumOfSessions = () => {
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
          return this.state.group.nsDec
      }
    }
    var renderSessionButtons = () => {
      var i = 0;
      for (i = 1; i <= NumOfSessions(); i++) {
        arr.push(i);
      }
      return arr.map((arr) => {
      var _assistance = assistance.find((_assistance)=>{
        return _assistance.session == arr && _assistance.month == currentMonth+1
      });
        if(_assistance){
        return null;
      }else {
        return (
          <td key={arr} className="mdl-data-table__cell--non-numeric">
            <button
              className="btn btn-primary"
              type='submit'
              onClick={() => {
              this
                .props
                .changeView('ADD_ASSISTANCE', arr)
            }}>
              {"Pasar evaluación " + arr}
            </button>
          </td>
        )
      }
      });
    }

    var renderCurrentMonth = (month) => {
      switch (month + 1) {
        case 1:
          return "Enero";
        case 2:
          return "Febrero";
        case 3:
          return "Marzo";
        case 4:
          return "Abril";
        case 5:
          return "Mayo";
        case 6:
          return "Junio";
        case 7:
          return "Julio";
        case 8:
          return "Agosto";
        case 9:
          return "Spetiembre";
        case 10:
          return "Octubre";
        case 11:
          return "Noviembre";
        case 12:
          return "Diciembre";
      }
    }
    return (
      <article className="article">
        <h2 className="article-title">Evaluaciones disponibles para {renderCurrentMonth(currentMonth)}</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Mes actual</th>
                        <th className="mdl-data-table__cell--non-numeric">Numero de sesiones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="mdl-data-table__cell--non-numeric">0</td>
                        <td className="mdl-data-table__cell--non-numeric">{renderCurrentMonth(currentMonth)}</td>
                        <td className="mdl-data-table__cell--non-numeric">{NumOfSessions()}</td>

                        {renderSessionButtons()}

                        {/* {showInscribedParticipantList()} */}
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>

        <PastAssistance changeView={this.props.changeView} query={this.props.query}/>
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
    assistance: state.assistance
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
      assistanceGetByGroupId,
      inscriptionParticipantGetByGroupId
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);
