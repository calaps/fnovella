import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import map from "lodash-es/map"; //to use map in a object
import {evaluationActivityValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  evaluationActivityGetByEvaluationId,
  evaluationGetByIdRequest,
  groupGetByIdRequest,
  evaluationRangeGetByIdRequest,
  evaluationSubtypeGetByIdRequest,
  evaluationTypeById,
  evaluationActivityParticipantAddRequest
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
      evaluationActivityData: [],
      evaluationTypeId : ''
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentWillMount() {
    this.props.actions.evaluationActivityGetByEvaluationId(this.props.evaluationId)
      .then(
        (response) => {
          if (response) {
            this.setState({
              evaluationActivities: response.data
            });
            let array = [];
            for (let activity of this.state.evaluationActivities) {
              array.push({id: activity.id, name: activity.name, gradeInitial: 0, gradeFinal: 0})
            }
            this.setState({
              evaluationActivityData: array
            })
          }
        }
      );
    this.props.actions.evaluationGetByIdRequest(this.props.evaluationId)
      .then(
        (response) => {
          if (response) {
            this.setState({
              evaluationData: response.data,
              evaluationTypeId: response.data.evaluationType
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
                  evaluationType: "Conocimiento Evaluation"
                });
              }
              else {
                this.setState({
                  evaluationType: "Continua Evaluation"
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
    const {errors, isValid} = evaluationActivityValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});
      for (let activity of this.state.evaluationActivityData) {
        let data = {
          activity : activity.id,
          gradeFinal: activity.gradeFinal,
          gradeInitial: activity.gradeInitial,
          participant: this.props.particiapntId
        };
        this.props.actions.evaluationActivityParticipantAddRequest(data);
      }
      this.props.changeView('VIEW_ELEMENT');
    }
  }

  onChange(e) {
    let array = this.state.evaluationActivityData;
    for (let activity of array) {
      if (activity.id.toString() === e.target.id) {
        if(e.target.placeholder === 'Final'){
          activity.gradeFinal = e.target.value;
        }else{
          activity.gradeInitial = e.target.value;
        }
      }
    }
    this.setState({evaluationActivityData: array});
  }

  render() {
    const {errors} = this.state;

    let evaluationActivities = () => {
      let activities = this.state.evaluationActivityData;
      return activities.map((activity) => {
        return (
          <div className="form-group row" key={activity.id}>
            <label htmlFor="inputEmail3" className="col-md-3 control-label">{activity.name}</label>
            {this.state.evaluationData.evaluationType === 1 ?
              <div className="col-md-9">
              <input
              id={activity.id}
              name="evaluationActivityData"
              key={activity.id}
              type="number"
              min="1" max="100"
              className="form-control"
              onChange={this.onChange}
              placeholder="Final"
              />
              </div>
               :
              <div className="row">
                <div className="col-md-6">
                  <input
                    id={activity.id}
                    name="evaluationActivityData"
                    key={activity.id}
                    type="number"
                    min="1" max="100"
                    className="form-control"
                    onChange={this.onChange}
                    placeholder="Initial"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id={activity.id}
                    name="evaluationActivityData"
                    key={activity.id}
                    type="number"
                    min="1" max="100"
                    className="form-control"
                    onChange={this.onChange}
                    placeholder="Final"
                  />
                </div>
              </div>
            }
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
                          value={this.state.evaluationType}
                          disabled/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Approval percentage</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.evaluationData.approvalPercentage}
                          disabled/>
                      </div>
                    </div>

                    <p className="text-info">Evaluation Activities: </p>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Minimum %</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.rangeData.min}
                          disabled/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Maximum %</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.rangeData.max}
                          disabled/>
                      </div>
                    </div>

                    {evaluationActivities()}

                    <div className="form-group row">
                      <div className="col-md-9 offset-md-3">
                        {errors.evaluationActivityData &&
                        <span className="help-block text-danger">{errors.evaluationActivityData}</span>}
                      </div>
                    </div>


                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Back'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.props.handlePrev}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label='Submit' secondary className="btn-w-md"/>
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
      evaluationSubtypeGetByIdRequest,
      evaluationTypeById,
      evaluationActivityParticipantAddRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationActivities);

