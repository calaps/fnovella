import React from 'react';
import {View, Text, ListView, TextInput, Picker} from 'react-native';
import {connect} from 'react-redux';
import {Button, Item} from 'native-base';
import AppHeader from '../../components/header/AppHeader'
import ListElements from './ListElements';
import {styles} from './styles';

class Program extends React.Component {
    state = {
        selected1: ''
    }
    render() {
        return (
            <View>
                <AppHeader navigation={this.props.navigation}/>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TextInput underlineColorAndroid='transparent' style={styles.searchInputStyle}/>
                    <Picker
                        style={styles.searchPickerStyle}
                        iosHeader="Select one"
                        mode="dropdown"
                        note={false}
                        selectedValue={this.state.selected1}
                        onValueChange={(value) => {
                        this.setState({selected1: value})
                    }}>
                        <Item label="Id" value="key0"/>
                        <Item label="Name" value="key1"/>
                        <Item label="Code" value="key2"/>
                    </Picker>
                </View>
                
                <ListElements/>
            </View>
        );
    }
}

export default Program;