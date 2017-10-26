import React, {Component} from 'react';
import {StackNavigator,DrawerNavigator} from 'react-navigation';
import {View} from 'react-native';
import Login from './../../routes/auth/Login';
import Spinner from "../../components/Spinner"
import Loader from "../../components/loader/loader"
import ResetPassword from './../../routes/auth/ResetPassword.js';
import MainMenu from './../../routes/mainMenu';
import  HomeScreen from '../../routes/HomeScreen/HomeScreen'
import Profile from './../../routes/ProfileScreen/index'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var authToken;
async function getInitialRoute(){
  var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
      authToken= gettoken;
  });
};

const routeConfiguration = {
  login: {
    screen: Login,
  },
  reset: {
    screen: ResetPassword
  },
  menu:{
    screen: MainMenu,
  },
  Profile: {
    screen: Profile
  }
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
    initialRouteName: 'login',
}

export const AppScreen = StackNavigator(routeConfiguration, stackNavigatorConfiguration);



// const RootNavLogged = StackNavigator({
//   login: {
//     screen: Login,
//   },
//   reset: {
//     screen: ResetPassword
//   },
//   menu:{
//     screen: MainMenu,
//   },
//   Profile: {
//     screen: Profile
//   }
// },{
//    initialRouteName : 'menu'
// });


// const RootNav = StackNavigator({
//   login: {
//     screen: Login,
//   },
//   reset: {
//     screen: ResetPassword
//   },
//   menu:{
//     screen: HomeScreen,
//   },
// },{
//    initialRouteName : 'login'
// });

// class AppScreen extends Component {
//    render(){
//        if (false){
//            return (
//                <RootNavLogged/>
//            ) 
//        } else {
//            return(
//                <RootNav/>
//            ) 
//        }
//    }
// }
// export default connect()(AppScreen)
