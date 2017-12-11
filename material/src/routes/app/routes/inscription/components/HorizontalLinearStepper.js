import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EditForm from './EditForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  participantAddRequest,
  participantContactAddRequest
} from '../../../../../actions';
import AdditionalFieldsForm from './additionalFields';
import ListElements from './ListElements'
import PropTypes from "prop-types";

class HorizontalLinearStepper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      data: {},
    };
    this.handleCancel=this.handleCancel.bind(this);
    this.handleNext=this.handleNext.bind(this);
    this.onInscribeStudent = this.onInscribeStudent.bind(this);
    this.routeToInscription = this.routeToInscription.bind(this);
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  onInscribeStudent(participantData, participantId) {
    this.setState({participantData, participantId});
    this.props.onInscribe(participantData, participantId);
    this.handleNext();
  }
  routeToInscription(){
    this.context.router.push({
      pathname: '/app/groups'
    });
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ListElements
        query= {this.props.query}
        onInscribe={this.onInscribeStudent}
        onEdit={this.onEdit}
        showInscriptions={false}
        />;
      case 1:
      return <AdditionalFieldsForm
          query={this.props.query}
          participantData={this.state.participantData}
          handleCancel={this.handleCancel}
          handleNext={this.handleNext}
        />;
        case 2:
        return "Inscription Completed!";
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleNext = (data) => {
    const {stepIndex} = this.state;
    switch (stepIndex) {
      case 0:
        this.setState({
          data,
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2
        });
        break;
      case 1:
        this.setState({
          data,
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2
        });
        break;
        
        case 2:
        this.setState({
          participantData:data,
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2
        });
        break;

        default:
        return 'You\'re a long way from home sonny jim!';
    }
  };

  handleCancel() {
    this.props.changeView("VIEW_ELEMENT");
    this.setState({
      finished: false,
      stepIndex: 0,
      data: {}
    });
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    return (
      <article className="article">
        <h2 className="article-title">Agreegar nuevo participante</h2>
        <div className="box box-default">
          <div className="box-body padding-xl">

            <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Ingresoar información del estudiante:</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Ingresar información de contacto de emergencia:</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Terminar</StepLabel>
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
                     Crear alumno
                    </a> El programa ha sido activado correctamente para el inicio del ciclo escolar.
                  </p>
                ) : (
                  <div>
                    <div>{this.getStepContent(stepIndex)}</div>
                    <div style={{marginTop: 12}}>
                      {
                        stepIndex === 2 ?
                          <div style={{marginTop: 12}}>
                            <RaisedButton
                              label='Crear'
                              primary
                              onTouchTap={this.routeToInscription}
                            />
                          </div>
                          : null
                      }
                    </div>
                  </div>
                )}
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
      participantAddRequest,
      participantContactAddRequest
    }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(HorizontalLinearStepper);
