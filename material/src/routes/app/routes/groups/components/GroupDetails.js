import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import {
  privilegesGetRequest,
  educatorsGetByIdRequest
} from '../../../../../actions';
import PropTypes from 'prop-types';

class GroupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privileges: '',
      groupInstructorName: '',
      groupData: this.props.groupData
    }
    this.onRouterInscription= this.onRouterInscription.bind(this);
    this.selectCategoryId=this.selectCategoryId.bind(this);
  }

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
      )
  }
  selectCategoryId(){
    var {groupData}=this.state;
    switch(groupData.typeCategory){
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
onRouterInscription(){
  var {groupData}=this.state;  
    this.context.router.push({
      pathname: '/app/inscription',
      query: {
        id : groupData.id,
        name: groupData.correlativo,
        typeCategory : groupData.typeCategory,
        typeCategoryId: this.selectCategoryId(),
        add:true
      }
    });
}
  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">

          <div key="1">
            <section className="hero hero-bg-img">
              <div className="hero-inner">
                <div className="hero-content">
                  <h1 className="hero-title">{this.state.groupData.correlativo}</h1>
                </div>
                <div className="row">
                  <div className="hero-tagline"><strong>Instructor: </strong>{this.state.groupInstructorName}</div>
                  <div className="hero-tagline"><strong>Tipo: </strong>{this.state.groupData.typeCategory}</div>
                </div>
              </div>
            </section>
          </div>

          <div key="2">
            <article className="article padding-lg-v article-dark article-bordered">

              <div className="with-maxwidth">
                <div className="row">

                  {this.state.privileges.pstudentInscription ?
                    <div className="col-xl-4">
                      <a  onClick={this.onRouterInscription}>
                        <div className="box box-default">
                          <div className="box-body">
                            <div className="icon-box ibox-plain ibox-center">
                              <div className="ibox-icon">
                                <i className="material-icons">assignment</i>
                              </div>
                              <h3>Inscripciones</h3>
                              <p>Crear, eliminar y visualizar programas. Los programas son la base principal
                                de la estructura de la fundación.</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    : null
                  }

                  <div className="col-xl-4">
                    <a href="#/app/inscription" >
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <i className="material-icons">assignment</i>
                            </div>
                            <h3>Alumnos inscritos</h3>
                            <p>Crear, eliminar y visualizar docentes. Los docentes son los instructures que
                              se asigna a cada grado, curso o taller.</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {this.state.privileges.pstudentApproval ?
                    <div className="col-xl-4">
                      <a
                        onClick={() => {
                          this
                            .context
                            .router
                            .push({pathname: '/app/inscription_approval'})
                        }}>
                        <div className="box box-default">
                          <div className="box-body">
                            <div className="icon-box ibox-plain ibox-center">
                              <div className="ibox-icon">
                                <a href="javascript:;">
                                  <i className="material-icons">assignment</i>
                                </a>
                              </div>
                              <h3>Aprobación de inscripciones</h3>
                              <p>Los alumnos son los estudiantes asignados a las secciones, tallers, grados o
                                cursos.</p>
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
                      <a href="#/app/user">
                        <div className="box box-default">
                          <div className="box-body">
                            <div className="icon-box ibox-plain ibox-center">
                              <div className="ibox-icon">
                                <a href="javascript:;">
                                  <i className="material-icons">assignment_turned_in</i>
                                </a>
                              </div>
                              <h3>Asistencia</h3>
                              <p>Crear, eliminar y visualizar personal. (Eston son los usuarios de la
                                aplicación, capaces de editar o modificar la información).</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    : null
                  }

                  <div className="col-xl-4">
                    <a href="#/app/page/faqs">
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <a href="javascript:;">
                                <i className="material-icons">assignment_turned_in</i>
                              </a>
                            </div>
                            <h3>Aprobación de Asistencia</h3>
                            <p>Si necesitas ayuda acerca del funcionamiento de la aplicación puedes hacer
                              click aqui para obtener respuesta a preguntas frecuentes</p>
                          </div>
                        </div>

                      </div>
                    </a>
                  </div>

                  {this.state.privileges.pnotesEntry ?
                    <div className="col-xl-4">
                      <a href="#/app/page/catalog">
                        <div className="box box-default">
                          <div className="box-body">
                            <div className="icon-box ibox-plain ibox-center">
                              <div className="ibox-icon">
                                <a href="javascript:;">
                                  <i className="material-icons">dashboard</i>
                                </a>
                              </div>
                              <h3>Evaluación Conomiento/Continua</h3>
                              <p>Crear, eliminar y visualizar catalogos. Los catalogos son estructuras de
                                datos con variables de información para el programa.</p>
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
                      <a href="#/app/user">
                        <div className="box box-default">
                          <div className="box-body">
                            <div className="icon-box ibox-plain ibox-center">
                              <div className="ibox-icon">
                                <a href="javascript:;">
                                  <i className="material-icons">assignment</i>
                                </a>
                              </div>
                              <h3>Evaluación de Monitoreo</h3>
                              <p>Crear, eliminar y visualizar personal. (Eston son los usuarios de la
                                aplicación, capaces de editar o modificar la información).</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    : null
                  }

                  <div className="col-xl-4">
                    <a href="#/app/page/faqs">
                      <div className="box box-default">
                        <div className="box-body">
                          <div className="icon-box ibox-plain ibox-center">
                            <div className="ibox-icon">
                              <a href="javascript:;">
                                <i className="material-icons">help</i>
                              </a>
                            </div>
                            <h3>Evaluación de desempeño</h3>
                            <p>Si necesitas ayuda acerca del funcionamiento de la aplicación puedes hacer
                              click aqui para obtener respuesta a preguntas frecuentes</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {this.state.privileges.pevaluationEntry ?
                    <div className="col-xl-4">
                      <a href="#/app/page/catalog">
                        <div className="box box-default">
                          <div className="box-body">
                            <div className="icon-box ibox-plain ibox-center">
                              <div className="ibox-icon">
                                <a href="javascript:;">
                                  <i className="material-icons">dashboard</i>
                                </a>
                              </div>
                              <h3>Evaluación de satisfacción</h3>
                              <p>Crear, eliminar y visualizar catalogos. Los catalogos son estructuras de
                                datos con variables de información para el programa.</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    : null
                  }

                </div>

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
      educatorsGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
