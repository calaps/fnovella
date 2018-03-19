import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  workshopsGetRequest,
  workshopsDeleteRequest,
  programGetRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination';

/** *
 * Fake element list render....
 * */
const size = 10; // limit
const number = 0; // page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: {}
    }
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    /** DISPLAY PROGRAM NAME FRONT-END **/
    this.props.actions.workshopsGetRequest(number, size).then(() => {
      // Assign the activations to the props
      this.setState({
        workshops: this.props.workshops
      }, () => {
        // once assigned get the Programs info
        this.props.actions.programGetRequest(0, 1000).then(() => {
          // Makes a Map to every element in the program activations
          // This lets would be used to add the names to the array
          let currentProgramActivation = '';
          let programId = '';
          let currentName = '';
          let newProgramActications = this.state.workshops.content; // Create a new array since async state update

          // Loop every ProgramActivation
          Object.keys(this.state.workshops.content).forEach((key) => {
            currentProgramActivation = this.state.workshops.content[key];
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
          let newStateUpdate = this.state.workshops;
          newStateUpdate.content = newProgramActications;
          this.setState({
            workshops: newStateUpdate
          });
          // Add the name property to the state
        });
      });
    });
    /** DISPLAY PROGRAM NAME FRONT-END END **/
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.workshopsDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de talleres</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table table-striped">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Id</th>
                        <th className="mdl-data-table__cell--non-numeric">Name</th>
                        <th className="mdl-data-table__cell--non-numeric">Programa</th>
                        <th className="mdl-data-table__cell--non-numeric">Description</th>
                      </tr>
                    </thead>

                    <tbody>
                    {
                      this.state.workshops.content ? this.state.workshops.content.map((workshop) => {
                        return <ListItem key={workshop.id} onDelete={this.onDeleteButton}
                                         number={i++} onViewGroup={this.props.onViewGroup}
                                         onEdit={this.props.onEdit}
                                         onCreateGroup={this.props.onCreateGroup}
                                         workshopData={workshop}/>
                      }) : null
                    }


                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.workshops.totalPages}
                    totalElements={this.props.workshops.totalElements}
                    getRequest={this.props.actions.workshopsGetRequest}
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
    workshops: state.workshops,
    programs: state.programs
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      workshopsGetRequest,
      workshopsDeleteRequest,
      programGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);

