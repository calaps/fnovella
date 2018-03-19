import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  gradesGetRequest,
  gradesDeleteRequest,
  programGetRequest
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
    this.state = {
      grades: {}
    }
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    /** DISPLAY PROGRAM NAME FRONT-END **/
    this.props.actions.gradesGetRequest(number, size).then(() => {
      // Assign the activations to the props
      this.setState({
        grades: this.props.grades
      }, () => {
        // once assigned get the Programs info
        this.props.actions.programGetRequest(0, 1000).then(() => {
          // Makes a Map to every element in the program activations
          // This lets would be used to add the names to the array
          let currentProgramActivation = '';
          let programId = '';
          let currentName = '';
          let newProgramActications = this.state.grades.content; // Create a new array since async state update

          // Loop every ProgramActivation
          Object.keys(this.state.grades.content).forEach((key) => {
            currentProgramActivation = this.state.grades.content[key];
            // Search for the current name
            programId = this.props.programs.content.findIndex((element) => {
              return currentProgramActivation.programId === element.id;
            });
            // Search the name
            currentName = this.props.programs.content[programId].name;
            // New object with the program name
            currentProgramActivation.nameProgram = currentName;
            newProgramActications[key] = currentProgramActivation;
          });
          let newStateUpdate = this.state.grades;
          newStateUpdate.content = newProgramActications;
          this.setState({
            grades: newStateUpdate
          });
          // Add the name property to the state
        });
      });
    });
    /** DISPLAY PROGRAM NAME FRONT-END END **/
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
                  <table className="mdl-data-table table-striped">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Nombre</th>
                        <th className="mdl-data-table__cell--non-numeric">Nivel</th>
                        <th className="mdl-data-table__cell--non-numeric">Programa</th>
                        <th className="mdl-data-table__cell--non-numeric">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.grades.content ? this.state.grades.content.map((grade) => {
                          return <ListItem
                            key={grade.id}
                            onDelete={this.onDeleteButton}
                            number={i++}
                            onEdit={this.props.onEdit}
                            gradeData={grade} />
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
  // pass the providers
  return {
    grades: state.grades,
    programs: state.programs
  };
}
/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      gradesGetRequest,
      gradesDeleteRequest,
      programGetRequest
    }, dispatch)
  };
}
module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
