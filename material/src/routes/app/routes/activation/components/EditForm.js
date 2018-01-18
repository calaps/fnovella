import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton';
import {programActivationValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import { evaluationPeriods} from "../../../../../constants/data_types";
import {bindActionCreators} from 'redux';
import map from "lodash-es/map"; //to use map in a object
import {
  sedesGetRequest,
  usersGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activationStatus: true,
      calPeriodsCourse: 'no data',
      calPeriodsGrade: 'no data',
      calPeriodsWorkshop: 'no data',
      calPeriodsDivision: 'no data',
      evaluationStructure: 'no data',
      freeCourses: true,
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
      responsable: null,
      satisfactionStructure: 'no data',
      temporality: '',
      year: '',
      errors: {},
      isLoading: false,
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
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
        calPeriodsDivision: this.state.calPeriodsDivision,
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

    const optionsPeriods = map(evaluationPeriods, (key, value) =>
      <option value={key} key={key}>{value}</option>
    );
    const renderInput = () => {
      return (<div>hola</div>);
    };

    let name = 'null';
    let nameVar = 'null';

      switch (this.props.clasification) {
        case "workshop":
          name = "talleres";
          nameVar = "calPeriodsWorkshop";
          break;
        case "division":
          name = "divisiones";
          nameVar = "calPeriodsDivision";
          break;
        case "grades":
          name = "grados";
          nameVar = "calPeriodsGrade";
          break;
        case "course":
          name = "cursos";
          nameVar = "calPeriodsCourse";
          break;
      };

    //Users options
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
            <div className="col-xl-12">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>

                  <form onSubmit={this.onSubmit} role="form">

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Si tiene director seleccione...</label>
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
                        <FlatButton secondary href="#/app/users">Agregar usuario</FlatButton>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ofrece cursos libres?</label>
                      <div className="col-md-9">
                        <select
                          className="form-control"
                          id="freeCourses"
                          name="freeCourses"
                          value={this.state.freeCourses}
                          onChange={this.onChange} >
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
                          { optionsPeriods }
                        </select>
                        {errors.temporality && <span className="help-block text-danger">{errors.temporality}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización de {name}</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id={nameVar}
                          name={nameVar}
                          value={this.state.nameVar}
                          onChange={this.onChange} />
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
                          disabled={true}
                          id="year"
                          name="year"
                          value={this.state.year}
                          onChange={this.onChange}
                          placeholder="eje: 2017"/>
                        {errors.year && <span className="help-block text-danger">{errors.year}</span>}
                      </div>
                    </div>


                    <div style={{marginTop: 12}}>
                      <FlatButton
                        label='retroceder'
                        style={{marginRight: 12}}
                        onTouchTap={this.props.handlePrev}
                      />
                      <RaisedButton
                        type='submit'
                        label='siguiente'
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
    sedes: state.sedes,
    users: state.users
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sedesGetRequest,
      usersGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(EditForm);

