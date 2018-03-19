import React from "react";
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import FlatButton from 'material-ui/FlatButton'; // For Buttons

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: '',
      name: '',
      errors: {},
      isLoading: false
    };
    { /* Makes a Bind of the actions, onChange, onSummit */ }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    //Sumit Stuff...
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="col-md-6">
        <section className="stat-item">
          <span className="stat-desc">Ingresa nueva información</span>
        </section>

        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-12">

                  <form onSubmit={this.onSubmit} role="form">
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer nombre</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: Diego"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer Apellido</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: Campos"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: DPI"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Valor del documento</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: 00001"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Departamento</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: Guatemala"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Municipalidad</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="eje: Mixco"/>
                        {errors.name && <span className="help-block text-danger">{errors.name}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Comunidad</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                          placeholder="eje: km 18.5 carretera a progreso"/>
                        {errors.address && <span className="help-block text-danger">{errors.address}</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Profesión</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: Coordinador"/>
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Dirección</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: km 15.4"/>
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-md-3 control-label">Telefono celular</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          id="alias"
                          name="alias"
                          value={this.state.alias}
                          onChange={this.onChange}
                          placeholder="eje: 3454545"/>
                        {errors.alias && <span className="help-block text-danger">{errors.alias}</span>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-md-3 col-md-10">
                        <FlatButton disabled={this.state.isLoading}
                                    label='Cancelar'
                                    style={{marginRight: 12}}
                                    onTouchTap={this.handleCancel}
                                    secondary className="btn-w-md"/>
                        <RaisedButton disabled={this.state.isLoading} type="submit"
                                      label={this.state.isEditing ? 'Actualizar' : 'Añadir'}
                                      secondary className="btn-w-md"/>
                      </div>
                    </div>
                  </form>


            </div>


          </div>


        </div>


      </div>
    );
  }
}

module.exports = EditProfile;
