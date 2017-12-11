import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import {
  participantsGetRequestBySearch,
  participantGetRequest, 
  inscriptionParticipantGetRequest, 
  inscriptionGetRequest,
  inscriptionUpdateRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

let size = 5; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'Name',
      inputValue: ''
    };
    this.approveInscription=this.approveInscription.bind(this);
  }
  componentWillMount() {
      this
        .props
        .actions
        .inscriptionGetRequest(0, 1000);
      this
        .props
        .actions
        .participantGetRequest(0, 1000);
    } 

  
  approveInscription(inscriptionData){
    console.log("dadasd",inscriptionData);
    let data= {
      ...inscriptionData,
      status: 1
    }
    this.props.actions.inscriptionUpdateRequest(data);
  }
  
  render() {
    console.log("Render",this.props.inscriptions);
    var i= 1;
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
                        <th className="mdl-data-table__cell--non-numeric">Group</th>
                        <th className="mdl-data-table__cell--non-numeric">Period</th>
                        <th className="mdl-data-table__cell--non-numeric">Year</th>
                        <th className="mdl-data-table__cell--non-numeric">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.inscriptions.content
                        ? this
                          .props
                          .inscriptions
                          .content
                          .map((inscription) => {
                            return <ListItem
                              handleInscriptionParticipant={this.props.handleInscriptionParticipant}
                              key={inscription.id}
                              changeView={this.props.changeView}
                              number={i++}
                              inscriptionData={inscription}
                              approveInscription={this.approveInscription}
                              /> 
                          })
                        : null
}
                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.inscriptions.totalPages}
                    totalElements={this.props.inscriptions.totalElements}
                    getRequest={this.props.actions.inscriptionGetRequest}/>
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
  return {
    participants: state.participants,
    inscriptions: state.inscriptions, 
    inscriptionParticipants: state.inscriptionParticipants
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantGetRequest,
      participantsGetRequestBySearch,
      inscriptionParticipantGetRequest,
      inscriptionUpdateRequest,
      inscriptionGetRequest
    }, dispatch)
  };
}

  module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);
