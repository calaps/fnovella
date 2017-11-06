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

  class DetailsBox extends React.Component{
      render(){
          return (
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
                // flex: 1,
                backgroundColor: '#00000000',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Icon
                  style={{
                  marginTop: 20,
                  color: '#66BB6A'
                }}
                  name={this.props.detailsBox.icon}/>
                  <Text style={{
                    fontSize:24,
                    color:'black',
                  }}>{this.props.detailsBox.title}</Text>
                  <Text style={{
                    textAlign:'center',
                    padding:10,
                    paddingRight:20,
                    paddingLeft:20,
                    color:'grey',
                  }}>{this.props.detailsBox.desc}</Text>
            </View>
          </Card>
          );
      }
  }

  export default DetailsBox;