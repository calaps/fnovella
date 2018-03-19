import React from 'react';
import {View,ActivityIndicator,StatusBar} from 'react-native';

const Spinner = ({size}) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
            </View>
    )
}

const styles={
    spinnerStyle:{
        padding: StatusBar.currentHeight,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Spinner;