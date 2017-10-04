import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { emptyValidator } from "../../../../../actions/formValidations"; //form validations


class EmergencyContact extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      alias: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    //local validation
    const { errors, isValid } = emptyValidator(this.state)
    if(!isValid){
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });

      // ON SUCCESSS API

    } else {

      // FORM WITH ERRORS

    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { errors } = this.state;

    const options = map(data_types, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización de grados</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: El Progreso" />
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización de cursos</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: El Progreso" />
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inicio de calendarización de talleres</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: El Progreso" />
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Instructor responsable</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: Ingrese el nombre del instructor" />
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de evaluación</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                          placeholder="Eje: Trimestral" />
                        {errors.address && <span className="help-block text-danger">{errors.address}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Evaluación de satisfacción</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="Evaluación" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Evaluación de monitoreo</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="Evaluación" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Sede</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="Selecione la sede" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ofrece cursos libres?</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: SI" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Temporalidad</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: Trimestral" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Año de activación</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: 2017" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Número de sesiones</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: 12" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
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

module.exports = EmergencyContact;
