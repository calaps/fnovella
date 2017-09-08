import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton'; //Buttons

const mWidthStyle = {
  minWidth: '135px'
}; //Buttons

const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images/background/bg4.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Mi perfil</h1>
      </div>
    </div>
  </section>
);

const Info = () => (
  <div className="container-fluid with-maxwidth">
    <article className="article">
      <div className="row stat-container">
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-desc">Sergio Andres Ramirez</span>
          </section>
          <img className="calaps-profile" src="assets/images/g1.jpg" alt="User profile pic" />
        </div>
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-desc">Información</span>
          </section>
          <strong>Tipo de privilegio: </strong><span>Administrador</span><br/>
          <strong>Nombre completo: </strong><span>Juan Pablo Ortiz</span><br/>
          <strong>Email: </strong><span>jp@calaps.com</span><br/>
          <strong>Fecha de nacimiento: </strong><span>2'/02/1997</span><br/>
          <strong>Nacionalidad: </strong><span>Guatemalteco</span><br/>
          <strong>Departamento: </strong><span>Guatemala</span><br/>
          <strong>Genero: </strong><span>Masculino</span><br/>
          <strong>Codigo de cempro: </strong><span>00001</span>
        </div>
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

const Profile = () => (
  <section className="page-about chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><Info /></div>
    </QueueAnim>
  </section>
);

module.exports = Profile;
