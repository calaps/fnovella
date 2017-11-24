import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {personal_documents} from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  participantContactByParticipantIdGetRequest,
  participantContactUpdateRequest
} from '../../../../../actions';
import {studentContactValidator} from "../../../../../actions/formValidations";

let self;

const mWidthStyle = {
  minWidth: '135px'
};

class EmergencyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participantId: this.props.participantId,
      isEditing: false,
      errors: {},
      isLoading: false,
      address: '',
      cellphone: '',
      documentType: '',
      documentValue: '',
      email: '',
      firstLastname: '',
      firstName: '',
      secondLastname: '',
      secondName: '',
      tellphone: ''
    };
    this.onEditToggle = this.onEditToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    self = this;
  }

  componentWillMount() {
    this.props.actions.participantContactByParticipantIdGetRequest(this.state.participantId);
  }

  onEditToggle() {
    this.setState({
      isEditing: true,
      address: this.props.participantContacts.content[0].address || '',
      cellphone: this.props.participantContacts.content[0].cellphone || '',
      documentType: this.props.participantContacts.content[0].documentType || '',
      documentValue: this.props.participantContacts.content[0].documentValue || '',
      email: this.props.participantContacts.content[0].email || '',
      firstLastname: this.props.participantContacts.content[0].firstLastname || '',
      firstName: this.props.participantContacts.content[0].firstName || '',
      secondLastname: this.props.participantContacts.content[0].secondLastname || '',
      secondName: this.props.participantContacts.content[0].secondName || '',
      tellphone: this.props.participantContacts.content[0].tellphone || '',
    })
  }

  handleCancel() {
    this.setState({
      isEditing: false
    });
    this.props.actions.participantContactByParticipantIdGetRequest(this.state.participantId);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  isValid() {
    //local validation
    const {errors, isValid} = studentContactValidator(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e){
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
        tellphone: this.state.tellphone,
        participantId: this.props.participantId,
        id: this.props.participantContacts.content[0].id
      };
      this.props.actions.participantContactUpdateRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if (response) {
            this.handleCancel();
          }
        },
        (error) => {
          //alert'fail');
          console.log("An Error occur with the Rest API");
          self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
        })
    }
  }

  render() {
    const {errors} = this.state;

    // Document identification types
    const documentType = map(personal_documents, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return (
      (!this.state.isEditing) ?
        <div className="container-fluid with-maxwidth">
          <article className="article">
            <div className="row stat-container">
              <div className="col-md-4">
                <section className="stat-item">
                <span
                  className="stat-desc">{this.props.participantContacts.content ? (this.props.participantContacts.content[0].firstName + ' ' + this.props.participantContacts.content[0].firstLastname) : ' '}</span>
                </section>
                <img className="calaps-profile" src="assets/images/dummyUser.png" alt="User profile pic"/>
              </div>
              <div className="col-sm-3">
                <section className="stat-item">
                  <span className="stat-desc">Emergencia Información</span>
                </section>
                <strong>Nombre
                  completo: </strong><span>{this.props.participantContacts.content ? (this.props.participantContacts.content[0].firstName + ' ' + this.props.participantContacts.content[0].firstLastname) : ' '}</span><br/>
                <strong>Tellphone: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].tellphone : ' '}</span><br/>
                <strong>CellPhone: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].cellphone : ' '}</span><br/>
                <strong>Email: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].email : ' '}</span><br/>
                <strong>Address: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].address : ' '}</span><br/>
                <strong>Autoriza tomar
                  foto?: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].photo ? 'Si' : 'No' : ' '}</span><br/>
              </div>
              <div className="col-md-4">
                <section className="stat-item">
                  <span className="stat-desc">Opciones</span>
                </section>
                <RaisedButton style={mWidthStyle}
                              label="Editar Emergencia información"
                              primary onTouchTap={this.onEditToggle}/>
                <div className="divider"/>
              </div>
            </div>
          </article>
        </div>:
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
                        label="Cancelar"
                        disabled={false}
                        onTouchTap={this.handleCancel}
                        style={{marginRight: 12}}
                      />
                      <RaisedButton
                        type='submit'
                        label='Update'
                        primary
                      />

                    </form>

                  </div>
                </div>

              </div>

            </div>


          </div>

        </article>

  )
  }
}


function mapStateToProps(state) {
  //pass the providers
  return {
    participantContacts: state.participantContacts
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantContactByParticipantIdGetRequest,
      participantContactUpdateRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(EmergencyView);
