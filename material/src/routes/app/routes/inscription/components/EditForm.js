import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {inscriptionParticipantGetRequestById, inscriptionGetRequestById, participantGetRequestById, inscriptionUpdateRequest} from '../../../../../actions';
import CircularProgress from 'material-ui/CircularProgress';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.inscriptionParticipantId || '',
      inscriptionParticipant: '',
      participant: '',
      inscription: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this
      .onSubmit
      .bind(this);
    {
      /* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onChange = this
      .onChange
      .bind(this);
  }

  componentWillMount() {
    this
      .props
      .actions
      .inscriptionParticipantGetRequestById(this.props.inscriptionParticipantId)
      .then((inscriptionParticipant) => {
        if (inscriptionParticipant && inscriptionParticipant.data) {
          this.setState({inscriptionParticipant: inscriptionParticipant.data})
          this
            .props
            .actions
            .participantGetRequestById(inscriptionParticipant.data.participant)
            .then((participant) => {
              if (participant && participant.data) {
                this.setState({participant: participant.data})
              }
            })
          this
            .props
            .actions
            .inscriptionGetRequestById(inscriptionParticipant.data.inscription)
            .then((inscription) => {
              if (inscription && inscription.data) {
                this.setState({inscription: inscription.data})
              }
            })
        }
      })
  }

  onSubmit(e) {
    e.preventDefault();
    //reset errors object and disable submit button
    this.setState({errors: {}, isLoading: true});
    let inscription = this.state.inscription;
    this
      .props
      .actions
      .inscriptionUpdateRequest(inscription)
      .then((response)=>{
        if(response && response.data){
          this.props.changeView("VIEW_INSCRIPTIONS");
        }
      })
  }

  onChange(e, value) {
    let inscription = this.state.inscription;
    inscription.status = e.target.value;
    this.setState({inscription});
  }
  render() {

    const {errors} = this.state;
    let {participant, inscription} = this.state;
    if ((participant != '') && (inscription != '')) {
      return (
        <article className="article padding-lg-v article-bordered">
          <div className="container-fluid with-maxwidth">
            <div className="row">
              <div className="col-xl-12">

                <div className="box box-default">
                  <div className="box-body padding-md">
                    <p className="text-info">Inscrition Detail:
                    </p>
                    <form onSubmit={this.onSubmit} role="form">
                      <div className="form-group row">
                        <div className="col-md-3">Primer nombre</div>
                        <div className="col-md-9">
                          {participant.firstName}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Segundo nombre</div>
                        <div className="col-md-9">
                          {participant.secondName}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Primer apellido</div>
                        <div className="col-md-9">
                          {participant.firstLastname}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Segundo apellido</div>
                        <div className="col-md-9">
                          {participant.secondLastname}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Correo electronico</div>
                        <div className="col-md-9">
                          {participant.email}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Fecha de nacimiento</div>
                        <div className="col-md-9">
                          {participant.bornDate}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Tipo de dato</div>
                        <div className="col-md-9">
                          {participant.documentType}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Valor del documento</div>
                        <div className="col-md-9">
                          {participant.documentValue}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Pais de nacionalidad</div>
                        <div className="col-md-9">
                          {participant.nacionality}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Departamento</div>
                        <div className="col-md-9">
                          {participant.department}
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-3">Municipalidad</div>
                        <div className="col-md-9">
                          {participant.municipality}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Comunidad</div>
                        <div className="col-md-9">
                          {participant.community}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Colonia</div>
                        <div className="col-md-9">
                          {participant.colony}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Zona</div>
                        <div className="col-md-9">
                          {participant.zone}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Profesión</div>
                        <div className="col-md-9">
                          {participant.profession}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Dirección</div>
                        <div className="col-md-9">
                          {participant.address}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Telefono</div>
                        <div className="col-md-9">
                          {participant.phone}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Celular</div>
                        <div className="col-md-9">
                          {participant.cellPhone}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">Generoq</div>
                        <div className="col-md-9">
                          {participant.gender}
                        </div>
                      </div>
                      {/* <div className="form-group row">
                        <label htmlFor="status" className="col-md-3 control-label">Status</label>
                        <div className="col-md-9">
                          <select
                            name="status"
                            id="status"
                            onChange={this.onChange}
                            value={inscription.status}
                            className="form-control">
                            <option value="" disabled>Selecciona la Status de inscripcione</option>
                            <option value={0}>False</option>
                            <option value={1}>True</option>
                          </select>
                        </div>
                      </div>

                      <FlatButton
                        label="Cancelar"
                        onTouchTap={this.props.handleCancel}
                        style={{
                        marginRight: 12
                      }}/>
                      <RaisedButton label='Siguiente' primary type='Crear'/> */}

                    </form>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </article>
      );
    } else {
      return (
        <div>
          <CircularProgress
            size={80}
            thickness={5}
            style={{
            marginLeft: '50%',
            left: '-20px'
          }}/>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return null
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      inscriptionParticipantGetRequestById,
      inscriptionGetRequestById,
      participantGetRequestById,
      inscriptionUpdateRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps,)(EditForm);
