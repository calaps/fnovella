import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import map from "Lodash/map"; //to use map in a object
import { personal_documents, gender, countries } from '../../../../../constants/data_types';
import { tutorValidator } from "../../../../../actions/formValidations"; //form validations
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  educatorsAddRequest,
  educatorsUpdateRequest
} from '../../../../../actions';


let self;
class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.teacherData.id) ? true : false,
      id: this.props.teacherData.id || '',
      firstName: this.props.teacherData.firstName || '',
      secondName: this.props.teacherData.secondName || '',
      firstLastname: this.props.teacherData.firstLastname || '',
      secondLastname: this.props.teacherData.secondLastname || '',
      bornDate: this.props.teacherData.bornDate || '',
      documentType: this.props.teacherData.documentType || '',
      documentValue: this.props.teacherData.documentValue || '',
      nacionality: this.props.teacherData.nacionality || '',
      department: this.props.teacherData.department || '',
      municipality: this.props.teacherData.municipality || '',
      community: this.props.teacherData.community || '',
      profession: this.props.teacherData.profession || '',
      address: this.props.teacherData.address || '',
      phone: this.props.teacherData.phone || '',
      privilege: 'instructor',
      password: '',
      confirmPassword: '',
      cellphone: this.props.teacherData.cellphone || '',
      email: this.props.teacherData.email || '',
      cemproCode: '',
      appCode: this.props.teacherData.appCode || '',
      gender: this.props.teacherData.gender || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this); {/* Makes a Bind of the actions, onChange, onSummit */ }
    this.onChange = this.onChange.bind(this);
    self = this;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.teacherData !== nextProps.teacherData) {
      this.setState({
        isEditing:false,
        id: '',
        firstName: '',
        secondName: '',
        firstLastname: '',
        secondLastname: '',
        bornDate: '',
        documentType: '',
        documentValue: '',
        nacionality: '',
        department: '',
        municipality: '',
        community: '',
        profession: '',
        address: '',
        phone: '',
        privilege: 'instructor',
        password: '',
        confirmPassword: '',
        cellphone: '',
        email: '',
        cemproCode: '',
        appCode: '',
        gender: '',
      })
    }
  }

  isValid() {
    // TODO: Commented beacause validation was not valid
    //local validation
    const { errors, isValid } = tutorValidator(this.state)
    if(!isValid){
      this.setState({ errors });
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });
      let data = {
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        firstLastname: this.state.firstLastname,
        secondLastname: this.state.secondLastname,
        bornDate: this.state.bornDate,
        documentType: this.state.documentType || 'ABC',
        documentValue: this.state.documentValue,
        nacionality: this.state.nacionality,
        department: this.state.department,
        municipality: this.state.municipality,
        community: this.state.community,
        profession: this.state.profession,
        address: this.state.address,
        phone: this.state.phone,
        privilege: 'instructor',
        password: '',
        confirmPassword: '',
        cellphone: this.state.cellphone,
        email: this.state.email,
        appCode: this.state.appCode || 'abc',
        gender: this.state.gender,
      }
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESSS API
      this.state.isEditing ?
        this.props.actions.educatorsUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          },
          (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
            self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
          })
        :
        this.props.actions.educatorsAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
            self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
          });

    } else {

      // FORM WITH ERRORS

    }

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
            <div className="col-xl-9">

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
                        {errors.firstName && <span className="help-block text-danger">{errors.first_name}</span>}
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
                        {errors.secondName && <span className="help-block text-danger">{errors.second_name}</span>}
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
                        {errors.firstLastname && <span className="help-block text-danger">{errors.first_lastname}</span>}
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
                        {errors.secondLastname && <span className="help-block text-danger">{errors.second_lastname}</span>}
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
                          id="confirmPassword"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.onChange}
                          placeholder="******" />
                        {errors.confirmPassword && <span className="help-block text-danger">{errors.confirmPassword}</span>}
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
                        {errors.bornDate && <span className="help-block text-danger">{errors.born_date}</span>}
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
                          id="cellphone"
                          name="cellphone"
                          value={this.state.cellphone}
                          onChange={this.onChange}
                          placeholder="eje: 55329090" />
                        {errors.cellphone && <span className="help-block text-danger">{errors.cellphone}</span>}
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



                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                          label={this.state.isEditing ? 'Update' : 'Add'} secondary className="btn-w-md" />
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
                  <p>El siguiente foromulario hace uso de catalogos, para agregar nuevos catalogos deveras editarlos previamente
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
      educatorsAddRequest,
      educatorsUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
