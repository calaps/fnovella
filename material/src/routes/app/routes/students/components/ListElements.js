import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  participantGetRequest,
  participantDeleteRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

let size = 5; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    this.props.actions.participantGetRequest(number,size);
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.participantDeleteRequest(id);
  }

  render() {
    let i =0;
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
                      <th className="mdl-data-table__cell--non-numeric">Nombre</th>
                      <th className="mdl-data-table__cell--non-numeric">Email</th>
                      <th className="mdl-data-table__cell--non-numeric">Genero</th>
                      <th className="mdl-data-table__cell--non-numeric">Departamento</th>
                      <th className="mdl-data-table__cell--non-numeric">Celular</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.participants.content?this.props.participants.content.map((participant) => {
                        return <ListItem key={participant.id}
                                         number={i++}
                                         onDelete={this.onDeleteButton}
                                         onEdit={this.props.onEdit}
                                         participantData={participant}/>
                      }):null

                    }
                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.participants.totalPages}
                    totalElements={this.props.participants.totalElements}
                    getRequest={this.props.actions.participantGetRequest}
                  />
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
    participants: state.participants
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantGetRequest,
      participantDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
