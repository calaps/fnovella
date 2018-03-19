import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {

} from '../../../../../actions';
import PropTypes from "prop-types";
import InscribedParticipants from './InscribedParticipants';
import EvaluationActivities from './EvaluationActivities';

class HorizontalLinearStepper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      errors: {},
      isLoading: false,
      evaluationActivityData: {
        participant: ''
      }
    };
    this.onParticipantSelection = this.onParticipantSelection.bind(this);
  }

  onParticipantSelection(id){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
      errors: {},
      evaluationActivityData : {
        participant: id
      }
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
        return <InscribedParticipants
          groupId={this.props.groupId}
          onParticipantSelection={this.onParticipantSelection}
        />;
      case 1:
        return <EvaluationActivities
          evaluationId={this.props.evaluationId}
          handlePrev={this.handlePrev}
          changeView={this.props.changeView}
          particiapntId={this.state.evaluationActivityData.participant}
        />;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
x
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
                  <StepLabel>Selección de estudiantes inscritos</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Terminar</StepLabel>
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
