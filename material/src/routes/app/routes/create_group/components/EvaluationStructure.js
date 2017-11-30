import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import map from "Lodash/map"; //to use map in a object
import {typeCategory} from '../../../../../constants/data_types';
import {groupValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  coursesGetRequest,
  divisionsGetRequest,
  programInstructorGetRequest,
  sectionsGetRequest,
  workshopsGetRequest
} from '../../../../../actions';

let self;

class EvaluationStructure extends React.Component {
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
      inscriptionsEnd: this.props.groupData.inscriptionsEnd || new Date(),
      inscriptionsStart: this.props.groupData.inscriptionsStart || new Date(),
      errors: {},
      isLoading: false,
      selectedType: ''
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
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
      switch (self.context.router.location.query.typeCategory) {
        case 'workshop':
          this.setState({
            workshopId: self.context.router.location.query.workshopId,
            selectedType: 'workshop'
          });
          break;
        case 'section':
          this.setState({
            section: self.context.router.location.query.sectionId,
            selectedType: 'section'
          });
          break;
        case 'division':
          this.setState({
            divisionId: self.context.router.location.query.divisionId,
            selectedType: 'division'
          });
          break;
        case 'course':
          this.setState({
            courseId: self.context.router.location.query.courseId,
            selectedType: 'course'
          });
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
        inscriptionsStart: '',
        inscriptionsEnd: '',
      })
    }
  }

  handleCancel() {
    if (self.context.router.location.query.typeCategory) {
      switch (self.context.router.location.query.typeCategory) {
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
    } else {
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
        correlativo: this.state.correlativo,
        inscriptionsStart: this.state.inscriptionsStart,
        inscriptionsEnd: this.state.inscriptionsEnd
      };
      this.props.handleNext(data);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleChangeStartDate(event, date){
    this.setState({
      inscriptionsStart: date,
    });
  }

  handleChangeEndDate(event, date){
    this.setState({
      inscriptionsEnd: date,
    });
  }

  render() {

    const {errors} = this.state;

    let selectOpt = (array) => {
      return array.map((arr) => {
        return <option key={arr.instructor || arr.id}
                       value={arr.instructor || arr.id}>{arr.instructorName || arr.name}</option>
      });
    };

    const typeCategories = map(typeCategory, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    let selectBox = () => {
      switch (this.state.typeCategory) {
        case 'workshop':
          return (
            <div className="form-group row">
              <label htmlFor="workshopId" className="col-md-3 control-label">Workshop</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'workshop'}
                        name="workshopId"
                        id="workshopId"
                        onChange={this.onChange}
                        value={this.state.workshopId}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el workshop</option>
                  {selectOpt(this.props.workshops.content || [])}
                </select>
                {errors.workshopId && <span className="help-block text-danger">{errors.workshopId}</span>}
              </div>
            </div>
          );
          break;
        case 'section':
          return (
            <div className="form-group row">
              <label htmlFor="section" className="col-md-3 control-label">Sección</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'section'}
                        name="section"
                        id="section"
                        onChange={this.onChange}
                        value={this.state.section}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el sección</option>
                  {selectOpt(this.props.sections.content || [])}
                </select>
                {errors.section && <span className="help-block text-danger">{errors.section}</span>}
              </div>
            </div>
          );
          break;
        case 'division':
          return (
            <div className="form-group row">
              <label htmlFor="divisionId" className="col-md-3 control-label">Division</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'division'}
                        name="divisionId"
                        id="divisionId"
                        onChange={this.onChange}
                        value={this.state.divisionId}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el division</option>
                  {selectOpt(this.props.divisions.content || [])}
                </select>
                {errors.divisionId && <span className="help-block text-danger">{errors.divisionId}</span>}
              </div>
            </div>
          );
          break;
        case 'course':
          return (
            <div className="form-group row">
              <label htmlFor="courseId" className="col-md-3 control-label">Course</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'course'}
                        name="courseId"
                        id="courseId"
                        onChange={this.onChange}
                        value={this.state.courseId}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el course</option>
                  {selectOpt(this.props.courses.content || [])}
                </select>
                {errors.courseId && <span className="help-block text-danger">{errors.courseId}</span>}
              </div>
            </div>
          );
          break;
      }
    };

    return (
      <div>
        I'll add fields here, its a demo to show you a stepper, need your answers on stride first.
      </div>
    );
  }
}
{/*<article className="article padding-lg-v article-bordered">
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
                        <select
                          name="typeCategory"
                          id="typeCategory"
                          onChange={this.onChange}
                          value={this.state.typeCategory}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el typeCategory</option>
                          {typeCategories}
                        </select>
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
                          {selectOpt(this.props.programInstructors.content || [])}
                        </select>
                        {errors.instructor && <span className="help-block text-danger">{errors.instructor}</span>}
                      </div>
                    </div>
                    {selectBox()}
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inscriptions start</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="eje: Durán"
                          value={this.state.inscriptionsStart}
                          onChange={this.handleChangeStartDate}
                        />
                        {errors.inscriptionsStart &&
                        <span className="help-block text-danger">{errors.inscriptionsStart}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inscriptions end</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="eje: Durán"
                          value={this.state.inscriptionsEnd}
                          onChange={this.handleChangeEndDate}
                        />
                        {errors.inscriptionsEnd &&
                        <span className="help-block text-danger">{errors.inscriptionsEnd}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Cancelar'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.props.handleCancel}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label='Next' secondary className="btn-w-md"/>
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>

          </div>

        </div>
      </article>*/}
EvaluationStructure.contextTypes = {
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
      workshopsGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationStructure);

