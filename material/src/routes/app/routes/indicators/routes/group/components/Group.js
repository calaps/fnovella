import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  groupsGetRequest,
  indicatorsGetGroup
} from '../../../../../../../actions';
import {groupValidatorIndicator} from '../../../../../../../actions/formValidations'; // form validations

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
      indicators: {},
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.props.actions.groupsGetRequest(0, 10000);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value, isLoading: false});
  }
  onSubmit(e){
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        isLoading: true
      });
      this.props.actions.indicatorsGetGroup(this.state.groupId).then(() => {
        this.setState({
          isLoading: false,
          errors: {}
        });
      }
      );
    }
  }
  isValid() {
    const {errors, isValid} = groupValidatorIndicator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }
  render() {

    const { errors } = this.state;
    let { indicators } = this.props;

    const groupsOpt = () => {
      const groups = this.props.groups.content || [];
      return groups.map((group) => {
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
                    <div className="col-md-3">
                      <RaisedButton
                        disabled={this.state.isLoading}
                        type="submit"
                        label="visualizar"
                        secondary
                        className="btn-w-md" />
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
                      <td>{ indicators.totalParticipants }</td>
                    </tr>
                    <tr>
                      <td>% de activos al final del período</td>
                      <td>{ indicators.activeParticipants } %</td>
                    </tr>
                    <tr>
                      <td>% de deserción</td>
                      <td>{ indicators.inactiveParticipants } %</td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={style}>-</td>
                    </tr>
                    <tr>
                      <td>% de retención anual</td>
                      <td>{ indicators.activeParticipants } %</td>
                    </tr>
                    <tr>
                      <td>% de deserción bimestral / mensual</td>
                      <td>{ indicators.inactiveParticipants } %</td>
                    </tr>
                    <tr>
                      <td>% de asistencia sostenida</td>
                      <td>{ indicators.sustainedParticipants } %</td>
                    </tr>
                    <tr>
                      <td>% de asistencia sostenida con justificación</td>
                      <td>{ indicators.justifiedParticipants } %</td>
                    </tr>
                    <tr>
                      <td>% de estudiantes que aprobarón la materia</td>
                      <td>{ indicators.approvedParticipants } %</td>
                    </tr>
                    <tr>
                      <td>Cantidad total de sesiones</td>
                      <td>{ indicators.sessionAssistance }</td>
                    </tr>
                    <tr>
                      <td>Cantidad total de asistencias</td>
                      <td>{ indicators.totalAssistance }</td>
                    </tr>
                    <tr>
                      <td>Cumplimiento de llenado</td>
                      <td>{ indicators.accomplishment } %</td>
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
    groups: state.groups,
    indicators: state.indicators
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      groupsGetRequest,
      indicatorsGetGroup
    }, dispatch)
  };
}

const IndicadoresFoundationConnected = connect(mapStateToProps, mapDispatchToProps)(IndicadoresFundation);

module.exports = Group;
