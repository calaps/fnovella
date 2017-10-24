import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import { data_types } from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { catalogsValidator } from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  catalogsAddRequest,
  catalogsUpdateRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: (this.props.catalogData.id)?true:false,
      name: this.props.catalogData.name || '',
      type: this.props.catalogData.type|| '',
      category: this.props.catalogData.category|| '',
      id: this.props.catalogData.id || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    self= this;
  }
  componentWillReceiveProps(nextProps){
    if(this.props.catalogData!==nextProps.catalogData){
      this.setState({
        isEditing: false,
        name: '',
        type: '',
        category: '',
        id: '',
      })
    }
  }
  isValid(){
    // TODO:Commented bacause of invalid validation
    //local validation
    const { errors, isValid } = catalogsValidator(this.state);
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
        type: this.state.type,
        category:this.state.category
      };
      if(this.state.isEditing){
        data.id = this.state.id;
      }

      // ON SUCCESSS API
      this.state.isEditing ?
        this.props.actions.catalogsUpdateRequest(data).then(
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
        this.props.actions.catalogsAddRequest(data).then(
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ingresa la descripción</label>
                      <div className="col-md-9">
                        <textarea
                          type="text"
                          className="form-control"
                          id="category"
                          name="category"
                          value={this.state.category}
                          onChange={this.onChange}
                          placeholder="eje: Departamentos de Guatemala" />
                        {errors.category && <span className="help-block text-danger">{errors.category}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
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
      catalogsAddRequest,
      catalogsUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
