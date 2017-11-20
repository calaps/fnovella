import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import map from "Lodash/map"; //to use map in a object
import {courseValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  coursesAddRequest,
  coursesUpdateRequest,
  programGetRequest,
  educatorsGetRequest,
  programLocationByProgramIdGetRequest,
  gradesGetRequest,
  sectionsGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props.courseData: ", this.props.courseData);
    this.state = {
      isEditing: (this.props.courseData.id)
        ? true
        : false,
      id: this.props.courseData.id || '',
      name: this.props.courseData.name || '',
      location: this.props.courseData.location || '',
      description: this.props.courseData.description || '',
      openCourse: (typeof this.props.courseData.openCourse == 'boolean')
        ? this.props.courseData.openCourse
        : false,
      grade: this.props.courseData.grade || '',
      programId: this.props.courseData.programId || '',
      section: this.props.courseData.section || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.handleCancel = this
      .handleCancel
      .bind(this);
    self = this;
  }

  componentWillMount() {
    if (this.state.isEditing) {
      this
        .props
        .actions
        .programLocationByProgramIdGetRequest(this.state.programId);
    }
    this
      .props
      .actions
      .programGetRequest();
    this
      .props
      .actions
      .gradesGetRequest();
    this
      .props
      .actions
      .sectionsGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.courseData !== nextProps.courseData) {
      this.setState({
        isEditing: false,
        id: '',
        name: '',
        location: '',
        description: '',
        openCourse: '',
        grade: '',
        programId: '',
        section: ''
      })
    }
  }

  handleCancel() {
    self
      .props
      .changeView('VIEW_ELEMENT');
  }

  isValid() {
    //local validation
    const {errors, isValid} = courseValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});
      let data = {
        name: this.state.name,
        location: this.state.location,
        description: this.state.description,
        openCourse: this.state.openCourse,
        grade: this.state.grade,
        programId: this.state.programId,
        section: this.state.section
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing
        ? this
          .props
          .actions
          .coursesUpdateRequest(data)
          .then((response) => {
            //Save the default object as a provider
            if (response) {
              self
                .props
                .changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            // //alert'fail');
            console.log("An Error occur with the Rest API");
            self.setState({
              errors: {
                ...self.state.errors,
                apiErrors: error.error
              },
              isLoading: false
            });
          })
        : this
          .props
          .actions
          .coursesAddRequest(data)
          .then((response) => {
            //Save the default object as a provider
            if (response) {
              self
                .props
                .changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            // //alert'fail');
            console.log("An Error occur with the Rest API");
            self.setState({
              errors: {
                ...self.state.errors,
                apiErrors: error.error
              },
              isLoading: false
            });
          });

    } else {

      // FORM WITH ERRORS

    }

  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name == "programId") {
      this
        .props
        .actions
        .programLocationByProgramIdGetRequest(e.target.value);
    }
  }

  render() {
    const {errors} = this.state;

    //programLocations || location options
    let programLocationsOpt = () => {
      if (this.state.programId) {
        let programLocations = this.props.programLocations.content || [];
        return programLocations.map((location) => {
          return <option key={location.location} value={location.location}>{location.locationData.name}</option>
        });
      } else {
        return null;
      }
    };
    //Programs options
    let programsOpt = () => {
      let programs = this.props.programs.content || [];
      return programs.map((program) => {
        if (program.clasification == "course" || program.clasification == "grades") {
          return <option key={program.id} value={program.id}>{program.name}</option>
        } else {
          return null;
        }

      });
    };

    //Grades options
    let gradesOpt = () => {
      let grades = this.props.grades.content || [];
      if(this.state.programId){
        return grades.map((grade) => {
          if(grade.programId == this.state.programId){
            return <option key={grade.id} value={grade.id}>{grade.name}</option>
          }
        });
      }
    };
    let sectionsOpt = () => {
      let sections = this.props.sections.content || [];
      if (this.state.grade) {
        return sections.map((section) => {
          if (this.state.grade == section.grade) {
            return <option key={section.id} value={section.id}>{section.name}</option>
          }
        });
      }
      return null;

    }

    let showGrades = () => {
      if(this.state.programId){
        let selectedProgram;
        let programs = this.props.programs.content || [];
        for(let i=0;i<programs.length;i++){
          if(this.state.programId == programs[i].id){
            selectedProgram = programs[i];
          }
        }
        if (this.state.openCourse.toString() == 'false' && selectedProgram && selectedProgram.clasification == "grades") {
          return (
            <div>
              <div className="form-group row">
                <label htmlFor="grade" className="col-md-3 control-label">Grado</label>
                <div className="col-md-9">
                  <select
                    name="grade"
                    id="grade"
                    onChange={this.onChange}
                    value={this.state.grade}
                    className="form-control">
                    <option value="" disabled>Selecione el grado</option>
                    {gradesOpt()}
                  </select>
                  {errors.grade && <span className="help-block text-danger">{errors.grade}</span>}
                </div>
              </div>
  
              <div className="form-group row">
                <label htmlFor="section" className="col-md-3 control-label">Section</label>
                <div className="col-md-9">
                  <select
                    name="section"
                    id="section"
                    onChange={this.onChange}
                    value={this.state.section}
                    className="form-control">
                    <option value="" disabled>Selecione el Section</option>
                    {sectionsOpt()}
                  </select>
                  {errors.section && <span className="help-block text-danger">{errors.section}</span>}
                </div>
              </div>
            </div>
         )
        }
      }
      return null;
    }
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información:
                  </p>
                  <form onSubmit={this.onSubmit} role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de curso</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: altura"/> {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Descripción</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="eje: about this course"/> {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>
                    <div className="form-group row">

                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Es un curso abierto?</label>
                      <div className="col-md-9">
                        <select
                          name="openCourse"
                          id="openCourse"
                          onChange={this.onChange}
                          value={this.state.openCourse}
                          className="form-control">
                          <option value="" disabled>Selecione la curso</option>
                          <option value={true}>true</option>
                          <option value={false}>false</option>
                        </select>
                        {errors.openCourse && <span className="help-block text-danger">{errors.openCourse}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="programId" className="col-md-3 control-label">Programa</label>
                      <div className="col-md-9">
                        <select
                          name="programId"
                          id="programId"
                          onChange={this.onChange}
                          value={this.state.programId}
                          className="form-control">
                          <option value="" disabled>Selecione el programa</option>
                          {programsOpt()}
                        </select>
                        {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="location" className="col-md-3 control-label">Location</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.location}
                          className="form-control">
                          <option value="" disabled>Selecione la sede</option>
                          {programLocationsOpt()}
                        </select>
                        {errors.location && <span className="help-block text-danger">{errors.location}</span>}
                      </div>
                    </div>

                    {showGrades()}

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton
                          disabled={this.state.isLoading}
                          label='Cancelar'
                          style={{
                          marginRight: 12
                        }}
                          onTouchTap={this.handleCancel}
                          secondary
                          className="btn-w-md"/>
                        <RaisedButton
                          disabled={this.state.isLoading}
                          type="submit"
                          label={this.state.isEditing
                          ? 'Update'
                          : 'Add'}
                          secondary
                          className="btn-w-md"/>
                      </div>
                    </div>
                  </form>

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
  return {programLocations: state.programLocations, programs: state.programs, grades: state.grades, sections: state.sections}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programLocationByProgramIdGetRequest,
      programGetRequest,
      gradesGetRequest,
      coursesAddRequest,
      coursesUpdateRequest,
      sectionsGetRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditForm);
