import React from "react";
import { StatusBar, Image,Text} from "react-native";
import {Button,Container,CardItem,  Body,Content,Header,Title,Left,Icon,Right} from "native-base";
import { Card } from 'react-native-material-design';
import {View} from 'react-native';



export default class HomeScreen extends React.Component {
  constructor(props) {
     super(props);
     this.state = { titulo: ' Fundacion F. Novella ',
                    nombre: ' Panel de control ',
                    programas: ' PROGRAMAS ACTIVOS '   };
   }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'#66BB6A'}} >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body/>
          <Right style={{flex: 1, marginRight:0,paddingRight:0,}} >
           <View style={{flex: 1, flexDirection: 'row', marginRight:35}}>
           <Text style={{color:'white', fontWeight: 'bold'}}>Sergio Andres Ramirez </Text>
                <Image source={require('../../img/g1.jpg')} style={{borderRadius: 70,margin:0,padding:0, width:40,height:40, resizeMode: 'contain'}} />

           </View>

          </Right>
        </Header>

        <Content padder>

        <Card
          elevation={7}
          style={{
            paddingLeft:0,
            paddingRight:0,
            height:500
            }}
          >
          <View style={{flex: 1}}>
             <View style={{flex: .65, }}>
               <Image source={require('../../img/dashboard.jpg')} style={{position:'absolute', paddingBottom: 370*.30, resizeMode: 'cover' }} />
               <View style={{
                 flex: 1,
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}>
               <Text style={{textAlign: 'center', fontSize: 35, color:'white'}}>{this.state.titulo}</Text>
               <Text style={{textAlign: 'center', fontSize: 20, color:'white'}}>{this.state.nombre}</Text>
              </View>
             </View>

             <View style={{flex:.35, backgroundColor:'white', justifyContent: 'center',}}>

             <View style={{position:'absolute',width:900,height:1, backgroundColor: 'grey'}} />

             <View style={{flex: 1, backgroundColor:'#00000000',flexDirection: 'column',justifyContent: 'space-between',alignItems: 'center',}}>
               <Text style={{flex: 1 , fontSize: 40, marginTop:5,marginBottom:15 }} >11</Text>
               <Text style={{textAlign: 'center', fontSize: 10, height:25, backgroundColor:'white', borderRadius: 10, paddingLeft:5,paddingTop:5, paddingRight:5,  borderWidth:1,borderColor:'grey'}} >{this.state.programas}</Text>
               <Icon style={{flex: 1, marginTop:20,color:'#12B9C9'}} name="calendar"/>
             </View>

         </View>

           </View></Card>

           <Card
             elevation={7}
             style={{
               paddingLeft:0,
               paddingRight:0,
               height:500
               }}
             >

             <View style={{flex: 1}}>
                <View style={{flex: .65, }}>
                  <Image source={require('../../img/dashboard.jpg')} style={{position:'absolute', paddingBottom: 370*.30, resizeMode: 'cover' }} />
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{textAlign: 'center', fontSize: 35, color:'white'}}>{this.state.titulo}</Text>
                  <Text style={{textAlign: 'center', fontSize: 20, color:'white'}}>{this.state.nombre}</Text>
                 </View>
                </View>

                <View style={{flex:.35, backgroundColor:'white', justifyContent: 'center',}}>

                <View style={{position:'absolute',width:900,height:1, backgroundColor: 'grey'}} />

                <View style={{flex: 1, backgroundColor:'#00000000',flexDirection: 'column',justifyContent: 'space-between',alignItems: 'center',}}>
                  <Text style={{flex: 1 , fontSize: 40, marginTop:5,marginBottom:15 }} >11</Text>
                  <Text style={{textAlign: 'center', fontSize: 10, height:25, backgroundColor:'white', borderRadius: 10, paddingLeft:5,paddingTop:5, paddingRight:5,  borderWidth:1,borderColor:'grey'}} >{this.state.programas}</Text>
                  <Icon style={{flex: 1, marginTop:20,color:'#12B9C9'}} name="calendar"/>
                </View>

            </View>

              </View></Card>



        <Button iconLeft light>
                   <Icon name='arrow-back' />
                   <Text>Back</Text>
                 </Button>
                 <Button iconRight light>
                   <Text>Next</Text>
                   <Icon name='arrow-forward' />
                 </Button>
                 <Button iconLeft>
                   <Icon name='home' />
                   <Text>Home</Text>
                 </Button>
                 <Button iconLeft transparent primary>
                   <Icon name='beer' />
                   <Text>Pub</Text>
                 </Button>
                 <Button iconLeft dark>
                   <Icon name='cog' />
                   <Text>Settings</Text>
                 </Button>


        <Button iconLeft light>
                   <Icon name='arrow-back' />
                   <Text>Back</Text>
                 </Button>
                 <Button iconRight light>
                   <Text>Next</Text>
                   <Icon name='arrow-forward' />
                 </Button>
                 <Button iconLeft>
                   <Icon name='home' />
                   <Text>Home</Text>
                 </Button>
                 <Button iconLeft transparent primary>
                   <Icon name='beer' />
                   <Text>Pub</Text>
                 </Button>
                 <Button iconLeft dark>
                   <Icon name='cog' />
                   <Text>Settings</Text>
                 </Button>

          <Card>
            <CardItem>
              <Body>
                <Text>Chat App to talk some awesome people!</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Chat")}
          >
            <Text>Chat With People</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text>Goto Profiles</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
