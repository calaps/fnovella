import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; // for user prop-types
import IconButton from 'material-ui/IconButton';
import {evaluationStructureValidator} from '../../../../../actions/formValidations'; // form validations
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
      assistance: false,
      percentage: 0,
      approvalPercentage: '',
      evaluationType: 1,
      evaluateCategory: [],
      evaluateCategoryName: null,
      evaluateCategoryPercentage: null,
      totalEvaluateCategory: 0,
      totaltotal: '',
      maximumNote: 100,
      minimumNote: 1,
      calculateMultipleSelection: 'finalNote' || '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEvaluateCategoryAndPercentage = this.onChangeEvaluateCategoryAndPercentage.bind(this);
    this.onAddEvaluateCategoryAndPercentage = this.onAddEvaluateCategoryAndPercentage.bind(this);
    this.isEvaluateCategoryAndPercentageNull = this.isEvaluateCategoryAndPercentageNull.bind(this);
    this.onRemoveEvaluateCategoryAndPercentage = this.onRemoveEvaluateCategoryAndPercentage.bind(this);
    self = this;
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

    if (this.state.assistance === 'true') {
      this.setState({ totaltotal: this.state.totalEvaluateCategory + parseInt(this.state.percentage, 8)});
    } else {
      this.setState({ totaltotal: this.state.totalEvaluateCategory });
    }

    if (this.isValid()) {
      // reset errors object and disable submit button

      this.setState({errors: {}, isLoading: true});
      let data = {
        assistance: this.state.assistance,
        percentage: this.state.percentage,
        approvalPercentage: this.state.approvalPercentage,
        evaluateCategory: this.state.evaluateCategory,
        minimumNote: this.state.minimumNote,
        maximumNote: this.state.maximumNote,
        calculateMultipleSelection: this.state.calculateMultipleSelection,
        totalEvaluateCategoryPercentage: this.state.totalEvaluateCategory,
        evaluationSubtype: 1,
        evaluationType: parseInt(this.state.evaluationType, 8)
      };

      this.props.handleNext(data);
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

    let togglePercentage = () => {
      if (this.state.assistance === "true") {
        return (
          <div className="form-group row">
            <label htmlFor="percentage" className="col-md-3 control-label">Porcentaje</label>
            <div className="col-md-9">
              <input
                type="number"
                min="1" max="100"
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
      } else {
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
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Es requerida la asistencia?</label>
                      <div className="col-md-9">
                        <select
                          name="assistance"
                          id="assistance"
                          onChange={this.onChange}
                          value={this.state.assistance}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona...</option>
                          <option value={true}>Si</option>
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
                          className="form-control"
                          id="evaluationType"
                          name="evaluationType"
                          value={this.state.evaluationType}
                          onChange={this.onChange}
                        >
                          <option value="1">Evaluación Final</option>
                          <option value="2">Evaluación Inicio/Fin</option>
                          <option value="3">Evaluación Periodica</option>

                        </select>
                        {errors.evaluationType &&
                        <span className="help-block text-danger">{errors.evaluationType}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="correlativo" className="col-md-3 control-label">Porcentage requerido para aprobar</label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          min="1" max="100"
                          className="form-control"
                          id="approvalPercentage"
                          name="approvalPercentage"
                          value={this.state.approvalPercentage}
                          onChange={this.onChange}
                          placeholder="Eje: 65"/>
                        {errors.approvalPercentage &&
                        <span className="help-block text-danger">{errors.approvalPercentage}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ingresa las actividades a evaluar</label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="evaluateCategoryName"
                          name="evaluateCategoryName"
                          value={this.state.evaluateCategoryName}
                          onChange={this.onChangeEvaluateCategoryAndPercentage}
                          placeholder="Actividad A"/>
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
                          placeholder="Porcentaje"/>
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
                      <label
                        htmlFor="totalEvaluateCategory"
                        className="col-md-3 offset-md-3 control-label">Total de actividades: {this.state.totalEvaluateCategory}</label>
                      <div className="col-md-3">{errors.totalEvaluateCategory &&
                      <span className="help-block text-danger">{errors.totalEvaluateCategory}</span>}</div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Cantidad de evaluaciones</label>
                      <div className="col-md-9">
                        <select
                          className="form-control"
                          id="calculateMultipleSelection"
                          name="calculateMultipleSelection"
                          value={this.state.calculateMultipleSelection}
                          onChange={this.onChange}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">4</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        {errors.calculateMultipleSelection &&
                        <span className="help-block text-danger">{errors.calculateMultipleSelection}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton
                          disabled={this.state.isLoading}
                          label='Atras'
                          style={{marginRight: 12}}
                          onTouchTap={this.props.handlePrev}
                          secondary className="btn-w-md" />
                        <RaisedButton
                          disabled={this.state.isLoading}
                          type="submit"
                          label='Siguiente'
                          secondary
                          className="btn-w-md" />
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
  return {};
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

