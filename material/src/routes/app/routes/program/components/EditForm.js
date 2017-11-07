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
  programUpdateRequest,
  categoriesGetRequest,
  usersGetRequest
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
      category: this.props.programData.category || '',
      genderAudience: this.props.programData.genderAudience || '',
      "activationStatus": typeof this.props.programData.activationStatus === "boolean" ? this.props.programData.activationStatus : true,
      "audienceMax": typeof this.props.programData.audienceMax === "number" ? this.props.programData.audienceMax : 0,
      "audienceMin": typeof this.props.programData.audienceMin === "number" ? this.props.programData.audienceMin : 0,
      "evaluationPerformmance": typeof this.props.programData.evaluationPerformmance === "boolean" ? this.props.programData.evaluationPerformmance : true,
      "evaluationPeriod": typeof this.props.programData.evaluationPeriod === "number" ? this.props.programData.evaluationPeriod : 0,
      "evaluationType": this.props.programData.evaluationType || '',
      "gender": this.props.programData.gender || 'male',
      "implementationLocation": this.props.programData.implementationLocation || '',
      "indicatorsEvaluation": typeof this.props.programData.indicatorsEvaluation === "boolean" ? this.props.programData.indicatorsEvaluation : true,
      "indicatorsPerformmance": typeof this.props.programData.indicatorsPerformmance === "boolean" ? this.props.programData.indicatorsPerformmance : true,
      "indicatorsSatisfaction": typeof this.props.programData.indicatorsSatisfaction === "boolean" ? this.props.programData.indicatorsSatisfaction : true,
      "monthsTotal": typeof this.props.programData.monthsTotal === "number" ? this.props.programData.monthsTotal : 0,
      "responsable": typeof this.props.programData.responsable === "number" ? this.props.programData.responsable : 0,
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self = this;
  }

  componentWillMount(){
    this.props.actions.categoriesGetRequest();
    this.props.actions.usersGetRequest();
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
        category: '',
        genderAudience: 'male',


        "activationStatus": true,
        "audienceMax": 0,
        "audienceMin": 0,
        "evaluationPerformmance": true,
        "evaluationPeriod": 0,
        "evaluationType": "string",
        "gender": "male",
        "implementationLocation": "string",
        "indicatorsEvaluation": true,
        "indicatorsPerformmance": true,
        "indicatorsSatisfaction": true,
        "monthsTotal": 0,
        "responsable": 0,
        // "updateFields": {}

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
        freeCourses: this.state.freeCourses,
        category: this.state.category,
        genderAudience: this.state.genderAudience,
        "activationStatus": this.state.activationStatus,
        "audienceMax": this.state.audienceMax,
        "audienceMin": this.state.audienceMin,
        "evaluationPerformmance": this.state.evaluationPerformmance,
        "evaluationPeriod": this.state.evaluationPeriod,
        "evaluationType": this.state.evaluationType,
        "gender": this.state.gender,
        "implementationLocation": this.state.implementationLocation,
        "indicatorsEvaluation": this.state.indicatorsEvaluation,
        "indicatorsPerformmance": this.state.indicatorsPerformmance,
        "indicatorsSatisfaction": this.state.indicatorsSatisfaction,
        "monthsTotal": this.state.monthsTotal,
        "responsable": this.state.responsable,
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

    //categories options
    let categoriesOpt  = () => {
      let {categories} = this.props;
      return categories.map((category)=>{
        return <option key={category.id} value={category.id}>{category.name}</option>
      });
    };

    //Programs options
    let responsibleOpt = () => {
      // console.log("this.props.users: ", this.props.users);
      if(this.props.users.content){
      let users = this.props.users.content;
      return users.map((user) => {
        return <option key={user.id} value={user.id}>{user.firstName + ' ' + user.firstLastName}</option>
      });
      }
      else{
        return null;
      }
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
                          name="category"
                          id="category"
                          onChange={this.onChange}
                          value={this.state.category}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona la categoria...</option>
                          {categoriesOpt()}
                        </select>
                        {errors.category && <span className="help-block text-danger">{errors.category}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Gender Audience: </label>
                      <div className="col-md-9">
                        <select
                          name="genderAudience"
                          id="genderAudience"
                          onChange={this.onChange}
                          value={this.state.genderAudience}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona la genero...</option>
                          <option value="male">Hombres</option>
                          <option value="female">Mujeres</option>
                          <option value="both">Mixto</option>
                        </select>
                        {errors.genderAudience && <span className="help-block text-danger">{errors.genderAudience}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Activation Status</label>
                      <div className="col-md-9">
                        <select
                          name="activationStatus"
                          id="activationStatus"
                          onChange={this.onChange}
                          value={this.state.activationStatus}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.activationStatus && <span className="help-block text-danger">{errors.activationStatus}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">audienceMax</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="audienceMax"
                          name="audienceMax"
                          value={this.state.audienceMax}
                          onChange={this.onChange}
                          placeholder="eje: Niños de 10 - 15 años"/>
                        {errors.audienceMax && <span className="help-block text-danger">{errors.audienceMax}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">audienceMin</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="audienceMin"
                          name="audienceMin"
                          value={this.state.audienceMin}
                          onChange={this.onChange}
                          placeholder="eje: Niños de 10 - 15 años"/>
                        {errors.audienceMin && <span className="help-block text-danger">{errors.audienceMin}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">evaluationPerformmance</label>
                      <div className="col-md-9">
                        <select
                          name="evaluationPerformmance"
                          id="evaluationPerformmance"
                          onChange={this.onChange}
                          value={this.state.evaluationPerformmance}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.evaluationPerformmance && <span className="help-block text-danger">{errors.evaluationPerformmance}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">evaluationPeriod</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="evaluationPeriod"
                          name="evaluationPeriod"
                          value={this.state.evaluationPeriod}
                          onChange={this.onChange}
                          placeholder="eje: Niños de 10 - 15 años"/>
                        {errors.evaluationPeriod && <span className="help-block text-danger">{errors.evaluationPeriod}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">evaluationType</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="evaluationType"
                          name="evaluationType"
                          value={this.state.evaluationType}
                          onChange={this.onChange}
                          placeholder="eje: Niños de 10 - 15 años"/>
                        {errors.evaluationType && <span className="help-block text-danger">{errors.evaluationType}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Gender</label>
                      <div className="col-md-9">
                        <select
                          name="gender"
                          id="gender"
                          onChange={this.onChange}
                          value={this.state.gender}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona la genero...</option>
                          <option value="male">Hombres</option>
                          <option value="female">Mujeres</option>
                          <option value="both">Mixto</option>
                        </select>
                        {errors.gender && <span className="help-block text-danger">{errors.gender}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">implementationLocation</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="implementationLocation"
                          name="implementationLocation"
                          value={this.state.implementationLocation}
                          onChange={this.onChange}
                          placeholder="eje: implementationLocation"/>
                        {errors.implementationLocation && <span className="help-block text-danger">{errors.implementationLocation}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">indicatorsEvaluation</label>
                      <div className="col-md-9">
                        <select
                          name="indicatorsEvaluation"
                          id="indicatorsEvaluation"
                          onChange={this.onChange}
                          value={this.state.indicatorsEvaluation}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.indicatorsEvaluation && <span className="help-block text-danger">{errors.indicatorsEvaluation}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">indicatorsPerformmance</label>
                      <div className="col-md-9">
                        <select
                          name="indicatorsPerformmance"
                          id="indicatorsPerformmance"
                          onChange={this.onChange}
                          value={this.state.indicatorsPerformmance}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.indicatorsPerformmance && <span className="help-block text-danger">{errors.indicatorsPerformmance}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">indicatorsSatisfaction</label>
                      <div className="col-md-9">
                        <select
                          name="indicatorsSatisfaction"
                          id="indicatorsSatisfaction"
                          onChange={this.onChange}
                          value={this.state.indicatorsSatisfaction}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={false}>No</option>
                          <option value={true}>Si</option>
                        </select>
                        {errors.indicatorsSatisfaction && <span className="help-block text-danger">{errors.indicatorsSatisfaction}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">monthsTotal</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          id="monthsTotal"
                          name="monthsTotal"
                          value={this.state.monthsTotal}
                          onChange={this.onChange}
                          placeholder="eje: monthsTotal"/>
                        {errors.monthsTotal && <span className="help-block text-danger">{errors.monthsTotal}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">responsable</label>
                      <div className="col-md-9">
                        <select
                          name="responsable"
                          id="responsable"
                          onChange={this.onChange}
                          value={this.state.responsable}
                          className="form-control"
                        >
                          {responsibleOpt()}
                        </select>
                        {errors.responsable && <span className="help-block text-danger">{errors.responsable}</span>}
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
    categories: state.categories,
    users: state.users
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      //    signUpRequest
      programAddRequest,
      programUpdateRequest,
      categoriesGetRequest,
      usersGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
