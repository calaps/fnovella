import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";


export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('@Axle:token')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
