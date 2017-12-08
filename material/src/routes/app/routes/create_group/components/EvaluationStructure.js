import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import IconButton from 'material-ui/IconButton';
import map from "lodash-es/map"; //to use map in a object
import {evaluationStructureValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import uuid from "uuid";
import {bindActionCreators} from 'redux';
import {
  workshopGetByIdRequest,
  programGetByIdRequest,
  sectionGetByIdRequest,
  gradeGetByIdRequest,
  divisionGetByIdRequest,
  courseGetByIdRequest
} from '../../../../../actions';

let self;

class EvaluationStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      assistance: '',
      percentage: '',
      approvalPercentage: '',
      evaluationType: '' || '',
      evaluateCategory: [],
      evaluateCategoryName: null,
      evaluateCategoryPercentage: null,
      maximumNote: '',
      calculateMultipleSelection: 'finalNote' || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEvaluateCategoryAndPercentage = this.onChangeEvaluateCategoryAndPercentage.bind(this);
    this.onAddEvaluateCategoryAndPercentage = this.onAddEvaluateCategoryAndPercentage.bind(this);
    this.isEvaluateCategoryAndPercentageNull = this.isEvaluateCategoryAndPercentageNull.bind(this);
    this.onRemoveEvaluateCategoryAndPercentage = this.onRemoveEvaluateCategoryAndPercentage.bind(this);
    self = this;
  }

  componentWillMount() {
    switch (self.context.router.location.query.typeCategory) {
      case 'workshop':
        this.props.actions.workshopGetByIdRequest(self.context.router.location.query.workshopId)
        .then(
          (response) => {
            if (response) {
              this.props.actions.programGetByIdRequest(response.data.programId)
              .then(
                (response) => {
                  if (response) {
                    this.setState({
                      evaluationType:response.data.evaluationType
                    })
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API");
                })
            }
          },
          (error) => {
            console.log("An Error occur with the Rest API");
          })
        break;
      case 'section':
        this.props.actions.sectionGetByIdRequest(self.context.router.location.query.sectionId)
        .then(
          (response) => {
            if (response) {
              this.props.actions.gradeGetByIdRequest(response.data.grade)
              .then(
                (response) => {
                  if (response) {
                    this.props.actions.programGetByIdRequest(response.data.programId)
                    .then(
                      (response) => {
                        if (response) {
                          this.setState({
                            evaluationType:response.data.evaluationType
                          })
                        }
                      },
                      (error) => {
                        console.log("An Error occur with the Rest API");
                      })
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API");
                })
            }
          },
          (error) => {
            console.log("An Error occur with the Rest API");
          })
        break;
      case 'division':
        this.props.actions.divisionGetByIdRequest(self.context.router.location.query.divisionId)
        .then(
          (response) => {
            if (response) {
              this.props.actions.programGetByIdRequest(response.data.programa)
              .then(
                (response) => {
                  if (response) {
                    this.setState({
                      evaluationType:response.data.evaluationType
                    })
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API");
                })
            }
          },
          (error) => {
            console.log("An Error occur with the Rest API");
          })
        break;
      case 'course':
        this.props.actions.courseGetByIdRequest(self.context.router.location.query.courseId)
        .then(
          (response) => {
            if (response) {
              this.props.actions.programGetByIdRequest(response.data.programId)
              .then(
                (response) => {
                  if (response) {
                    this.setState({
                      evaluationType:response.data.evaluationType
                    })
                  }
                },
                (error) => {
                  console.log("An Error occur with the Rest API");
                })
            }
          },
          (error) => {
            console.log("An Error occur with the Rest API");
          })
        break;
      default:
        break;
    }
  }

  isValid() {
    //local validation
    const {errors, isValid} = evaluationStructureValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      // //reset errors object and disable submit button
      // this.setState({errors: {}, isLoading: true});
      // let data = {
      //   assistance: this.state.assistance,
      //   percentage: this.state.percentage,
      //   approvalPercentage: this.state.approvalPercentage,
      //   evaluationType: this.state.evaluationType,
      //   evaluateCategory: this.state.evaluateCategory,
      //   maximumNote: this.state.maximumNote,
      //   calculateMultipleSelection: this.state.calculateMultipleSelection,

      // };
      // this.props.handleNext(data);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onChangeEvaluateCategoryAndPercentage(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onAddEvaluateCategoryAndPercentage() {
    let obj = {
      id: uuid(),
      name: this.state.evaluateCategoryName,
      percentage: this.state.evaluateCategoryPercentage
    };
    this.setState({
      evaluateCategory: [
        ...this.state.evaluateCategory, obj
      ]
    });
  }

  onRemoveEvaluateCategoryAndPercentage(cat) {
    for (let i = 0; i < this.state.evaluateCategory.length; i++) {
      if (this.state.evaluateCategory[i].id === cat.id) {
        this.setState({
          ...this.state.evaluateCategory.splice(i, 1)
        })
      }
    }
  }

  isEvaluateCategoryAndPercentageNull() {
    if (this.state.evaluateCategoryName !== null && this.state.evaluateCategoryPercentage !== null) {
      return true;
    }
    return false;
  }

  render() {

    let i = 0;

    const {errors} = this.state;

    let evaluateCategoryAndPercentageMapping = () => {
      return this.state.evaluateCategory.map((cat) => {
        return (
          <div className="row" key={i++}>
            <label htmlFor="inputEmail3" className="col-md-3 control-label"> </label>
            <div className="col-md-4">
              <label>{cat.name}</label>
            </div>
            <div className="col-md-4">
              <label>{cat.percentage}</label>
            </div>
            <IconButton
              iconClassName="col-md-1 material-icons"
              onTouchTap={() => this.onRemoveEvaluateCategoryAndPercentage(cat)}
            >remove
            </IconButton>
          </div>
        )
      })
    };

    let togglePercentage = ()=>{
      if(this.state.assistance === "true"){
        return(
          <div className="form-group row">
            <label htmlFor="correlativo" className="col-md-3 control-label">Percentage</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                id="percentage"
                name="percentage"
                value={this.state.percentage}
                onChange={this.onChange}
                placeholder="eje: 1 - 100"/>
              {errors.percentage && <span className="help-block text-danger">{errors.percentage}</span>}
            </div>
          </div>
        )
      }else{
        return null;
      }
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-10">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form onSubmit={this.onSubmit} role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Assistance required?</label>
                      <div className="col-md-9">
                        <select
                          name="assistance"
                          id="assistance"
                          onChange={this.onChange}
                          value={this.state.assistance}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                        {errors.assistance && <span className="help-block text-danger">{errors.assistance}</span>}
                      </div>
                    </div>
                    {togglePercentage()}
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de evaluación</label>
                      <div className="col-md-9">
                        <select
                          disabled
                          className="form-control"
                          id="evaluationType"
                          name="evaluationType"
                          value={this.state.evaluationType}
                          onChange={this.onChange}
                        >
                          <option value="conocimiento">Evaluación conocimiento</option>
                          <option value="continua">Evaluación de continua</option>
                        </select>
                        {errors.evaluationType &&
                        <span className="help-block text-danger">{errors.evaluationType}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="correlativo" className="col-md-3 control-label">Approval percentage</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="approvalPercentage"
                          name="approvalPercentage"
                          value={this.state.approvalPercentage}
                          onChange={this.onChange}
                          placeholder="eje: 1 - 100"/>
                        {errors.approvalPercentage &&
                        <span className="help-block text-danger">{errors.approvalPercentage}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Select the categories to
                        evaluate</label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="evaluateCategoryName"
                          name="evaluateCategoryName"
                          value={this.state.evaluateCategoryName}
                          onChange={this.onChangeEvaluateCategoryAndPercentage}
                          placeholder="Category"/>
                        {errors.evaluateCategoryName &&
                        <span className="help-block text-danger">{errors.evaluateCategoryName}</span>}
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="evaluateCategoryPercentage"
                          name="evaluateCategoryPercentage"
                          value={this.state.evaluateCategoryPercentage}
                          onChange={this.onChangeEvaluateCategoryAndPercentage}
                          placeholder="Percentage"/>
                        {errors.evaluateCategoryPercentage &&
                        <span className="help-block text-danger">{errors.evaluateCategoryPercentage}</span>}
                      </div>
                      <IconButton
                        iconClassName="col-md-1 material-icons"
                        disabled={!this.isEvaluateCategoryAndPercentageNull()}
                        onTouchTap={this.onAddEvaluateCategoryAndPercentage}
                      >add
                      </IconButton>
                    </div>
                    {evaluateCategoryAndPercentageMapping()}
                    <div className="form-group row">
                      <label htmlFor="correlativo" className="col-md-3 control-label">Maximum note</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="maximumNote"
                          name="maximumNote"
                          value={this.state.maximumNote}
                          onChange={this.onChange}
                          placeholder="eje: 1 - 100"/>
                        {errors.maximumNote && <span className="help-block text-danger">{errors.maximumNote}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Cálculus</label>
                      <div className="col-md-9">
                        <select
                          className="form-control"
                          id="calculateMultipleSelection"
                          name="calculateMultipleSelection"
                          value={this.state.calculateMultipleSelection}
                          onChange={this.onChange}
                        >
                          <option value="finalNote">Final Note</option>
                          <option value="items">Items</option>
                        </select>
                        {errors.calculateMultipleSelection &&
                        <span className="help-block text-danger">{errors.calculateMultipleSelection}</span>}
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

EvaluationStructure.contextTypes = {
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
      workshopGetByIdRequest,
      programGetByIdRequest,
      sectionGetByIdRequest,
      gradeGetByIdRequest,
      divisionGetByIdRequest,
      courseGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationStructure);

