import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
export default StyleSheet.create({
  activityIndicatorParent : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'rgba(0,0,0,0.2)',
    width : window.width ,
     height : window.height,
    // flex : 1,
     position : 'absolute',
     left : 0,
     top : 0
  }
});
