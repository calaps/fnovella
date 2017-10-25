import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';
// import PathSelection from './../../routes/pathSelection/pathSelection.js';
import Login from './../../routes/auth/Login';
import CardSection from "../../components/CardSection";
import Spinner from "../../components/Spinner"
import Loader from "../../components/loader/loader"
import ResetPassword from './../../routes/auth/ResetPassword.js';
import MainMenu from './../../routes/mainMenu'
import Profile from './../../routes/ProfileScreen/index'

var authToken;
var initialRoute;
async function getToken(){
  var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
      authToken= gettoken;
  });
}
if(authToken){
  initialRoute = 'menu'
}else {
  initialRoute = 'login'
}
console.log(initialRoute)
const routeConfiguration = {
  // PathSelection: { screen: PathSelection },
  login: {
    screen: Login,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  reset: {
    screen: ResetPassword
  },
  menu: {
    screen: MainMenu,
  },
  Profile: {
    screen: Profile
  }
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
    initialRouteName: initialRoute
}

export const AppScreen = StackNavigator(routeConfiguration, stackNavigatorConfiguration)

// export class AppScreen extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       signedIn: null,
//       checkedSignIn: false
//     };
//   }

//   componentWillMount() {
//     isSignedIn()
//       .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
//       .catch(err => alert("An error occurred"));
//   }
//   renderContent() {
//     switch (this.state.signedIn) {
//         case true:
//         console.log('true')
//             return (
//               <LoggedIn />
//             );
//         case false:
//         console.log('false')
//             return <LoggedOut />;
//         default:
//         console.log('default')
//             return (
//                 <Loader />
//             );
//     }
// }
//   render () {
//     return (
//        <View style={{width:'100%',height:'100%'}}>
//         {this.renderContent()}
//         </View>
//     )
//   }
// }