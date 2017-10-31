import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import {programValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programAddRequest,
  programUpdateRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.programData.id) ? true : false,
      name: this.props.programData.name || '',
      audience: this.props.programData.audience || '',
      description: this.props.programData.description || '',
      provider: typeof this.props.programData.provider === "boolean" ? this.props.programData.provider : true,
      clasification: this.props.programData.clasification || '',
      freeCourses: typeof this.props.programData.freeCourses === "boolean" ? this.props.programData.freeCourses : true,
      type: typeof this.props.programData.type === "boolean" ? this.props.programData.type : true,
      id: this.props.programData.id || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self = this;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.programData !== nextProps.programData) {
      this.setState({
        isEditing: false,
        name: '',
        audience: '',
        description: '',
        provider: true,
        clasification: '',
        freeCourses: true,
        type: true,
        id: '',
      });
    }
  }

  isValid() {
    // TODO:Temporary commented bcz validation is not valid
    //local validation
    const {errors, isValid} = programValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  handleCancel() {
    self.props.changeView('VIEW_ELEMENT')
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});

      let data = {
        name: this.state.name,
        type: this.state.type,
        audience: this.state.audience,
        description: this.state.description,
        provider: this.state.provider,
        clasification: this.state.clasification,
        freeCourses: this.state.freeCourses
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing ?
        this.props.actions.programUpdateRequest(data).then(
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
        this.props.actions.programAddRequest(data).then(
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

    const options = map(data_types, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <h5>Formulario: </h5>
                  <form onSubmit={this.onSubmit} role="form">

                    <h6>Información general: </h6><hr />

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de programa</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: CENCA"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: select a main user to manage program
                        controller relation: program / app_user
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Responsable:</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value="" >Selecciona usuario de aplicación...</option>
                        </select>
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <h6>Audiencia: </h6><hr />

                    <div className="form-group row">
                      {
                        /* #change
                        description: select user gender
                        controller: program-controller
                        database name: gender_audience
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Genero: </label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona la categoria...</option>
                          <option value="male">Hombres</option>
                          <option value="female">Mujeres</option>
                          <option value="both">Mixto</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Desscripción de audiencia:</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="audience"
                          name="audience"
                          value={this.state.audience}
                          onChange={this.onChange}
                          placeholder="Ejemplo: Lideres mujeres..."/>
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: min age to audience
                        controller: program-controller
                        database name: audience_min
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Edad minima</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="audience"
                          name="audience"
                          value={this.state.audience}
                          onChange={this.onChange}
                          placeholder="5 años..."/>
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: max age to audience
                        controller: program-controller
                        database name: audience_max
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Edad máxima</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="audience"
                          name="audience"
                          value={this.state.audience}
                          onChange={this.onChange}
                          placeholder="25 años..." />
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>

                    <h6>Descripción: </h6><hr />

                    <div className="form-group row">
                      {
                        /* #change
                        description: Program info abreviation
                        controller: program-controller
                        database name: type (previusly integer, now string)
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="eje: FISICO-FUTBOL" />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Descripción general</label>
                      <div className="col-md-9">
                        <textarea
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="Descripción del programa"/>
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <h6>Lugar de implementación: </h6><hr />

                    <div className="form-group row">
                      {
                        /* #change
                        description: "Multiple selection" options pupulated with the location name.
                        controller to use: program-location contoller
                        database name: program_location table
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Selecciona las sedes:</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value="" >Selecciona ubicaciones...</option>
                        </select>
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: Implementation place
                        controller to use: program contoller
                        database name: implementation_location
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Lugar de implementación</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="Ingrese..." />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    {/*  Ignore....

                    <h6>Tareas: </h6><hr />

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Agregar alumnos</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="Tipo de programa" />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <div className="form-group row"> {/* #change
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Asistencia</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="Tipo de programa" />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <div className="form-group row"> {/* #change
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ingresar evaluaciones</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="Tipo de programa" />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <div className="form-group row"> {/* #change
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Aprobación de notas</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="Tipo de programa" />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    */
                    }

                    <h6>Clasificación: </h6><hr />

                    <div className="form-group row">
                    {
                      /* #change
                      description: If the program uses "grade, courses, workshop or category"
                      controller to use: program controller
                      database name: clasification
                    */
                    }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Clasificación</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value="" >Selecciona la clasificación...</option>
                          <option value="grade" >Grado</option>
                          <option value="workshop" >Taller</option>
                          <option value="course" >Curso</option>
                          <option value="division" >Categorias</option>
                        </select>
                        {errors.clasification && <span className="help-block text-danger">{errors.clasification}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tiene cursos libres?</label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={true}>Si</option>
                          <option value={false}>No</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: type of evaluation to use in the program
                        controller to use: program contoller
                        database name: evaluation_type
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de evaluación</label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="conocimiento">Evaluación conocimiento</option>
                          <option value="continua">Evaluación de continua</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: If the program uses "grade, courses, workshop or category"
                        controller to use: program contoller
                        database name: evaluation_performance
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Evaluación de desempeño</label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={true}>Si</option>
                          <option value={false}>No</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <h6>Temporalidad: </h6><hr />

                    <div className="form-group row">
                      {
                        /* #change
                        description: number of months that the programs needs each year
                        controller to use: program contoller
                        database name: months_total
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Cantidad de meses</label>
                      <div className="col-md-9">
                        <select
                          name="provider"
                          id="provider"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: How often does the program needs an evaluation?
                        controller to use: program contoller
                        database name: evaluation_period
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Periodo de evaluación (cada cuanto se evalua)</label>
                      <div className="col-md-9">
                        <select
                          name="provider"
                          id="provider"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tiene proveedor</label>
                      <div className="col-md-9">
                        <select
                          name="provider"
                          id="provider"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.provider && <span className="help-block text-danger">{errors.provider}</span>}
                      </div>
                    </div>

                    <h6>Indicadores: </h6><hr />

                    <div className="form-group row">
                      {
                        /* #change
                        description: Does the program have results indicator?
                        controller to use: program contoller
                        database name: indicators_evaluation
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Requiere indicadores de resultado</label>
                      <div className="col-md-9">
                        <select
                          name="provider"
                          id="provider"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: Does the program have performmance indicator?
                        controller to use: program contoller
                        database name: indicators_performmance
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Requiere indicadores de desempeño</label>
                      <div className="col-md-9">
                        <select
                          name="provider"
                          id="provider"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: Does the program have satisfaction indicator?
                        controller to use: program contoller
                        database name: indicators_satisfaction
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Requiere indicadores de satisfacción</label>
                      <div className="col-md-9">
                        <select
                          name="provider"
                          id="provider"
                          onChange={this.onChange}
                          value={this.state.provider}
                          className="form-control"
                        >
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>

                    <h6>Indicadores: </h6><hr />

                    <div className="form-group row">
                      {
                        /* #change
                        description: Is a multiple select params between
                        controller to use: program_aditional_fields relation
                        database name: is a relation
                      */
                      }
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Campos adicionales: </label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="" >Selecciona la categoria...</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Cancel'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.handleCancel}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label={this.state.isEditing ? 'Update' : 'Add'}
                                      secondary className="btn-w-md"/>
                      </div>
                    </div>
                  </form>

                </div>

              </div>

            </div>
                      <div className="col-xl-3 col-lg-6">
                      <div className="card bg-color-white">
                      <div className="card-content">
                      <span className="card-title">Uso de catalogos</span>
                      <p>El siguiente foromulario hace uso de catalogos, para agregar nuevos catalogos deveras editarlos
                      previamente
                      en la sección de la página.</p>
                      </div>
                      <div className="card-action">
                      <a href="#/app/catalog">Ver catalogos</a>
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
      //    signUpRequest
      programAddRequest,
      programUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
