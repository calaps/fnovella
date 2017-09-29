import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import data_types from '../../../../../constants/data_types';
import map from "Lodash/map"; //to use map in a object


class EditForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const options = map(data_types, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-9">

              <div className="box box-default">
                <div className="box-body padding-md">
                  <p className="text-info">Ingresa la siguiente información: </p>
                  <form role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Nombre de campo</label>
                      <div className="col-md-9">
                        <input type="text" className="form-control" id="inputEmail3" placeholder="eje: altura" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                      <div className="col-md-9">
                        <select
                          type="text"
                          name="timeZone"
                          onChange={this.onChange}
                          className="form-control"
                        >
                          <option value="" disabled>Selecciona el tipo de dato</option>
                          {options}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Categoria que pertenece</label>
                      <div className="col-md-9">
                        <input type="text" className="form-control" id="inputEmail3" placeholder="eje: fisico" />
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
  }
}

module.exports = EditForm;
