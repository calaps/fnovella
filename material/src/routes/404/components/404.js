import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Error404 = () => (
  <div className="err-container text-center">
    <div className="err">
      <h1>404</h1>
      <h2>Esta página no existe</h2>
    </div>

    <div className="err-body">
      <a href="#/" className="btn btn-raised btn-lg btn-default">
          Regresar a inicio
        <br/><br/>
        <img className="bottom" src="assets/images/logo_white.png"/>
      </a>
    </div>
  </div>
);

const Page = () => (
  <div className="page-err">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        <Error404 />
      </div>
    </QueueAnim>
  </div>
);

module.exports = Page;
