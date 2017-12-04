import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton'; //Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { appUserUpdateRequest, appUserPasswordUpdateRequest } from '../../../../../../../actions';


const mWidthStyle = {
  minWidth: '135px'
}; //Buttons

const Hero = () => (
  <section className="hero hero-bg-img" style={{ backgroundImage: 'url(assets/images/background/bg4.jpg)' }}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Mi perfil</h1>
      </div>
    </div>
  </section>
);

let self;

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      "address": "string",
      "appCode": "string",
      "bornDate": "2017-11-06T06:40:32.169Z",
      "cellphone": 0,
      "cemproCode": "string",
      "colony": "string",
      "comunity": "string",
      "department": "string",
      "documentType": "string",
      "documentValue": "string",
      "email": "string",
      "firstLastName": "string",
      "firstName": "string",
      "gender": "string",
      "id": 0,
      "municipality": "string",
      "nationality": "string",
      "phon": 0,
      "phone": 0,
      "profession": "string",
      "secondLastName": "string",
      "secondName": "string",
      "zone": "string",
      isProfileEditing: false,
      isPasswordEditing: false,
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onProfileSubmit = this.onProfileSubmit.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    this.onProfileEditToggle = this.onProfileEditToggle.bind(this);
    this.onPasswordEditToggle = this.onPasswordEditToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isValid = this.isValid.bind(this);
    self = this;
  }

  onProfileEditToggle(){
    let {user} = Object.assign({}, this.props);
    console.log("onProfileEditToggle: ", user);
    this.setState({
      isProfileEditing: !this.state.isProfileEditing,
      isPasswordEditing: false,
      "address": user.address,
      "appCode": user.appCode,
      "bornDate": user.bornDate,
      "cellphone": user.cellphone,
      "cemproCode": user.cemproCode,
      "colony": user.colony,
      "comunity": user.comunity,
      "department": user.department,
      "documentType": user.documentType,
      "documentValue": user.documentValue,
      // "email": user.email,
      "firstLastName": user.firstLastName,
      "firstName": user.firstName,
      "gender": user.gender,
      "id": user.id,
      "municipality": user.municipality,
      "nationality": user.nationality,
      "phon": user.phon,
      "phone": user.phone,
      "profession": user.profession,
      "secondLastName": user.secondLastName,
      "secondName": user.secondName,
      "zone": user.zone,
    })
  }

  onPasswordEditToggle(){
    console.log("onPasswordEditToggle: ");
    let {user} = Object.assign({}, this.props);
    this.setState({
      isPasswordEditing: !this.state.isPasswordEditing,
      isProfileEditing: false,
      "password": "",
      "id": user.id
    })
  }

  handleCancel() {
    console.log("handleCancel");
    this.setState({
      isProfileEditing: false,
      isPasswordEditing: false
    })
  }

  isValid() {
    // TODO:Temporary commented bcz validation is not valid
    //local validation
    return true;

    const {errors, isValid} = programValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  onProfileSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});

      let data = {
        "address": this.state.address,
        "appCode": this.state.appCode,
        "bornDate": this.state.bornDate,
        "cellphone": this.state.cellphone,
        "cemproCode": this.state.cemproCode,
        "colony": this.state.colony,
        "comunity": this.state.comunity,
        "department": this.state.department,
        "documentType": this.state.documentType,
        "documentValue": this.state.documentValue,
        // "email": this.state.email,
        "firstLastName": this.state.firstLastName,
        "firstName": this.state.firstName,
        "gender": this.state.gender,
        "id": this.state.id,
        "municipality": this.state.municipality,
        "nationality": this.state.nationality,
        "phon": this.state.phon,
        "phone": this.state.phone,
        "profession": this.state.profession,
        "secondLastName": this.state.secondLastName,
        "secondName": this.state.secondName,
        "zone": this.state.zone,
      };
      // ON SUCCESS API
      this.props.appUserUpdateRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if (response) {
            self.handleCancel();
          }
        },
        (error) => {
          //alert'fail');
          console.log("An Error occur with the Rest API");
          self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
        })
    } else {

      // FORM WITH ERRORS

    }

  }

  onPasswordSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});

      let data = {
        "password": this.state.password,
        "id": this.state.id
      };
      // ON SUCCESS API
      this.props.appUserPasswordUpdateRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if (response) {
            self.handleCancel();
          }
        },
        (error) => {
          //alert'fail');
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
    let {user} = this.props;
    const {errors} = this.state;
    console.log(user);
    return (
      <div className="container-fluid with-maxwidth">
        <article className="article">
          <div className="row stat-container">
            <div className="col-md-3">
              <section className="stat-item">
                <span className="stat-desc">{user?(user.firstName + ' ' + (user.firstLastName || user.firstLastname)):' '}</span>
              </section>
              <img className="calaps-profile" src="assets/images/dummyUser.png" alt="User profile pic" />
            </div>

            {
              (!this.state.isProfileEditing && !this.state.isPasswordEditing)?
                <div className="col-md-5">
                  <section className="stat-item">
                    <span className="stat-desc">Información</span>
                  </section>
                  <strong>Tipo de privilegio: </strong><span>Administrador</span><br />
                  <strong>Nombre completo: </strong><span>{user?(user.firstName + ' ' + (user.firstLastName || user.firstLastname)):' '}</span><br />
                  <strong>Email: </strong><span>{user?user.email:' '}</span><br />
                  <strong>Fecha de nacimiento: </strong><span>{user?user.bornDate:' '}</span><br />
                  <strong>Nacionalidad: </strong><span>{user?user.nationality:' '}</span><br />
                  <strong>Departamento: </strong><span>{user?user.department:' '}</span><br />
                  <strong>Genero: </strong><span>{user?user.gender:' '}</span><br />
                  <strong>Codigo de cempro: </strong><span>{user?user.cemproCode:' '}</span>
                </div>
                :
                (this.state.isProfileEditing)?
                  <div className="col-md-5">
                    <section className="stat-item">
                      <span className="stat-desc">Información</span>
                    </section>
                    <form onSubmit={this.onProfileSubmit} role="form">
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Dirección: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                            placeholder="eje: address"/>
                          {errors.address && <span className="help-block text-danger">{errors.address}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Código de App: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="appCode"
                            name="appCode"
                            value={this.state.appCode}
                            onChange={this.onChange}
                            placeholder="eje: appCode"/>
                          {errors.appCode && <span className="help-block text-danger">{errors.appCode}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de nacimiento: </label>
                        <div className="col-md-9">
                        <textarea
                          type="text"
                          className="form-control"
                          id="bornDate"
                          name="bornDate"
                          value={this.state.bornDate}
                          onChange={this.onChange}
                          placeholder="bornDate"/>
                          {errors.bornDate && <span className="help-block text-danger">{errors.bornDate}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Clasificación: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="cellphone"
                            name="cellphone"
                            value={this.state.cellphone}
                            onChange={this.onChange}
                            placeholder="cellphone"/>
                          {errors.cellphone && <span className="help-block text-danger">{errors.cellphone}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Codigo de Cempro: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="cemproCode"
                            name="cemproCode"
                            value={this.state.cemproCode}
                            onChange={this.onChange}
                            placeholder="cemproCode"/>
                          {errors.cemproCode && <span className="help-block text-danger">{errors.cemproCode}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Colonia: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="colony"
                            name="colony"
                            value={this.state.colony}
                            onChange={this.onChange}
                            placeholder="colony"/>
                          {errors.colony && <span className="help-block text-danger">{errors.colony}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Comunidad: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="comunity"
                            name="comunity"
                            value={this.state.comunity}
                            onChange={this.onChange}
                            placeholder="comunity"/>
                          {errors.comunity && <span className="help-block text-danger">{errors.comunity}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Departamento: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="department"
                            name="department"
                            value={this.state.department}
                            onChange={this.onChange}
                            placeholder="department"/>
                          {errors.department && <span className="help-block text-danger">{errors.department}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de documento: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="documentType"
                            name="documentType"
                            value={this.state.documentType}
                            onChange={this.onChange}
                            placeholder="documentType"/>
                          {errors.documentType && <span className="help-block text-danger">{errors.documentType}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Número del documento: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="documentValue"
                            name="documentValue"
                            value={this.state.documentValue}
                            onChange={this.onChange}
                            placeholder="documentValue"/>
                          {errors.documentValue && <span className="help-block text-danger">{errors.documentValue}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer Apellido: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="firstLastName"
                            name="firstLastName"
                            value={this.state.firstLastName}
                            onChange={this.onChange}
                            placeholder="firstLastName"/>
                          {errors.firstLastName && <span className="help-block text-danger">{errors.firstLastName}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer nombre: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                            placeholder="firstName"/>
                          {errors.firstName && <span className="help-block text-danger">{errors.firstName}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Municipalidad: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="municipality"
                            name="municipality"
                            value={this.state.municipality}
                            onChange={this.onChange}
                            placeholder="municipality"/>
                          {errors.municipality && <span className="help-block text-danger">{errors.municipality}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Nacionalidad: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="nationality"
                            name="nationality"
                            value={this.state.nationality}
                            onChange={this.onChange}
                            placeholder="nationality"/>
                          {errors.nationality && <span className="help-block text-danger">{errors.nationality}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Telefono: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="phon"
                            name="phon"
                            value={this.state.phon}
                            onChange={this.onChange}
                            placeholder="phon"/>
                          {errors.phon && <span className="help-block text-danger">{errors.phon}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Celular: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.onChange}
                            placeholder="phone"/>
                          {errors.phone && <span className="help-block text-danger">{errors.phone}</span>}
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
                            placeholder="profession"/>
                          {errors.profession && <span className="help-block text-danger">{errors.profession}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo Apellido</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="secondLastName"
                            name="secondLastName"
                            value={this.state.secondLastName}
                            onChange={this.onChange}
                            placeholder="secondLastName"/>
                          {errors.secondLastName && <span className="help-block text-danger">{errors.secondLastName}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo Nombre:</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="secondName"
                            name="secondName"
                            value={this.state.secondName}
                            onChange={this.onChange}
                            placeholder="secondName"/>
                          {errors.secondName && <span className="help-block text-danger">{errors.secondName}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Zona: </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            id="zone"
                            name="zone"
                            value={this.state.zone}
                            onChange={this.onChange}
                            placeholder="zone"/>
                          {errors.zone && <span className="help-block text-danger">{errors.zone}</span>}
                        </div>
                      </div>




                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Genero: </label>
                        <div className="col-md-9">
                          <select
                            name="gender"
                            id="gender"
                            onChange={this.onChange}
                            value={this.state.gender}
                            className="form-control"
                          >
                            <option value="" disabled>Selecciona tu genero...</option>
                            <option value="male">Hombres</option>
                            <option value="female">Mujeres</option>
                            <option value="both">Mixto</option>
                          </select>
                          {errors.gender && <span className="help-block text-danger">{errors.gender}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="offset-md-3 col-md-10">
                          <FlatButton 
                          disabled={this.state.isLoading}
                                      label='Cancelar'
                                      style={{marginRight: 12}}
                                      onTouchTap={this.handleCancel}
                                      secondary className="btn-w-md"/>
                          <RaisedButton 
                            disabled={this.state.isLoading} 
                            type="submit"
                                        label={'Actualizar'}
                                        onTouchTap={this.onProfileSubmit}
                                        secondary className="btn-w-md"/>
                        </div>
                      </div>
                    </form>
                  </div>:
                  <div className="col-md-5">
                    <section className="stat-item">
                      <span className="stat-desc">Cambiar contraseña</span>
                    </section>
                    <form onSubmit={this.onPasswordSubmit} role="form">
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-md-3 control-label">Ingresa nueva contraseña</label>
                        <div className="col-md-9">
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder="eje: nueva contraseña"/>
                          {errors.password && <span className="help-block text-danger">{errors.password}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="offset-md-3 col-md-10">
                          <FlatButton 
                          //disabled={this.state.isLoading}
                                      label='Cancelar'
                                      style={{marginRight: 12}}
                                      onTouchTap={this.handleCancel}
                                      secondary className="btn-w-md"/> 
                          <RaisedButton 
                          //disabled={this.state.isLoading}
                           type="submit"
                                        label={'Actualizar'}
                                        onTouchTap={this.onPasswordSubmit}
                                        secondary className="btn-w-md"/>
                        </div>
                      </div>
                    </form>
                  </div>
            }
            <div className="col-md-4">
              <section className="stat-item">
                <span className="stat-desc">Opciones</span>
              </section>
              <RaisedButton style={mWidthStyle}
                            label="Cambiar contraseña"
                            primary
                            onTouchTap={this.onPasswordEditToggle}
              /><div className="divider" />
              <RaisedButton style={mWidthStyle}
                            label="Editar mi información"
                            primary
                            onTouchTap={this.onProfileEditToggle}
              /><div className="divider" />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <section className="page-about chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><Hero /></div>
          <div key="2"><Info
            user={this.props.auth.user}
            appUserUpdateRequest={this.props.actions.appUserUpdateRequest}
            appUserPasswordUpdateRequest={this.props.actions.appUserPasswordUpdateRequest}
          /></div>
        </QueueAnim>
      </section>
    );
  }
}


function mapStateToProps(state) {
  //pass the providers
  return {
    auth: state.auth
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      appUserUpdateRequest,
      appUserPasswordUpdateRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
