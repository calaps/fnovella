import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import GeneralConfiguration from './GeneralConfiguration';
import EvaluationStructure from './EvaluationStructure';
import SatisfactionStructure from './SatisfactionStructure';
import MonitoringStructure from './MonitoringStructure';
import PerformanceStructure from './PerformanceStructure';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  groupsAddRequest,
  evaluationAddRequest,
  evaluationActivityAddRequest,
  evaluationRangeAddRequest
} from '../../../../../actions';
import PropTypes from "prop-types";

let self;

class HorizontalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      errors: {},
      isLoading: false,
      generalConfiguration: {},
      evaluationStructure: {},
      satisfactionStructure: {},
      monitoringStructure: {},
      performanceStructure: {},
      groupId: '',
      evaluationStructureRangeId: '',
      evaluationStructureId: '',
      satisfactionStructureRangeId: '',
      satisfactionStructureId: '',
      monitoringStructureRangeId: '',
      monitoringStructureId: '',
      performanceStructureRangeId: '',
      performanceStructureId: '',
      groupCreated: false,
      evaluationStructureRangeCreated: false,
      evaluationStructureCreated: false,
      evaluationActivityCreated: false,
      satisfactionStructureRangeCreated: false,
      satisfactionStructureCreated: false,
      satisfactionActivityCreated: false,
      monitoringStructureRangeCreated: false,
      monitoringStructureCreated: false,
      monitoringActivityCreated: false,
      performanceStructureRangeCreated: false,
      performanceStructureCreated: false,
      performanceActivityCreated: false,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.onGroupActivate = this.onGroupActivate.bind(this);
    self = this;
  }

  handleCancel() {
    this.setState({
      finished: false,
      stepIndex: 0,
      errors: {},
      isLoading: false
    });
    this.context.router.push('/app/' + this.context.router.location.query.typeCategory);
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
        return <GeneralConfiguration
          handleCancel={this.handleCancel}
          handleNext={this.handleNext}
        />;
      case 1:
        return <EvaluationStructure
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />;
      case 2:
        return <SatisfactionStructure
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />;
      case 3:
        return <MonitoringStructure
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />;
      case 4:
        return <PerformanceStructure
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />;
      case 5:
        return <div>
          <p>
            <a>
              Activar otro programa
            </a> El programa ha sido activado correctamente para el inicio del ciclo escolar.
          </p>
          <div style={{marginTop: 12}}>
            <FlatButton
              label='Back'
              disabled={this.state.isLoading}
              onTouchTap={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              disabled={this.state.isLoading}
              label='Activate'
              primary
              onTouchTap={this.onGroupActivate}
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
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 6,
          errors: {},
          generalConfiguration: data
        });
        break;
      case 1:
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 6,
          errors: {},
          evaluationStructure: data
        });
        break;
      case 2:
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 6,
          errors: {},
          satisfactionStructure: data
        });
        break;
      case 3:
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 6,
          errors: {},
          monitoringStructure: data
        });
        break;
      case 4:
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 6,
          errors: {},
          performanceStructure: data
        });
        break;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  };

  onGroupActivate() {
    this.setState({isLoading: true});
    //create a group from first form
    console.log("hitting create_group api");
    this.props.actions.groupsAddRequest(this.state.generalConfiguration)
      .then(
        (response) => {
          if (response) {
            //setting groupId returned in response
            this.setState({groupId: response.data.id, groupCreated: true});
            console.log("response from create_group api: ", response.data.id);

            //for second form
            // setting range for second form through minimumNote and maximumNote
            let evaluationStructureRange = {
              min: this.state.evaluationStructure.minimumNote,
              max: this.state.evaluationStructure.maximumNote
            };
            console.log("hitting evaluationStructureRange api");
            this.props.actions.evaluationRangeAddRequest(evaluationStructureRange)
              .then(
                (response) => {
                  if (response) {
                    //setting evaluationStructureRangeId returned in response
                    this.setState({
                      evaluationStructureRangeId: response.data.id, evaluationStructureRangeCreated: true
                    });
                    console.log("response from evaluationStructureRange api: ", response.data.id);
                    //setting evaluationStructureData to hit evaluation add api
                    let evaluationStructureData = {
                      approvalPercentage: this.state.evaluationStructure.approvalPercentage,
                      evaluationSubtype: this.state.evaluationStructure.evaluationSubtype,
                      evaluationType: this.state.evaluationStructure.evaluationType,
                      dateEnd: this.state.generalConfiguration.inscriptionsEnd,
                      dateStart: this.state.generalConfiguration.inscriptionsStart,
                      session: 0,
                      group: this.state.groupId,
                      range: this.state.evaluationStructureRangeId
                    };
                    console.log("hitting evaluationStructureData api");
                    this.props.actions.evaluationAddRequest(evaluationStructureData)
                      .then(
                        (response) => {
                          if (response) {
                            //setting evaluationStructureId returned in response
                            this.setState({
                              evaluationStructureId: response.data.id, evaluationStructureCreated: true
                            });
                            console.log("response from evaluationStructureData api: ", response.data.id);
                            //setting evaluationStructureActivityData to hit evaluationActivity add api
                            let evaluationStructureActivityData = {
                              evaluation: this.state.evaluationStructureId,
                              parentId: 0,
                              range: this.state.evaluationStructureRangeId
                            };
                            for (let i = 0; i < this.state.evaluationStructure.evaluateCategory.length;) {
                              evaluationStructureActivityData.name = this.state.evaluationStructure.evaluateCategory[i].name;
                              evaluationStructureActivityData.percentage = this.state.evaluationStructure.evaluateCategory[i].percentage;
                              console.log("hitting evaluationStructureActivityData api, ", [i]);
                              this.props.actions.evaluationActivityAddRequest(evaluationStructureActivityData)
                                .then(
                                  (response) => {
                                    if (response) {
                                      if (i === this.state.evaluationStructure.evaluateCategory.length - 1) {
                                        this.setState({evaluationActivityCreated: true})
                                      }
                                    }
                                  },
                                  (error) => {
                                    console.log("An Error occur with the Rest API: ", error);
                                  });
                              i++;
                            }
                          }
                        },
                        (error) => {
                          console.log("An Error occur with the Rest API: ", error);
                        });
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API: ", error);
                });

            //for third form
            // setting range for third form through minimumNote and maximumNote
            let satisfactionStructureRange = {
              min: this.state.satisfactionStructure.minimumNote,
              max: this.state.satisfactionStructure.maximumNote
            };
            console.log("hitting satisfactionStructureRange api");
            this.props.actions.evaluationRangeAddRequest(satisfactionStructureRange)
              .then(
                (response) => {
                  if (response) {
                    //setting satisfactionStructureRangeId returned in response
                    this.setState({
                      satisfactionStructureRangeId: response.data.id, satisfactionStructureRangeCreated: true
                    });
                    console.log("response from satisfactionStructureRange api: ", response.data.id);
                    //setting satisfactionStructureData to hit evaluation add api
                    let satisfactionStructureData = {
                      approvalPercentage: this.state.satisfactionStructure.approvalPercentage,
                      evaluationSubtype: this.state.satisfactionStructure.evaluationSubtype,
                      evaluationType: this.state.evaluationStructure.evaluationType,
                      dateEnd: this.state.generalConfiguration.inscriptionsEnd,
                      dateStart: this.state.generalConfiguration.inscriptionsStart,
                      session: 0,
                      group: this.state.groupId,
                      range: this.state.satisfactionStructureRangeId
                    };
                    console.log("hitting satisfactionStructureData api");
                    this.props.actions.evaluationAddRequest(satisfactionStructureData)
                      .then(
                        (response) => {
                          if (response) {
                            //setting satisfactionStructureId returned in response
                            this.setState({
                              satisfactionStructureId: response.data.id, satisfactionStructureCreated: true
                            });
                            console.log("response from satisfactionStructureData api: ", response.data.id);
                            //setting satisfactionStructureActivityData to hit evaluationActivity add api
                            let satisfactionStructureActivityData = {
                              evaluation: this.state.satisfactionStructureId,
                              parentId: 0,
                              range: this.state.satisfactionStructureRangeId
                            };
                            for (let i = 0; i < this.state.satisfactionStructure.evaluateCategory.length;) {
                              satisfactionStructureActivityData.name = this.state.satisfactionStructure.evaluateCategory[i].name;
                              satisfactionStructureActivityData.percentage = this.state.satisfactionStructure.evaluateCategory[i].percentage;
                              console.log("hitting satisfactionStructureActivityData api, ", [i]);
                              this.props.actions.evaluationActivityAddRequest(satisfactionStructureActivityData)
                                .then(
                                  (response) => {
                                    if (response) {
                                      if (i === this.state.satisfactionStructure.evaluateCategory.length - 1) {
                                        this.setState({satisfactionActivityCreated: true})
                                      }
                                    }
                                  },
                                  (error) => {
                                    console.log("An Error occur with the Rest API: ", error);
                                  });
                              i++;
                            }
                          }
                        },
                        (error) => {
                          console.log("An Error occur with the Rest API: ", error);
                        });
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API: ", error);
                });

            //for forth form
            // setting range for forth form through minimumNote and maximumNote
            let monitoringStructureRange = {
              min: this.state.monitoringStructure.minimumNote,
              max: this.state.monitoringStructure.maximumNote
            };
            console.log("hitting monitoringStructureRange api");
            this.props.actions.evaluationRangeAddRequest(monitoringStructureRange)
              .then(
                (response) => {
                  if (response) {
                    //setting monitoringStructureRangeId returned in response
                    this.setState({
                      monitoringStructureRangeId: response.data.id, monitoringStructureRangeCreated: true
                    });
                    console.log("response from monitoringStructureRange api: ", response.data.id);
                    //setting monitoringStructureData to hit evaluation add api
                    let monitoringStructureData = {
                      approvalPercentage: this.state.monitoringStructure.approvalPercentage,
                      evaluationSubtype: this.state.monitoringStructure.evaluationSubtype,
                      evaluationType: this.state.evaluationStructure.evaluationType,
                      dateEnd: this.state.generalConfiguration.inscriptionsEnd,
                      dateStart: this.state.generalConfiguration.inscriptionsStart,
                      session: 0,
                      group: this.state.groupId,
                      range: this.state.monitoringStructureRangeId
                    };
                    console.log("hitting monitoringStructureData api");
                    this.props.actions.evaluationAddRequest(monitoringStructureData)
                      .then(
                        (response) => {
                          if (response) {
                            //setting monitoringStructureId returned in response
                            this.setState({
                              monitoringStructureId: response.data.id, monitoringStructureCreated: true
                            });
                            console.log("response from monitoringStructureData api: ", response.data.id);
                            //setting monitoringStructureActivityData to hit evaluationActivity add api
                            let monitoringStructureActivityData = {
                              evaluation: this.state.monitoringStructureId,
                              parentId: 0,
                              range: this.state.monitoringStructureRangeId
                            };
                            for (let i = 0; i < this.state.monitoringStructure.evaluateCategory.length;) {
                              monitoringStructureActivityData.name = this.state.monitoringStructure.evaluateCategory[i].name;
                              monitoringStructureActivityData.percentage = this.state.monitoringStructure.evaluateCategory[i].percentage;
                              console.log("hitting monitoringStructureActivityData api, ", [i]);
                              this.props.actions.evaluationActivityAddRequest(monitoringStructureActivityData)
                                .then(
                                  (response) => {
                                    if (response) {
                                      if (i === this.state.monitoringStructure.evaluateCategory.length - 1) {
                                        this.setState({monitoringActivityCreated: true})
                                      }
                                    }
                                  },
                                  (error) => {
                                    console.log("An Error occur with the Rest API: ", error);
                                  });
                              i++;
                            }
                          }
                        },
                        (error) => {
                          console.log("An Error occur with the Rest API: ", error);
                        });
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API: ", error);
                });

            //for fifth form
            // setting range for forth form through minimumNote and maximumNote
            let performanceStructureRange = {
              min: this.state.performanceStructure.minimumNote,
              max: this.state.performanceStructure.maximumNote
            };
            console.log("hitting performanceStructureRange api");
            this.props.actions.evaluationRangeAddRequest(performanceStructureRange)
              .then(
                (response) => {
                  if (response) {
                    //setting performanceStructureRangeId returned in response
                    this.setState({
                      performanceStructureRangeId: response.data.id, performanceStructureRangeCreated: true
                    });
                    console.log("response from performanceStructureRange api: ", response.data.id);
                    //setting performanceStructureData to hit evaluation add api
                    let performanceStructureData = {
                      approvalPercentage: this.state.performanceStructure.approvalPercentage,
                      evaluationSubtype: this.state.performanceStructure.evaluationSubtype,
                      evaluationType: this.state.evaluationStructure.evaluationType,
                      dateEnd: this.state.generalConfiguration.inscriptionsEnd,
                      dateStart: this.state.generalConfiguration.inscriptionsStart,
                      session: 0,
                      group: this.state.groupId,
                      range: this.state.performanceStructureRangeId
                    };
                    console.log("hitting performanceStructureData api");
                    this.props.actions.evaluationAddRequest(performanceStructureData)
                      .then(
                        (response) => {
                          if (response) {
                            //setting performanceStructureId returned in response
                            this.setState({
                              performanceStructureId: response.data.id, performanceStructureCreated: true
                            });
                            console.log("response from performanceStructureData api: ", response.data.id);
                            //setting performanceStructureActivityData to hit evaluationActivity add api
                            let performanceStructureActivityData = {
                              evaluation: this.state.performanceStructureId,
                              parentId: 0,
                              range: this.state.performanceStructureRangeId
                            };
                            for (let i = 0; i < this.state.performanceStructure.evaluateCategory.length;) {
                              performanceStructureActivityData.name = this.state.performanceStructure.evaluateCategory[i].name;
                              performanceStructureActivityData.percentage = this.state.performanceStructure.evaluateCategory[i].percentage;
                              console.log("hitting performanceStructureActivityData api, ", [i]);
                              this.props.actions.evaluationActivityAddRequest(performanceStructureActivityData)
                                .then(
                                  (response) => {
                                    if (response) {
                                      if (i === this.state.performanceStructure.evaluateCategory.length - 1) {
                                        this.setState({performanceActivityCreated: true})
                                      }
                                    }
                                  },
                                  (error) => {
                                    console.log("An Error occur with the Rest API: ", error);
                                  });
                              i++;
                            }

                          }
                        },
                        (error) => {
                          console.log("An Error occur with the Rest API: ", error);
                        });
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API: ", error);
                });
          }
        },
        (error) => {
          console.log("An Error occur with the Rest API: ", error);
        });
    //to go to typeCategory
    this.context.router.push('/app/' + this.context.router.location.query.typeCategory);
  }

  render() {
    const {finished, stepIndex, errors} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <article className="article">
        <div className="box box-default">
          <div className="box-body">

            <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Configuración general</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Estructura de evaluación</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Satisfacción</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Monitoreo</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Desempeño</StepLabel>
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

HorizontalLinearStepper.contextTypes = {
  router: PropTypes.object.isRequired
};


/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      groupsAddRequest,
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
