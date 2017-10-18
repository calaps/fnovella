/* eslint-disable global-require */

import { Platform } from 'react-native';

let config = {};

if(__DEV__){
  config = {
      API_URL: "http://192.168.8.100:3002",
      DEVICE_TYPE: (Platform.OS === 'ios')?'IOS':'ANDROID'
    };
}else{
  config = {
      API_URL: "https://abc.com",
      DEVICE_TYPE: (Platform.OS === 'ios')?'IOS':'ANDROID'
    };
}

export default config;
