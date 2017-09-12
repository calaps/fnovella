import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand,
      identifier: '',
      password: '',
      errors: []
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
  }
  validator(){
    console.log("validación");
    if(this.state.identifier == ''|| this.state.password == ''){
      this.setState({ errors: ["Todos los campos son necesarios"]});
    } else {
      this.setState({ errors: []});
      {/* Server side validation login, send user json object */}
      axios.post('http://happy_feet', { user: this.state})
        .then(function (response) {
          {/* Conection start */}
          console.log(response);
        })
        .catch(function (error) {
          {/* API connection error */}
        });


    }
  }
  onSubmit(e) {
    e.preventDefault();
    this.validator();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  displayErrors(){
      if(this.state.errors.length > 0){
        return(
          <div className="alert alert-danger">
          {
            this.state.errors.map((error, index) =>
              <p key={index}>{error}</p>
            )
          }
          </div>
        );
      } else {
        return(null);
      }
  }

  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <h1><img src="assets/images/logo.png" alt={this.state.brand} /></h1>
            </section>

            { this.displayErrors() }

            <form onSubmit={this.onSubmit} className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    name="identifier"
                    floatingLabelText="Correo electrónico"
                    value={this.state.identifier}
                    onChange={this.onChange}
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    name="password"
                    floatingLabelText="Contraseña"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    fullWidth
                    />
                </div>
              </fieldset>
              <div className="card-action no-border text-right">
                <button type="submit" className="btn btn-primary">Inicio de sesión</button>
              </div>
            </form>
          </div>
        </div>

        <div className="additional-info">
          <a href="#/forgot-password">Ha olvidado su contraseña?</a>
        </div>

      </div>
    );
  }
}

const Page = () => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <Login />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
