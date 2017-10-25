import React from 'react';
import {View,Text} from 'react-native';

class Footer extends React.Component{
    render(){
        return(
            <View style={{
                alignItems:'center',
                justifyContent:'center',
                marginTop:0,
                marginBottom:20,
            }}>
                <Text
                style={{
                    fontSize:12,
                }}
                >Todos los derechos reservados ©
                    <Text
                    style={{
                        fontWeight:'bold'
                    }}
                    > CARLOS F. NOVELLA </Text>2017</Text>
                </View>
        )
    }
}

export default Footer;