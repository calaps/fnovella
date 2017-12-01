import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QueueAnim from 'rc-queue-anim';
import KPIsChart from './KPIsChart';
import AquisitionChart from './AquisitionChart';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';
import { privilegesGetRequest, privilegesGetAllRequest } from '../../../../../actions';


const Hero = () => (
  <section className="hero hero-bg-img">
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Primero basico</h1>
      </div>
      <p className="hero-tagline">Primaria</p>
    </div>
  </section>
);

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <article className="article padding-lg-v article-dark article-bordered">

        <div className="with-maxwidth">
          <div className="row">
            {this.props.permission.pstudentInscription &&
              <div className="col-xl-4">
                <a href="#/app/inscription?add=true"><div className="box box-default">
                  <div className="box-body">
                    <div className="icon-box ibox-plain ibox-center">
                      <div className="ibox-icon">
                        <i className="material-icons">assignment</i>
                      </div>
                      <h3>Inscripciones</h3>
                      <p>Crear, eliminar y visualizar programas. Los programas son la base principal de la estructura de la fundación.</p>
                    </div>
                  </div>
                </div></a>
              </div>
            }
            <div className="col-xl-4">
              <a href="#/app/inscription"><div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <i className="material-icons">assignment</i>
                    </div>
                    <h3>Alumnos inscritos</h3>
                    <p>Crear, eliminar y visualizar docentes. Los docentes son los instructures que se asigna a cada grado, curso o taller.</p>
                  </div>
                </div>
              </div></a>
            </div>
            {this.props.permission.pstudentApproval &&
              <div className="col-xl-4">
                <a href="#/app/students"><div className="box box-default">
                  <div className="box-body">
                    <div className="icon-box ibox-plain ibox-center">
                      <div className="ibox-icon">
                        <a href="javascript:;"><i className="material-icons">assignment</i></a>
                      </div>
                      <h3>Aprobación de inscripciones</h3>
                      <p>Los alumnos son los estudiantes asignados a las secciones, tallers, grados o cursos.</p>
                    </div>
                  </div>
                </div></a>
              </div>
            }
          </div>
          <div className="row">
            {this.props.permission.pnotesEntry &&
              <div className="col-xl-4">
                <a href="#/app/user"><div className="box box-default">
                  <div className="box-body">
                    <div className="icon-box ibox-plain ibox-center">
                      <div className="ibox-icon">
                        <a href="javascript:;"><i className="material-icons">assignment_turned_in</i></a>
                      </div>
                      <h3>Asistencia</h3>
                      <p>Crear, eliminar y visualizar personal. (Eston son los usuarios de la aplicación, capaces de editar o modificar la información).</p>
                    </div>
                  </div>
                </div></a>
              </div>
            }
            <div className="col-xl-4">
              <a href="#/app/page/faqs"><div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;"><i className="material-icons">assignment_turned_in</i></a>
                    </div>
                    <h3>Aprobación de Asistencia</h3>
                    <p>Si necesitas ayuda acerca del funcionamiento de la aplicación puedes hacer click aqui para obtener respuesta a preguntas frecuentes</p>
                  </div>
                </div>
              </div></a>
            </div>
            {this.props.permission.pnotesEntry &&
              <div className="col-xl-4">
                <a href="#/app/page/catalog"><div className="box box-default">
                  <div className="box-body">
                    <div className="icon-box ibox-plain ibox-center">
                      <div className="ibox-icon">
                        <a href="javascript:;"><i className="material-icons">dashboard</i></a>
                      </div>
                      <h3>Evaluación Conomiento/Continua</h3>
                      <p>Crear, eliminar y visualizar catalogos. Los catalogos son estructuras de datos con variables de información para el programa.</p>
                    </div>
                  </div>
                </div></a>
              </div>
            }
          </div>

          <div className="row">
            {this.props.permission.pmonitoringEntry &&
              <div className="col-xl-4">
                <a href="#/app/user"><div className="box box-default">
                  <div className="box-body">
                    <div className="icon-box ibox-plain ibox-center">
                      <div className="ibox-icon">
                        <a href="javascript:;"><i className="material-icons">assignment</i></a>
                      </div>
                      <h3>Evaluación de Monitoreo</h3>
                      <p>Crear, eliminar y visualizar personal. (Eston son los usuarios de la aplicación, capaces de editar o modificar la información).</p>
                    </div>
                  </div>
                </div></a>
              </div>
            }
            <div className="col-xl-4">
              <a href="#/app/page/faqs"><div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;"><i className="material-icons">help</i></a>
                    </div>
                    <h3>Evaluación de desempeño</h3>
                    <p>Si necesitas ayuda acerca del funcionamiento de la aplicación puedes hacer click aqui para obtener respuesta a preguntas frecuentes</p>
                  </div>
                </div>
              </div></a>
            </div>
            {this.props.permission.pevaluationEntry &&
              <div className="col-xl-4">
                <a href="#/app/page/catalog"><div className="box box-default">
                  <div className="box-body">
                    <div className="icon-box ibox-plain ibox-center">
                      <div className="ibox-icon">
                        <a href="javascript:;"><i className="material-icons">dashboard</i></a>
                      </div>
                      <h3>Evaluación de satisfacción</h3>
                      <p>Crear, eliminar y visualizar catalogos. Los catalogos son estructuras de datos con variables de información para el programa.</p>
                    </div>
                  </div>
                </div></a>
              </div>
            }
          </div>


        </div>

      </article>
    )
  };
}


connect(mapDispatchToProps)(MainOptions);

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    }
  }
  componentWillMount() {
    console.log("running component will mount");

    // API action
    this
      .props
      .actions
      .privilegesGetRequest().then(data => {
        this.setState({ permission: data.data });
      });
  }
  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><Hero /></div>
          <div key="2"><MainOptions permission={this.state.permission} /></div>
        </QueueAnim>

      </div>
    )
  };
}

function mapStateToProps(state) {
  //pass the providers
  return { permission: state.permission }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      privilegesGetRequest,
      privilegesGetAllRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Group);

