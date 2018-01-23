import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  groupsGetRequest
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
                    <h6>Indicadores de Grupo</h6>
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
      isLoading: false,
      groupId: '',
      errors: {}
    };
  }
  componentWillMount() {
    this.props.actions.groupsGetRequest(0, 10000);
  }
  render() {

    const { errors } = this.state;

    const groupsOpt = () => {
      const programs = this.props.groups.content || [];
      return programs.map((group) => {
        return <option key={group.id} value={group.id}>{group.correlativo}</option>
      });
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">

            <div className="box box-default">
              <div className="box-body padding-md">
                <p className="text-info">Selcciona el grupo a consultar:
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label className="col-md-3 control-label">Selecciona el grupo</label>
                    <div className="col-md-6">
                      <select
                        name="groupId"
                        id="groupId"
                        onChange={this.onChange}
                        value={this.state.groupId}
                        className="form-control"
                      >
                        <option value="" disabled>Selecione el grupo...</option>
                        {groupsOpt()}
                      </select>
                      {errors.groupId && <span className="help-block text-danger">{errors.groupId}</span>}
                    </div>
                  </div>
                </form>

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

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

class Group extends React.Component {

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions /></div>
          <hr />
          <div key="2"><IndicadoresFoundationConnected /></div>
        </QueueAnim>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      groupsGetRequest
    }, dispatch)
  };
}

const IndicadoresFoundationConnected = connect(mapStateToProps, mapDispatchToProps)(IndicadoresFundation);

module.exports = Group;
