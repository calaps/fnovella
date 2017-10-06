import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { emptyValidator } from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesAddRequest,
  sedesUpdateRequest
} from '../../../../../actions';


let self;
class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing:(this.props.locationData.id)?true:false,
      name: this.props.locationData.name ||  '',
      address: this.props.locationData.address || '',
      alias: this.props.locationData.alias || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    self=this;
  }

  isValid(){
    //local validation
    const { errors, isValid } = emptyValidator(this.state)
    if(!isValid){
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });

      let data = {
        name:this.state.name,
        address:this.state.address,
        alias:this.state.alias
      }
      if(this.state.isEditing){
        data.id = this.state.id;
      }
      // ON SUCCESSS API
      this.state.isEditing ?
        this.props.actions.sedesUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if(response){
              self.props.changeView('VIEW_ELEMENT');
            }
          },
          (error) => {
            console.log("An Error occur with the Rest API");
            self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
          })
        :
        this.props.actions.sedesAddRequest(data).then(
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de sede</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: El Progreso" />
                          {errors.name && <span className="help-block text-danger">{errors.name}</span>}
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
                          placeholder="eje: km 18.5 carretera a progreso" />
                        {errors.address && <span className="help-block text-danger">{errors.address}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Alias</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: ELP" />
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label={this.state.isEditing ?'Update':'Add'}
                          secondary className="btn-w-md" />
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>

            <div className="col-xl-3">
              <div className="callout callout-info">
                <h6>Informacion:</h6>
                <p>Ubivaciones necesarias para crear y activar los programas. Son las sedes que general el correlativo</p>
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
      sedesAddRequest,
      sedesUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
