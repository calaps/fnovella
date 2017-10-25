import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import {programValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programAddRequest,
  programUpdateRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.programData.id) ? true : false,
      name: this.props.programData.name || '',
      audience: this.props.programData.audience || '',
      description: this.props.programData.description || '',
      provider: typeof this.props.programData.provider === "boolean" ? this.props.programData.provider : true,
      clasification: this.props.programData.clasification || '',
      freeCourses: typeof this.props.programData.freeCourses === "boolean" ? this.props.programData.freeCourses : true,
      type: typeof this.props.programData.type === "boolean" ? this.props.programData.type : true,
      id: this.props.programData.id || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self = this;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.programData !== nextProps.programData) {
      this.setState({
        isEditing: false,
        name: '',
        audience: '',
        description: '',
        provider: true,
        clasification: '',
        freeCourses: true,
        type: true,
        id: '',
      });
    }
  }

  isValid() {
    // TODO:Temporary commented bcz validation is not valid
    //local validation
    const {errors, isValid} = programValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  handleCancel() {
    self.props.changeView('VIEW_ELEMENT')
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});

      let data = {
        name: this.state.name,
        type: this.state.type,
        audience: this.state.audience,
        description: this.state.description,
        provider: this.state.provider,
        clasification: this.state.clasification,
        freeCourses: this.state.freeCourses
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing ?
        this.props.actions.programUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          },
          (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          })
        :
        this.props.actions.programAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          });
    } else {

      // FORM WITH ERRORS

    }

  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const {errors} = this.state;

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
                          placeholder="eje: CENCA"/>
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
                          placeholder="eje: Niños de 10 - 15 años"/>
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
                          placeholder="Descripción del programa"/>
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
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
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
                          placeholder="Clasificación del programa"/>
                        {errors.clasification && <span className="help-block text-danger">{errors.clasification}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tiene cursos libres?</label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Categoria de campos: </label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona la categoria...</option>
                          <option value={false}>municpalidad</option>
                          <option value={true}>departamento</option>
                          <option value={true}>fisico</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Genero: </label>
                      <div className="col-md-9">
                        <select
                          name="freeCourses"
                          id="freeCourses"
                          onChange={this.onChange}
                          value={this.state.freeCourses}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona la categoria...</option>
                          <option value="male">Hombres</option>
                          <option value="female">Mujeres</option>
                          <option value="both">Mixto</option>
                        </select>
                        {errors.freeCourses && <span className="help-block text-danger">{errors.freeCourses}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Cancel'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.handleCancel}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label={this.state.isEditing ? 'Update' : 'Add'}
                                      secondary className="btn-w-md"/>
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
      programAddRequest,
      programUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
