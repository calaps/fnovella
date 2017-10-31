import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  gradesGetRequest,
  gradesDeleteRequest
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
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    // type: 2 reflects all programs
    this.props.actions.gradesGetRequest(number, size);
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.gradesDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de grades</h2>
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
                      <th className="mdl-data-table__cell--non-numeric">Nivel</th>
                      <th className="mdl-data-table__cell--non-numeric">Descripción</th>
                    </tr>
                    </thead>

                    <tbody>

                    {
                      this.props.grades.content ? this.props.grades.content.map((grade) => {
                        return <ListItem key={grade.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         gradeData={grade}/>
                      }) : null
                    }


                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.grades.totalPages}
                    totalElements={this.props.grades.totalElements}
                    getRequest={this.props.actions.gradesGetRequest}
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
    grades: state.grades
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      gradesGetRequest,
      gradesDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);

