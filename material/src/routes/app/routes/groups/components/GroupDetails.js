import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import {
  privilegesGetRequest,
  educatorsGetByIdRequest,
  evaluationGetByGroupIdAndEvaluationSubtype
} from '../../../../../actions';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const styles = {
  chip: {
    margin: 4,
  }
};
var divStyle = {
  padding: "30px"
};

class GroupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privileges: '',
      groupInstructorName: '',
      groupData: this.props.groupData,
      groupEvaluations: [],
      evaluationSubtype: [],
      expanded: false,
    };
    // this.onRouteToEvaluation = this.onRouteToEvaluation.bind(this);
    this.onRouteToInscription = this.onRouteToInscription.bind(this);
    this.onRouteToInscriptionView = this.onRouteToInscriptionView.bind(this);
    this.onRouteToAssistance = this.onRouteToAssistance.bind(this);
    this.onRouteToAssistanceApproval = this.onRouteToAssistanceApproval.bind(this);
    this.selectCategoryId = this.selectCategoryId.bind(this);
    this.onRouteToInscriptionApprove = this.onRouteToInscriptionApprove.bind(this);
  }

  // Changes for the card
  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = () => {
    this.setState({expanded: !this.state.expanded});
  };

  componentWillMount() {

    this.props.actions.privilegesGetRequest()
      .then(data => {
        this.setState({privileges: data.data});
      });

    this.props.actions.educatorsGetByIdRequest(this.state.groupData.instructor)
      .then(
        (response) => {
          if (response) {
            this.setState({groupInstructorName: response.data.firstName + ' ' + response.data.firstLastname});
          }
        }
      );
  }

  selectCategoryId() {
    let {groupData} = this.state;
    switch (groupData.typeCategory) {
      case "workshop":
        return groupData.workshopId;
      case "division":
        return groupData.divisionId;
      case "course":
        return groupData.courseId;
      case "section":
        return groupData.section;
      default :
        return null;
    }
  }

  onRouteToInscription() {
    let {groupData} = this.state;
    this.context.router.push({
      pathname: '/app/inscription',
      query: {
        id: groupData.id,
        // name: groupData.correlativo,
        // typeCategory: groupData.typeCategory,
        // typeCategoryId: this.selectCategoryId(),
        add: true
      }
    });
  }

  onRouteToInscriptionView() {
    let {groupData} = this.state;
    this.context.router.push({
      pathname: '/app/inscription',
      query: {
        id: groupData.id,
        // name: groupData.correlativo,
        // typeCategory: groupData.typeCategory,
        // typeCategoryId: this.selectCategoryId(),
      }
    });
  }

  onRouteToInscriptionApprove() {
    let {groupData} = this.state;
    this.context.router.push({
      pathname: '/app/inscription_approval',
      query: {
        id: groupData.id,
        // name: groupData.correlativo,
        // typeCategory: groupData.typeCategory,
        // typeCategoryId: this.selectCategoryId(),
      }
    });
  }


  onRouteToAssistance() {
    let {groupData} = this.state;
    this.context.router.push({
      pathname: '/app/assistance',
      query: {
        id: groupData.id,
        // name: groupData.correlativo,
        // typeCategory: groupData.typeCategory,
        // typeCategoryId: this.selectCategoryId(),
        // add: true
      }
    });

  }

  onRouteToAssistanceApproval() {
    let {groupData} = this.state;
    this.context.router.push({
      pathname: '/app/assistance_approval',
      query: {
        id: groupData.id,
      }
    });
  }

  onRouteToEvaluation(evaluationSubtypeId) {
    this.props.actions.evaluationGetByGroupIdAndEvaluationSubtype(this.state.groupData.id, parseInt(evaluationSubtypeId))
      .then(
        (response) => {
          if (response) {
            this.context.router.push({
              pathname: '/app/evaluation',
              query: {
                id: response.data.id
              }
            })
          }
        }
      )
  }

  renderTypeName() {
    const {groupData} = this.state;
    switch (groupData.typeCategory) {
      case 'workshop':
        return 'Taller';
      case 'division':
        return 'Division';
      case 'course':
        return 'Curso';
      case 'section':
        return 'Sección';
      default :
        return 'no name';
    }
  };

  render() {

    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">

          <div key="1 text-justify">
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
              <CardHeader
                actAsExpander={false}
                showExpandableButton={false}
              />
              <CardText>

                <div className="row">
                  <div className="hero-content text-center">
                    <h1 style={divStyle} className="hero-title">{this.state.groupData.correlativo}</h1>
                  </div>
                  <div className="hero-tagline">
                    <label className="control-label">Tipo</label>
                    <Chip style={styles.chip}>
                      <Avatar size={32}>T</Avatar>
                      {this.renderTypeName()}
                    </Chip>
                  </div>
                  <div className="hero-tagline">
                    Instructor:
                    <Chip style={styles.chip}>
                      <Avatar size={32}>I</Avatar>
                      {this.state.groupInstructorName}
                    </Chip>
                  </div>
                  <div className="hero-tagline">
                    Coordinador:
                    <Chip style={styles.chip}>
                      <Avatar size={32}>C</Avatar>
                      Juan Pablo Ortiz
                    </Chip>
                  </div>
                </div>

              </CardText>
              <CardTitle title="Configuración" subtitle="Modificaciones a grupo" expandable={true}/>
              <CardText expandable={true}>

                <Toggle
                  label="Permitir inscripciones extemporaneas"
                  defaultToggled={true}
                  labelPosition="right"
                  style={styles.toggle}
                />
                <Toggle
                  label="Permitir evaluaciones extemporaneas"
                  defaultToggled={true}
                  labelPosition="right"
                  style={styles.toggle}
                />

              </CardText>
              <CardActions>
                <FlatButton label="Mostar configuración avanzada" onClick={this.handleToggle}/>
              </CardActions>
            </Card>

            <hr/>
          </div>

          <div key="2">
            <article className="article padding-lg-v article-dark article-bordered">


              <div className="row">

                {this.state.privileges.pstudentInscription ?
                  <div className="col-xl-4">
                    <a onClick={this.onRouteToInscription}>
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <i className="material-icons">assignment</i>
                            </div>
                            <h3>Inscripciones</h3>
                            <p>Inscribe participantes al grupo.</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  : null
                }

                <div className="col-xl-4">
                  <a onClick={this.onRouteToInscriptionView}>
                    <div className="box box-default">
                      <div className="box-body">
                        <div className="icon-box ibox-plain ibox-center">
                          <div className="ibox-icon">
                            <i className="material-icons">assignment</i>
                          </div>
                          <h3>Alumnos inscritos</h3>
                          <p>Visualiza los alumnos inscritos al grupo.</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {this.state.privileges.pstudentApproval ?
                  <div className="col-xl-4">
                    <a onClick={this.onRouteToInscriptionApprove}>
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <i className="material-icons">assignment</i>
                            </div>
                            <h3>Aprobación de inscripciones</h3>
                            <p>Verifica que las inscripciones sean correctas</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  : null
                }

              </div>

              <div className="row">

                {this.state.privileges.pnotesEntry ?
                  <div className="col-xl-4">
                    <a onClick={this.onRouteToAssistance}>
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <a href="javascript:;">
                                <i className="material-icons">assignment_turned_in</i>
                              </a>
                            </div>
                            <h3>Asistencia</h3>
                            <p>Controla las asistencias por sesión de grupo de los alumnos inscritos</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  : null
                }

                <div className="col-xl-4">
                  <a onClick={this.onRouteToAssistanceApproval}>
                    <div className="box box-default">
                      <div className="box-body">
                        <div className="icon-box ibox-plain ibox-center">
                          <div className="ibox-icon">
                            <a href="javascript:;">
                              <i className="material-icons">assignment_turned_in</i>
                            </a>
                          </div>
                          <h3>Aprobación de Asistencia</h3>
                          <p>Una vez terminadas el control de asistencias las puedes aprobar.</p>
                        </div>
                      </div>

                    </div>
                  </a>
                </div>

                {this.state.privileges.pnotesEntry ?
                  <div className="col-xl-4">
                    <a onClick={() => this.onRouteToEvaluation('1')}>
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <a href="javascript:;">
                                <i className="material-icons">assignment</i>
                              </a>
                            </div>
                            <h3>Evaluación Conomiento</h3>
                            <p>Pasa la evaluación de conocimiento configurada en la creación de grupo</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  : null
                }

              </div>

              <div className="row">

                {this.state.privileges.pmonitoringEntry ?
                  <div className="col-xl-4">
                    <a onClick={() => this.onRouteToEvaluation('2')}>
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <a href="javascript:;">
                                <i className="material-icons">assignment</i>
                              </a>
                            </div>
                            <h3>Evaluación de Monitoreo</h3>
                            <p>Pasa la evaluación de monitoreo configurada en la creación de grupo</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  : null
                }

                {this.state.privileges.pevaluationEntry ?
                  <div className="col-xl-4">
                    <a onClick={() => this.onRouteToEvaluation('3')}>
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <a href="javascript:;">
                                <i className="material-icons">assignment</i>
                              </a>
                            </div>
                            <h3>Evaluación de satisfacción</h3>
                            <p>Pasa la evaluación de satisfacción configurada en la creación de grupo</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  : null
                }

              </div>

            </article>
          </div>

        </QueueAnim>

      </div>
    )
  };
}

GroupDetails.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      privilegesGetRequest,
      educatorsGetByIdRequest,
      evaluationGetByGroupIdAndEvaluationSubtype
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
