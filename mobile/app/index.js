import React ,{Component} from 'react';
import { Text, View} from 'react-native';
import { Font } from 'expo';
import { AppScreen } from './layouts/AppScreen/AppScreen.js';
import   Loader  from './components/loader/loader.js';

export default class AppRoute extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false,
    }

  }

  async componentWillMount() {
    await Font.loadAsync({
        'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto_medium': require('./assets/fonts/Roboto-Bold.ttf'),
        'RobotoMedium': require('./assets/fonts/Roboto-Bold.ttf'),
        'ProximaNova-Regular': require('./assets/fonts/ProximaNova-Regular.ttf'),
        'ProximaNova-Bold': require('./assets/fonts/ProximaNova-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Verdana': require('./assets/fonts/Verdana.ttf'),
        'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
        'Muller-Regular': require('./assets/fonts/muller_regular.ttf'),
    });
 
    this.setState({ fontLoaded: true });
  }


  render(){
    return (

      this.state.fontLoaded ?
      <AppScreen />
        :<Loader/>

    );
  }
}
