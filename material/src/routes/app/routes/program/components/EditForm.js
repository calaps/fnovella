import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { valdiateCourse } from "../../../../../actions/formValidations"; //form validations


class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      audience: '',
      description: '',
      provider: '',
      clasification: '',
      free_courses: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    //local validation
    const { errors, isValid } = valdiateCourse(this.state)
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
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form onSubmit={this.onSubmit} role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de campo</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: CENCA" />
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Audiencia</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="audience"
                          name="audience"
                          value={this.state.audience}
                          onChange={this.onChange}
                          placeholder="eje: Niños de 10 - 15 años" />
                        {errors.audience && <span className="help-block text-danger">{errors.audience}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Descripción</label>
                      <div className="col-md-9">
                        <textarea
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="Descripción del programa" />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
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
                          <option value="0">No</option>
                          <option value="1">Si</option>
                        </select>
                        {errors.provider && <span className="help-block text-danger">{errors.provider}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Clasificación</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="clasification"
                          name="clasification"
                          value={this.state.clasification}
                          onChange={this.onChange}
                          placeholder="Clasificación del programa" />
                        {errors.clasification && <span className="help-block text-danger">{errors.clasification}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tiene cursos libres?</label>
                      <div className="col-md-9">
                        <select
                          name="free_courses"
                          id="free_courses"
                          onChange={this.onChange}
                          value={this.state.free_courses}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value="0">No</option>
                          <option value="1">Si</option>
                        </select>
                        {errors.free_courses && <span className="help-block text-danger">{errors.free_courses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <RaisedButton disabled={this.state.isLoading} type="submit" label="Agregar" secondary className="btn-w-md" />
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

module.exports = EditForm;
