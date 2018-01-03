import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  coursesGetRequest,
  coursesDeleteRequest,
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

/** *
 * Fake element list render....
 * */
let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    this.props.actions.coursesGetRequest(number, size);
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.coursesDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de cursos</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table table-striped">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Nombre</th>
                      <th className="mdl-data-table__cell--non-numeric">Programa</th>
                      <th className="mdl-data-table__cell--non-numeric">Descripción</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                      this.props.courses.content ? this.props.courses.content.map((course) => {
                        return <ListItem key={course.id} onDelete={this.onDeleteButton}
                                         number={i++} onViewGroup={this.props.onViewGroup}
                                         onEdit={this.props.onEdit}
                                         onCreateGroup={this.props.onCreateGroup}
                                         courseData={course}/>
                      }) : null
                    }

                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.courses.totalPages}
                    totalElements={this.props.courses.totalElements}
                    getRequest={this.props.actions.coursesGetRequest}
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
    courses: state.courses
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      coursesGetRequest,
      coursesDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
