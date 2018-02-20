import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import map from 'lodash-es/map'; // to use map in a object
import PropTypes from 'prop-types'; // for user prop-types
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import areIntlLocalesSupported from 'intl-locales-supported'; // For Date Picker format
import {typeCategory} from '../../../../../constants/data_types';
import {groupValidator} from '../../../../../actions/formValidations'; // form validations
import {
  coursesGetRequest,
  divisionsGetRequest,
  programInstructorGetRequest,
  usersGetRequest,
  sectionsGetRequest,
  workshopsGetRequest,
  workshopGetByIdRequest,
  divisionGetByIdRequest,
  courseGetByIdRequest,
  sectionGetByIdRequest
} from '../../../../../actions';
import UserForm from '../../users/components/EditForm'; // EditForm for Users creation

let self;
let DateTimeFormat;

if (areIntlLocalesSupported(['es-GT'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl'); // new Module with date Formats
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/es-GT');
}

class GeneralConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      courseId: '',
      divisionId: '',
      instructor: '',
      coordinator: '',
      section: '',
      type: 1,
      typeCategory: '',
      workshopId: '',
      inscriptionsEnd: new Date(),
      inscriptionsStart: new Date(),
      programDateEnd: new Date(),
      programDateStart: new Date(),
      months: ['nsJan', 'nsFeb', 'nsMar', 'nsApr', 'nsMay', 'nsJun', 'nsJul', 'nsAug', 'nsSep', 'nsOct', 'nsNov', 'nsDec'],
      monthsToRender: [],
      nsJan: 0,
      nsFeb: 0,
      nsMar: 0,
      nsApr: 0,
      nsMay: 0,
      nsJun: 0,
      nsJul: 0,
      nsAug: 0,
      nsSep: 0,
      nsOct: 0,
      nsNov: 0,
      nsDec: 0,
      errors: {},
      isLoading: false,
      selectedType: '',
      correlativo: '',
      yearActivation: '',
      open: false, // Dialog state
      userData: {} // Dialog state
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeStartDateProgram = this.handleChangeStartDateProgram.bind(this);
    this.handleChangeEndDateProgram = this.handleChangeEndDateProgram.bind(this);
    self = this;
  }

  //Dialog functions
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleFinish = () => {
    this.setState({open: false});
    this.props.actions.usersGetRequest(); // whenRefresh
  };

  componentWillMount() {
    let dateYear = (new Date()).getFullYear();

    this.props.actions.coursesGetRequest();
    this.props.actions.divisionsGetRequest();
    this.props.actions.usersGetRequest();
    this.props.actions.programInstructorGetRequest();
    this.props.actions.sectionsGetRequest();
    this.props.actions.workshopsGetRequest();
    if (self.context.router.location.query.typeCategory) {
      this.setState({
        typeCategory: self.context.router.location.query.typeCategory,
        yearActivation: dateYear
      });
      switch (self.context.router.location.query.typeCategory) {
        case 'workshop':
          this.props.actions.workshopGetByIdRequest(self.context.router.location.query.workshopId)
            .then(
              (response) => {
                if (response) {
                  this.setState({
                    workshopId: self.context.router.location.query.workshopId,
                    selectedType: 'workshop',
                    correlativo: response.data.name,
                    section: 0,
                    divisionId: 0,
                    courseId: 0
                  });
                }
              },
              (error) => {
                console.log('An Error occur with the Rest API: ', error);
              });
          break;
        case 'section':
          this.props.actions.sectionGetByIdRequest(self.context.router.location.query.sectionId)
            .then(
              (response) => {
                if (response) {
                  this.setState({
                    section: self.context.router.location.query.sectionId,
                    selectedType: 'section',
                    correlativo: response.data.name,
                    workshopId: 0,
                    divisionId: 0,
                    courseId: 0
                  });
                }
              },
              (error) => {
                console.log('An Error occur with the Rest API: ', error);
              });
          break;
        case 'division':
          this.props.actions.divisionGetByIdRequest(self.context.router.location.query.divisionId)
            .then(
              (response) => {
                if (response) {
                  this.setState({
                    divisionId: self.context.router.location.query.divisionId,
                    selectedType: 'division',
                    correlativo: response.data.name,
                    workshopId: 0,
                    section: 0,
                    courseId: 0
                  });
                }
              },
              (error) => {
                console.log('An Error occur with the Rest API: ', error);
              });
          break;
        case 'course':
          this.props.actions.courseGetByIdRequest(self.context.router.location.query.courseId)
            .then(
              (response) => {
                if (response) {
                  this.setState({
                    courseId: self.context.router.location.query.courseId,
                    selectedType: 'course',
                    correlativo: response.data.name,
                    workshopId: 0,
                    section: 0,
                    divisionId: 0
                  });
                }
              },
              (error) => {
                console.log('An Error occur with the Rest API: ', error);
              });
          break;
        default:
          break;
      }
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
        instructor: this.state.instructor,
        type: this.state.type,
        typeCategory: this.state.typeCategory,
        inscriptionsStart: this.state.inscriptionsStart,
        inscriptionsEnd: this.state.inscriptionsEnd,
        programDateEnd: this.state.programDateEnd,
        programDateStart: this.state.programDateStart,
        nsJan: this.state.nsJan || 0,
        nsFeb: this.state.nsFeb || 0,
        nsMar: this.state.nsMar || 0,
        nsApr: this.state.nsApr || 0,
        nsMay: this.state.nsMay || 0,
        nsJun: this.state.nsJun || 0,
        nsJul: this.state.nsJul || 0,
        nsAug: this.state.nsAug || 0,
        nsSep: this.state.nsSep || 0,
        nsOct: this.state.nsOct || 0,
        nsNov: this.state.nsNov || 0,
        nsDec: this.state.nsDec || 0,
        correlativo: this.state.correlativo,
        coordinator: this.state.coordinator,
        section: this.state.section,
        divisionId: this.state.divisionId,
        courseId: this.state.courseId,
        yearActivation: this.state.yearActivation,
      };
      switch (self.context.router.location.query.typeCategory) {
        case 'workshop':
          data.workshopId = this.state.workshopId;
          break;
        case 'section':
          data.section = this.state.section;
          break;
        case 'division':
          data.divisionId = this.state.divisionId;
          break;
        case 'course':
          data.courseId = this.state.courseId;
          break;
        default:
          break;
      }
      this.props.handleNext(data);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleChangeStartDate(event, date) {
    this.setState({
      inscriptionsStart: date
    });
  }

  handleChangeEndDate(event, date) {
    this.setState({
      inscriptionsEnd: date
    });
  }

  handleChangeStartDateProgram(event, date) {
    this.setState({
      programDateStart: date,
      monthsToRender: this.state.months.slice(date.getMonth(), this.state.programDateEnd.getMonth() + 1)
    });
  }

  handleChangeEndDateProgram(event, date) {
    this.setState({
      programDateEnd: date,
      monthsToRender: this.state.months.slice(this.state.programDateStart.getMonth(), date.getMonth() + 1)
    });
  }

  renderName(val) {
    switch (val) {
      case 'nsJan':
        return 'Enero';
        break;
      case 'nsFeb':
        return 'Febrero';
        break;
      case 'nsMar':
        return 'Marzo';
        break;
      case 'nsApr':
        return 'Abril';
        break;
      case 'nsMay':
        return 'Mayo';
        break;
      case 'nsJun':
        return 'Junio';
        break;
      case 'nsJul':
        return 'Julio';
        break;
      case 'nsAug':
        return 'Agosto';
        break;
      case 'nsSep':
        return 'Septimbre';
        break;
      case 'nsOct':
        return 'Octubre';
        break;
      case 'nsNov':
        return 'Noviembre';
        break;
      case 'nsDic':
        return 'Diciembre';
        break;
      default:
        return 'Error';
        break;
    }
  }

  render() {

    // User for modal window
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const {errors} = this.state;

    let selectOpt = (array) => {
      return array.map((arr) => {
        return <option key={arr.instructor || arr.id}
                       value={arr.instructor || arr.id}>{arr.instructorName || arr.name}</option>
      });
    };

    const monthsRender = map(this.state.monthsToRender, (val, key) =>
      <div className="form-group">
        <label htmlFor="inputEmail3" key={key} className="control-label">{this.renderName(val)}:</label>
        <div>
          <input
            type="number"
            className="form-control"
            id={val}
            name={val}
            value={this.state.val}
            onChange={this.onChange}
            placeholder="número de sesiones..."/>
        </div>
      </div>
    );

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
                <select
                  disabled={this.state.selectedType === 'workshop'}
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
        case 'section':
          return (
            <div className="form-group row">
              <label htmlFor="section" className="col-md-3 control-label">Sección</label>
              <div className="col-md-9">
                <select
                  disabled={this.state.selectedType === 'section'}
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
        case 'division':
          return (
            <div className="form-group row">
              <label htmlFor="divisionId" className="col-md-3 control-label">Division</label>
              <div className="col-md-9">
                <select
                  disabled={this.state.selectedType === 'division'}
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
        case 'course':
          return (
            <div className="form-group row">
              <label htmlFor="courseId" className="col-md-3 control-label">Course</label>
              <div className="col-md-9">
                <select
                  disabled={this.state.selectedType === 'course'}
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
      }
    };

    // Users options
    let responsibleOpt = () => {
      // console.log("this.props.users: ", this.props.users);
      if (this.props.users.content) {
        let users = this.props.users.content;
        return users.map((user) => {
          return <option key={user.id} value={user.id}>{user.firstName + ' ' + user.firstLastName}</option>
        });
      }
      else {
        return null;
      }
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-10">

              <div className="box box-default">
                <div className="box-body padding-md">

                  <form onSubmit={this.onSubmit} role="form">

                    <h6>Configuración general: </h6>
                    <hr/>

                    <div className="form-group row">
                      <label htmlFor="typeCategory" className="col-md-3 control-label">Tipo de grupo</label>
                      <div className="col-md-9">
                        <select
                          disabled
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de inicio de
                        programa</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="Ingresa fecha"
                          DateTimeFormat={DateTimeFormat}
                          okLabel="seleccionar"
                          cancelLabel="cancelar"
                          locale="es-GT"
                          value={this.state.programDateStart}
                          onChange={this.handleChangeStartDateProgram}
                        />
                        {errors.programDateStart &&
                        <span className="help-block text-danger">{errors.programDateStart}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de final de programa</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="Ingresa fecha"
                          DateTimeFormat={DateTimeFormat}
                          okLabel="seleccionar"
                          cancelLabel="cancelar"
                          locale="es-GT"
                          value={this.state.programDateEnd}
                          onChange={this.handleChangeEndDateProgram}
                        />
                        {errors.programDateEnd &&
                        <span className="help-block text-danger">{errors.programDateEnd}</span>}
                      </div>
                    </div>

                    {selectBox()}

                    <h6>Personal: </h6>
                    <hr />

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Seleccione el coordinador</label>
                      <div className="col-md-9">
                        <select
                          name="coordinator"
                          id="coordinator"
                          onChange={this.onChange}
                          value={this.state.coordinator}
                          className="form-control"
                        >
                          <option value="">Selecciona al coordinator...</option>
                          {responsibleOpt()}
                        </select>
                        {errors.coordinator && <span className="help-block text-danger">{errors.coordinator}</span>}
                        <FlatButton secondary onClick={this.handleOpen}>Agregar usuario</FlatButton>
                      </div>
                    </div>

                    <Dialog
                      title="Agregar Usuario"
                      actions={actions}
                      autoDetectWindowHeight
                      autoScrollBodyContent
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                    >
                      <UserForm dialog changeView={this.handleFinish} userData={this.state.userData} />
                    </Dialog>

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

                    <h6>Inscripciones: </h6>
                    <hr/>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de inicio de
                        inscripción</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="Ingresa fecha"
                          DateTimeFormat={DateTimeFormat}
                          okLabel="seleccionar"
                          cancelLabel="cancelar"
                          locale="es-GT"
                          value={this.state.inscriptionsStart}
                          onChange={this.handleChangeStartDate}
                        />
                        {errors.inscriptionsStart &&
                        <span className="help-block text-danger">{errors.inscriptionsStart}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de final de
                        inscripción</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="Ingresa fecha"
                          DateTimeFormat={DateTimeFormat}
                          okLabel="seleccionar"
                          cancelLabel="cancelar"
                          locale="es-GT"
                          value={this.state.inscriptionsEnd}
                          onChange={this.handleChangeEndDate}
                        />
                        {errors.inscriptionsEnd &&
                        <span className="help-block text-danger">{errors.inscriptionsEnd}</span>}
                      </div>
                    </div>

                    <h6>Sesiones: </h6>
                    <hr/>

                    {monthsRender}

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton
                          disabled={this.state.isLoading}
                          label='Cancelar'
                          style={{marginRight: 12}}
                          onTouchTap={this.props.handleCancel}
                          secondary className="btn-w-md"/>
                        <RaisedButton
                          disabled={this.state.isLoading} type="submit"
                          label='Siguiente' secondary className="btn-w-md"/>
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

GeneralConfiguration.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {
    courses: state.courses,
    divisions: state.divisions,
    users: state.users,
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
      usersGetRequest,
      programInstructorGetRequest,
      sectionsGetRequest,
      workshopsGetRequest,
      workshopGetByIdRequest,
      divisionGetByIdRequest,
      courseGetByIdRequest,
      sectionGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralConfiguration);

