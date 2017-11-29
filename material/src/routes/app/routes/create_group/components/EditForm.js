import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import map from "Lodash/map"; //to use map in a object
import {groupValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  coursesGetRequest,
  divisionsGetRequest,
  programInstructorGetRequest,
  sectionsGetRequest,
  workshopsGetRequest,
  groupsAddRequest,
  groupsUpdateRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.groupData.id) ? true : false,
      id: this.props.groupData.id || '',
      courseId: this.props.groupData.courseId || '',
      divisionId: this.props.groupData.divisionId || '',
      instructor: this.props.groupData.instructor || '',
      section: this.props.groupData.section || '',
      type: this.props.groupData.type || 1,
      typeCategory: this.props.groupData.typeCategory || '',
      workshopId: this.props.groupData.workshopId || '',
      correlativo: this.props.groupData.correlativo || '',
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
    this.props.actions.coursesGetRequest();
    this.props.actions.divisionsGetRequest();
    this.props.actions.programInstructorGetRequest();
    this.props.actions.sectionsGetRequest();
    this.props.actions.workshopsGetRequest();
    if (self.context.router.location.query.typeCategory) {
      this.setState({typeCategory: self.context.router.location.query.typeCategory});
      switch (self.context.router.location.query.typeCategory){
        case 'workshop':
          this.setState({workshopId: self.context.router.location.query.workshopId});
          break;
        case 'section':
          this.setState({section: self.context.router.location.query.sectionId});
          break;
        case 'division':
          this.setState({divisionId: self.context.router.location.query.divisionId});
          break;
        case 'course':
          this.setState({courseId: self.context.router.location.query.courseId});
          break;
        default:
          break;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.groupData !== nextProps.groupData) {
      this.setState({
        isEditing: false,
        id: '',
        courseId: '',
        divisionId: '',
        instructor: '',
        section: '',
        type: '',
        typeCategory: '',
        workshopId: '',
        correlativo: '',
      })
    }
  }

  handleCancel(){
    if (self.context.router.location.query.typeCategory) {
      switch (self.context.router.location.query.typeCategory){
        case 'workshop':
          self.context.router.push('/app/workshop');
          break;
        case 'section':
          self.context.router.push('/app/section');
          break;
        case 'division':
          self.context.router.push('/app/division');
          break;
        case 'course':
          self.context.router.push('/app/course');
          break;
        default:
          break;
      }
    }else{
      self.props.changeView('VIEW_ELEMENT')
    }
  }

  isValid() {
    //local validation
    const {errors, isValid} = groupValidator(this.state);
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
        courseId: this.state.courseId,
        divisionId: this.state.divisionId,
        instructor: this.state.instructor,
        section: this.state.section,
        type: this.state.type,
        typeCategory: this.state.typeCategory,
        workshopId: this.state.workshopId,
        correlativo: this.state.correlativo
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing ?
        this.props.actions.groupsUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          },
          (error) => {
            //alert'fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          })
        :
        this.props.actions.groupsAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              if (self.context.router.location.query.typeCategory) {
                switch (self.context.router.location.query.typeCategory){
                  case 'workshop':
                    self.context.router.push('/app/workshop');
                    break;
                  case 'section':
                    self.context.router.push('/app/section');
                    break;
                  case 'division':
                    self.context.router.push('/app/division');
                    break;
                  case 'course':
                    self.context.router.push('/app/course');
                    break;
                  default:
                    break;
                }
              }else{
                self.props.changeView('VIEW_ELEMENT')
              }
            }
          }, (error) => {
            //alert'fail');
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

    //Courses options
    let coursesOpt = () => {
      let courses = this.props.courses.content || [];
      return courses.map((course) => {
        return <option key={course.id} value={course.id}>{course.name}</option>
      });
    };
    //Divisions options
    let divisionsOpt = () => {
      let divisions = this.props.divisions.content || [];
      return divisions.map((division) => {
        return <option key={division.id} value={division.id}>{division.name}</option>
      });
    };
    //Educators options
    let educatorsOpt = () => {
      let educators = this.props.programInstructors.content || [];
      return educators.map((educator) => {
        return <option key={educator.instructor} value={educator.instructor}>{educator.instructorName}</option>
      });
    };
    //Sections options
    let sectionsOpt = () => {
      let sections = this.props.sections.content || [];
      return sections.map((section) => {
        return <option key={section.id} value={section.id}>{section.name}</option>
      });
    };
    //Workshops options
    let workshopsOpt = () => {
      let workshops = this.props.workshops.content || [];
      return workshops.map((workshop) => {
        return <option key={workshop.id} value={workshop.id}>{workshop.name}</option>
      });
    };


    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-10">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form onSubmit={this.onSubmit} role="form">
                    <div className="form-group row">
                      <label htmlFor="typeCategory" className="col-md-3 control-label">Tipo de grupo</label>
                      <div className="col-md-9">
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          id="typeCategory"
                          name="typeCategory"
                          value={this.state.typeCategory}
                          onChange={this.onChange}
                          placeholder="eje: workshop || section || division || course"/>
                        {errors.typeCategory && <span className="help-block text-danger">{errors.typeCategory}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="correlativo" className="col-md-3 control-label">Correlativo</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="correlativo"
                          name="correlativo"
                          value={this.state.correlativo}
                          onChange={this.onChange}
                          placeholder="eje: about this group"/>
                        {errors.correlativo && <span className="help-block text-danger">{errors.correlativo}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="instructor" className="col-md-3 control-label">Instructor</label>
                      <div className="col-md-9">
                        <select
                          name="instructor"
                          id="instructor"
                          onChange={this.onChange}
                          value={this.state.instructor}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la instructor</option>
                          {educatorsOpt()}
                        </select>
                        {errors.instructor && <span className="help-block text-danger">{errors.instructor}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="section" className="col-md-3 control-label">Sección</label>
                      <div className="col-md-9">
                        <select
                          name="section"
                          id="section"
                          onChange={this.onChange}
                          value={this.state.section}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione el sección</option>
                          {sectionsOpt()}
                        </select>
                        {errors.section && <span className="help-block text-danger">{errors.section}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="workshopId" className="col-md-3 control-label">Workshop</label>
                      <div className="col-md-9">
                        <select
                          name="workshopId"
                          id="workshopId"
                          onChange={this.onChange}
                          value={this.state.workshopId}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione el workshop</option>
                          {workshopsOpt()}
                        </select>
                        {errors.workshopId && <span className="help-block text-danger">{errors.workshopId}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="courseId" className="col-md-3 control-label">Course</label>
                      <div className="col-md-9">
                        <select
                          name="courseId"
                          id="courseId"
                          onChange={this.onChange}
                          value={this.state.courseId}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione el course</option>
                          {coursesOpt()}
                        </select>
                        {errors.courseId && <span className="help-block text-danger">{errors.courseId}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="divisionId" className="col-md-3 control-label">Division</label>
                      <div className="col-md-9">
                        <select
                          name="divisionId"
                          id="divisionId"
                          onChange={this.onChange}
                          value={this.state.divisionId}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione el division</option>
                          {divisionsOpt()}
                        </select>
                        {errors.divisionId && <span className="help-block text-danger">{errors.divisionId}</span>}
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

EditForm.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {
    courses: state.courses,
    divisions: state.divisions,
    programInstructors: state.programInstructors,
    sections: state.sections,
    workshops: state.workshops
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      coursesGetRequest,
      divisionsGetRequest,
      programInstructorGetRequest,
      sectionsGetRequest,
      workshopsGetRequest,
      groupsAddRequest,
      groupsUpdateRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);

