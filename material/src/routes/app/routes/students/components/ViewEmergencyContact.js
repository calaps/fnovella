import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'; //Buttons
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetails } from '../../../../../actions';

class EmergencyView extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props.participantId);
    return (
     <div></div>
    );
  }
}



function mapStateToProps(state) {
  //pass the providers
  return {

  }
}

module.exports = connect(
  mapStateToProps,
  null
)(EmergencyView);
