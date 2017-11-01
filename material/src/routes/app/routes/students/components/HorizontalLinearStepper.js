import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EditForm from './EditForm';
import EmergencyContact from './EmergencyContact';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  participantAddRequest,
  participantContactAddRequest
} from '../../../../../actions';


class HorizontalLinearStepper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      studentData: {},
      emergencyData: {}
    };
    this.handleCancel=this.handleCancel.bind(this);
    this.handleNext=this.handleNext.bind(this);
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
        return <EditForm
          handleCancel={this.handleCancel}
          handleNext={this.handleNext}
        />;
      case 1:
        return <EmergencyContact
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
    // console.log(data);
    const {stepIndex} = this.state;
    switch (stepIndex) {
      case 0:
        this.setState({
          studentData:{
            address: data.address,
            appCode: data.appCode,
            bornDate: data.bornDate,
            cellPhone: data.cellPhone,
            community: data.community,
            documentType: data.documentType,
            documentValue: data.documentValue,
            department: data.department,
            email: data.email,
            firstLastname: data.firstLastname,
            firstName: data.firstName,
            gender: data.gender,
            municipality: data.municipality,
            nacionality: data.nacionality,
            phone: data.phone,
            profession: data.profession,
            secondLastname: data.secondLastname,
            secondName: data.secondName
          },
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2
        });
        break;
      case 1:
        this.setState({
          emergencyData: {
            address: data.address,
            cellphone: data.cellphone,
            documentType: data.documentType,
            documentValue: data.documentValue,
            email: data.email,
            firstLastname: data.firstLastname,
            firstName: data.firstName,
            participantId: '',
            secondLastname: data.secondLastname,
            secondName: data.secondName,
            tellphone: data.tellphone
          },
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2
        });
        break;
      case 2:
        let studentData ={
          address: this.state.studentData.address,
          appCode: this.state.studentData.appCode,
          bornDate: this.state.studentData.bornDate,
          cellPhone: this.state.studentData.cellPhone,
          community: this.state.studentData.community,
          documentType: this.state.studentData.documentType,
          documentValue: this.state.studentData.documentValue,
          department: this.state.studentData.department,
          email: this.state.studentData.email,
          firstLastname: this.state.studentData.firstLastname,
          firstName: this.state.studentData.firstName,
          gender: this.state.studentData.gender,
          municipality: this.state.studentData.municipality,
          nacionality: this.state.studentData.nacionality,
          phone: this.state.studentData.phone,
          profession: this.state.studentData.profession,
          secondLastname: this.state.studentData.secondLastname,
          secondName: this.state.studentData.secondName
        };
        this.props.actions.participantAddRequest(studentData).then(
          (response) => {
            if(response){
              // console.log(response);
              let emergencyData = {
                address: this.state.emergencyData.address,
                cellphone: this.state.emergencyData.cellphone,
                documentType: this.state.emergencyData.documentType,
                documentValue: this.state.emergencyData.documentValue,
                email: this.state.emergencyData.email,
                firstLastname: this.state.emergencyData.firstLastname,
                firstName: this.state.emergencyData.firstName,
                participantId: response.data.id,
                secondLastname: this.state.emergencyData.secondLastname,
                secondName: this.state.emergencyData.secondName,
                tellphone: this.state.emergencyData.tellphone
              };
              this.props.actions.participantContactAddRequest(emergencyData).then(
                (response)=>{
                  // console.log("response: ", response);
                  if(response){
                    this.props.changeView('VIEW_ELEMENT');
                  }
                }, (error)=>{
                  alert('fail');
                  console.log('error occoured with rest api: ', error);
                });
              // this.props.changeView('VIEW_ELEMENT');

            }
          }, (error) => {
            alert('fail');
            console.log('error occoured with rest api: ', error);
          }
        );
        return 'Resumen de activación';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  };

  handleCancel() {
    this.props.changeView("VIEW_ELEMENT");
    this.setState({
      finished: false,
      stepIndex: 0,
      studentData: {},
      emergencyData: {}
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
                            <FlatButton
                              label='Atras'
                              onTouchTap={this.handlePrev}
                              style={{marginRight: 12}}
                            />
                            <RaisedButton
                              label='Crear'
                              primary
                              onTouchTap={this.handleNext}
                            />
                          </div>
                          : null
                      }
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
