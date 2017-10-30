import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton';
import {programActivationValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activationStatus: true,
      calPeriodsCourse: '',
      calPeriodsGrade: '',
      calPeriodsWorkshop: '',
      evaluationStructure: '',
      freeCourses: true,
      location: '',
      monitoringStructure: '',
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
      numberSessions: '',
      responsable: '',
      satisfactionStructure: '',
      temporality: '',
      year: '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    self = this;
  }

  componentWillMount() {
    this.props.actions.sedesGetRequest();
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
      this.props.handleNext(data);
    } else {
      // FORM WITH ERRORS
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const {errors} = this.state;

    //Sedes || location options
    let sedesOpt = () => {
      let sedes = this.props.sedes.content || [];
      return sedes.map((sede) => {
        return <option key={sede.id} value={sede.id}>{sede.name}</option>
      });
    };

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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Location</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.location}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la sede</option>
                          {sedesOpt()}
                        </select>
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

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Enero:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsJan"
                          name="nsJan"
                          value={this.state.nsJan}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsJan &&
                        <span className="help-block text-danger">{errors.nsJan}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Febrero:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsFeb"
                          name="nsFeb"
                          value={this.state.nsFeb}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsFeb &&
                        <span className="help-block text-danger">{errors.nsFeb}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Marzo:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsMar"
                          name="nsMar"
                          value={this.state.nsMar}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsMar &&
                        <span className="help-block text-danger">{errors.nsMar}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Abril:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsApr"
                          name="nsApr"
                          value={this.state.nsApr}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsApr &&
                        <span className="help-block text-danger">{errors.nsApr}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Mayo:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsMay"
                          name="nsMay"
                          value={this.state.nsMay}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsMay &&
                        <span className="help-block text-danger">{errors.nsMay}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Junio:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsJun"
                          name="nsJun"
                          value={this.state.nsJun}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsJun &&
                        <span className="help-block text-danger">{errors.nsJun}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Julio:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsJul"
                          name="nsJul"
                          value={this.state.nsJul}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsJul &&
                        <span className="help-block text-danger">{errors.nsJul}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Agosto:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsAug"
                          name="nsAug"
                          value={this.state.nsAug}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsAug &&
                        <span className="help-block text-danger">{errors.nsAug}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Septiembre:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsSep"
                          name="nsSep"
                          value={this.state.nsSep}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsSep &&
                        <span className="help-block text-danger">{errors.nsSep}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Octubre:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsOct"
                          name="nsOct"
                          value={this.state.nsOct}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsOct &&
                        <span className="help-block text-danger">{errors.nsOct}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Noviembre:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsNov"
                          name="nsNov"
                          value={this.state.nsNov}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsNov &&
                        <span className="help-block text-danger">{errors.nsNov}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sesiones de Diciembre:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="nsDec"
                          name="nsDec"
                          value={this.state.nsDec}
                          onChange={this.onChange}
                          placeholder="eje: 12"/>
                        {errors.nsDec &&
                        <span className="help-block text-danger">{errors.nsDec}</span>}
                      </div>
                    </div>


                    <div style={{marginTop: 12}}>
                      <FlatButton
                        label='Back'
                        style={{marginRight: 12}}
                        onTouchTap={this.props.handlePrev}
                      />
                      <RaisedButton
                        type='submit'
                        label='Next'
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
    sedes: state.sedes
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sedesGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(EditForm);

