import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';// For Buttons
import { data_types } from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object
import { sectionsValidator } from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  sectionsAddRequest,
  sectionsUpdateRequest,
  gradesGetRequest,
  sedesGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: (this.props.sectionData.id)?true:false,
      name: this.props.sectionData.name || '',
      grade: this.props.sectionData.grade|| '',
      code: this.props.sectionData.code|| '',
      jornada: this.props.sectionData.jornada|| '',
      location: this.props.sectionData.location|| '',
      id: this.props.sectionData.id || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self= this;
  }

  componentWillMount() {
    this.props.actions.gradesGetRequest();
    this.props.actions.sedesGetRequest();

  }
  componentWillReceiveProps(nextProps){
    if(this.props.categoryData!==nextProps.categoryData){
      this.setState({
        isEditing: false,
        name: '',
        grade:'',
        code: '',
        jornada: '',
        location: '',
        id: '',
      })
    }
  }

  handleCancel() {
    if (self.context.router.location.query.id) {
      self.context.router.push('/app/visualization/programs')
    }else{
      self.props.changeView('VIEW_ELEMENT')
    }
  }

  isValid(){
    // TODO:Commented bacause of invalid validation
    //local validation
    const { errors, isValid } = sectionsValidator(this.state);
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
        grade: this.state.grade,
        code: this.state.code,
        jornada: this.state.jornada,
        location: this.state.location
      };
      if(this.state.isEditing){
        data.id = this.state.id;
      }

      // ON SUCCESSS API
      this.state.isEditing ?
        this.props.actions.sectionsUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if(response){
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
            self.setState({ errors: { ...self.state.errors, apiErrors: error.error }, isLoading: false });
          })
        :
        this.props.actions.sectionsAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if(response){
              self.props.changeView('VIEW_ELEMENT');
            }
          },(error) => {
            //alert'fail');
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
    let gradesOpt = () => {
      let grades = this.props.grades.content || [];
      return grades.map((grade) => {
          return <option key={grade.id} value={grade.id}>{grade.name}</option>
      });
    };
    let sedesOpt = () => {
      let sedes = this.props.sedes.content || [];
      return sedes.map((sede) => {
        return <option key={sede.id} value={sede.id}>{sede.name}</option>
      });
    };
    console.log("this",this.props.sedes)
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de sección</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: A" />
                          {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: boolean of aditional camps
                        controller to use: category controller
                        database name: aditional_field
                      */
                      }
                      <label htmlFor="grade" className="col-md-3 control-label">Selecciona el grado</label>
                      <div className="col-md-9">
                        <select
                          name="grade"
                          id="grade"
                          onChange={this.onChange}
                          value={this.state.grade}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el grado...</option>
                          {/* <option value={0}>No</option>
                          <option value={1}>Si</option> */}
                          {gradesOpt()}
                        </select>
                        {errors.grade && <span className="help-block text-danger">{errors.grade}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: boolean of aditional camps
                        controller to use: category controller
                        database name: aditional_field
                      */
                      }
                      <label htmlFor="code" className="col-md-3 control-label">Ingresa el codigo</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          name="code"
                          value={this.state.code}
                          onChange={this.onChange}
                          placeholder="eje: AU-CAL-061" />
                        {errors.code && <span className="help-block text-danger">{errors.code}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      {
                        /* #change
                        description: boolean of aditional camps
                        controller to use: category controller
                        database name: aditional_field
                      */
                      }
                      <label htmlFor="jornada" className="col-md-3 control-label">Ingresa jornada</label>
                      <div className="col-md-9">
                        <select
                          name="jornada"
                          id="jornada"
                          onChange={this.onChange}
                          value={this.state.jornada}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el jornada...</option>
                          <option value="matutina">Matutina</option>
                          <option value="vespertina">Vespertina</option>
                        </select>
                        {errors.jornada && <span className="help-block text-danger">{errors.jornada}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="location" className="col-md-3 control-label">Ingresa la ubicación</label>
                      <div className="col-md-9">
                        {/* <textarea
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          value={this.state.location}
                          onChange={this.onChange}
                          placeholder="eje: About this category" /> */}
                          <select
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          value={this.state.location}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el ubicación...</option>
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

//To get the routers
EditForm.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {
    // auth: state.auth
    grades: state.grades,
    sedes: state.sedes
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sectionsAddRequest,
      sectionsUpdateRequest,
      gradesGetRequest,
      sedesGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
