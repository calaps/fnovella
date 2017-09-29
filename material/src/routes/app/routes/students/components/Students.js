import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import QueueAnim from 'rc-queue-anim';

const optionsName = "Participantes";

const MainOptions = () => (
  <article className="article padding-lg-v article-bordered">
    <div className="container-fluid with-maxwidth">
      <div className="row">
        <div className="col-xl-3">

            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">supervisor_account</i></a>
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
              <h5 className="text-info">Agregar usuario: </h5>
              <p className="text-info">Ingresa la siguiente información: </p>
              <form role="form">
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="first_name" placeholder="Primer nombre..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="sencond_name" placeholder="Segundo nombre..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="first_lastname" placeholder="Primer apellido..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Segundo apellido..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Prilegio..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Fecha de nacimiento..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Tipo de coumento de identificación..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Numero de documento de identificación..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Nacionalidad..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Departamento..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Profesión..." />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Dirección..." />
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

const Students = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><MainOptions /></div>
      <hr/>
      <div key="2"><EditOption /></div>
    </QueueAnim>

  </div>
);

module.exports = Students;
