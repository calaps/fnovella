import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { emptyValidator } from "../../../../../actions/formValidations"; //form validations


class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      dataType: '',
      category: '',
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
                          placeholder="eje: altura" />
                          {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ingresa la categoria</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          name="category"
                          value={this.state.category}
                          onChange={this.onChange}
                          placeholder="eje: fisico" />
                        {errors.category && <span className="help-block text-danger">{errors.category}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                      <div className="col-md-9">
                        <select
                          name="dataType"
                          onChange={this.onChange}
                          value={this.state.dataType}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el tipo de dato</option>
                          {options}
                        </select>
                        {errors.dataType && <span className="help-block text-danger">{errors.dataType}</span>}
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
