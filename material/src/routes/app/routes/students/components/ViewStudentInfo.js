import React from 'react';

class ViewStudentInfo extends React.Component {
    render(){
        return(
                <article className="article padding-lg-v article-bordered">
                  <div className="container-fluid with-maxwidth">
                    <div className="row">
                      <div className="col-xl-12">
          
                        <div className="box box-default">
                          <div className="box-body padding-md">
                            <p className="text-info">Información: </p>
                  
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer nombre</label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.firstName}
                                    />
                                </div>
                              </div>
          

                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo nombre </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.secondName}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Primer apellido </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.firstLastname}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Segundo apellido </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.secondLastname}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Correo electronico </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.email}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Fecha de nacimiento </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.bornDate}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Tipo de dato </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.documentType}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Valor del documento </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.documentValue}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Nacionalidad </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.nacionality}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Departamento </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.department}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Municipalidad </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.municipality}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Comunidad </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.community}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Colonia </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.colony}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Zona </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.zone}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Profesión </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.profession}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Dirección </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.address}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Telefono </label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.phone}
                                    />
                                </div>
                              </div>

                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Celular</label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.cellPhone}
                                    />
                                </div>
                              </div>
                              
                              <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-md-3 control-label">Genero</label>
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    
                                    
                                    value={this.props.participantData.gender}
                                    />
                                </div>
                              </div>

                          </div>
                        </div>
          
                      </div>
          
                    </div>
          
                  </div>
                </article>
             
        )
    }
}

export default ViewStudentInfo;