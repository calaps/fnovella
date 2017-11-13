import React from 'react';
import QueueAnim from 'rc-queue-anim';
import KPIsChart from './KPIsChart';
import AquisitionChart from './AquisitionChart';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';

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

const MainOptions = () => (
  <article className="article padding-lg-v article-dark article-bordered">

    <div className="with-maxwidth">
      <div className="row">
        <div className="col-xl-4">
          <a href="#/app/program"><div className="box box-default">
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
        <div className="col-xl-4">
          <a href="#/app/teachers"><div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">assignment</i></a>
                </div>
                <h3>Alumnos inscritos</h3>
                <p>Crear, eliminar y visualizar docentes. Los docentes son los instructures que se asigna a cada grado, curso o taller.</p>
              </div>
            </div>
          </div></a>
        </div>
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
      </div>
      <div className="row">
        <div className="col-xl-4">
          <a href="#/app/user"><div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">assignment</i></a>
                </div>
                <h3>Evaluación de conocimiento</h3>
                <p>Crear, eliminar y visualizar personal. (Eston son los usuarios de la aplicación, capaces de editar o modificar la información).</p>
              </div>
            </div>
          </div></a>
        </div>
        <div className="col-xl-4">
          <a href="#/app/page/faqs"><div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">help</i></a>
                </div>
                <h3>Rango de satisfacción</h3>
                <p>Si necesitas ayuda acerca del funcionamiento de la aplicación puedes hacer click aqui para obtener respuesta a preguntas frecuentes</p>
              </div>
            </div>
          </div></a>
        </div>
        <div className="col-xl-4">
          <a href="#/app/page/catalog"><div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">dashboard</i></a>
                </div>
                <h3>Estructura de monitoreo</h3>
                <p>Crear, eliminar y visualizar catalogos. Los catalogos son estructuras de datos con variables de información para el programa.</p>
              </div>
            </div>
          </div></a>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <a href="#/app/user"><div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">perm_identity</i></a>
                </div>
                <h3>Encuesta de evaluación del instructor</h3>
                <p>Crear, eliminar y visualizar personal. (Eston son los usuarios de la aplicación, capaces de editar o modificar la información).</p>
              </div>
            </div>
          </div></a>
        </div>
        <div className="col-xl-4">
          <a href="#/app/page/faqs"><div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">help</i></a>
                </div>
                <h3>Rango de satisfacción</h3>
                <p>Si necesitas ayuda acerca del funcionamiento de la aplicación puedes hacer click aqui para obtener respuesta a preguntas frecuentes</p>
              </div>
            </div>
          </div></a>
        </div>
        <div className="col-xl-4">
          <a href="#/app/page/catalog"><div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">dashboard</i></a>
                </div>
                <h3>Estructura de monitoreo</h3>
                <p>Crear, eliminar y visualizar catalogos. Los catalogos son estructuras de datos con variables de información para el programa.</p>
              </div>
            </div>
          </div></a>
        </div>
      </div>

    </div>

  </article>
);

const Group = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><MainOptions /></div>
    </QueueAnim>

  </div>
);

module.exports = Group;
