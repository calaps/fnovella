import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';// For Buttons
import { data_types } from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { categoriesValidator } from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  categoriesAddRequest,
  categoriesUpdateRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: (this.props.categoryData.id)?true:false,
      name: this.props.categoryData.name || '',
      description: this.props.categoryData.description|| '',
      additionalField: (typeof this.props.categoryData.additionalField === "boolean")?this.props.categoryData.additionalField:true,
      id: this.props.categoryData.id || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    self= this;
  }
  componentWillReceiveProps(nextProps){
    if(this.props.categoryData!==nextProps.categoryData){
      this.setState({
        isEditing: false,
        name: '',
        description: '',
        id: '',
      })
    }
  }
  isValid(){
    // TODO:Commented bacause of invalid validation
    //local validation
    const { errors, isValid } = categoriesValidator(this.state);
    if(!isValid){
      this.setState({ errors });
      return false;
    }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });
      let data = {
        name:this.state.name,
        additionalField: this.state.additionalField,
        description: this.state.description
      };
      if(this.state.isEditing){
        data.id = this.state.id;
      }

      // ON SUCCESSS API
      this.state.isEditing ?
        this.props.actions.categoriesUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if(response){
              self.props.changeView('VIEW_ELEMENT');
            }
          },
          (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
            self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
          })
        :
        this.props.actions.categoriesAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if(response){
              self.props.changeView('VIEW_ELEMENT');
            }
          },(error) => {
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de categoria</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: departamento" />
                          {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Es categoria de campos adicionales?</label>
                      <div className="col-md-9">
                        <select
                          name="additionalField"
                          id="additionalField"
                          onChange={this.onChange}
                          value={this.state.additionalField}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.additionalField && <span className="help-block text-danger">{errors.additionalField}</span>}
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
                          placeholder="eje: About this category" />
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
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
                                      label={this.state.isEditing?'Update':'Add'}
                                      secondary className="btn-w-md" />
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>

            <div className="col-xl-3">
              <div className="callout callout-info">
                <h6>Descripción:</h6>
                <p>Las categorias son los nombres con los que se agrupan los grupos de parametros. Que posteriormente son usados para programas, catalogos para agrupar el contenido.</p>
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
      categoriesAddRequest,
      categoriesUpdateRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
