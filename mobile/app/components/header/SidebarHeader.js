import {StatusBar, Image, Text, TouchableHighlight} from "react-native";
import React from 'react';
import {
  Button,
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
import {View} from 'react-native';
import {Root} from 'native-base'
import images from './../../configs/images';

const Item = Picker.Item;

class SidebarHeader extends React.Component {
    constructor(props) {
        super(props);
        this.values = {
          titulo: ' Fundacion F. Novella ',
          nombre: ' Panel de control ',
          programas: ' PROGRAMAS ACTIVOS '
        };
        this.state = {
          selected1: "key1"
        };
      }
      onValueChange(value) {
        console.log("value " + value);
        this.setState({selected1: value});
        if (value == 'key0') {
          this
            .props
            .navigation
            .navigate("Home");
        }
        if (value == 'key1') {
          this
            .props
            .navigation
            .navigate("Profile");
        }
        if (value == 'key2') {
          this
            .props
            .navigation
            .navigate("Chat");
        }
      }
    
    render() {
        return(
            <Header
            androidStatusBarColor='#66BB6A'
            style={{
            backgroundColor: '#66BB6A',
            marginTop: StatusBar.currentHeight,
            padding: 0,
          }}>
          <View style={{height:'100%',width:'100%',margin:10}}>
            <Image 
             style={{alignSelf:'center'}}
            source={images.sidebarLogo} />
            </View>
          </Header>
  
        );
    }
}

export  {SidebarHeader};