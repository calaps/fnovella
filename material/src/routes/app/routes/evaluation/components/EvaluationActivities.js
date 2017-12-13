import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import map from "lodash-es/map"; //to use map in a object
import {} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  evaluationActivityGetByEvaluationId,
  evaluationGetByIdRequest,
  groupGetByIdRequest,
  evaluationRangeGetByIdRequest,
  evaluationSubtypeGetByIdRequest
} from '../../../../../actions';

class EvaluationActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isLoading: false,
      groupData: {},
      rangeData: {},
      evaluationType: '',
      evaluationActivities: [],
      evaluationData: {},
      evaluationActivityData: []
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }

  }

  componentWillMount() {
    this.props.actions.evaluationActivityGetByEvaluationId(this.props.evaluationId)
      .then(
        (response) => {
          if (response) {
            this.setState({
              evaluationActivities: response.data
            })
          }
        }
      );
    this.props.actions.evaluationGetByIdRequest(this.props.evaluationId)
      .then(
        (response) => {
          if (response) {
            this.setState({
              evaluationData:response.data
            });
            if (response.data.evaluationSubtype > 1) {
              this.props.actions.evaluationSubtypeGetByIdRequest(response.data.evaluationSubtype)
                .then(
                  (response) => {
                    if (response) {
                      this.setState({
                        evaluationType: response.data.name + " Evaluation"
                      });
                    }
                  }
                );
            } else {
              if (response.data.evaluationType === 1) {
                this.setState({
                  evaluationType: "Knowledge Evaluation"
                });
              }
              else {
                this.setState({
                  evaluationType: "Knowledge Evaluation"
                });
              }
            }

            this.props.actions.groupGetByIdRequest(response.data.group)
              .then(
                (response) => {
                  if (response) {
                    this.setState({
                      groupData: response.data
                    });
                  }
                }
              );

            this.props.actions.evaluationRangeGetByIdRequest(response.data.range)
              .then(
                (response) => {
                  if (response) {
                    this.setState({
                      rangeData: response.data
                    });
                  }
                }
              );
          }
        }
      );
  }

  isValid() {
    //local validation
    const {errors, isValid} = groupValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();

  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {errors} = this.state;

    let evaluationActivities = () => {
      let activities = this.state.evaluationActivities;
      return activities.map((activity) => {
        return (
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-md-3 control-label">{activity.name}</label>
            <div className="col-md-9">
              <input
                type="text"
                name={activity.name}
                className="form-control"
                value={this.state.evaluationData.id}
                onChange={this.onChange}
                />
            </div>
          </div>
        )
      })
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-10">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <form onSubmit={this.onSubmit} role="form">

                    <p className="text-info">General información: </p>

                    <div className="form-group row">
                      <label htmlFor="typeCategory" className="col-md-3 control-label">Tipo de grupo</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.groupData.typeCategory}
                          disabled/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="instructor" className="col-md-3 control-label">Tipo de evaluation</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.groupData.evaluationType}
                          disabled/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Approval percentage</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.evaluationData.id}
                          disabled/>
                      </div>
                    </div>

                    <p className="text-info">Evaluation Activities: </p>

                    {evaluationActivities()}

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Back'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.props.handlePrev}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label='Next' secondary className="btn-w-md"/>
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>

          </div>

        </div>
      </article>
    );
  }
}

EvaluationActivities.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      evaluationActivityGetByEvaluationId,
      evaluationGetByIdRequest,
      groupGetByIdRequest,
      evaluationRangeGetByIdRequest,
      evaluationSubtypeGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationActivities);

