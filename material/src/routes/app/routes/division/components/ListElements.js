import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  divisionsGetRequest,
  divisionsDeleteRequest,
  programGetRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divisions: {}
    }
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    /** DISPLAY PROGRAM NAME FRONT-END **/
    this.props.actions.divisionsGetRequest(number, size).then(() => {
      // Assign the activations to the props
      this.setState({
        divisions: this.props.divisions
      }, () => {
        // once assigned get the Programs info
        this.props.actions.programGetRequest(0, 1000).then(() => {
          // Makes a Map to every element in the program activations
          // This lets would be used to add the names to the array
          let currentProgramActivation = '';
          let programId = '';
          let currentName = '';
          let newProgramActications = this.state.divisions.content; // Create a new array since async state update

          // Loop every ProgramActivation
          Object.keys(this.state.divisions.content).forEach((key) => {
            currentProgramActivation = this.state.divisions.content[key];
            // Search for the current name
            programId = this.props.programs.content.findIndex((element) => {
              return currentProgramActivation.programa === element.id;
            });
            // Search the name
            currentName = this.props.programs.content[programId].name;
            // New object with the program name
            currentProgramActivation.nameProgram = currentName;
            newProgramActications[key] = currentProgramActivation;
          });
          let newStateUpdate = this.state.divisions;
          newStateUpdate.content = newProgramActications;
          this.setState({
            divisions: newStateUpdate
          });
          // Add the name property to the state
        });
      });
    });
    /** DISPLAY PROGRAM NAME FRONT-END END **/
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.divisionsDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de divisiones</h2>
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
                      this.state.divisions.content ? this.state.divisions.content.map((division) => {
                        return <ListItem key={i} onDelete={this.onDeleteButton}
                                         number={i++} onViewGroup={this.props.onViewGroup}
                                         onEdit={this.props.onEdit}
                                         onCreateGroup={this.props.onCreateGroup}
                                         divisionData={division}/>
                      }) : null
                    }


                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.divisions.totalPages}
                    totalElements={this.props.divisions.totalElements}
                    getRequest={this.props.actions.divisionsGetRequest}
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
    divisions: state.divisions,
    programs: state.programs
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      divisionsGetRequest,
      divisionsDeleteRequest,
      programGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);

