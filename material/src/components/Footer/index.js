import React from 'react';
import APPCONFIG from 'constants/Config';
import { Link } from 'react-router';

class Footer extends React.Component {
  render() {
    return (
      <section className="app-footer">
        <div className="container-fluid">
          <span className="float-left">
            <span>Todos los derechos reservados © <a className="brand" target="_blank" href={APPCONFIG.productLink}>{APPCONFIG.brand}</a> {APPCONFIG.year}</span>
          </span>
          <span className="float-right">
            <span><a href={APPCONFIG.developerLink}>Calaps.com</a></span>
          </span>
        </div>
      </section>
    );
  }
}

module.exports = Footer;
