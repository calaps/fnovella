import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  dashboardStatBoxesGetRequest
} from '../../../../../actions';

class Statboxes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.actions.dashboardStatBoxesGetRequest()
  }

  render(){
    return(
      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.props.dashboard.programs}</span>
            </div>
            <div className="box-info">
              <span>Programas</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">assignment</i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.props.dashboard.students}</span>
            </div>
            <div className="box-info">
              <span>Alumnos</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">supervisor_account</i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.props.dashboard.instructors}<span className="size-h5"></span></span>
            </div>
            <div className="box-info">
              <span>Docentes activos</span>
            </div>
            <div className="box-bottom">
              <i className="material-icons color-info">school</i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="box box-default">
            <div className="box-top">
              <span>{this.props.dashboard.courses}<span className="size-h5"></span></span>
            </div>
            <div className="box-info">
              <span>Cantidad de cursos</span>
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
  return {
    dashboard: state.dashboard
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      dashboardStatBoxesGetRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(Statboxes);
