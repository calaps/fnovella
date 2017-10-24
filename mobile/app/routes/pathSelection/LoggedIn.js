import Profile from "../ProfileScreen/Profile";
import MainMenu from "../mainMenu/index";
import {StackNavigator} from 'react-navigation';
const routeConfiguration = {
  // PathSelection: { screen: PathSelection },
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
    initialRouteName: 'menu'
}

export const LoggedIn = StackNavigator(routeConfiguration, stackNavigatorConfiguration);