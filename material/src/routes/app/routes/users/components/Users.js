import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import QueueAnim from 'rc-queue-anim';

const optionsName = "Usuario";

const MainOptions = () => (
  <article className="article padding-lg-v article-bordered">
    <div className="container-fluid with-maxwidth">
      <div className="row">
        <div className="col-xl-3">

            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">perm_identity</i></a>
                </div>
                <h5>{optionsName}s</h5>
              </div>
            </div>

        </div>
        <div className="col-xl-9">
          <div className="row">

            <div className="col-xl-4">
              <div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;"><i className="material-icons">add</i></a>
                    </div>
                    <h6>Agregar {optionsName}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;"><i className="material-icons">mode_edit</i></a>
                    </div>
                    <h6>Editar {optionsName}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;"><i className="material-icons">remove</i></a>
                    </div>
                    <h6>Eliminar {optionsName}</h6>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </article>
);

const EditOption = () => (
  <article className="article padding-lg-v article-bordered">
    <div className="container-fluid with-maxwidth">
      <div className="row">
        <div className="col-xl-9">

          <div className="box box-default">
            <div className="box-body padding-md">
              <p className="text-info">Ingresa la siguiente información: </p>
              <form role="form">
                <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-md-2 control-label">Primer nombre</label>
                  <div className="col-md-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Ingrese..." />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-md-2 control-label">Segundo nombre</label>
                  <div className="col-md-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Segundo nombre" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-md-2 control-label">Tipo de campo</label>
                  <div className="col-md-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Primer apellido" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-md-2 control-label">Tipo de campo</label>
                  <div className="col-md-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Segundo apellido" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-md-2 control-label">Categoria de campo</label>
                  <div className="col-md-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Privilegio" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-md-2 col-md-10">
                    <RaisedButton label="Agregar" secondary className="btn-w-md" />
                  </div>
                </div>
              </form>

            </div>
          </div>

        </div>
        <div className="col-xl-3">
        </div>
      </div>

    </div>
  </article>
);

const Catalog = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><MainOptions /></div>
      <hr/>
      <div key="2"><EditOption /></div>
    </QueueAnim>

  </div>
);

module.exports = Catalog;
