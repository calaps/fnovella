import Login from "./../auth/Login";
import ResetPassword from "./../auth/ResetPassword";
import {StackNavigator} from 'react-navigation';
const routeConfiguration = {
  // PathSelection: { screen: PathSelection },
  login: {
    screen: Login
  },
  reset: {
    screen: ResetPassword
  },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
    initialRouteName: 'login'
}

export const LoggedOut = StackNavigator(routeConfiguration, stackNavigatorConfiguration);