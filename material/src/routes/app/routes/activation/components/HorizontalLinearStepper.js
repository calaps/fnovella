import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EditForm from './EditForm';
import ListElements from './ListElements';


class HorizontalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    program_id: 0,
    program_name: "",
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ListElements
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        /> ;
      case 1:
        return <EditForm
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
          formData={this.state.formData}
        />;
      case 2:
        return 'Resumen de activación';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  render() {
    const {finished, stepIndex} = this.state;
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
                    <div style={{marginTop: 12}}>
                      <FlatButton
                        label="Atras"
                        disabled={stepIndex === 0}
                        onTouchTap={this.handlePrev}
                        style={{marginRight: 12}}
                      />
                      <RaisedButton
                        label={stepIndex === 2 ? 'Activar' : 'Siguiente'}
                        primary
                        onTouchTap={this.handleNext}
                      />
                    </div>
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


export default HorizontalLinearStepper;
