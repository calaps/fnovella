import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import HorizontalLinearStepper from './HorizontalLinearStepper';
import ListElements from './ListElements';
import Indicators from './Indicators';
import {bindActionCreators} from 'redux';
import {
  evaluationGetByIdRequest,
  evaluationSubtypeGetByIdRequest,
  evaluationTypeById
} from '../../../../../actions';

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      optionsName: 'Evaluation'
    }
  }

  componentWillMount(){
    if(this.props.query.id){
      this.props.evaluationGetByIdRequest(this.props.query.id)
        .then((response) => {
          if(response.data.evaluationSubtype === 1){
            this.props.evaluationTypeById(response.data.evaluationType)
              .then((response) => {
                this.setState({
                  optionsName : response.data.name + " Evaluation"
                })
              });
          }else{
            this.props.evaluationSubtypeGetByIdRequest(response.data.evaluationSubtype)
              .then((response) => {
                this.setState({
                  optionsName : response.data.name + " Evaluation"
                })
              });
          }
        });
    }
  }

  render() {
    return(
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-3">

              <div className="box-body">
                <div className="icon-box ibox-plain ibox-center">
                  <div className="ibox-icon">
                    <a href="javascript:;"><i className="material-icons">assignment</i></a>
                  </div>
                  <h5 className="text-uppercase">{this.state.optionsName}</h5>
                </div>
              </div>

            </div>
            <div className="col-xl-9">
              <div className="row">

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon" onClick={()=>{this.props.changeView('VIEW_ELEMENT')}}>
                          <a  href="javascript:;"><i className="material-icons">remove_red_eye</i></a>
                        </div>
                        <h6>Lista de evaluaciones</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon" onClick={()=>{this.props.changeView('ADD_ELEMENT')}}>
                          <a href="javascript:;"><i className="material-icons">add_circle_outline</i></a>
                        </div>
                        <h6>Pasar nueva evaluación</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon" onClick={()=>{this.props.changeView('VIEW_INDICATORS')}}>
                          <a href="javascript:;"><i className="material-icons">insert_chart</i></a>
                        </div>
                        <h6>Indicadores</h6>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </article>
    )
  };
}

class Evaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT",
      evaluationData: {},
      groupId: ''
    };
    this.changeView = this.changeView.bind(this);
  }

  componentWillMount(){
    if(this.props.location.query.id){
      this.props.actions.evaluationGetByIdRequest(this.props.location.query.id)
        .then((response) => {
          this.setState({
            groupId: response.data.group
          })
        });
    }
  }

  changeView(data, reset = true) {
    if (reset) {
      this.setState({evaluationData: {}})
    }
    this.setState({active: data});
  }

  activeView() {
    switch (this.state.active) {
      case 'ADD_ELEMENT':
        return <HorizontalLinearStepper changeView={this.changeView} evaluationData={this.state.evaluationData}
                                        groupId={this.state.groupId} evaluationId={this.props.location.query.id}/>;
      case "VIEW_ELEMENT":
        return <ListElements evaluationId={this.props.location.query.id}/>;
      case "VIEW_INDICATORS":
        return <Indicators evaluationId={this.props.location.query.id}/>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions query={this.props.location.query}
                                    evaluationGetByIdRequest={this.props.actions.evaluationGetByIdRequest}
                                    evaluationSubtypeGetByIdRequest={this.props.actions.evaluationSubtypeGetByIdRequest}
                                    evaluationTypeById={this.props.actions.evaluationTypeById}
                                    changeView={ this.changeView } />
          </div>
          <hr/>
          <div key="2">{ this.activeView() }</div>
        </QueueAnim>

      </div>
    );
  }
}

//To get the routers
Evaluation.contextTypes = {
  router: PropTypes.object.isRequired
};


/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      evaluationGetByIdRequest,
      evaluationSubtypeGetByIdRequest,
      evaluationTypeById
    }, dispatch)
  };
}

module.exports = connect(
  null,
  mapDispatchToProps,
)(Evaluation);
