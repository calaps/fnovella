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
    assistanceGetRequest,
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

  componentWillMount(){
    this.props.actions.assistanceGetRequest(0,10000);
    this.props.actions.groupGetByIdRequest(this.props.query.id).then((res)=>{
      this.setState({
        group:res.data
      })
    })

  }
  render(){
    var i=0;
    var num=0;    
    var renderSessions=(sessions,month) => {
      var arr=[];
      for(var i=0;i< sessions;i++){
        arr.push(i);
      }

      return arr.map((arr)=>{
        return <PastAssistanceListItem
          key={num++}
          changeView={this.props.changeView}
          number={num++}
          date={this.state.group.inscriptionsStart}
          session ={arr+1}
          month= {month}
        />
      })
    }
        return( 
        <article>
        <h2 className="article-title">List of past assistance</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Month</th>
                        <th className="mdl-data-table__cell--non-numeric">Session</th>
                        <th className="mdl-data-table__cell--non-numeric">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderSessions(this.state.group.nsDec,"December")}
                      {renderSessions(this.state.group.nsNov,"November")}
                      {renderSessions(this.state.group.nsOct,"October")}
                      {renderSessions(this.state.group.nsSep,"September")}
                      {renderSessions(this.state.group.nsAug,"August")}
                      {renderSessions(this.state.group.nsJul,"July")}
                      {renderSessions(this.state.group.nsJun,"June")}
                      {renderSessions(this.state.group.nsMay,"May")}
                      {renderSessions(this.state.group.nsApr,"April")}
                      {renderSessions(this.state.group.nsMar,"March")}
                      {renderSessions(this.state.group.nsFeb,"February")}
                      {renderSessions(this.state.group.nsJan,"January")}
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
      assistanceGetRequest,
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