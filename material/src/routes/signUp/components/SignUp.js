import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types'; //for user prop-types
import { connect } from 'react-redux'; //to pass functions
import {bindActionCreators} from 'redux';
import { signUpRequest } from '../../../actions'; //for use the Rest_API

let self;
class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      brand: APPCONFIG.brand,
      username: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);

    self = this;

  }

  isValid(){
    // TODO: validation
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });
      // this.context.router.history.push('/');

      let data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      //we store  a function in the props
      this.props.signUpRequest(data).then(
        (response) => {
          //Save the default object as a provider
          if(response){
            self.context.router.push('/app/dashboard');
          }
        },
        (error) => {
          console.log("An Error occur with the Rest API");
          self.setState({ errors: error.response.data, isLoading: false });
        });

    } else {
      console.log(this.state.errors);
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state; //inicializate an get errors

    return (
      <div className="body-inner">

        <div className="card bg-white">
          <div className="card-content">
            <section className="logo text-center">
              <h1><a href="#/">{this.state.brand}</a></h1>
            </section>

            <form onSubmit={this.onSubmit}  className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    name="username"
                    type="text"
                    floatingLabelText="Username"
                    value={this.state.username}
                    onChange={this.onChange}
                    fullWidth
                  />
                  {errors.username && <span className="help-block text-danger">{errors.username}</span>}
                </div>
                <div className="form-group">
                  <TextField
                    name="email"
                    type="email"
                    floatingLabelText="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    fullWidth
                  />
                  {errors.email && <span className="help-block text-danger">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <TextField
                    name="password"
                    floatingLabelText="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    fullWidth
                  />
                  {errors.password && <span className="help-block text-danger">{errors.password}</span>}
                </div>
                <div className="divider" />
                <div className="form-group">
                  <p className="text-small">By clicking on sign up, you agree to <a href="javascript:;"><i>terms</i></a> and <a href="javascript:;"><i>privacy policy</i></a></p>
                </div>
              </fieldset>

              <div className="card-action no-border text-right">
                <button href="#/login" className="btn">Login</button>
                &nbsp;
                <button disabled={this.state.isLoading} type="submit"  className="btn btn-primary">Sign Up</button>
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
    return(
      <div className="page-login">
        <div className="main-body">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1">
              <SignUp signUpRequest={this.props.actions.signUpRequest}/>
            </div>
          </QueueAnim>
        </div>
      </div>
    );
  }
}

//To get the routers
SignUp.contextTypes = {
  router: PropTypes.object.isRequired
}

SignUp.propTypes = {
  signUpRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  //pass the providers
  return {
    auth: state.auth
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signUpRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(Page);
