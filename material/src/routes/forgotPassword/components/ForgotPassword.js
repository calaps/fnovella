import React from 'react';
import PropTypes from 'prop-types'; //for user prop-types
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {forgotPasswordValidator} from "../../../actions/formValidations"
import {
  forgotPasswordRequest
} from "../../../actions";

let self;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: APPCONFIG.brand,
      isLoading: false,
      email: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    self = this;
  }

  isValid() {
    //local validation
    const {errors, isValid} = forgotPasswordValidator(this.state);
    if (!isValid) {
      this.setState({errors});
      return false;
    }
    return true;
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      //reset errors object and disable submit button
      this.setState({errors: {}, isLoading: true});
      let data = {
        email: this.state.email
      };
      this.props.forgotPasswordRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if (response) {
            alert("An email has been sent tou you with password.");
            self.context.router.push('/app/login');
          }
        },
        (error) => {
          console.log("An Error occur with the Rest API");
          self.setState({errors: {...this.state.errors, apiErrors: error.error}, isLoading: false});
        });

    } else {
      console.log(this.state.errors);
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">
            <section className="logo text-center">
              <h1><img src="assets/images/logo.png" alt={this.state.brand}/></h1>
            </section>
            <form onSubmit={this.onSubmit}>
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Correo electrónico"
                    id="email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    fullWidth
                  />
                  {errors.email &&
                  <span className="help-block text-danger">{errors.email}</span>}
                  <div className="additional-info text-center text-small">
                    Incgresa tu correo electronico principal. Te enviaremos un correo electrónico con tu nueva
                    contraseña para restaurar la contraseña.
                  </div>
                </div>
              </fieldset>
              <div className="card-action no-border text-right">
                <FlatButton
                  label='Inicio de sesión'
                  style={{marginRight: 12}}
                  href="#/login"
                  secondary className="btn-w-md"/>
                <RaisedButton
                  type='submit'
                  disabled={this.state.isLoading}
                  label='Reset'
                  secondary
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Page extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="page-forgot">
        <div className="main-body">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1">
              <ForgotPassword forgotPasswordRequest={this.props.actions.forgotPasswordRequest}/>
            </div>
          </QueueAnim>
        </div>
      </div>
    );
  }
}

//To get the routers
ForgotPassword.contextTypes = {
  router: PropTypes.object.isRequired
};

ForgotPassword.propTypes = {
  forgotPasswordRequest: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      forgotPasswordRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(Page);



