import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';
// import PathSelection from './../../routes/pathSelection/pathSelection.js';
import Login from './../../routes/auth/Login';
import {isSignedIn} from '../../routes/pathSelection/auth';
import {LoggedIn} from '../../routes/pathSelection/LoggedIn'
import {LoggedOut} from '../../routes/pathSelection/LoggedOut'
import CardSection from "../../components/CardSection";
import Spinner from "../../components/Spinner"
import Loader from "../../components/loader/loader"
import ResetPassword from './../../routes/auth/ResetPassword.js';
import MainMenu from './../../routes/mainMenu'
import Profile from './../../routes/ProfileScreen/index'

const routeConfiguration = {
  // PathSelection: { screen: PathSelection },
  login: {
    screen: Login
  },
  reset: {
    screen: ResetPassword
  },
  menu: {
    screen: MainMenu
  },
  Profile: {
    screen: Profile
  }
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
    initialRouteName: 'login'
}

// export const AppScreen = StackNavigator(routeConfiguration, stackNavigatorConfiguration)

export class AppScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: null,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }
  renderContent() {
    switch (this.state.signedIn) {
        case true:
        console.log('true')
            return (
              <LoggedIn />
            );
        case false:
        console.log('false')
            return <LoggedOut />;
        default:
        console.log('default')
            return (
                <Loader />
            );
    }
}
  render () {
    return (
       <View style={{width:'100%',height:'100%'}}>
        {this.renderContent()}
        </View>
    )
  }
}