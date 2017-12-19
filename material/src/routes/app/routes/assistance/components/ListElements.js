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
    assistanceGetRequest,
    inscriptionParticipantGetByGroupId
  } from '../../../../../actions';
import ListItem from './ListItem';
import PastAssistance from './PastAssistance';

let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      inscriptions: [],
      group:{}
    }
  }
  componentWillMount() {
    this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id,number,size);
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
      this.props.actions.assistanceGetRequest(0,1000)
  }
  render() {
    var arr=[];
    var NumOfSessions=()=> {
      switch (this.state.date.getMonth() + 1) {
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
    var i=0;
     for  (i=1; i <= NumOfSessions() ; i++ ){
        arr.push(i);
      }

    return arr.map((arr)=>{
      return (
        <td className="mdl-data-table__cell--non-numeric">      
          <button className="btn btn-primary" primary type='submit' 
          onClick={
              ()=>{this.props.changeView('ADD_ASSISTANCE',arr)}
              }>
            {"Pass Evaluation " + arr }
          </button>
        </td>
        )
      });
  }

  var renderCurrentMonth = (month)=> {
      switch (month+ 1) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
  }
    var date = new Date;
    var currentMonth = date.getMonth();
    return (
      <article className="article">
        <h2 className="article-title">Available Evaluation for {renderCurrentMonth(currentMonth)}</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Current Month</th>
                        <th className="mdl-data-table__cell--non-numeric">Number Of sessions</th>
                      </tr>
                    </thead>
                    <tbody>
                          <td className="mdl-data-table__cell--non-numeric">0</td>
                          <td className="mdl-data-table__cell--non-numeric">{renderCurrentMonth(currentMonth)}</td>
                          <td className="mdl-data-table__cell--non-numeric">{NumOfSessions()}</td>

                          {renderSessionButtons()} 

                    {/* {showInscribedParticipantList()} */} 

                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>

        <PastAssistance 
            changeView={this.props.changeView}
            query={this.props.query}
        />
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
    assistances: state.assistance
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
      inscriptionParticipantGetByGroupId
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);