import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'; //Buttons
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {participantContactByParticipantIdGetRequest} from '../../../../../actions';

let self;

const mWidthStyle = {
  minWidth: '135px'
};

class EmergencyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participantId: this.props.participantId
    };
    self = this;
  }

  componentWillMount() {
    this.props.actions.participantContactByParticipantIdGetRequest(this.state.participantId);

  }

  render() {
    console.log(this.props.participantContacts.content);
    return (
      <div className="container-fluid with-maxwidth">
        <article className="article">
          <div className="row stat-container">
            {/*<div className="col-md-4">
              <section className="stat-item">
                <span className="stat-desc">{user ? (user.firstName + ' ' + user.firstLastName) : ' '}</span>
              </section>
              <img className="calaps-profile" src="assets/images/dummyUser.png" alt="User profile pic"/>
            </div>*/}
            <div className="col-sm-8">
              <section className="stat-item">
                <span className="stat-desc">Emergency Información</span>
              </section>
              <strong>Nombre
                completo: </strong><span>{this.props.participantContacts.content ? (this.props.participantContacts.content[0].firstName + ' ' + this.props.participantContacts.content[0].firstLastname) : ' '}</span><br/>
              <strong>Tellphone: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].tellphone : ' '}</span><br/>
              <strong>CellPhone: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].cellphone : ' '}</span><br/>
              <strong>Email: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].email : ' '}</span><br/>
              <strong>Address: </strong><span>{this.props.participantContacts.content ? this.props.participantContacts.content[0].address : ' '}</span><br/>
            </div>
            {/*<div className="col-md-4">
              <section className="stat-item">
                <span className="stat-desc">Opciones</span>
              </section>
              <RaisedButton style={mWidthStyle} label="Cambiar contraseña" primary/>
              <div className="divider"/>
              <RaisedButton style={mWidthStyle} label="Editar mi información" primary/>
              <div className="divider"/>
            </div>*/}
          </div>
        </article>
      </div>
  )
  }
}


function mapStateToProps(state) {
  //pass the providers
  return {
    participantContacts: state.participantContacts
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      participantContactByParticipantIdGetRequest,
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(EmergencyView);
