import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programActivationsGetRequest,
  programActivationsDeleteRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    this.props.actions.programActivationsGetRequest(number,size);
  }
  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.programActivationsDeleteRequest(id);
  }

  render() {
    let i =0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de programas</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table table-striped">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">activación</th>
                      <th className="mdl-data-table__cell--non-numeric">ID del programa</th>
                      <th className="mdl-data-table__cell--non-numeric">Año</th>
                      <th className="mdl-data-table__cell--non-numeric">Estatus</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.programActivations.content?       this.props.programActivations.content.map((program) => {
                        return <ListItem key={program.id}
                                         number={i++}
                                         onDelete={this.onDeleteButton}
                                         onEdit={this.props.onEdit}
                                         activationData={program}/>
                      }):null

                    }
                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.programActivations.totalPages}
                    totalElements={this.props.programActivations.totalElements}
                    getRequest={this.props.actions.programActivationsGetRequest}
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
    programActivations: state.programActivations
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programActivationsGetRequest,
      programActivationsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
