import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput,Dimensions} from 'react-native';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
// import config from './../../config/config';

/* Actions */
import { loginRequest } from './../../actions/auth';

let self;
let window = Dimensions.get("window");
class Login extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
    this.state = {

    }


  }

  render(){
    // const { navigate, goBack } = this.props.navigation;
    return (
      <View >
          LOGIN
      </View>
    )
  }
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginRequest
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(Login)