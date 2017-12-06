import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; // Datepicker
import map from "lodash-es/map"; //to use map in a object
import {typeCategory} from '../../../../../constants/data_types';
import {groupValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  coursesGetRequest,
  divisionsGetRequest,
  programInstructorGetRequest,
  sectionsGetRequest,
  workshopsGetRequest
} from '../../../../../actions';

let self;

class GeneralConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      courseId: '',
      divisionId: '',
      instructor: '',
      section: '',
      type:  1,
      typeCategory: '',
      workshopId: '',
      correlativo: '',
      inscriptionsEnd:  new Date(),
      inscriptionsStart: new Date(),
      errors: {},
      isLoading: false,
      selectedType: ''
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    self = this;
  }

  componentWillMount() {
    this.props.actions.coursesGetRequest();
    this.props.actions.divisionsGetRequest();
    this.props.actions.programInstructorGetRequest();
    this.props.actions.sectionsGetRequest();
    this.props.actions.workshopsGetRequest();
    if (self.context.router.location.query.typeCategory) {
      this.setState({typeCategory: self.context.router.location.query.typeCategory});
      switch (self.context.router.location.query.typeCategory) {
        case 'workshop':
          this.setState({
            workshopId: self.context.router.location.query.workshopId,
            selectedType: 'workshop'
          });
          break;
        case 'section':
          this.setState({
            section: self.context.router.location.query.sectionId,
            selectedType: 'section'
          });
          break;
        case 'division':
          this.setState({
            divisionId: self.context.router.location.query.divisionId,
            selectedType: 'division'
          });
          break;
        case 'course':
          this.setState({
            courseId: self.context.router.location.query.courseId,
            selectedType: 'course'
          });
          break;
        default:
          break;
      }
    }
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
        courseId: this.state.courseId,
        divisionId: this.state.divisionId,
        instructor: this.state.instructor,
        section: this.state.section,
        type: this.state.type,
        typeCategory: this.state.typeCategory,
        workshopId: this.state.workshopId,
        correlativo: this.state.correlativo,
        inscriptionsStart: this.state.inscriptionsStart,
        inscriptionsEnd: this.state.inscriptionsEnd
      };
      this.props.handleNext(data);
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleChangeStartDate(event, date){
    this.setState({
      inscriptionsStart: date,
    });
  }

  handleChangeEndDate(event, date){
    this.setState({
      inscriptionsEnd: date,
    });
  }

  render() {

    const {errors} = this.state;

    let selectOpt = (array) => {
      return array.map((arr) => {
        return <option key={arr.instructor || arr.id}
                       value={arr.instructor || arr.id}>{arr.instructorName || arr.name}</option>
      });
    };

    const typeCategories = map(typeCategory, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    let selectBox = () => {
      switch (this.state.typeCategory) {
        case 'workshop':
          return (
            <div className="form-group row">
              <label htmlFor="workshopId" className="col-md-3 control-label">Workshop</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'workshop'}
                        name="workshopId"
                        id="workshopId"
                        onChange={this.onChange}
                        value={this.state.workshopId}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el workshop</option>
                  {selectOpt(this.props.workshops.content || [])}
                </select>
                {errors.workshopId && <span className="help-block text-danger">{errors.workshopId}</span>}
              </div>
            </div>
          );
        case 'section':
          return (
            <div className="form-group row">
              <label htmlFor="section" className="col-md-3 control-label">Sección</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'section'}
                        name="section"
                        id="section"
                        onChange={this.onChange}
                        value={this.state.section}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el sección</option>
                  {selectOpt(this.props.sections.content || [])}
                </select>
                {errors.section && <span className="help-block text-danger">{errors.section}</span>}
              </div>
            </div>
          );
        case 'division':
          return (
            <div className="form-group row">
              <label htmlFor="divisionId" className="col-md-3 control-label">Division</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'division'}
                        name="divisionId"
                        id="divisionId"
                        onChange={this.onChange}
                        value={this.state.divisionId}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el division</option>
                  {selectOpt(this.props.divisions.content || [])}
                </select>
                {errors.divisionId && <span className="help-block text-danger">{errors.divisionId}</span>}
              </div>
            </div>
          );
        case 'course':
          return (
            <div className="form-group row">
              <label htmlFor="courseId" className="col-md-3 control-label">Course</label>
              <div className="col-md-9">
                <select disabled={this.state.selectedType === 'course'}
                        name="courseId"
                        id="courseId"
                        onChange={this.onChange}
                        value={this.state.courseId}
                        className="form-control"
                >
                  <option value="" disabled>Selecione el course</option>
                  {selectOpt(this.props.courses.content || [])}
                </select>
                {errors.courseId && <span className="help-block text-danger">{errors.courseId}</span>}
              </div>
            </div>
          );
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
                      <label htmlFor="typeCategory" className="col-md-3 control-label">Tipo de grupo</label>
                      <div className="col-md-9">
                        <select disabled
                          name="typeCategory"
                          id="typeCategory"
                          onChange={this.onChange}
                          value={this.state.typeCategory}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el typeCategory</option>
                          {typeCategories}
                        </select>
                        {errors.typeCategory && <span className="help-block text-danger">{errors.typeCategory}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="instructor" className="col-md-3 control-label">Instructor</label>
                      <div className="col-md-9">
                        <select
                          name="instructor"
                          id="instructor"
                          onChange={this.onChange}
                          value={this.state.instructor}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la instructor</option>
                          {selectOpt(this.props.programInstructors.content || [])}
                        </select>
                        {errors.instructor && <span className="help-block text-danger">{errors.instructor}</span>}
                      </div>
                    </div>
                    {selectBox()}
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inscriptions start</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="eje: Durán"
                          value={this.state.inscriptionsStart}
                          onChange={this.handleChangeStartDate}
                        />
                        {errors.inscriptionsStart &&
                        <span className="help-block text-danger">{errors.inscriptionsStart}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Inscriptions end</label>
                      <div className="col-md-9">
                        <DatePicker
                          hintText="eje: Durán"
                          value={this.state.inscriptionsEnd}
                          onChange={this.handleChangeEndDate}
                        />
                        {errors.inscriptionsEnd &&
                        <span className="help-block text-danger">{errors.inscriptionsEnd}</span>}
                      </div>
                    </div>

                    <p className="text-info">Ingresa la siguiente información: </p>

                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Enero:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsJan"
                            name="nsJan"
                            value={this.state.nsJan}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsJan &&
                          <span className="help-block text-danger">{errors.nsJan}</span>}
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Febrero:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsFeb"
                            name="nsFeb"
                            value={this.state.nsFeb}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsFeb &&
                          <span className="help-block text-danger">{errors.nsFeb}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Marzo:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsMar"
                            name="nsMar"
                            value={this.state.nsMar}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsMar &&
                          <span className="help-block text-danger">{errors.nsMar}</span>}
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Abril:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsApr"
                            name="nsApr"
                            value={this.state.nsApr}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsApr &&
                          <span className="help-block text-danger">{errors.nsApr}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Mayo:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsMay"
                            name="nsMay"
                            value={this.state.nsMay}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsMay &&
                          <span className="help-block text-danger">{errors.nsMay}</span>}
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Junio:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsJun"
                            name="nsJun"
                            value={this.state.nsJun}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsJun &&
                          <span className="help-block text-danger">{errors.nsJun}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Julio:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsJul"
                            name="nsJul"
                            value={this.state.nsJul}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsJul &&
                          <span className="help-block text-danger">{errors.nsJul}</span>}
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Agosto:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsAug"
                            name="nsAug"
                            value={this.state.nsAug}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsAug &&
                          <span className="help-block text-danger">{errors.nsAug}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Septiembre:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsSep"
                            name="nsSep"
                            value={this.state.nsSep}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsSep &&
                          <span className="help-block text-danger">{errors.nsSep}</span>}
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Octubre:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsOct"
                            name="nsOct"
                            value={this.state.nsOct}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsOct &&
                          <span className="help-block text-danger">{errors.nsOct}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Noviembre:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsNov"
                            name="nsNov"
                            value={this.state.nsNov}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsNov &&
                          <span className="help-block text-danger">{errors.nsNov}</span>}
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="inputEmail3" className="control-label">Diciembre:</label>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            id="nsDec"
                            name="nsDec"
                            value={this.state.nsDec}
                            onChange={this.onChange}
                            placeholder="eje: 12"/>
                          {errors.nsDec &&
                          <span className="help-block text-danger">{errors.nsDec}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Cancelar'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.props.handleCancel}
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

GeneralConfiguration.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {
    courses: state.courses,
    divisions: state.divisions,
    programInstructors: state.programInstructors,
    sections: state.sections,
    workshops: state.workshops
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      coursesGetRequest,
      divisionsGetRequest,
      programInstructorGetRequest,
      sectionsGetRequest,
      workshopsGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralConfiguration);

