import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import {View, AsyncStorage} from 'react-native';
import Login from './../../routes/auth/Login';
import Spinner from "../../components/Spinner"
import Loader from "../../components/loader/loader"
import ResetPassword from './../../routes/auth/ResetPassword.js';
import MainMenu from './../../routes/mainMenu';
import HomeScreen from '../../routes/HomeScreen/HomeScreen'
import Profile from './../../routes/ProfileScreen/index'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// var authToken; async function getInitialRoute(){  
//   var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{       authToken=
// gettoken;   }); }; const routeConfiguration = {   login: {     screen: Login,
//   },   reset: {     screen: ResetPassword   },   menu:{     screen:
// MainMenu,   },   Profile: {     screen: Profile   } } // going to disable the
// header for now const stackNavigatorConfiguration = {   headerMode: 'none',
// initialRouteName: 'login', } export const AppScreen =
// StackNavigator(routeConfiguration, stackNavigatorConfiguration);

const RootNavLogged = StackNavigator(
  {
    menu: { screen: MainMenu } ,
    Profile: {screen: Profile},
  }, 
  {
    initialRouteName: 'menu'
  }
);

const RootNav = StackNavigator({
  login: {
    screen: Login,
  },
  menu: {
    screen: MainMenu
  },
  reset: {
    screen: ResetPassword
  },
}, {initialRouteName: 'login'});

class AppScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null
    };
    this.activeView = this.activeView.bind(this);
  }

  async componentWillMount() {
    var token = await AsyncStorage
      .getItem('@Axle:token')
      .then((gettoken) => {
        if (gettoken) {
          this.setState({isLogin: true});
        } else {
          this.setState({isLogin: false});
        }
      });
  }

  activeView() {
    console.log('login: ',this.state.isLogin);
    switch (this.state.isLogin) {
      case true:
        return <RootNavLogged changeView={this.componentWillMount}/>;

      case false:
        return <RootNav changeView={this.componentWillMount}/>

      default:
        return <Loader/>
    }
  }

  render() {
    return (
      <View style={{width:'100%',height:'100%'}}>
        {this.activeView()}
       </View>
    )
  }
}
export default connect()(AppScreen)
