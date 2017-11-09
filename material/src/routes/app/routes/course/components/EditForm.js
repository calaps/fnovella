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
  programLocationGetRequest,
  gradesGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.courseData.id) ? true : false,
      id: this.props.courseData.id || '',
      name: this.props.courseData.name || '',
      location: this.props.courseData.location || '',
      description: this.props.courseData.description || '',
      openCourse: this.props.courseData.openCourse || '',
      grade: this.props.courseData.grade || '',
      programId: this.props.courseData.programId || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self = this;
  }

  componentWillMount() {
    this.props.actions.programGetRequest();
    this.props.actions.programLocationGetRequest();
    this.props.actions.educatorsGetRequest();
    this.props.actions.gradesGetRequest();
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
        programId: ''
      })
    }
  }

  handleCancel(){
    self.props.changeView('VIEW_ELEMENT');
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
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing ?
        this.props.actions.coursesUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          },
          (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          })
        :
        this.props.actions.coursesAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          });

    } else {

      // FORM WITH ERRORS

    }

  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const {errors} = this.state;

    //programLocations || location options
    let programLocationsOpt = () => {
      let programLocations = this.props.programLocations.content || [];
      return programLocations.map((location) => {
        return <option key={location.id} value={location.location}>{location.locationData.name}</option>
      });
    };
    //Programs options
    let programsOpt = () => {
      let programs = this.props.programs.content || [];
      return programs.map((program) => {
        if(program.clasification == "course"){
          return <option key={program.id} value={program.id}>{program.name}</option>
        } else{
          return null;
        }
        
      });
    };
    //Educators options
    let educatorsOpt = () => {
      let educators = this.props.educators.content || [];
      return educators.map((educator) => {
        return <option key={educator.id} value={educator.id}>{educator.firstName}</option>
      });
    };
    //Grades options
    let gradesOpt = () => {
      let grades = this.props.grades.content || [];
      return grades.map((grade) => {
        return <option key={grade.id} value={grade.id}>{grade.name}</option>
      });
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
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
                          placeholder="eje: altura"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
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
                          placeholder="eje: about this course"/>
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      {
                        /* #change
                        description: should be "true (verdadero)" or "false (falso) as a selectino option not input"
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Es un curso abierto?</label>
                      <div className="col-md-9">
                          <select
                          name="openCourse"
                          id="openCourse"
                          onChange={this.onChange}
                          value={this.state.openCourse}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la curso</option>
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </select>
                        {errors.openCourse && <span className="help-block text-danger">{errors.openCourse}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      {
                        /* #change
                        description: The options populated with locations is correct.
                                     However should be only the locations related to the program
                                     in the new controller "program_location" relation
                        controller to use: program_location
                        database name: program_location
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sede</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.location}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la sede</option>
                          {programLocationsOpt()}
                        </select>
                        {errors.location && <span className="help-block text-danger">{errors.location}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Grado</label>
                      <div className="col-md-9">
                        <select
                          name="grade"
                          id="grade"
                          onChange={this.onChange}
                          value={this.state.grade}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione el grado</option>
                          {gradesOpt()}
                        </select>
                        {errors.grade && <span className="help-block text-danger">{errors.grade}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      {
                        /* #change
                        description: However should be only the locations related to the program
                                      in the new controller "program_location" relation.ds
                        controller to use: program_location
                        database name: program_location
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Programa</label>
                      <div className="col-md-9">
                        <select
                          name="programId"
                          id="programId"
                          onChange={this.onChange}
                          value={this.state.programId}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione el programa</option>
                          {programsOpt()}
                        </select>
                        {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Cancelar'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.handleCancel}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label={this.state.isEditing ? 'Update' : 'Add'} secondary className="btn-w-md"/>
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
  return {
    programLocations: state.programLocations,
    programs: state.programs,
    educators: state.educators,
    grades: state.grades
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest,
      programLocationGetRequest,
      educatorsGetRequest,
      gradesGetRequest,
      coursesAddRequest,
      coursesUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);

