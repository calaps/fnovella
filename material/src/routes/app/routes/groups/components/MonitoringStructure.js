import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import IconButton from 'material-ui/IconButton';
import {satisfactionStructureValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import uuid from "uuid";
import {bindActionCreators} from 'redux';
import {} from '../../../../../actions';

let self;

class MonitoringStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approvalPercentage: '99',
      evaluateCategory: [],
      evaluateCategoryName: null,
      evaluateCategoryPercentage: null,
      evaluationType: 3,
      maximumNote: '',
      minimumNote: '',
      totalEvaluateCategory: 0,
      calculateMultipleSelection: '99',
      errors: {},
      isLoading: false
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangCategory = this.onChangCategory.bind(this);
    this.onChangeEvaluateCategoryAndPercentage = this.onChangeEvaluateCategoryAndPercentage.bind(this);
    this.onAddEvaluateCategoryAndPercentage = this.onAddEvaluateCategoryAndPercentage.bind(this);
    this.isEvaluateCategoryAndPercentageNull = this.isEvaluateCategoryAndPercentageNull.bind(this);
    this.onRemoveEvaluateCategoryAndPercentage = this.onRemoveEvaluateCategoryAndPercentage.bind(this);
    self = this;
  }

  componentWillMount() {

  }

  isValid() {
    //local validation
    const {errors, isValid} = satisfactionStructureValidator(this.state);
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
        approvalPercentage: this.state.approvalPercentage,
        evaluateCategory: this.state.evaluateCategory,
        minimumNote: this.state.minimumNote,
        maximumNote: this.state.maximumNote,
        calculateMultipleSelection: this.state.calculateMultipleSelection,
        totalEvaluateCategoryPercentage: this.state.totalEvaluateCategory,
        evaluationSubtype: 2,
        evaluationType: parseInt(this.state.evaluationType, 8)
      };
      this.props.handleNext(data);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onChangCategory(e) {

    const newCategoryArray = this.state.evaluateCategory; // create a copy
    newCategoryArray[e.target.name].percentage = e.target.value; // update the new state
    let newTotalTotal = 0; // create a new Total category
    newCategoryArray.map((category) => {
      console.log(category.percentage);
      newTotalTotal += parseInt(category.percentage, 10);
    });
    console.log(newTotalTotal);

    this.setState({
      evaluateCategory: newCategoryArray, // update the new array
      totalEvaluateCategory: newTotalTotal,
      totaltotal: (this.state.assistance === 'true') ? (parseInt(this.state.percentage) + newTotalTotal) : (parseInt(this.state.percentage) - newTotalTotal)
    });
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
      ],
      totalEvaluateCategory: this.state.totalEvaluateCategory + parseInt(obj.percentage)
    });
  }

  onRemoveEvaluateCategoryAndPercentage(cat) {
    for (let i = 0; i < this.state.evaluateCategory.length; i++) {
      if (this.state.evaluateCategory[i].id === cat.id) {
        this.setState({
          totalEvaluateCategory: this.state.totalEvaluateCategory - parseInt(cat.percentage),
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

    let i = -1;

    const {errors} = this.state;

    const evaluateCategoryAndPercentageMapping = () => {
      return this.state.evaluateCategory.map((cat) => {
        i = i + 1;
        return (
          <div className="row" key={i}>
            <label htmlFor="inputEmail3" className="col-md-3 control-label"/>
            <div className="col-md-4">
              <label>{cat.name}</label>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                min="1"
                max="100"
                className="form-control"
                id={i}
                name={i}
                value={this.state.evaluateCategory[i].percentage}
                onChange={this.onChangCategory}
                placeholder="1 - 100" />
            </div>
            <IconButton
              iconClassName="col-md-1 material-icons"
              onTouchTap={() => this.onRemoveEvaluateCategoryAndPercentage(cat)}
            >remove
            </IconButton>
          </div>
        );
      });
    };

    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-10">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Selecciona las actividades a evaluar</label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="evaluateCategoryName"
                          name="evaluateCategoryName"
                          value={this.state.evaluateCategoryName}
                          onChange={this.onChangeEvaluateCategoryAndPercentage}
                          placeholder="Actividad C"/>
                        {errors.evaluateCategoryName &&
                        <span className="help-block text-danger">{errors.evaluateCategoryName}</span>}
                      </div>
                      <div className="col-md-4">
                        <input
                          type="number"
                          min="1" max="100"
                          className="form-control"
                          id="evaluateCategoryPercentage"
                          name="evaluateCategoryPercentage"
                          value={this.state.evaluateCategoryPercentage}
                          onChange={this.onChangeEvaluateCategoryAndPercentage}
                          placeholder="Porcentage"/>
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
                    {errors.evaluateCategory &&
                    <span className="col-md-5 offset-md-3 help-block text-danger">{errors.evaluateCategory}</span>}
                    <div className="form-group row">
                      <label htmlFor="totalEvaluateCategory"
                             className="col-md-3 offset-md-3 control-label">Total: {this.state.totalEvaluateCategory}</label>
                      <div className="col-md-3">{errors.totalEvaluateCategory &&
                      <span className="help-block text-danger">{errors.totalEvaluateCategory}</span>}</div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="minimumNote" className="col-md-3 control-label">Nota minima</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          min="1" max="100"
                          className="form-control"
                          id="minimumNote"
                          name="minimumNote"
                          value={this.state.minimumNote}
                          onChange={this.onChange}
                          placeholder="eje: 1 - 100"/>
                        {errors.minimumNote && <span className="help-block text-danger">{errors.minimumNote}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="maximumNote" className="col-md-3 control-label">Nota maxima </label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          min="1" max="100"
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
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='atras'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.props.handlePrev}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label='siguiente' secondary className="btn-w-md"/>
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

MonitoringStructure.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitoringStructure);

