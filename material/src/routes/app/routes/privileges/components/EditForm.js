import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import Toggle from 'material-ui/Toggle'; // Toogle UI
import { emptyValidator } from "../../../../../actions/formValidations"; //form validations

const styles = {
  toggle: {
    maxWidth: 250,
    marginBottom: 16
  },
};

class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      p_program_activation: false,
      p_students_entry: false,
      p_student_inscription: false,
      p_student_approval: false,
      p_notes_entry: false,
      p_notes_visualization: false,
      p_assistance_entry: false,
      p_assistance_visualization: false,
      p_evaluation_entry: false,
      p_evaluation_visualization: false,
      p_monitoring_entry: false,
      p_monitoring_visualization: false,
      p_indicators_visualization: false,
      p_indicators_p_visualization: false,
      p_information_visualization: false,
      p_information_entry: false,
      p_programs_visualization: false,
      p_indicators_r_visualization: false,
      p_indicators_d_visualization: false,
      p_indicators_g_visualization: false,
      p_structure_entry: false,
      p_catalogs_entry: false,
      p_personal_entry: false,
      p_personal_evaluation_entry: false,
      p_personal_pass_entry: false,
      p_personal_data_entry: false,

      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
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

      // ON SUCCESSS API

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
                          label="Ingreso de estudiantes"
                          id="p_students_entry"
                          name="p_students_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Inscripción de estudiantes"
                          id="p_student_inscription"
                          name="p_student_inscription"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Aprobación de inscripciones"
                          id="p_student_approval"
                          name="p_student_approval"
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
                          label="Activación de programas"
                          id="p_program_activation"
                          name="p_program_activation"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Ingreso de notas"
                          id="p_notes_entry"
                          name="p_notes_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Visualización de notas"
                          id="p_notes_visualization"
                          name="p_notes_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Ingreso de asistencias"
                          id="p_assistance_entry"
                          name="p_assistance_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Visualización de asistencia"
                          id="p_assistance_visualization"
                          name="p_assistance_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Ingreso de evaluación de satisfacción"
                          id="p_evaluation_entry"
                          name="p_evaluation_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Visualización de evaluación de satisfacción"
                          id="p_evaluation_visualization"
                          name="p_evaluation_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Ingreso de monitoreo"
                          id="p_monitoring_entry"
                          name="p_monitoring_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Visualización de monitoreo"
                          id="p_monitoring_visualization"
                          name="p_monitoring_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Indicadores de resultados"
                          id="p_indicators_visualization"
                          name="p_indicators_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Indicadores de desempeño"
                          id="p_indicators_p_visualization"
                          name="p_indicators_p_visualization"
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
                          label="Visualización de información"
                          id="p_information_visualization"
                          name="p_information_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Edición de información"
                          id="p_information_entry"
                          name="p_information_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Visualización de programas inscritos"
                          id="p_programs_visualization"
                          name="p_programs_visualization"
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
                          label="Indicadores de resultados"
                          id="p_indicators_r_visualization"
                          name="p_indicators_r_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Indicadores de desempeño"
                          id="p_indicators_d_visualization"
                          name="p_indicators_d_visualization"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Indicadores generales"
                          id="p_indicators_g_visualization"
                          name="p_indicators_g_visualization"
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
                          label="Creación y modificación de estructura"
                          id="p_structure_entry"
                          name="p_structure_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Mantenimiento de Catalogos"
                          id="p_catalogs_entry"
                          name="p_catalogs_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Ingreso y modificación de personal"
                          id="p_personal_entry"
                          name="p_personal_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Ingreso de Evaluación de desempeño de personal"
                          id="p_personal_evaluation_entry"
                          name="p_personal_evaluation_entry"
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
                          label="Cambio de contraseña"
                          id="p_personal_pass_entry"
                          name="p_personal_pass_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-9">
                        <Toggle
                          label="Cambio de datos personales"
                          id="p_personal_data_entry"
                          name="p_personal_data_entry"
                          style={styles.toggle}
                          onToggle={this.onToggle}
                        />
                      </div>
                    </div>



                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <RaisedButton disabled={this.state.isLoading} type="submit" label="Agregar" secondary className="btn-w-md" />
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

module.exports = EditForm;
