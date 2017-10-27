import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton'; //Buttons
import EditProfile from './EditProfile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetails } from '../../../../../../../actions';


const mWidthStyle = {
  minWidth: '135px'
}; //Buttons

const Hero = () => (
  <section className="hero hero-bg-img" style={{ backgroundImage: 'url(assets/images/background/bg4.jpg)' }}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Mi perfil</h1>
      </div>
    </div>
  </section>
);

class Information extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    var {user} = this.props;
    console.log(user);
    return(
      <div className="col-md-4">
        <section className="stat-item">
          <span className="stat-desc">Información</span>
        </section>
        <strong>Tipo de privilegio: </strong><span>Administrador</span><br />
        <strong>Nombre completo: </strong><span>{user?(user.firstName + ' ' + user.firstLastName):' '}</span><br />
        <strong>Email: </strong><span>{user?user.email:' '}</span><br />
        <strong>Fecha de nacimiento: </strong><span>{user?user.bornDate:' '}</span><br />
        <strong>Nacionalidad: </strong><span>{user?user.nationality:' '}</span><br />
        <strong>Departamento: </strong><span>{user?user.department:' '}</span><br />
        <strong>Genero: </strong><span>{user?user.gender:' '}</span><br />
        <strong>Codigo de cempro: </strong><span>{user?user.cemproCode:' '}</span>
      </div>
    )
  }
}

class Info extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: "EDIT_PRFILE"
    };
    this.activeView = this.activeView.bind(this);
  }
  activeView() {
    var {user} = this.props;
    switch (this.state.active) {
      case "INFO":
        return <Information user={user} />;
      case "EDIT_PRFILE":
        return <EditProfile/>;
      case "RESET_PASSWORD":
      //return reset password;
      default:
        return null;
    }
  }
  render() {
    var {user} = this.props;
    console.log(user);
    return (
      <div className="container-fluid with-maxwidth">
        <article className="article">
          <div className="row stat-container">
            <div className="col-md-4">
              <section className="stat-item">
                <span className="stat-desc">{user?(user.firstName + ' ' + user.firstLastName):' '}</span>
              </section>
              <img className="calaps-profile" src="assets/images/dummyUser.png" alt="User profile pic" />
            </div>
            {this.activeView()}
            <div className="col-md-4">
              <section className="stat-item">
                <span className="stat-desc">Opciones</span>
              </section>
              <RaisedButton style={mWidthStyle} label="Cambiar contraseña" primary /><div className="divider" />
              <RaisedButton style={mWidthStyle} label="Editar mi información" primary /><div className="divider" />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
    <section className="page-about chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><Hero /></div>
        <div key="2"><Info user={this.props.auth.user} /></div>
      </QueueAnim>
    </section>
    );
  }
}


function mapStateToProps(state) {
  //pass the providers
  return {
    auth: state.auth
  }
}

module.exports = connect(
  mapStateToProps,
  null
)(Profile);
