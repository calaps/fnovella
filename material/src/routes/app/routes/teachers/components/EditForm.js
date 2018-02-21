import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import areIntlLocalesSupported from 'intl-locales-supported'; // For Date Picker format
import Dialog from 'material-ui/Dialog'; // Dialog to show password
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import map from 'lodash-es/map'; //to use map in a object
import { personal_documents, gender, countries } from '../../../../../constants/data_types';
import { tutorValidator } from '../../../../../actions/formValidations'; // form validations
import generatePassword from '../../../../../actions/passwordGenerator'; // password generator;
import { convertDateToHTMLInputDateValue } from '../../../../../utils/helpers';
import {
  educatorsAddRequest,
  educatorsUpdateRequest,
  catalogsGetRequest,
  programInstructorByInstructorIdGetRequest,
  programGetRequest,
  privilegesGetAllRequest
} from '../../../../../actions';

let self;
let DateTimeFormat;

if (areIntlLocalesSupported(['es-GT'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl'); // new Module with date Formats
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/es-GT');
}

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isEditing: !!(this.props.teacherData.id),
      id: this.props.teacherData.id || '',
      firstName: this.props.teacherData.firstName || '',
      secondName: (this.props.teacherData.secondName) ? (this.props.teacherData.secondName.toString() === '_') ? '' : this.props.teacherData.secondName : '',
      firstLastname: this.props.teacherData.firstLastname || '',
      secondLastname: (this.props.teacherData.secondLastname) ? (this.props.teacherData.secondLastname.toString() === '_') ? '' : this.props.teacherData.secondLastname : '',
      bornDate: (this.props.teacherData.bornDate) ? new Date(this.props.teacherData.bornDate)
        : new Date(),
      documentType: this.props.teacherData.documentType || '',
      documentValue: this.props.teacherData.documentValue || '',
      nacionality: this.props.teacherData.nacionality || '',
      department: this.props.teacherData.department || '',
      municipality: this.props.teacherData.municipality || '',
      community: this.props.teacherData.community || '',
      profession: this.props.teacherData.profession || '',
      address: this.props.teacherData.address || '',
      phone: this.props.teacherData.phone || '',
      cellphone: this.props.teacherData.cellphone || '',
      email: this.props.teacherData.email || '',
      appCode: this.props.teacherData.appCode || '',
      gender: this.props.teacherData.gender || '',
      password: this.props.teacherData.password || '',
      colony: this.props.teacherData.colony || '',
      zone: this.props.teacherData.zone || '',
      privilege: this.props.teacherData.privilege || 2, // default is 2 for instructor
      programIds: [],
      errors: {},
      isLoading: false,
      privileges: []
    };
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.handleCancel = this
      .handleCancel
      .bind(this);
    self = this;
    this.handleProgramChange = this
      .handleProgramChange
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.teacherData !== nextProps.teacherData) {
      this.setState({
        isEditing: false,
        id: '',
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
        cellphone: '',
        email: '',
        appCode: '',
        gender: '',
        password: '',
        colony: '',
        zone: '',
        privilege: 2, // default is 2 for instructor
        programIds: []
      });
    }
  }

  isValid() {
    // local validation
    const { errors, isValid } = tutorValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      // reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });
      const secondName = (this.state.secondName.toString() === '') ? '_' : this.state.secondName;
      const secondLastName = (this.state.secondLastname.toString() === '') ? '_' : this.state.secondLastname;
      let data = {
        instructor: {
          firstName: this.state.firstName,
          secondName: secondName,
          firstLastname: this.state.firstLastname,
          secondLastname: secondLastName,
          bornDate: convertDateToHTMLInputDateValue(this.state.bornDate),
          documentType: this.state.documentType || 'ABC',
          documentValue: this.state.documentValue,
          nacionality: this.state.nacionality,
          department: this.state.department,
          municipality: this.state.municipality,
          community: this.state.community,
          profession: this.state.profession,
          address: this.state.address,
          phone: this.state.phone,
          cellphone: this.state.cellphone,
          email: this.state.email,
          appCode: this.state.appCode, //now this will be for CemproCode
          gender: this.state.gender,
          password: this.state.password,
          colony: this.state.colony,
          zone: this.state.zone,
          privilege: this.state.privilege
        },
        programIds: this.state.programIds
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESSS API
      this.state.isEditing
        ? this
          .props
          .actions
          .educatorsUpdateRequest(data)
          .then((response) => {
            //Save the default object as a provider
            if (response) {
              self
                .props
                .changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            console.log('An Error occur with the Rest API');
            self.setState({
              errors: {
                ...self.state.errors,
                apiErrors: error.error
              },
              isLoading: false
            });
          })
        : this
          .props
          .actions
          .educatorsAddRequest(data)
          .then((response) => {
            //Save the default object as a provider
            if (response) {
              self
                .props
                .changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            //alert'fail');
            console.log('An Error occur with the Rest API');
            self.setState({
              errors: {
                ...self.state.errors,
                apiErrors: error.error
              },
              isLoading: false
            });
          });

    } else {

      // FORM WITH ERRORS

    }

  }

  componentWillMount() {
    this
      .props
      .actions
      .catalogsGetRequest();
    this
      .props
      .actions
      .programGetRequest(null, 1000);
    if (this.state.isEditing) {
      this
        .props
        .actions
        .programInstructorByInstructorIdGetRequest(this.state.id)
        .then(data => {
          if (!data.err && this.state.isEditing) {
            let programIds = [];
            let programInstructors = this.props.programInstructors.content || [];
            for (let i = 0; i < programInstructors.length; i++) {
              if (programInstructors[i].instructor == this.state.id) {
                programIds.push(programInstructors[i].program)
              }
            }
            this.setState({ programIds: programIds })
          }
        })
    }
    this
      .props
      .actions
      .privilegesGetAllRequest().then(data => {
        this.setState({ privileges: data.data });
      });
  }

  handleCancel() {
    self
      .props
      .changeView('VIEW_ELEMENT')
  }

  onChange(e, value) {
    if (!e) {
      // its a date field according datepicker component
      this.setState({ bornDate: new Date(value) });
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleProgramChange(event, index, values) {
    this.setState({ programIds: values });
  }

  //Password Generator:
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  generatePassword(){
    const generatedPassword = generatePassword();
    this.setState({ password: generatedPassword});

    //Show Modal with the password generated
    this.handleOpen();

  }

  render() {
    //For the modal password
    const actions = [
      <FlatButton
        label="Listo, la he copiado"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    const { errors } = this.state;
    // Document identification types
    const documentType = map(personal_documents, (val, key) => <option key={val} value={val}>{key}</option>
    );
    //Defaul gender
    const genders = map(gender, (val, key) => <option key={val} value={val}>{key}</option>
    );
    //countries
    const nacionality = map(countries, (val, key) => <option key={val} value={val}>{key}</option>
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

    let programsOpt = () => {
      let programs = this.props.programs.content || [];
      let programInstructors = this.props.programInstructors.content || [];
      return programs.map((program) => {
        return (<MenuItem
          key={program.id}
          insetChildren={true}
          checked={this
            .state
            .programIds
            .indexOf(program) > -1}
          value={program.id}
          primaryText={program.name} />);
      })
    };
    // Privilege options
    let privilegesOpt = () => {
      let privileges = this.state.privileges || [];
      return privileges.map((privilege) => {
        return <option key={privilege.id} value={privilege.id}>{privilege.privilegeName}</option>
      });
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <Dialog
          title="Contraseña generada"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Por favor, copia y pega esta contraseña en un lugar seguro que es la contraseña generada: </p>
          <h6>{this.state.password}</h6>
        </Dialog>
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información:
                  </p>
                  <form onSubmit={this.onSubmit} role="form">

                    <div className="alert alert-info">
                      <strong>Nota:</strong>Ingresar nombre tal y como aparece en el documento de identificación.
                    </div>

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
                          placeholder="eje: Diego" /> {errors.firstName && <span className="help-block text-danger">{errors.firstName}</span>}
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
                          placeholder="eje: Arturo" /> {errors.secondName && <span className="help-block text-danger">{errors.secondName}</span>}
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
                          placeholder="eje: Perez" /> {errors.firstLastname && <span className="help-block text-danger">{errors.firstLastname}</span>}
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
                          placeholder="eje: Durán" /> {errors.secondLastname && <span className="help-block text-danger">{errors.secondLastname}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Género</label>
                      <div className="col-md-9">
                        <select
                          name="gender"
                          id="gender"
                          onChange={this.onChange}
                          value={this.state.gender}
                          className="form-control">
                          <option value="" disabled>Selecciona el genero</option>
                          {genders}
                        </select>
                        {errors.gender && <span className="help-block text-danger">{errors.gender}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Código de Cempro</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="appCode"
                          name="appCode"
                          value={this.state.appCode}
                          onChange={this.onChange}
                          placeholder="eje: 999499812" /> {errors.appCode && <span className="help-block text-danger">{errors.appCode}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de documento</label>
                      <div className="col-md-9">
                        <select
                          name="documentType"
                          onChange={this.onChange}
                          value={this.state.documentType}
                          className="form-control">
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
                          placeholder="eje: 999499812" /> {errors.documentValue && <span className="help-block text-danger">{errors.documentValue}</span>}
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
                          placeholder="eje: juan@gmail.com" /> {errors.email && <span className="help-block text-danger">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Contraseña
                      </label>
                      <div className="col-md-9">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          placeholder="****" /> {errors.password && <span className="help-block text-danger">{errors.password}</span>}
                        <FlatButton secondary onClick={this.generatePassword.bind(this)}>Generar contraseña</FlatButton>
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Pais de nacionalidad</label>
                      <div className="col-md-9">
                        <select
                          name="nacionality"
                          id="nacionality"
                          onChange={this.onChange}
                          value={this.state.nacionality}
                          className="form-control">
                          <option value="" disabled>Selecciona el nacionalidad</option>
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
                          className="form-control">
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
                          className="form-control">
                          <option value="" disabled>Selecciona la municipalidad</option>
                          {municipalitiesOpt()}
                        </select>
                        {errors.municipality && <span className="help-block text-danger">{errors.municipality}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Colonia
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="colony"
                          name="colony"
                          value={this.state.colony}
                          onChange={this.onChange}
                          placeholder="eje: colony" /> {errors.colony && <span className="help-block text-danger">{errors.colony}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Zona
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="zone"
                          name="zone"
                          value={this.state.zone}
                          onChange={this.onChange}
                          placeholder="eje: Margarita" /> {errors.zone && <span className="help-block text-danger">{errors.zone}</span>}
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
                          className="form-control">
                          <option value="" disabled>Selecciona la comunidad...</option>
                          {communitiesOpt()}
                        </select>
                        {errors.community && <span className="help-block text-danger">{errors.community}</span>}
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
                          placeholder="eje: Km 18. Carretera a El Salvador" /> {errors.address && <span className="help-block text-danger">{errors.address}</span>}
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
                          placeholder="eje: Profesor" /> {errors.profession && <span className="help-block text-danger">{errors.profession}</span>}
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
                          placeholder="eje: 24245757" /> {errors.phone && <span className="help-block text-danger">{errors.phone}</span>}
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
                          placeholder="eje: 55329090" /> {errors.cellphone && <span className="help-block text-danger">{errors.cellphone}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label text-info">Privelgio del usuario</label>
                      <div className="col-md-9">
                        <select
                          name="privilege"
                          id="privilege"
                          onChange={this.onChange}
                          value={this.state.privilege}
                          className="form-control">
                          <option value="" disabled>Selecciona el privilegio</option>
                          {privilegesOpt()}
                        </select>
                        {errors.privilege && <span className="help-block text-danger">{errors.privilege}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="programIds" className="col-md-3 control-label">Programa
                      </label>
                      <div className="col-md-9">
                        <SelectField
                          multiple={true}
                          hintText="Selecciona el Programa"
                          name="programIds"
                          id="programIds"
                          onChange={this.handleProgramChange}
                          value={this.state.programIds}
                          fullWidth={true}
                          maxHeight={200}>
                          {programsOpt()}
                        </SelectField>
                        {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
                        <FlatButton secondary href="#/app/program">Agregar Programa</FlatButton>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton
                          disabled={this.state.isLoading}
                          label='cancelar'
                          style={{
                            marginRight: 12
                          }}
                          onTouchTap={this.handleCancel}
                          secondary
                          className="btn-w-md" />
                        <RaisedButton
                          disabled={this.state.isLoading}
                          type="submit"
                          label={this.state.isEditing
                            ? 'actualizar'
                            : 'crear'}
                          secondary
                          className="btn-w-md" />
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>

            {!this.props.dialog &&
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
            }

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
    programs: state.programs,
    programInstructors: state.programInstructors,
    catalogs: state.catalogs,
    privileges: state.privileges
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      //    signUpRequest
      programGetRequest,
      programInstructorByInstructorIdGetRequest,
      educatorsAddRequest,
      educatorsUpdateRequest,
      catalogsGetRequest,
      privilegesGetAllRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps, )(EditForm);
