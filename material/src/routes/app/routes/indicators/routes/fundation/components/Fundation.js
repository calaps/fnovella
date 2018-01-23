import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect } from 'react-redux';

const style = {
  background: '#66bb6a',
  color: 'white'
};

class MainOptions extends React.Component {
  render() {
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-12">
              <div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;">
                        <i className="material-icons">insert_chart</i>
                      </a>
                    </div>
                    <h6>Indicadores de fundación</h6>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }
}

class IndicadoresFundacion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <table className="table table-bordered">
        <thead>
        <tr>
          <th colSpan="2" style={style}>Indicadores</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Participantes iniciales</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Participantes activos al final del período</td>
          <td>1</td>
        </tr>
        <tr>
          <td>% de deserción</td>
          <td>1</td>
        </tr>
        <tr>
          <td colSpan="2" style={style}>-</td>
        </tr>
        <tr>
          <td>% de retención anual</td>
          <td>1</td>
        </tr>
        <tr>
          <td>% de deserción bimestral / mensual</td>
          <td>1</td>
        </tr>
        <tr>
          <td>% de asistencia sostenida</td>
          <td>1</td>
        </tr>
        <tr>
          <td>% de asistencia sostenida con justificación</td>
          <td>1</td>
        </tr>
        <tr>
          <td>% de estudiantes que aprobarón la materia</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Cumplimiento de llenado</td>
          <td>1</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

class Fundation extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions/></div>
          <hr/>
          <div key="2"><IndicadoresFundacion /></div>
        </QueueAnim>

      </div>
    );
  }
}


module.exports = connect()(Fundation);
