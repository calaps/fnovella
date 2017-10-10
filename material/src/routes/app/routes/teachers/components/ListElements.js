import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  educatorsGetRequest,
  educatorsDeleteRequest,
} from '../../../../../actions';
import ListItem from './ListItem';
/** *
 * Fake element list render....
 * */

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
  }
    componentWillMount(){
      this.props.actions.educatorsGetRequest();
    }
  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.educatorsDeleteRequest(id);
  }
  render() {
    let i=0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de educadores</h2>
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
                      <th className="mdl-data-table__cell--non-numeric">id</th>
                      <th className="mdl-data-table__cell--non-numeric">Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Email</th>
                      <th className="mdl-data-table__cell--non-numeric">Gender</th>
                      <th className="mdl-data-table__cell--non-numeric">Department</th>
                      <th className="mdl-data-table__cell--non-numeric">Cellphone</th>

                    </tr>
                    </thead>
                    <tbody>

                    {
                      this.props.teachers.map((teacher) => {
                        return <ListItem
                           key={teacher.id}
                          onDelete={this.onDeleteButton}
                                          number={i++}
                                         onEdit={this.props.onEdit}
                                         teacherData={teacher}/>
                      })
                    }

                    </tbody>
                  </table>
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
    teachers: state.educators
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      educatorsGetRequest,
      educatorsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
