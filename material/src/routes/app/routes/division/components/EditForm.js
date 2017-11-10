import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { divisionValidator } from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  divisionsAddRequest,
  divisionsUpdateRequest,
  sedesGetRequest,
  educatorsGetRequest,
  programGetRequest,
  programLocationByProgramIdGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props.divisionData: ", this.props.divisionData);
    this.state = {
      isEditing: (this.props.divisionData.id) ? true : false,
      id: this.props.divisionData.id || '',
      name: this.props.divisionData.name || '',
      description: this.props.divisionData.description || '',
      location: this.props.divisionData.location || '',
      programa: this.props.divisionData.programa || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self = this;
    if(this.state.isEditing){
      this.props.actions.programLocationByProgramIdGetRequest(this.state.programa);
    }
  }

  componentWillMount() {
    // this.props.actions.sedesGetRequest();
    this.props.actions.programGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.divisionData !== nextProps.divisionData) {
      this.setState({
        isEditing: false,
        name: '',
        description: '',
        location: '',
        programa: '',
        id: '',
      });
    }
  }

  isValid(){
    //local validation
    const { errors, isValid } = divisionValidator(this.state);
    if(!isValid){
      this.setState({ errors });
      return false;
    }
    return true;
  }

  onSubmit(e) {
    console.log("onSubbmit");
    e.preventDefault();
    if(this.isValid()){
      //reset errors object and disable submit button
      this.setState({ errors: {}, isLoading: true });

      let data = {
        name: this.state.name,
        description: this.state.description,
        location: this.state.location,
        programa: this.state.programa
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing ?
        this.props.actions.divisionsUpdateRequest(data).then(
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
        this.props.actions.divisionsAddRequest(data).then(
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

  handleCancel() {
    self.props.changeView('VIEW_ELEMENT')
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name === 'programa'){
      this.props.actions.programLocationByProgramIdGetRequest(e.target.value);
    }
  }

  render() {

    const { errors } = this.state;

    const options = map(data_types, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //Sedes || location options
    let sedesOpt = () => {
      // if no program return null
      if(this.state.programa){
        let programLocationsRelation = this.props.programLocations.content || [];
        return programLocationsRelation.map((prl) => {
          return <option key={prl.locationData.id} value={prl.locationData.id}>{prl.locationData.name}</option>
        });
      }
      else{
        return null;
      }
    };
    //Programs options
    let programsOpt = () => {
      console.log("this.props.programs.content: ", this.props.programs.content);
      let programs = this.props.programs.content || [];
      return programs.map((program) => {
        if(program.clasification === "division"){
          return <option key={program.id} value={program.id}>{program.name}</option>
        }
      });
    };

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
                          placeholder="eje: altura"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>
                    {/*<div className="form-group row">*/}
                      {/*<label htmlFor="inputEmail3" className="col-md-3 control-label">Description</label>*/}
                      {/*<div className="col-md-9">*/}
                        {/*<input*/}
                          {/*type="text"*/}
                          {/*className="form-control"*/}
                          {/*id="description"*/}
                          {/*name="description"*/}
                          {/*value={this.state.description}*/}
                          {/*onChange={this.onChange}*/}
                          {/*placeholder="eje: about this division"/>*/}
                        {/*{errors.description && <span className="help-block text-danger">{errors.description}</span>}*/}
                      {/*</div>*/}
                    {/*</div>*/}
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Program</label>
                      <div className="col-md-9">
                        <select
                          name="programa"
                          id="programa"
                          onChange={this.onChange}
                          value={this.state.programa}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la program</option>
                          {programsOpt()}
                        </select>
                        {errors.programa && <span className="help-block text-danger">{errors.programa}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Location</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.location}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la sede</option>
                          {sedesOpt()}
                        </select>
                        {errors.location && <span className="help-block text-danger">{errors.location}</span>}
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
                                      label={this.state.isEditing ? 'Update' : 'Add'} secondary className="btn-w-md"/>
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
    sedes: state.sedes,
    programs: state.programs,
    educators: state.educators,
    programLocations: state.programLocations,
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sedesGetRequest,
      programGetRequest,
      educatorsGetRequest,
      divisionsAddRequest,
      divisionsUpdateRequest,
      programLocationByProgramIdGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);

