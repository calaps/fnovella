import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton';
import {personal_documents, gender} from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import {studentContactValidator} from "../../../../../actions/formValidations"; //form validations


class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      cellphone: '',
      documentType: '',
      documentValue: '',
      email: '',
      firstLastname: '',
      firstName: '',
      secondLastname: '',
      secondName: '',
      tellphone: '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    //local validation
    const {errors, isValid} = studentContactValidator(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      this.setState({errors:{},isLoading:true});
      let data ={
        address: this.state.address,
        cellphone: this.state.cellphone,
        documentType: this.state.documentType,
        documentValue: this.state.documentValue,
        email: this.state.email,
        firstLastname: this.state.firstLastname,
        firstName: this.state.firstName,
        secondLastname: this.state.secondLastname,
        secondName: this.state.secondName,
        tellphone: this.state.tellphone
      };
      this.props.handleNext(data);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const {errors} = this.state;

    // Document identification types
    const documentType = map(personal_documents, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //Defaul gender
    const genders = map(gender, (val, key) =>
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
                          placeholder="eje: Diego"/>
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
                          placeholder="eje: Arturo"/>
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
                          placeholder="eje: Perez"/>
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
                          placeholder="eje: Durán"/>
                        {errors.secondLastname &&
                        <span className="help-block text-danger">{errors.secondLastname}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Correo
                        electronico</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          placeholder="Eje: juan@gmail.com"/>
                        {errors.email && <span className="help-block text-danger">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                      <div className="col-md-9">
                        <select
                          name="documentType"
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
                          placeholder="eje: 999499812"/>
                        {errors.documentValue && <span className="help-block text-danger">{errors.documentValue}</span>}
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
                          placeholder="eje: Km 18. Carretera a El Salvador"/>
                        {errors.address && <span className="help-block text-danger">{errors.address}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Telefono</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="tellphone"
                          name="tellphone"
                          value={this.state.tellphone}
                          onChange={this.onChange}
                          placeholder="eje: 24245757"/>
                        {errors.tellphone && <span className="help-block text-danger">{errors.tellphone}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Celular</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="cellphone"
                          name="cellphone"
                          value={this.state.cellphone}
                          onChange={this.onChange}
                          placeholder="eje: 55329090"/>
                        {errors.cellphone && <span className="help-block text-danger">{errors.cellphone}</span>}
                      </div>
                    </div>

                    <FlatButton
                      label="Back"
                      disabled={false}
                      onTouchTap={() => this.props.handlePrev()}
                      style={{marginRight: 12}}
                    />
                    <RaisedButton
                      type='submit'
                      label='Next'
                      primary
                    />

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
