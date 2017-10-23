import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import {programActivationValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programActivationsUpdateRequest
} from '../../../../../actions';

let self;

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.activationData.id) ? true : false,
      activationStatus: typeof this.props.activationData.activationStatus === "boolean" ? this.props.activationData.activationStatus : true,
      calPeriodsCourse: this.props.activationData.calPeriodsCourse || '',
      calPeriodsGrade: this.props.activationData.calPeriodsGrade || '',
      calPeriodsWorkshop: this.props.activationData.calPeriodsWorkshop || '',
      evaluationStructure: this.props.activationData.evaluationStructure || '',
      freeCourses: typeof this.props.activationData.freeCourses === "boolean" ? this.props.activationData.freeCourses : true,
      location: this.props.activationData.location || '',
      monitoringStructure: this.props.activationData.monitoringStructure || '',
      numberSessions: this.props.activationData.numberSessions || '',
      responsable: this.props.activationData.responsable || '',
      satisfactionStructure: this.props.activationData.satisfactionStructure || '',
      temporality: this.props.activationData.temporality || '',
      year: this.props.activationData.year || '',
      id: this.props.activationData.id || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    self = this;
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
      });
    }
  }

  isValid() {
    //local validation
    const {errors, isValid} = programActivationValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errros object and disable submit button
      this.setState({errors: {}, isLoading: true});
      let data = {
        activationStatus: this.state.activationStatus,
        calPeriodsCourse: this.state.calPeriodsCourse,
        calPeriodsGrade: this.state.calPeriodsGrade,
        calPeriodsWorkshop: this.state.calPeriodsWorkshop,
        evaluationStructure: this.state.evaluationStructure,
        freeCourses: this.state.freeCourses,
        location: this.state.location,
        monitoringStructure: this.state.monitoringStructure,
        numberSessions: this.state.numberSessions,
        responsable: this.state.responsable,
        satisfactionStructure: this.state.satisfactionStructure,
        temporality: this.state.temporality,
        year: this.state.year,
        id: this.state.id
      };
      this.props.actions.programActivationsUpdateRequest(data).then(
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
    } else {
      // FORM WITH ERRORS
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const {errors} = this.state;

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-12">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form onSubmit={this.onSubmit} role="form">

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Activation Status</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="activationStatus"
                          name="activationStatus"
                          value={this.state.activationStatus}
                          onChange={this.onChange}
                          placeholder="eje: true or false"/>
                        {errors.activationStatus && <span className="help-block text-danger">{errors.activationStatus}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización de
                        grados</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id="calPeriodsGrade"
                          name="calPeriodsGrade"
                          value={this.state.calPeriodsGrade}
                          onChange={this.onChange}
                          placeholder="eje: El Progreso"/>
                        {errors.calPeriodsGrade &&
                        <span className="help-block text-danger">{errors.calPeriodsGrade}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización de
                        cursos</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id="calPeriodsCourse"
                          name="calPeriodsCourse"
                          value={this.state.calPeriodsCourse}
                          onChange={this.onChange}
                          placeholder="eje: El Progreso"/>
                        {errors.calPeriodsCourse &&
                        <span className="help-block text-danger">{errors.calPeriodsCourse}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización de
                        talleres</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id="calPeriodsWorkshop"
                          name="calPeriodsWorkshop"
                          value={this.state.calPeriodsWorkshop}
                          onChange={this.onChange}
                          placeholder="eje: El Progreso"/>
                        {errors.calPeriodsWorkshop &&
                        <span className="help-block text-danger">{errors.calPeriodsWorkshop}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Instructor responsable</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="responsable"
                          name="responsable"
                          value={this.state.responsable}
                          onChange={this.onChange}
                          placeholder="eje: Ingrese el nombre del instructor"/>
                        {errors.responsable && <span className="help-block text-danger">{errors.responsable}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de evaluación</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="evaluationStructure"
                          name="evaluationStructure"
                          value={this.state.evaluationStructure}
                          onChange={this.onChange}
                          placeholder="Eje: Trimestral"/>
                        {errors.evaluationStructure &&
                        <span className="help-block text-danger">{errors.evaluationStructure}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Evaluación de satisfacción</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="satisfactionStructure"
                          name="satisfactionStructure"
                          value={this.state.satisfactionStructure}
                          onChange={this.onChange}
                          placeholder="Evaluación"/>
                        {errors.satisfactionStructure &&
                        <span className="help-block text-danger">{errors.satisfactionStructure}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Evaluación de monitoreo</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="monitoringStructure"
                          name="monitoringStructure"
                          value={this.state.monitoringStructure}
                          onChange={this.onChange}
                          placeholder="Evaluación"/>
                        {errors.monitoringStructure &&
                        <span className="help-block text-danger">{errors.monitoringStructure}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sede</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          value={this.state.location}
                          onChange={this.onChange}
                          placeholder="Selecione la sede"/>
                        {errors.location && <span className="help-block text-danger">{errors.location}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ofrece cursos libres?</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="freeCourses"
                          name="freeCourses"
                          value={this.state.freeCourses}
                          onChange={this.onChange}
                          placeholder="eje: true or false"/>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Temporalidad</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="temporality"
                          name="temporality"
                          value={this.state.temporality}
                          onChange={this.onChange}
                          placeholder="eje: Trimestral"/>
                        {errors.temporality && <span className="help-block text-danger">{errors.temporality}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Año de activación</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="year"
                          name="year"
                          value={this.state.year}
                          onChange={this.onChange}
                          placeholder="eje: 2017"/>
                        {errors.year && <span className="help-block text-danger">{errors.year}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Número de sesiones</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="numberSessions"
                          name="numberSessions"
                          value={this.state.numberSessions}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.numberSessions &&
                        <span className="help-block text-danger">{errors.numberSessions}</span>}
                      </div>
                    </div>

                    <div style={{marginTop: 12}}>
                      <RaisedButton
                        type='submit'
                        disabled={this.state.isLoading}
                        label='Update'
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
  //pass the providers
  return {
    // auth: state.auth
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programActivationsUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateForm);
