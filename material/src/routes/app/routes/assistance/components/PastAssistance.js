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

  componentWillMount(){
    this.props.actions.assistanceGetRequest(0,10);
  }
  render(){
    var i=0;
    console.log("asc",this.props.assistance)
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
                        <th className="mdl-data-table__cell--non-numeric">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.props.assistance.content?
                    this.props.assistance.content.map((assistance)=>{
                      <PastAssistanceListItem
                        key={assistance.id}
                        number={i++}
                        assistanceData={assistance}
                      />
                    }):null}
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