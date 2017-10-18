import React from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import styles from './styles';

class Loader extends React.Component {
  render() {
    let {animating} = this.props;

    return (
      <View style={styles.activityIndicatorParent}>
        <ActivityIndicator
          animating={animating}
          style={[styles.centering, {height: 80}]}
          size="large"
          color = 'rgba(0,0,0,0.7)'
        />
      </View>
    )
  }
}

export default Loader;
