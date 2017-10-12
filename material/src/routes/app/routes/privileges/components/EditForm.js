import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import Toggle from 'material-ui/Toggle'; // Toogle UI
import { emptyValidator } from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  privilegesAddRequest,
  privilegesUpdateRequest
} from '../../../../../actions';

const styles = {
  toggle: {
    maxWidth: 250,
    marginBottom: 16
  },
};

let self;
class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.privilegeData.id)?true:false,
      id: this.props.privilegeData.id || '',
      name: this.props.privilegeData.name || '',
      pstudentInscription: this.props.privilegeData.pstudentInscription || false,
      pstudentApproval: this.props.privilegeData.pstudentApproval || false,
      pnotesEntry: this.props.privilegeData.pnotesEntry || false,
      pnotesVisualization: this.props.privilegeData.pnotesVisualization || false,
      passitanceEntry: this.props.privilegeData.passitanceEntry || false,
      passitanceVisualization: this.props.privilegeData.passitanceVisualization || false,
      pevaluationEntry: this.props.privilegeData.pevaluationEntry || false,
      pevaluationVisualization: this.props.privilegeData.pevaluationVisualization || false,
      pmonitoringEntry: this.props.privilegeData.pmonitoringEntry || false,
      pmonitoringVisualization: this.props.privilegeData.pmonitoringVisualization || false,
      pindicatorsVisualization: this.props.privilegeData.pindicatorsVisualization || false,
      pindicatorsPVisualization:this.props.privilegeData.pindicatorsPVisualization || false,
      pinformationVisualization: this.props.privilegeData.pinformationVisualization  || false,
      pinformationEntry: this.props.privilegeData.pinformationEntry || false,
      pprogramsVisualization: this.props.privilegeData.pprogramsVisualization || false,
      pindicatrosRVisualization: this.props.privilegeData.pindicatrosRVisualization || false,
      pindicatrosDVisualization: this.props.privilegeData.pindicatrosDVisualization || false,
      pindicatrosGVisualization: this.props.privilegeData.pindicatrosGVisualization || false,
      pstructureEntry: this.props.privilegeData.pstructureEntry || false,
      pcatalogsEntry: this.props.privilegeData.pcatalogsEntry || false,
      ppersonalEntry: this.props.privilegeData.ppersonalEntry || false,
      ppersonalEvaluationEntry: this.props.privilegeData.ppersonalEvaluationEntry || false,
      ppersonalPassEntry: this.props.privilegeData.ppersonalPassEntry || false,
      ppersonalDataEntry: this.props.privilegeData.ppersonalDataEntry || false,
      pprogramActivation: this.props.privilegeData.pprogramActivation || false,
      pstudentsEntry: this.props.privilegeData.pstudentsEntry || false,

      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
    self= this;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.privilegeData!==nextProps.privilegeData){
      this.setState({
        isEditing:false,        
        id: '',
        name: '',
        pstudentInscription: false,
        pstudentApproval: false,
        pnotesEntry: false,
        pnotesVisualization: false,
        passitanceEntry: false,
        passitanceVisualization: false,
        pevaluationEntry: false,
        pevaluationVisualization: false,
        pmonitoringEntry:  false,
        pmonitoringVisualization: false,
        pindicatorsVisualization: false,
        pindicatorsPVisualization: false,
        pinformationVisualization: false,
        pinformationEntry: false,
        pprogramsVisualization: false,
        pindicatrosRVisualization: false,
        pindicatrosDVisualization: false,
        pindicatrosGVisualization: false,
        pstructureEntry: false,
        pcatalogsEntry: false,
        ppersonalEntry: false,
        ppersonalEvaluationEntry: false,
        ppersonalPassEntry: false,
        ppersonalDataEntry: false,
        pprogramActivation: false,
        pstudentsEntry: false,          
      });
    }
  }

  isValid(){
    // TODO: Commented because not working on addRequest method
    //local validation
    // const { errors, isValid } = emptyValidator(this.state)
    // if(!isValid){
    //   this.setState({ errors });
    // }
    // return isValid;
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });
      let data = {
        name: this.state.name,
        pstudentInscription: this.state.pstudentInscription,
        pstudentApproval: this.state.pstudentApproval,
        pnotesEntry: this.state.pnotesEntry,
        pnotesVisualization: this.state.pnotesVisualization,
        passitanceEntry: this.state.passitanceEntry,
        passitanceVisualization: this.state.passitanceVisualization,
        pevaluationEntry: this.state.pevaluationEntry,
        pevaluationVisualization: this.state.pevaluationVisualization,
        pmonitoringEntry: this.state.pmonitoringEntry,
        pmonitoringVisualization: this.state.pmonitoringVisualization,
        pindicatorsVisualization: this.state.pindicatorsVisualization,
        pindicatorsPVisualization: this.state.pindicatorsPVisualization,
        pinformationVisualization: this.state.pinformationVisualization,
        pinformationEntry: this.state.pinformationEntry,
        pprogramsVisualization: this.state.pprogramsVisualization,
        pindicatrosRVisualization: this.state.pindicatrosRVisualization,
        pindicatrosDVisualization: this.state.pindicatrosDVisualization,
        pindicatrosGVisualization: this.state.pindicatrosGVisualization,
        pstructureEntry: this.state.pstructureEntry,
        pcatalogsEntry: this.state.pcatalogsEntry,
        ppersonalEntry: this.state.ppersonalEntry,
        ppersonalEvaluationEntry: this.state.ppersonalEvaluationEntry,
        ppersonalPassEntry: this.state.ppersonalPassEntry,
        ppersonalDataEntry: this.state.ppersonalDataEntry,
        pprogramActivation: this.state.pprogramActivation,
        pstudentsEntry: this.state.pstudentsEntry
      }
      // ON SUCCESSS API
      if(this.state.isEditing){
        data.id = this.state.id;
      }
      this.state.isEditing ?
        this.props.actions.privilegesUpdateRequest(data).then(
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
        this.props.actions.privilegesAddRequest(data).then(
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
  onToggle(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }

  render() {

    const { errors } = this.state;

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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre del privilegio</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: Administrador" />
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <h6>Inscripciones:</h6>
                    <hr/>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pstudentsEntry}
                          label="Ingreso de estudiantes"
                          id="pstudentsEntry"
                          name="pstudentsEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pstudentInscription}
                          label="Inscripción de estudiantes"
                          id="pstudentInscription"
                          name="pstudentInscription"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Aprobación de inscripciones"
                          checked={this.state.pstudentApproval}
                          id="pstudentApproval"
                          name="pstudentApproval"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <h6>Programa:</h6>
                    <hr/>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pprogramActivation}
                          label="Activación de programas"
                          id="pprogramActivation"
                          name="pprogramActivation"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pnotesEntry}
                          label="Ingreso de notas"
                          id="pnotesEntry"
                          name="pnotesEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pnotesVisualization}
                          label="Visualización de notas"
                          id="pnotesVisualization"
                          name="pnotesVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.passitanceEntry}
                          label="Ingreso de asistencias"
                          id="passitanceEntry"
                          name="passitanceEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.passitanceVisualization}
                          label="Visualización de asistencia"
                          id="passitanceVisualization"
                          name="passitanceVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pevaluationEntry}
                          label="Ingreso de evaluación de satisfacción"
                          id="pevaluationEntry"
                          name="pevaluationEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pevaluationVisualization}
                          label="Visualización de evaluación de satisfacción"
                          id="pevaluationVisualization"
                          name="pevaluationVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pmonitoringEntry}
                          label="Ingreso de monitoreo"
                          id="pmonitoringEntry"
                          name="pmonitoringEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pmonitoringVisualization}
                          label="Visualización de monitoreo"
                          id="pmonitoringVisualization"
                          name="pmonitoringVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pindicatorsVisualization}
                          label="Indicadores de resultados"
                          id="pindicatrosVisualization"
                          name="pindicatorsVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pindicatorsPVisualization}
                          label="Indicadores de desempeño"
                          id="pindicatorsPVisualization"
                          name="pindicatorsPVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <h6>Particiantes:</h6>
                    <hr/>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pinformationVisualization}
                          label="Visualización de información"
                          id="pinformationVisualization"
                          name="pinformationVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pinformationEntry}
                          label="Edición de información"
                          id="pinformationEntry"
                          name="pinformationEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pprogramsVisualization}
                          label="Visualización de programas inscritos"
                          id="pprogramsVisualization"
                          name="pprogramsVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <h6>Indicadores:</h6>
                    <hr/>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pindicatrosRVisualization}
                          label="Indicadores de resultados"
                          id="pindicatrosRVisualization"
                          name="pindicatrosRVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pindicatrosDVisualization}
                          label="Indicadores de desempeño"
                          id="pindicatrosDVisualization"
                          name="pindicatrosDVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pindicatrosGVisualization}
                          label="Indicadores generales"
                          id="pindicatrosGVisualization"
                          name="pindicatrosGVisualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <h6>Administración:</h6>
                    <hr/>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pstructureEntry}
                          label="Creación y modificación de estructura"
                          id="pstructureEntry"
                          name="pstructureEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.pcatalogsEntry}
                          label="Mantenimiento de Catalogos"
                          id="pcatalogsEntry"
                          name="pcatalogsEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.ppersonalEntry}
                          label="Ingreso y modificación de personal"
                          id="ppersonalEntry"
                          name="ppersonalEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.ppersonalEvaluationEntry}
                          label="Ingreso de Evaluación de desempeño de personal"
                          id="ppersonalEvaluationEntry"
                          name="ppersonalEvaluationEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <h6>Personal:</h6>
                    <hr/>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.ppersonalPassEntry}
                          label="Cambio de contraseña"
                          id="ppersonalPassEntry"
                          name="ppersonalPassEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          checked={this.state.ppersonalDataEntry}
                          label="Cambio de datos personales"
                          id="ppersonalDataEntry"
                          name="ppersonalDataEntry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
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
                <h6>Descripción:</h6>
                <p>Los privilegios sirven para deterimnar los permisos que tiene cada usuario dentro de la aplicación.</p>
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
      privilegesAddRequest,
      privilegesUpdateRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
