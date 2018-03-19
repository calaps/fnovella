import { StyleSheet , Dimensions } from 'react-native';
import common from './../../config/common.js';


let window = Dimensions.get("window");

export default StyleSheet.create({
    btnLogin: {
      height: 50,
      position:'absolute',
      width : window.width - (common.marginHorizontal + common.marginHorizontal),
    }

});
