import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NumericLabel from 'react-pretty-numbers';
import {
  programGetRequest,
  indicatorsGetRquest
} from '../../../../../../../actions';

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
                    <h6>Indicadores generales de fundación</h6>
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

class IndicadoresFundation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programId: '',
      indicators: {},
      errors: {}
    };
  }

  componentWillMount() {
    this.props.actions.indicatorsGetRquest();
  }

  render() {
    var option = {
      percentage: true,
      precision: 6
    };

    const {indicators} = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">

            <div className="box box-default">
              <div className="box-body padding-md">

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th colSpan="2" style={style}>Indicadores</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Participantes iniciales</td>
                      <td>{indicators.totalParticipants}</td>
                    </tr>
                    <tr>
                      <td>% de activos al final del período</td>
                      <td>{indicators.activeParticipants}</td>
                    </tr>
                    <tr>
                      <td>% de deserción</td>
                      <td>{indicators.inactiveParticipants} %</td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={style}>-</td>
                    </tr>
                    <tr>
                      <td>% de retención anual</td>
                      <td>{indicators.activeParticipants} %</td>
                    </tr>
                    <tr>
                      <td>% de deserción bimestral / mensual</td>
                      <td>{indicators.inactiveParticipants} %</td>
                    </tr>
                    <tr>
                      <td>% de asistencia sostenida con justificación</td>
                      <td>{indicators.justifiedParticipants} %</td>
                    </tr>
                    <tr>
                      <td>% de estudiantes que aprobarón la materia</td>
                      <td>{indicators.approvedParticipants} %</td>
                    </tr>
                    <tr>
                      <td>Cantidad total de asistencias</td>
                      <td>{indicators.totalAssistance}</td>
                    </tr>
                    <tr>
                      <td>Cumplimiento de llenado</td>
                      <td>{indicators.accomplishment} %</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

class Fundation extends React.Component {

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions/></div>
          <hr/>
          <div key="2"><IndicadoresFoundationConnected/></div>
        </QueueAnim>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    programs: state.programs,
    indicators: state.indicators
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest,
      indicatorsGetRquest
    }, dispatch)
  };
}

const IndicadoresFoundationConnected = connect(mapStateToProps, mapDispatchToProps)(IndicadoresFundation);

module.exports = Fundation;
