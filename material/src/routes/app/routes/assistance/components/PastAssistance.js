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
    assistanceGetByGroupId,
    inscriptionParticipantGetByGroupId
  } from '../../../../../actions';
import PastAssistanceListItem from './PastAssistanceListItem';


class PastAssistance extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      group:{}
    }
  }
  vistaConsolidad(){
    this.props.changeView('VIEW_CONSOLITATE');
  }

  componentWillMount(){
    this.props.actions.assistanceGetByGroupId(this.props.query.id,0,10000);
    this.props.actions.groupGetByIdRequest(this.props.query.id).then((res)=>{
      this.setState({
        group:res.data
      })
    })

  }
  render(){
    const assistance = this.props.assistance.content || [];
    let num = 1;

    const renderSessions = (sessions, month) => {
      const arr = [];
      let i;
      for (i = 0; i < sessions; i++) {
        arr.push(i);
      }
      var renderMonth = ()=> {
        switch (month) {
          case 1:
              return "Enero";
          case 2:
              return "Febrero";
          case 3:
              return "Marzo";
          case 4:
              return "Abriñ";
          case 5:
              return "Mayo";
          case 6:
              return "Junio";
          case 7:
              return "Julio";
          case 8:
              return "Agosto";
          case 9:
              return "Septiembre";
          case 10:
              return "Octubre";
          case 11:
              return "Noviembre";
          case 12:
              return "Diciembre";
      }
    };
      return arr.map((arr)=>{
      const _assistance = assistance.find((_assistance)=>{
        return _assistance.session == arr+1 && _assistance.month == month
      });
      if(_assistance){
        let number = num++;
        return <PastAssistanceListItem
          key={number}
          changeView={this.props.changeView}
          number={number}
          date={this.state.group.inscriptionsStart}
          session={arr + 1}
          month= {renderMonth()}
        />
      }
      });
    }
        return(
        <article>
        <h2 className="article-title">Lista de asistencias pasadas</h2>
          <RaisedButton
            label='Vista consolidad'
            primary
            onTouchTap={this.vistaConsolidad.bind(this)}
          />
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Mes</th>
                        <th className="mdl-data-table__cell--non-numeric">sesion</th>
                        <th className="mdl-data-table__cell--non-numeric">fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderSessions(this.state.group.nsDec,12)}
                      {renderSessions(this.state.group.nsNov,11)}
                      {renderSessions(this.state.group.nsOct,10)}
                      {renderSessions(this.state.group.nsSep,9)}
                      {renderSessions(this.state.group.nsAug,8)}
                      {renderSessions(this.state.group.nsJul,7)}
                      {renderSessions(this.state.group.nsJun,6)}
                      {renderSessions(this.state.group.nsMay,5)}
                      {renderSessions(this.state.group.nsApr,4)}
                      {renderSessions(this.state.group.nsMar,3)}
                      {renderSessions(this.state.group.nsFeb,2)}
                      {renderSessions(this.state.group.nsJan,1)}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
        </article>
    )
    }
}


function mapDispatchToProps(dispatch){
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
function mapStateToProps(state){
  return {
    participants: state.participants,
    inscriptions: state.inscriptions,
    inscriptionParticipants: state.inscriptionParticipants,
    assistance: state.assistance
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(PastAssistance);
