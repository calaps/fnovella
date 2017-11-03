import React from 'react';
import {View, Text} from 'react-native';
import {Badge} from 'native-base';
class ListItem extends React.Component {
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                borderWidth:1,
                margin:5,
                padding:5,
                // justifyContent:'center',
                alignItems:'center'
            }}>
                <Text
                    style={{width:'10%',fontSize:15}}
                >{this.props.userData.id}</Text>
                <Text
                    style={{width:'80%',fontSize:20}}
                >{this.props.userData.firstName + " " + this.props.userData.firstLastName} {'\n'}
                    <Text
                    style={{width:'80%',fontSize:15,color:'grey'}}>{this.props.userData.email}</Text>
                </Text>
                <Badge 
                primary={this.props.userData.gender==='male'?true:false} 
                danger={this.props.userData.gender==='female'?true:false}
                 ><Text
                style={{color:'white',justifyContent:'center',alignItems:'center'}}
                >{this.props.userData.gender==='male'?'M':'F'}</Text></Badge>
            </View>
        );
    }
}

export default ListItem;