import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  indicatorsGetRequestByEvaluationIdAndYear
} from '../../../../../actions';
import EvaluationStats from './evaluationStats';
import BenchmarkChart from './BenchmarkChart';
import Bar from './Bar';
import Line from './Line';

class Indicators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicators: {}
    }
  }

  componentWillMount() {
    this.props.actions.indicatorsGetRequestByEvaluationIdAndYear(this.props.evaluationId, 2017)
      .then((res) => {
        if (res) {
          this.setState({
            indicators: res.data
          })
        }
      })
  }

  render() {
    return (
      <div>
        <div className="box box-default">
          <div className="box-body">
            <div className="row">
              <div className="col-xl-6">
                <div className="box box-transparent">
                  <div className="box-header">Indicadores por evaluación</div>
                  <div className="box-body">
                    <div className="row text-center metrics">
                      <div className="col-xs-6 col-md-3 metric-box">
                        <span className="metric">{this.state.indicators.totalNumberOfStudents}</span>
                        <span className="metric-info">Total de estudiantes</span>
                      </div>
                      <div className="col-xs-6 col-md-3 metric-box">
                        <span className="metric">{this.state.indicators.numberOfStudentsApproved}</span>
                        <span className="metric-info">Estudiantes aprovados</span>
                      </div>
                      <div className="col-xs-6 col-md-3 metric-box">
                        <span className="metric">{this.state.indicators.numberOfStudentsFailed}</span>
                        <span className="metric-info">Estudiantes reprovados</span>
                      </div>
                    </div>
                    <EvaluationStats options1={this.state.indicators.percentageOfStudentsApproved} options2={this.state.indicators.percentageOfStudentsFailed}/>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="box box-transparent">
                  <div className="box-header">Por actividades</div>
                  <div className="box-body">
                    <Bar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box box-default">
          <div className="box-body">
            <div className="row">
              <div className="col-xl-6">
                <div className="box box-transparent">
                  <div className="box-header">Indicadores consolidados por programa</div>
                  <div className="box-body">
                    <Line />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="box box-transparent">
                  <div className="box-header">Grafica</div>
                  <div className="box-body">
                    <BenchmarkChart options1={this.state.indicators.percentageOfStudentsApproved} options2={this.state.indicators.percentageOfStudentsFailed} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  //pass the providers
  return {}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      indicatorsGetRequestByEvaluationIdAndYear,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(Indicators);
