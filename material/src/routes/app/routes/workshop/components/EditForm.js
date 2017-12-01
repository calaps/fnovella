import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { workshopValidator } from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  workshopsAddRequest,
  workshopsUpdateRequest,
  sedesGetRequest,
  educatorsGetRequest,
  programGetRequest,
  programLocationGetRequest,
  programLocationByProgramIdGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.workshopData.id) ? true : false,
      id: this.props.workshopData.id || '',
      name: this.props.workshopData.name || '',
      description: this.props.workshopData.description || '',
      location: this.props.workshopData.location || '',
      programId: this.props.workshopData.programId || '',
      instructorId: this.props.workshopData.instructorId || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self = this;
  }

  componentWillMount() {
    this.props.actions.sedesGetRequest(0, 1000);
    this.props.actions.programGetRequest();
    this.props.actions.educatorsGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.workshopData !== nextProps.workshopData) {
      this.setState({
        isEditing: false,
        name: '',
        description: '',
        location: '',
        programId: '',
        // instructorId: '',
        id: '',
      });
    }
  }

  isValid(){
    //local validation
    const { errors, isValid } = workshopValidator(this.state);
    if(!isValid){
      this.setState({ errors });
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errors object and disable submit button
      this.setState({ errors: {}, isLoading: true });

      let data = {
        name: this.state.name,
        description: this.state.description,
        location: this.state.location,
        programId: this.state.programId,
        // instructorId: this.state.instructorId,
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing ?
        this.props.actions.workshopsUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              if (self.context.router.location.query.id) {
                self.context.router.push('/app/visualization/programs')
              }else{
                self.props.changeView('VIEW_ELEMENT');
              }
            }
          },
          (error) => {
            //alert'fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          })
        :
        this.props.actions.workshopsAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            //alert'fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          });
    } else {

      // FORM WITH ERRORS

    }

  }

  handleCancel() {
    if (self.context.router.location.query.id || self.context.router.location.query.add) {
      self.context.router.push('/app/visualization/programs')
    }else{
      self.props.changeView('VIEW_ELEMENT')
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name === 'programId'){
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
      if(this.state.programId){
        let sedes = this.props.sedes.content || [];
        let programLocationRelation = this.props.programLocations.content || [];

        // console.log("programLocationRelation: ", programLocationRelation);
        // console.log("this.state.programId: ", this.state.programId);

        // separate the locations first
        let programLocations = [];
        for(let i=0; i<programLocationRelation.length; i++){
          programLocations.push(programLocationRelation[i].location);
        }

        // console.log("programLocations: ", programLocations);
        // console.log("sedes: ", sedes);

        return sedes.map((sede) => {
          if(programLocations.indexOf(sede.id)>=0){
            return <option key={sede.id} value={sede.id}>{sede.name}</option>
          }
        });
      }
      else{
        return null;
      }
    };
    //Programs options
    let programsOpt = () => {
      let programs = this.props.programs.content || [];
      return programs.map((program) => {
        if(program.clasification === "workshop"){
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
                          placeholder="eje: Pintura"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Description</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="eje: Acerca de este taller"/>
                        {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Program</label>
                      <div className="col-md-9">
                        <select
                          name="programId"
                          id="programId"
                          onChange={this.onChange}
                          value={this.state.programId}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la program</option>
                          {programsOpt()}
                        </select>
                        {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
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

//To get the routers
EditForm.contextTypes = {
  router: PropTypes.object.isRequired
};

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sedesGetRequest,
      programGetRequest,
      educatorsGetRequest,
      workshopsAddRequest,
      workshopsUpdateRequest,
      programLocationGetRequest,
      programLocationByProgramIdGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);

