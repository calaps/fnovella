import React from "react";
import {StatusBar, Image, Text, TouchableHighlight} from "react-native";
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
import {View} from 'react-native';
import {Root} from 'native-base'
import {NativeModules, processColor} from 'react-native';

import AppHeader from '../../components/header/AppHeader'
import images from './../../configs/images';

const Item = Picker.Item;
const {StatusBarManager} = NativeModules;

class HomeScreen extends React.Component {
  componentDidMount() {
    StatusBarManager.setColor(processColor('#000000'), false);
  }
  constructor(props) {
    super(props);
    this.values = {
      titulo: ' Fundacion F. Novella ',
      nombre: ' Panel de control ',
      programas: ' PROGRAMAS ACTIVOS '
    };
    this.state = {
      selected1: "key0"
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
    return (
      <Container>
        <AppHeader navigation={this.props.navigation} />
        <Content padder>

          <Card
            elevation={7}
            style={{
            paddingLeft: 0,
            paddingRight: 0,
            height: 500
          }}>

            <View style={{
              flex: 1
            }}>
              <View style={{
                flex: .65
              }}>
                <Image
                  source={images.dashboard}
                  style={{
                  position: 'absolute',
                  paddingBottom: 370 *.30,
                  resizeMode: 'cover'
                }}/>
                <View
                  style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text
                    style={{
                    textAlign: 'center',
                    fontSize: 35,
                    color: 'white'
                  }}>{this.values.titulo}</Text>
                  <Text
                    style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'white'
                  }}>{this.values.nombre}</Text>
                </View>
              </View>

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
                  }}>11</Text>
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
                  }}>{this.values.programas}</Text>
                  <Icon
                    style={{
                    flex: 1,
                    marginTop: 20,
                    color: '#12B9C9'
                  }}
                    name="calendar"/>
                </View>

              </View>

            </View>
          </Card>

          <Card
            elevation={7}
            style={{
            paddingLeft: 0,
            paddingRight: 0,
            height: 500
          }}>

            <View style={{
              flex: 1
            }}>
              <View style={{
                flex: .65
              }}>
                <Image
                  source={images.dashboard}
                  style={{
                  position: 'absolute',
                  paddingBottom: 370 *.30,
                  resizeMode: 'cover'
                }}/>
                <View
                  style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text
                    style={{
                    textAlign: 'center',
                    fontSize: 35,
                    color: 'white'
                  }}>{this.values.titulo}</Text>
                  <Text
                    style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'white'
                  }}>{this.values.nombre}</Text>
                </View>
              </View>

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
                  }}>11</Text>
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
                  }}>{this.values.programas}</Text>
                  <Icon
                    style={{
                    flex: 1,
                    marginTop: 20,
                    color: '#12B9C9'
                  }}
                    name="calendar"/>
                </View>

              </View>

            </View>
          </Card>

        </Content>
      </Container>
    );
  }
}
export default HomeScreen;