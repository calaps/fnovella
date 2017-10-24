import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest,
  programDeleteRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'
/** *
 * Fake element list render....
 * */
let size = 5; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    // type: 2 reflects all programs
    this.props.actions.programGetRequest(number,size);
  }
  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.programDeleteRequest(id);
  }

  render() {
    let i = 0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de programas</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-header no-padding-h">Basic table</div>
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Id</th>
                      <th className="mdl-data-table__cell--non-numeric">Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Audience</th>
                      <th className="mdl-data-table__cell--non-numeric">Decription</th>
                      <th className="mdl-data-table__cell--non-numeric">Clasification</th>
                    </tr>
                    </thead>

                    <tbody>

                     {
                      this.props.programs.content?this.props.programs.content.map((program) => {
                        return <ListItem key={program.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         programData={program}/>
                      }):null
                     }


                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.programs.totalPages}
                    totalElements={this.props.programs.totalElements}
                    getRequest={this.props.actions.programGetRequest}
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
    programs: state.programs
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest,
      programDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
