import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import map from "Lodash/map"; //to use map in a object
import {typeCategory} from '../../../../../constants/data_types';
import {groupValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {

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
      evaluationType: 'conocimiento' || '',
      evaluateCategory: 'division' || '',
      maximumNote: '',
      calculateMultipleSelection: 'finalNote' || '',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    self = this;
  }

  componentWillMount() {

  }

  /*componentWillReceiveProps(nextProps) {
    if (this.props.groupData !== nextProps.groupData) {
      this.setState({
        id: '',
        courseId: '',
        divisionId: '',
        instructor: '',
        section: '',
        type: '',
        typeCategory: '',
        workshopId: '',
        correlativo: '',
        inscriptionsStart: '',
        inscriptionsEnd: '',
      })
    }
  }*/

  isValid() {
    //local validation
    return true;
    const {errors, isValid} = groupValidator(this.state);
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
      let data = {
        assistance: this.state.assistance,
        percentage: this.state.percentage,
        approvalPercentage: this.state.approvalPercentage,
        evaluationType: this.state.evaluationType,
        evaluateCategory: this.state.evaluateCategory,
        maximumNote: this.state.maximumNote,
        calculateMultipleSelection: this.state.calculateMultipleSelection,

      };
      this.props.handleNext(data);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const {errors} = this.state;

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
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de evaluación</label>
                      <div className="col-md-9">
                        <select
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
                        {errors.approvalPercentage && <span className="help-block text-danger">{errors.approvalPercentage}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Select the categories to evaluate</label>
                      <div className="col-md-9">
                        <select
                          className="form-control"
                          id="evaluateCategory"
                          name="evaluateCategory"
                          value={this.state.evaluateCategory}
                          onChange={this.onChange}
                        >
                          <option value="division">Division</option>
                          <option value="multiplication">Multiplication</option>
                        </select>
                        {errors.evaluateCategory &&
                        <span className="help-block text-danger">{errors.evaluateCategory}</span>}
                      </div>
                    </div>
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
  return {

  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationStructure);

