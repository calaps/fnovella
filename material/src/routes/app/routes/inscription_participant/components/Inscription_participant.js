import React from 'react';
import {connect} from 'react-redux';
import {
    participantsGetRequestBySearch,
    participantGetRequest, 
    inscriptionParticipantGetRequest,
    inscriptionParticipantsGetRequestByInscription, 
    inscriptionGetRequest,
    inscriptionUpdateRequest
  } from '../../../../../actions';
import {bindActionCreators} from 'redux';
import ListItem from './ListItem';


class Inscription_participant extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        if (this.props.location.query.inscriptionId){
            this.props.actions.inscriptionParticipantsGetRequestByInscription(this.props.location.query.inscriptionId,0,1000);        
        console.log(true);
        }else {
            this.props.actions.inscriptionParticipantGetRequest(0,1000);
        }
        this.props.actions.participantGetRequest();
    }
    render(){
      var i= 0;
        console.log('dasda',this.props.inscriptionParticipants);
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
                                  <th className="mdl-data-table__cell--non-numeric">Inscription</th>
                                  <th className="mdl-data-table__cell--non-numeric">Participant</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.props.inscriptionParticipants.content
                                  ? this
                                    .props
                                    .inscriptionParticipants.content
                                    .map((inscriptionParticipant) => {
                                      return <ListItem
                                      participantData= {this.props.participants}
                                      inscriptionParticipant={inscriptionParticipant}
                                        key={inscriptionParticipant.id}
                                        number={i++}
                                        /> 
                                    })
                                  : null
          }
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



function mapStateToProps(state) {
    //pass the providers
    return {
      inscriptions: state.inscriptions, 
      inscriptionParticipants: state.inscriptionParticipants,
      participants:state.participants
    }
  }
  
  /* Map Actions to Props */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        participantGetRequest,
        participantsGetRequestBySearch,
        inscriptionParticipantGetRequest,
        inscriptionParticipantsGetRequestByInscription,
        inscriptionUpdateRequest,
        inscriptionGetRequest
      }, dispatch)
    };
  }
module.exports= connect(mapStateToProps,mapDispatchToProps)(Inscription_participant);

// module.exports = Inscription_participant;