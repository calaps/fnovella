import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import {gradeValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {gradesAddRequest, gradesUpdateRequest, programLocationByProgramIdGetRequest, programGetRequest, catalogsGetByCategoryRequest} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.gradeData.id)
        ? true
        : false,
      id: this.props.gradeData.id || '',
      name: this.props.gradeData.name || '',
      level: this.props.gradeData.level || '',
      description: this.props.gradeData.description || '',
      location: this.props.gradeData.location || '',
      programId: this.props.gradeData.programId || '',
      errors: {},
      isLoading: false
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
  }

  componentWillMount() {
    if(this.state.isEditing){
      this
      .props
      .actions
      .programLocationByProgramIdGetRequest(this.state.programId);
    }
    this
      .props
      .actions
      .programGetRequest();
    this
      .props
      .actions
      .catalogsGetByCategoryRequest(9);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gradeData !== nextProps.gradeData) {
      this.setState({
        isEditing: false,
        name: '',
        level: '',
        description: '',
        location: '',
        programId: '',
        id: ''
      });
    }
  }

  isValid() {
    //local validation
    const {errors, isValid} = gradeValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  handleCancel() {
    self
      .props
      .changeView('VIEW_ELEMENT')
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});

      let data = {
        name: this.state.name,
        level: this.state.level,
        description: this.state.description,
        location: this.state.location,
        programId: this.state.programId
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }
      // ON SUCCESS API
      this.state.isEditing
        ? this
          .props
          .actions
          .gradesUpdateRequest(data)
          .then((response) => {
            //Save the default object as a provider
            if (response) {
              self
                .props
                .changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
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
          .gradesAddRequest(data)
          .then((response) => {
            //Save the default object as a provider
            if (response) {
              self
                .props
                .changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            alert('fail');
            console.log("An Error occur with the Rest API");
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name == "programId") {
      this
        .props
        .actions
        .programLocationByProgramIdGetRequest(e.target.value);
    }
  }

  render() {

    const {errors} = this.state;

    const options = map(data_types, (val, key) => <option key={val} value={val}>{key}</option>
    );
    //programLocations || location options
    let programLocationsOpt = () => {
      console.log(this.props.programLocations)
      if (this.state.programId) {
        let programLocations = this.props.programLocations.content || [];
        return programLocations.map((location) => {
          return <option key={location.locationData.id} value={location.locationData.id}>{location.locationData.name}</option>
        });
      } else {
        return null;
      }
    };
    //Programs options
    let programsOpt = () => {
      let programs = this.props.programs.content || [];
      return programs.map((program) => {
        if (program.clasification == "grades") {
          return <option key={program.id} value={program.id}>{program.name}</option>
        } else {
          return null;
        }
      });
    };
    //Level options
    let catalogsOpt = () => {
      let catalogs = this.props.catalogs.content || [];
      return catalogs.map((catalog) => {
        return <option key={catalog.id} value={catalog.name}>{catalog.name}</option>
      });
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información:
                  </p>
                  <form onSubmit={this.onSubmit} role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de grado</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: Primero"/> {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Descripción</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          placeholder="eje: Descripción del grado"/> {errors.description && <span className="help-block text-danger">{errors.description}</span>}
                      </div>
                    </div>
                    {/* #change
                      description: level should be a list of catalogs of category "nivel" with the catalog options (not input)
                      controller to use: catalog
                      database name: catalog filtered options by category "nivel"
                    */}
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nivel</label>
                      <div className="col-md-9">
                        <select
                          name="level"
                          id="level"
                          onChange={this.onChange}
                          value={this.state.level}
                          className="form-control">
                          <option value="" disabled>Selecione la sede</option>
                          {catalogsOpt()}
                        </select>
                        {errors.level && <span className="help-block text-danger">{errors.level}</span>}
                      </div>
                    </div>
                    {/* #change
                      description: The options populated with locations is correct.
                                   However should be only the locations related to the program
                                   in the new controller "program_location" relation
                      controller to use: program_location
                      database name: program_location
                    */}

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Programa</label>
                      <div className="col-md-9">
                        <select
                          name="programId"
                          id="programId"
                          onChange={this.onChange}
                          value={this.state.programId}
                          className="form-control">
                          <option value="" disabled>Selecione la program</option>
                          {programsOpt()}
                        </select>
                        {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ubicación</label>
                      <div className="col-md-9">
                        <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.location}
                          className="form-control">
                          <option value="" disabled>Selecione la sede</option>
                          {programLocationsOpt()}
                        </select>
                        {errors.location && <span className="help-block text-danger">{errors.location}</span>}
                      </div>
                    </div>
                    {/* #change
                      description: However should be only the locations related to the program
                                    in the new controller "program_location" relation.ds
                      controller to use: program_location
                      database name: program_location
                    */}

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton
                          disabled={this.state.isLoading}
                          label='Cancel'
                          style={{
                          marginRight: 12
                        }}
                          onTouchTap={this.handleCancel}
                          secondary
                          className="btn-w-md"/>
                        <RaisedButton
                          disabled={this.state.isLoading}
                          type="submit"
                          label={this.state.isEditing
                          ? 'Update'
                          : 'Add'}
                          secondary
                          className="btn-w-md"/>
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>

            <div className="col-xl-3 col-lg-6">
              <div className="card bg-color-white">
                <div className="card-content">
                  <span className="card-title">Uso de catalogos</span>
                  <p className="text-justify">El siguiente foromulario hace uso de catalogos, para
                    agregar nuevos catalogos deveras editarlos previamente en la sección de la
                    página.</p>
                  <p>Categoria: nivel</p>
                </div>
                <div className="card-action">
                  <a href="#/app/catalog">Ver catalogos</a>
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
  return {programLocations: state.programLocations, programs: state.programs, catalogs: state.catalogs}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programLocationByProgramIdGetRequest,
      programGetRequest,
      gradesAddRequest,
      gradesUpdateRequest,
      catalogsGetByCategoryRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditForm);
