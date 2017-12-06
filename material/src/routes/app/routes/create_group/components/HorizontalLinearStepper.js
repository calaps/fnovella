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

} from '../../../../../actions';
import PropTypes from "prop-types";


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
      performanceStructure: {}
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.onGroupActivate = this.onGroupActivate.bind(this);
  }

  handleCancel() {
    this.setState({
      finished: false,
      stepIndex: 0,
      errors: {},
      isLoading: false
    });
    if (this.context.router.location.query.typeCategory) {
      this.context.router.push('/app/'+this.context.router.location.query.typeCategory);
    } else {
      self.props.changeView('VIEW_ELEMENT')
    }
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
              onTouchTap={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
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

  onGroupActivate(){
    console.log("activating", this.state);
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

    }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(HorizontalLinearStepper);
