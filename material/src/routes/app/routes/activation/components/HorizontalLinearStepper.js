import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EditForm from './EditForm';
import ProgramsListElements from './ProgramListElements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programActivationsAddRequest
} from '../../../../../actions';


class HorizontalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      errors: {},
      isLoading: false,
      formData: {},
      programId: ''
    };
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.props.changeView("VIEW_ELEMENT");
    this.setState({
      finished: false,
      stepIndex: 0,
      errors: {},
      isLoading: false,
      formData: {},
      programId: ''
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ProgramsListElements
          handleCancel={this.handleCancel}
          handleNext={this.handleNext}
        />;
      case 1:
        return <EditForm
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />;
      case 2:
        return 'Resumen de activación';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleNext = (data) => {
    const {stepIndex} = this.state;
    switch (stepIndex) {
      case 0:
        if (data.programId !== null) {
          this.setState({
            programId: data.programId,
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            errors: {}
          });
        } else {
          this.setState({
            errors: {
              programIdError: 'Select a program'
            }
          });
        }
        break;
      case 1:
        this.setState({
          formData: {
            activationStatus: data.activationStatus,
            calPeriodsCourse: data.calPeriodsCourse,
            calPeriodsGrade: data.calPeriodsGrade,
            calPeriodsWorkshop: data.calPeriodsWorkshop,
            evaluationStructure: data.evaluationStructure,
            freeCourses: data.freeCourses,
            location: data.location,
            monitoringStructure: data.monitoringStructure,
            numberSessions: data.numberSessions,
            responsable: data.responsable,
            satisfactionStructure: data.satisfactionStructure,
            temporality: data.temporality,
            year: data.year,
            programId: this.state.programId
          },
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
          errors: {}
        });
        break;
      case 2:
        this.props.actions.programActivationsAddRequest(this.state.formData).then(
          (response) => {
            if(response){
              this.props.changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            alert('fail');
            console.log('error occoured with rest api: ', error);
          }
        );
        // console.log("formData",this.state.formData);
        return 'Resumen de activación';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  };

  render() {
    const {finished, stepIndex, errors} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <article className="article">
        <h2 className="article-title">Activación de programa</h2>
        <div className="box box-default">
          <div className="box-body padding-xl">

            <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Selecciona el programa a activar:</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Ingresa la configuración</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Activar</StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
                {finished ? (
                  <p>
                    <a
                      href="javascript:;"
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({stepIndex: 0, finished: false});
                      }}
                    >
                      Activar otro programa
                    </a> El programa ha sido activado correctamente para el inicio del ciclo escolar.
                  </p>
                ) : (
                  <div>
                    <div>{this.getStepContent(stepIndex)}</div>
                    {
                      stepIndex === 2 ?
                        <div style={{marginTop: 12}}>
                          <FlatButton
                            label='Back'
                            onTouchTap={this.handlePrev}
                            style={{marginRight: 12}}
                          />
                          <RaisedButton
                            label='Activate'
                            primary
                            onTouchTap={this.handleNext}
                          />
                        </div>
                        : null
                    }
                    {errors.programIdError && <span className="help-block text-danger">{errors.programIdError}</span>}
                  </div>
                )}
              </div>

              <div className="callout callout-info">
                <p>Acticación de programas para que se puedan crear grados, cursos o talleres.</p>
                <p>Nota: Este formulario necesita de los catalogos para poder funcionar.</p>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programActivationsAddRequest
    }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(HorizontalLinearStepper);
