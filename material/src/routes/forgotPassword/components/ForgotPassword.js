import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';

class ForgotPassowrd extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">
            <section className="logo text-center">
              <h1><img src="assets/images/logo.png" alt={this.state.brand} /></h1>
            </section>
            <form>
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Correo electrónico"
                    type="email"
                    fullWidth
                  />
                  <div className="additional-info text-center text-small">
                    Incgresa tu correo electronico principal. Te enviaremos un correo electrónico con tu nueva contraseña para restaurar la contraseña.
                 </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/login" className="color-primary">Inicio de sesión</a>
            <a href="#" className="color-primary">Reset</a>
          </div>
        </div>
      </div>
    );
  }
}

const Page = () => (
  <div className="page-forgot">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <ForgotPassowrd />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;

