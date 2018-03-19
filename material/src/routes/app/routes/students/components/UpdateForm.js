import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import areIntlLocalesSupported from 'intl-locales-supported'; // For Date Picker format
import FlatButton from 'material-ui/FlatButton';
import map from "lodash-es/map"; //to use map in a object
import {personal_documents, gender, countries} from '../../../../../constants/data_types';
import {studentValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  participantUpdateRequest,
  catalogsGetRequest
} from '../../../../../actions';
import { convertDateToHTMLInputDateValue } from '../../../../../utils/helpers';


let self;
let DateTimeFormat;

if (areIntlLocalesSupported(['es-GT'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl'); // new Module with date Formats
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/es-GT');
}

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.participantData.id) ? true : false,
      firstName: this.props.participantData.firstName || '',
      secondName: (this.props.participantData.secondName.toString() === '_') ? '' : this.props.participantData.secondName,
      firstLastname: this.props.participantData.firstLastname || '',
      secondLastname: (this.props.participantData.secondLastname.toString() === '_') ? '' : this.props.participantData.secondLastname,
      bornDate: (this.props.participantData.bornDate)? new Date(this.props.participantData.bornDate)
        : new Date(),
      documentType: this.props.participantData.documentType || '',
      documentValue: this.props.participantData.documentValue || '',
      nacionality: this.props.participantData.nacionality || '',
      department: this.props.participantData.department || '',
      municipality: this.props.participantData.municipality || '',
      community: this.props.participantData.community || '',
      profession: this.props.participantData.profession || '',
      address: this.props.participantData.address || '',
      phone: this.props.participantData.phone || '',
      cellPhone: this.props.participantData.cellPhone || '',
      email: this.props.participantData.email || '',
      appCode: this.props.participantData.appCode || '',
      gender: this.props.participantData.gender || '',
      id: this.props.participantData.id || '',
      colony: this.props.participantData.colony || '',
      zone: this.props.participantData.zone || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    self = this;
  }

  componentWillMount() {
    this.props.actions.catalogsGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.participantData !== nextProps.participantData) {
      this.setState({
        firstName: '',
        secondName: '',
        firstLastname: '',
        secondLastname: '',
        bornDate: new Date(),
        documentType: '',
        documentValue: '',
        nacionality: '',
        department: '',
        municipality: '',
        community: '',
        profession: '',
        address: '',
        phone: '',
        cellPhone: '',
        email: '',
        appCode: 'code',
        gender: '',
        id: '',
        colony: '',
        zone: ''
      });
    }
  }

  isValid() {
    //local validation
    const {errors, isValid} = studentValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  _handleCancel() {
    this.props.handleCancel();
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errros object and disable submit button
      this.setState({errors: {}, isLoading: true});
      const secondName = (this.state.secondName.toString() === '') ? '_' : this.state.secondName;
      const secondLastName = (this.state.secondLastname.toString() === '') ? '_' : this.state.secondLastname;
      let data = {
        firstName: this.state.firstName,
        secondName: secondName,
        firstLastname: this.state.firstLastname,
        secondLastname: secondLastName,
        bornDate: convertDateToHTMLInputDateValue(this.state.bornDate),
        documentType: this.state.documentType,
        documentValue: this.state.documentValue,
        nacionality: this.state.nacionality,
        department: this.state.department,
        municipality: this.state.municipality,
        community: this.state.community,
        profession: this.state.profession,
        address: this.state.address,
        phone: this.state.phone,
        cellPhone: this.state.cellPhone,
        email: this.state.email,
        appCode: this.state.appCode,
        gender: this.state.gender,
        id: this.state.id,
        colony: this.state.colony,
        zone: this.state.zone
      };
      this.props.actions.participantUpdateRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if (response) {
            self.props.changeView('VIEW_ELEMENT');
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

  onChange(e, value) {
    if(!e){
      // its a date field according datepicker component
      this.setState({ bornDate: new Date(value)});
    }
    else{
      this.setState({[e.target.name]: e.target.value});
    }
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
    //countries
    const nacionality = map(countries, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //Department options
    let departmentsOpt = () => {
      let catalogs = this.props.catalogs.content || [];
      return catalogs.map((catalog) => {
        if (catalog.category === 2) {
          return <option key={catalog.id} value={catalog.name}>{catalog.name}</option>
        }
      });
    };
    //Municipality options
    let municipalitiesOpt = () => {
      let catalogs = this.props.catalogs.content || [];
      return catalogs.map((catalog) => {
        if (catalog.category === 1) {
          return <option key={catalog.id} value={catalog.name}>{catalog.name}</option>
        }
      });
    };
    //Community options
    let communitiesOpt = () => {
      let catalogs = this.props.catalogs.content || [];
      return catalogs.map((catalog) => {
        if (catalog.category === 3) {
          return <option key={catalog.id} value={catalog.name}>{catalog.name}</option>
        }
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Correo
                        electronico</label>
                      <div className="col-md-9">
                        <input
                          className="form-control"
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          placeholder="eje: juan@gmail.com"/>
                        {errors.email && <span className="help-block text-danger">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de nacimiento</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="Ingresa fecha"
                          DateTimeFormat={DateTimeFormat}
                          okLabel="seleccionar"
                          cancelLabel="cancelar"
                          locale="es-GT"
                          value={this.state.bornDate}
                          onChange={this.onChange}
                        />

                        {errors.bornDate && <span className="help-block text-danger">{errors.bornDate}</span>}
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
                          {departmentsOpt()}
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
                          {municipalitiesOpt()}
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
                          <option value="" disabled>Selecciona la Comunidad</option>
                          {communitiesOpt()}
                        </select>
                        {errors.community && <span className="help-block text-danger">{errors.community}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Colonia</label>
                      <div className="col-md-9">
                        <input
                          type="colony"
                          className="form-control"
                          id="colony"
                          name="colony"
                          value={this.state.colony}
                          onChange={this.onChange}
                          placeholder="eje: Margarita"/>
                        {errors.colony && <span className="help-block text-danger">{errors.colony}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Zona</label>
                      <div className="col-md-9">
                        <input
                          type="zone"
                          name="zone"
                          id="zone"
                          onChange={this.onChange}
                          value={this.state.zone}
                          className="form-control"
                          placeholder="eje: Margarita"/>
                        {errors.zone && <span className="help-block text-danger">{errors.zone}</span>}
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
                          placeholder="eje: Profesor"/>
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
                          id="phone"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.onChange}
                          placeholder="eje: 24245757"/>
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
                          placeholder="eje: 55329090"/>
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
                    <FlatButton
                      label="cancelar"
                      onTouchTap={this._handleCancel}
                      style={{marginRight: 12}}
                    />
                    <RaisedButton
                      label='actualizar'
                      primary
                      type='submit'
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

function mapStateToProps(state) {
  //pass the providers
  return {
    catalogs: state.catalogs
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantUpdateRequest,
      catalogsGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateForm);
