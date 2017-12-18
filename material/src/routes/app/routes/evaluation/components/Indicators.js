import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  indicatorsGetRequestByEvaluationIdAndYear
} from '../../../../../actions';

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
      <div className="row">
        <div className="col-xl-2 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.state.indicators.totalNumberOfStudents}</span>
            </div>
            <div className="box-info">
              <span>totalNumberOfStudents</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">assignment</i>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.state.indicators.numberOfStudentsApproved}</span>
            </div>
            <div className="box-info">
              <span>numberOfStudentsApproved</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">assignment</i>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.state.indicators.percentageOfStudentsApproved}</span>
            </div>
            <div className="box-info">
              <span>percentageOfStudentsApproved</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">supervisor_account</i>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.state.indicators.numberOfStudentsFailed}</span>
            </div>
            <div className="box-info">
              <span>numberOfStudentsFailed</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">school</i>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.state.indicators.percentageOfStudentsFailed}</span>
            </div>
            <div className="box-info">
              <span>percentageOfStudentsFailed</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">library_books</i>
            </div>
          </div>
        </div>
      </div>
    )
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
