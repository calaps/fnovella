import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import map from "Lodash/map"; //to use map in a object
import { personal_documents, gender, countries }  from '../../../../../constants/data_types';
import { emptyValidator } from "../../../../../actions/formValidations"; //form validations


class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      secondName: '',
      firstLastname: '',
      secondLastname: '',
      privilege: '',
      bornDate: '',
      documentType: '',
      documentValue: '',
      nacionality: '',
      department : '',
      municipality: '',
      community: '',
      profession: '',
      address: '',
      phone: '',
      privilege: 'instructor',
      password: '',
      confirm_password: '',
      cellPhone: '',
      email: '',
      cempro_code: '',
      gender: '',
      errors: {},
      isLoading: false
    };
    console.log('state is',this.state);
    // this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
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


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { errors } = this.state;
    // Document identification types
    const documentType = map(personal_documents, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //Defaul gender
    const genders = map(gender, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //countries
    const nacionality = map(countries, (val, key) =>
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer nombre</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.onChange}
                          placeholder="eje: Diego" />
                        {errors.firstName && <span className="help-block text-danger">{errors.firstName}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo nombre</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="secondName"
                          name="secondName"
                          value={this.state.secondName}
                          onChange={this.onChange}
                          placeholder="eje: Arturo" />
                        {errors.secondName && <span className="help-block text-danger">{errors.secondName}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer apellido</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="firstLastname"
                          name="firstLastname"
                          value={this.state.firstLastname}
                          onChange={this.onChange}
                          placeholder="eje: Perez" />
                        {errors.firstLastname && <span className="help-block text-danger">{errors.firstLastname}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo apellido</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="secondLastname"
                          name="secondLastname"
                          value={this.state.secondLastname}
                          onChange={this.onChange}
                          placeholder="eje: Durán" />
                        {errors.secondLastname && <span className="help-block text-danger">{errors.secondLastname}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Correo electronico</label>
                      <div className="col-md-9">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          placeholder="eje: juan@gmail.com" />
                        {errors.email && <span className="help-block text-danger">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Contraseña</label>
                      <div className="col-md-9">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          placeholder="******" />
                        {errors.password && <span className="help-block text-danger">{errors.password}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Confirmar contraseña</label>
                      <div className="col-md-9">
                        <input
                          type="password"
                          className="form-control"
                          id="confirm_password"
                          name="confirm_password"
                          value={this.state.confirm_password}
                          onChange={this.onChange}
                          placeholder="******" />
                        {errors.confirm_password && <span className="help-block text-danger">{errors.confirm_password}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de nacimiento</label>
                      <div className="col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          id="bornDate"
                          name="bornDate"
                          value={this.state.bornDate}
                          onChange={this.onChange}
                          placeholder="eje: Durán" />
                        {errors.bornDate && <span className="help-block text-danger">{errors.bornDate}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                      <div className="col-md-9">
                        <select
                          name="dataType"
                          onChange={this.onChange}
                          value={this.state.documentType}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el tipo de documento</option>
                          {documentType}
                        </select>
                        {errors.documentType && <span className="help-block text-danger">{errors.documentType}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Valor del documento</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="documentValue"
                          name="documentValue"
                          value={this.state.documentValue}
                          onChange={this.onChange}
                          placeholder="eje: 999499812" />
                        {errors.documentValue && <span className="help-block text-danger">{errors.documentValue}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Pais de nacionalidad</label>
                      <div className="col-md-9">
                        <select
                          name="nacionality"
                          id="nacionality"
                          onChange={this.onChange}
                          value={this.state.nacionality}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el pais</option>
                          {nacionality}
                        </select>
                        {errors.nacionality && <span className="help-block text-danger">{errors.nacionality}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Departamento</label>
                      <div className="col-md-9">
                        <select
                          name="department"
                          id="department"
                          onChange={this.onChange}
                          value={this.state.department}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el departamento</option>
                          {documentType}
                        </select>
                        {errors.department && <span className="help-block text-danger">{errors.department}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Municipalidad</label>
                      <div className="col-md-9">
                        <select
                          name="municipality"
                          id="municipality"
                          onChange={this.onChange}
                          value={this.state.municipality}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona la municipalidad</option>
                          {documentType}
                        </select>
                        {errors.municipality && <span className="help-block text-danger">{errors.municipality}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Comunidad</label>
                      <div className="col-md-9">
                        <select
                          name="community"
                          id="community"
                          onChange={this.onChange}
                          value={this.state.community}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el tipo de documento</option>
                          {documentType}
                        </select>
                        {errors.community && <span className="help-block text-danger">{errors.community}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Profesión</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="profession"
                          name="profession"
                          value={this.state.profession}
                          onChange={this.onChange}
                          placeholder="eje: Profesor" />
                        {errors.profession && <span className="help-block text-danger">{errors.profession}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Dirección</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                          placeholder="eje: Km 18. Carretera a El Salvador" />
                        {errors.address && <span className="help-block text-danger">{errors.address}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Telefono</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.onChange}
                          placeholder="eje: 24245757" />
                        {errors.phone && <span className="help-block text-danger">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Celular</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="cellPhone"
                          name="cellPhone"
                          value={this.state.cellPhone}
                          onChange={this.onChange}
                          placeholder="eje: 55329090" />
                        {errors.cellPhone && <span className="help-block text-danger">{errors.cellPhone}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Genero</label>
                      <div className="col-md-9">
                        <select
                          name="gender"
                          id="gender"
                          onChange={this.onChange}
                          value={this.state.gender}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el genero</option>
                          {genders}
                        </select>
                        {errors.gender && <span className="help-block text-danger">{errors.gender}</span>}
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
