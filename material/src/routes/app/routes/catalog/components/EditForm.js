import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';// For Buttons
import {data_types} from '../../../../../constants/data_types';
import map from "lodash-es/map"; //to use map in a object
import {catalogsValidator} from "../../../../../actions/formValidations"; //form validations
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  catalogsAddRequest,
  catalogsUpdateRequest,
  categoriesGetRequest
} from '../../../../../actions';

let self;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.catalogData.id) ? true : false,
      name: this.props.catalogData.name || '',
      type: this.props.catalogData.type || '',
      category: this.props.catalogData.category || '',
      id: this.props.catalogData.id || '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    self = this;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.catalogData !== nextProps.catalogData) {
      this.setState({
        isEditing: false,
        name: '',
        type: '',
        category: '',
        id: '',
      })
    }
  }

  componentWillMount() {
    this.props.actions.categoriesGetRequest();
  }

  isValid() {
    // TODO:Commented bacause of invalid validation
    //local validation
    const {errors, isValid} = catalogsValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }

    return true;
  }

  handleCancel() {
    self.props.changeView('VIEW_ELEMENT')
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errros object and disable submit button
      this.setState({errors: {}, isLoading: true});
      let data = {
        name: this.state.name,
        type: this.state.type,
        category: this.state.category
      };
      if (this.state.isEditing) {
        data.id = this.state.id;
      }

      // ON SUCCESSS API
      this.state.isEditing ?
        this.props.actions.catalogsUpdateRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          },
          (error) => {
            //alert'fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          })
        :
        this.props.actions.catalogsAddRequest(data).then(
          (response) => {
            //Save the default object as a provider
            if (response) {
              self.props.changeView('VIEW_ELEMENT');
            }
          }, (error) => {
            //alert'fail');
            console.log("An Error occur with the Rest API");
            self.setState({errors: {...self.state.errors, apiErrors: error.error}, isLoading: false});
          });

    } else {

      // FORM WITH ERRORS

    }

  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const {errors} = this.state;

    const options = map(data_types, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    //Categories options
    let categoriesOpt = () => {
      let {categories} = this.props;
      return categories.map((category) => {
        return <option key={category.id} value={category.id}>{category.name}</option>
      });
    };
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form onSubmit={this.onSubmit} role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de del valor</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: altura"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Ingresa la categoria</label>
                      <div className="col-md-9">
                        <select
                          name="category"
                          id="category"
                          onChange={this.onChange}
                          value={this.state.category}
                          className="form-control"
                        >
                          <option value="" disabled>Selecione la categoria</option>
                          {categoriesOpt()}
                        </select>
                        {errors.category && <span className="help-block text-danger">{errors.category}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                      <div className="col-md-9">
                        <select
                          name="type"
                          onChange={this.onChange}
                          value={this.state.type}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el tipo de dato</option>
                          {options}
                        </select>
                        {errors.type && <span className="help-block text-danger">{errors.type}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Cancel'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.handleCancel}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label={this.state.isEditing ? 'Update' : 'Add'}
                                      secondary className="btn-w-md"/>
                      </div>
                    </div>
                  </form>

                </div>
              </div>

            </div>

            <div className="col-xl-3">
              <div className="callout callout-info">
                <h6>Descripción:</h6>
                <p>Los catalogos son una de la parte mas importante del programa que sirve para llenar los formuarios
                  con información predeterminadas.</p>
              </div>
            </div>

          </div>

        </div>
      </article>
    );
  }
}

function mapStateToProps(state) {
  //pass the providers
  return {
    // auth: state.auth
    categories : state.categories
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      //    signUpRequest
      catalogsAddRequest,
      catalogsUpdateRequest,
      categoriesGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);
