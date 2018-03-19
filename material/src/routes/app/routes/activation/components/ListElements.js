import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programActivationsGetRequest,
  programActivationsDeleteRequest,
  programGetRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination';

const size = 10; // limit
const number = 0; // page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programActivations: {}
    };
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    /** DISPLAY PROGRAM NAME FRONT-END **/
    // Search for all the program Activations
    this.props.actions.programActivationsGetRequest(number, size).then(() => {
      // Assign the activations to the props
      this.setState({
        programActivations: this.props.programActivations
      }, () => {
        // once assigned get the Programs info
        this.props.actions.programGetRequest(0, 1000).then(() => {
          // Makes a Map to every element in the program activations
          // This lets would be used to add the names to the array
          let currentProgramActivation = '';
          let programId = '';
          let currentName = '';
          let newProgramActications = this.state.programActivations.content; // Create a new array since async state update

          // Loop every ProgramActivation
          Object.keys(this.state.programActivations.content).forEach((key) => {
            currentProgramActivation = this.state.programActivations.content[key];
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
          let newStateUpdate = this.state.programActivations;
          newStateUpdate.content = newProgramActications;
          this.setState({
            programActivations: newStateUpdate
          });
          // Add the name property to the state
        });
      });
    });
    /** DISPLAY PROGRAM NAME FRONT-END END **/
  }

  onDeleteButton(id) {
    this.props.actions.programActivationsDeleteRequest(id);
  }

  render() {
    let i = 0;
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
                        this.state.programActivations.content ? this.state.programActivations.content.map((program) => {
                          return (<ListItem
                            key={program.id}
                            number={i++}
                            onDelete={this.onDeleteButton}
                            onEdit={this.props.onEdit}
                            activationData={program} />);
                        }) : null
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
  return {
    programActivations: state.programActivations,
    programs: state.programs
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programActivationsGetRequest,
      programActivationsDeleteRequest,
      programGetRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
