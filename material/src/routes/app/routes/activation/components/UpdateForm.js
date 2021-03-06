import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // For date Picker
import Dialog from 'material-ui/Dialog';
import areIntlLocalesSupported from 'intl-locales-supported';
import FlatButton from 'material-ui/FlatButton';
import map from 'lodash-es/map'; // to use map in a object
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {programActivationValidator} from '../../../../../actions/formValidations'; // form validations
import {
  programActivationsUpdateRequest,
  sedesGetRequest,
  usersGetRequest
} from '../../../../../actions';
import UserForm from '../../users/components/EditForm';
import {convertDateToHTMLInputDateValue} from '../../../../../utils/helpers';
import {evaluationPeriods} from '../../../../../constants/data_types';

let self;
let DateTimeFormat;

if (areIntlLocalesSupported(['es-GT'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl'); // new Module with date Formats
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/es-GT');
}

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: !!(this.props.activationData.id),
      activationStatus: true,
      calPeriodsCourse: (this.props.activationData.calPeriodsWorkshop) ? new Date(this.props.activationData.calPeriodsWorkshop) : '',
      calPeriodsGrade: 'no data',
      calPeriodsWorkshop: (this.props.activationData.calPeriodsWorkshop) ? new Date(this.props.activationData.calPeriodsWorkshop) : '',
      calPeriodsDivision: 'no data',
      evaluationStructure: 'no data',
      freeCourses: this.props.activationData.freeCourses || false,
      location: 1,
      monitoringStructure: 'no data',
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
      numberSessions: 1,
      responsable: this.props.activationData.responsable || null,
      satisfactionStructure: 'no data',
      temporality: this.props.activationData.temporality || '',
      year: '',
      errors: {},
      isLoading: false,
      open: false, // Dialog state
      userData: {} // Dialog state
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    self = this;
  }

  componentWillMount() {
    const currentYear = (new Date).getFullYear();
    this.props.actions.sedesGetRequest();
    this.props.actions.usersGetRequest();
    this.setState({
      year: currentYear
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activationData !== nextProps.activationData) {
      this.setState({
        isEditing: false,
        calPeriodsCourse: '',
        calPeriodsGrade: '',
        calPeriodsWorkshop: '',
        evaluationStructure: '',
        location: '',
        monitoringStructure: '',
        numberSessions: '',
        responsable: '',
        satisfactionStructure: '',
        temporality: '',
        year: '',
        activationStatus: true,
        freeCourses: true,
        id: '',
        nsJan: '',
        nsFeb: '',
        nsMar: '',
        nsApr: '',
        nsMay: '',
        nsJun: '',
        nsJul: '',
        nsAug: '',
        nsSep: '',
        nsOct: '',
        nsNov: '',
        nsDec: '',
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      // reset errros object and disable submit button
      this.setState({errors: {}, isLoading: true});
      const data = {
        activationStatus: 1,
        id: this.props.activationData.id,
        calPeriodsCourse: convertDateToHTMLInputDateValue(this.state.calPeriodsCourse),
        calPeriodsGrade: convertDateToHTMLInputDateValue(this.state.calPeriodsGrade),
        calPeriodsWorkshop: convertDateToHTMLInputDateValue(this.state.calPeriodsWorkshop),
        calPeriodsDivision: convertDateToHTMLInputDateValue(this.state.calPeriodsDivision),
        evaluationStructure: this.state.evaluationStructure,
        freeCourses: this.state.freeCourses,
        location: this.state.location,
        monitoringStructure: this.state.monitoringStructure,
        numberSessions: this.state.numberSessions,
        satisfactionStructure: this.state.satisfactionStructure,
        temporality: parseInt(this.state.temporality, 8),
        responsable: this.state.responsable,
        year: this.state.year,
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
      };
      this.props.actions.programActivationsUpdateRequest(data).then(
        (response) => {
          // Save the default object as a provider
          if (response) {
            this.props.changeView('VIEW_ELEMENT');
          }
        },
        (error) => {
          console.log('An Error occur with the Rest API');
          self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
        });
    } else {
      // FORM WITH ERRORS
    }
  }

  onChange(e, value) {
    if (!e) {
      // its a date field according datepicker component
      console.log(value);
      this.setState({
        calPeriodsWorkshop: new Date(value),
        calPeriodsDivision: new Date(value),
        calPeriodsGrade: new Date(value),
        calPeriodsCourse: new Date(value)
      });
    }
    else {
      this.setState({[e.target.name]: e.target.value});
    }
  }

  // Dialog functions
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

  isValid() {
    // local validation
    const {errors, isValid} = programActivationValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  render() {

    // User for modal window
    const actions = [
      <FlatButton
        label="Cancelar"
        primary
        onClick={this.handleClose}
      />
    ];

    const {errors} = this.state;

    const optionsPeriods = map(evaluationPeriods, (key, value) =>
      <option value={key} key={key}>{value}</option>
    );

    // Users options
    const responsibleOpt = () => {
      // console.log('this.props.users: ', this.props.users);
      if (this.props.users.content) {
        const users = this.props.users.content;
        return users.map((user) => {
          return <option key={user.id} value={user.id}> { user.firstName + ' ' + user.firstLastName}</option>;
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
            <div className="col-xl-12">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <h4>{this.props.activationData.nameProgram}</h4>
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form onSubmit={this.onSubmit} >

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Si tiene director
                        seleccione...</label>
                      <div className="col-md-9">
                        <select
                          name="responsable"
                          id="responsable"
                          onChange={this.onChange}
                          value={this.state.responsable}
                          className="form-control"
                        >
                          <option value="">Selecciona al responsable...</option>
                          {responsibleOpt()}
                        </select>
                        {errors.responsable && <span className="help-block text-danger">{errors.responsable}</span>}
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ofrece cursos libres?</label>
                      <div className="col-md-9">
                        <select
                          className="form-control"
                          id="freeCourses"
                          name="freeCourses"
                          value={this.state.freeCourses}
                          onChange={this.onChange}>
                          <option value={true}>Si</option>
                          <option value={false}>No</option>
                        </select>

                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <h6>Temporalidad: </h6>
                    <hr/>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Temporalidad</label>
                      <div className="col-md-9">
                        <select
                          type="text"
                          className="form-control"
                          id="temporality"
                          name="temporality"
                          value={this.state.temporality}
                          onChange={this.onChange}
                          placeholder="eje: Trimestral">
                          <option value={null}>selecciona la opción...</option>
                          {optionsPeriods}
                        </select>
                        {errors.temporality && <span className="help-block text-danger">{errors.temporality}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="Ingresa fecha"
                          DateTimeFormat={DateTimeFormat}
                          okLabel="seleccionar"
                          cancelLabel="cancelar"
                          locale="es-GT"
                          id="calPeriodsCourse"
                          name="calPeriodsCourse"
                          value={this.state.calPeriodsCourse}
                          onChange={this.onChange}
                        />
                        {errors.nameVar &&
                        <span className="help-block text-danger">{errors.nameVar}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Año de activación</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          disabled
                          id="year"
                          name="year"
                          value={this.state.year}
                          onChange={this.onChange}
                          placeholder="eje: 2017" />
                        {errors.year && <span className="help-block text-danger">{errors.year}</span>}
                      </div>
                    </div>


                    <div style={{marginTop: 12}}>

                      <RaisedButton
                        type="submit"
                        label="actualizar"
                        primary
                      />
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
  // pass the providers
  return {
    sedes: state.sedes,
    users: state.users
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programActivationsUpdateRequest,
      sedesGetRequest,
      usersGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateForm);
