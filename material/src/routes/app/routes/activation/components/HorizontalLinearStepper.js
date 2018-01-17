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
import PerformanceStructure from './PerformanceStructure';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programActivationsAddRequest,
  evaluationAddRequest,
  evaluationActivityAddRequest,
  evaluationRangeAddRequest
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
      programId: '',
      programClasification: 'null',
      performanceStructure: {},
      performanceStructureRangeId: '',
      performanceStructureId: '',
      performanceStructureRangeCreated: false,
      performanceStructureCreated: false,
      performanceActivityCreated: false,
      activationId: 0,
      programActive: false
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
      programId: '',
      programClasification: ''
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
          clasification={this.state.programClasification}
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />;
      case 2:
        return <PerformanceStructure
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />;
      case 3:
        return <div>
          <p>
            <a>
              Activación de programa y estructura de evaluación de desempeño
            </a><br />La activación esta configurada exitosamente. Presione activar para finalizar.
          </p>
          <div style={{marginTop: 12}}>
            <FlatButton
              label='retroceder'
              disabled={this.state.isLoading}
              onTouchTap={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              disabled={this.state.isLoading}
              label='activar'
              primary
              onTouchTap={this.handleNext}
            />
          </div>
        </div>;
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
            programClasification: data.programClasification,
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3,
            errors: {}
          });
        } else {
          this.setState({
            errors: {
              programIdError: 'Aún no has seleccionado el programa a activar'
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
            programId: this.state.programId,
            nsJan: data.nsJan,
            nsFeb: data.nsFeb,
            nsMar: data.nsMar,
            nsApr: data.nsApr,
            nsMay: data.nsMay,
            nsJun: data.nsJun,
            nsJul: data.nsJul,
            nsAug: data.nsAug,
            nsSep: data.nsSep,
            nsOct: data.nsOct,
            nsNov: data.nsNov,
            nsDec: data.nsDec,
          },
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 3,
          errors: {}
        });
        break;
      case 2:
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 3,
          performanceStructure: data,
          errors: {}
        });
        break;
        case 3:
        this.props.actions.programActivationsAddRequest(this.state.formData).then(
          // Create a program Activation
          (response) => {
            if(response) {
              // setting activationID returned in response
              this.setState({activationId: response.data.id, programActive: true});

              // setting range for forth form through minimumNote and maximumNote
              let performanceStructureRange = {
                min: this.state.performanceStructure.minimumNote,
                max: this.state.performanceStructure.maximumNote
              };
              // console.log("hitting performanceStructureRange api");
              this.props.actions.evaluationRangeAddRequest(performanceStructureRange)
                .then(
                  (response) => {
                    if (response) {
                      //setting performanceStructureRangeId returned in response
                      this.setState({
                        performanceStructureRangeId: response.data.id,
                        performanceStructureRangeCreated: true
                      });
                      // console.log("response from performanceStructureRange api: ", response.data.id);
                      //setting performanceStructureData to hit evaluation add api
                      let performanceStructureData = {
                        approvalPercentage: this.state.performanceStructure.approvalPercentage,
                        evaluationSubtype: this.state.performanceStructure.evaluationSubtype,
                        evaluationType: this.state.evaluationStructure.evaluationType,
                        dateEnd: this.state.generalConfiguration.inscriptionsEnd,
                        dateStart: this.state.generalConfiguration.inscriptionsStart,
                        session: 0,
                        group: null, // #joseph
                        program: this.state.groupId, // #joseph
                        range: this.state.performanceStructureRangeId
                      };
                      // console.log("hitting performanceStructureData api");
                      this.props.actions.evaluationAddRequest(performanceStructureData)
                        .then(
                          (response) => {
                            if (response) {
                              //setting performanceStructureId returned in response
                              this.setState({
                                performanceStructureId: response.data.id,
                                performanceStructureCreated: true
                              });
                              // console.log("response from performanceStructureData api: ", response.data.id);
                              //setting performanceStructureActivityData to hit evaluationActivity add api
                              for (let act of this.state.performanceStructure.evaluateCategory) {
                                let performanceStructureActivityData = {
                                  evaluation: this.state.performanceStructureId,
                                  parentId: 0,
                                  range: this.state.performanceStructureRangeId
                                };
                                performanceStructureActivityData.name = act.name;
                                performanceStructureActivityData.percentage = act.percentage;
                                // console.log("hitting performanceStructureActivityData api, ", performanceStructureActivityData);
                                this.props.actions.evaluationActivityAddRequest(performanceStructureActivityData);
                              }
                              this.context.router.push('/app/' + this.context.router.location.query.typeCategory);
                            }
                          },
                          (error) => {
                            console.log("An Error occur with the Evaluation API: ", error);
                          });
                    }
                  },
                  (error) => {
                    console.log("An Error occur with the Structure Range API: ", error);
                  });

            }
          }, (error) => {
            //alert'fail');
            console.log('Error con Program Activation API: ', error);
          }
        );
        // console.log("formData",this.state.formData);
        return 'Activación del programa finalizada';
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
                  <StepLabel>Selecciona el programa</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Configuración</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Evaluación de desempeño</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Activar</StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
                <div>
                  <div>{this.getStepContent(stepIndex)}</div>
                </div>
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
      programActivationsAddRequest,
      evaluationAddRequest,
      evaluationActivityAddRequest,
      evaluationRangeAddRequest
    }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(HorizontalLinearStepper);
