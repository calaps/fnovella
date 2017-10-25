import React from 'react';
import {
    Button,
    Container,
    CardItem,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right,
    Picker,
    Form,
    Item as FormItem
  } from "native-base";
  import {Card} from 'react-native-material-design';
  import {View,Text} from 'react-native';
  import {Root} from 'native-base'  

class StatusBox extends React.Component{
    render() {
        return(   
          <Card
          elevation={7}
          style={{
          marginTop:0,
          paddingLeft: 0,
          paddingRight: 0,
          marginBottom: 10,
          height: 200
        }}>
          <View
            style={{
            flex: .35,
            backgroundColor: 'white',
            justifyContent: 'center'
          }}>

            <View
              style={{
              position: 'absolute',
              width: 900,
              height: 1,
              backgroundColor: 'grey'
            }}/>

            <View
              style={{
              flex: 1,
              backgroundColor: '#00000000',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text
                style={{
                flex: 1,
                fontSize: 40,
                marginTop: 5,
                marginBottom: 15
              }}>{this.props.statusBox.number}</Text>
              <Text
                style={{
                textAlign: 'center',
                fontSize: 10,
                height: 25,
                backgroundColor: 'white',
                borderRadius: 10,
                paddingLeft: 5,
                paddingTop: 5,
                paddingRight: 5,
                borderWidth: 1,
                borderColor: 'grey'
              }}>{this.props.statusBox.title}</Text>
              <Icon
                style={{
                flex: 1,
                marginTop: 20,
                color: '#12B9C9'
              }}
                name={this.props.statusBox.icon}/>
            </View>
          </View>
        </Card>
        );
    }
}

export default StatusBox;