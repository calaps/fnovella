import React from 'react';
import {View, Text, ListView, TextInput, Picker} from 'react-native';
import {Button, Item} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AppHeader from '../../components/header/AppHeader'
import ListElements from './ListElements';
import {styles} from './styles';
import {usersGetRequestBySearch} from '../../actions';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            inputValue: '',
            Id: '',
            Name: '',
            Code: ''
        }
        this.onChangeText = this
            .onChangeText
            .bind(this);
    }
    componentWillMount(){
        this.props.actions.usersGetRequestBySearch();
    }
    onChangeText() {
        console.log("On Change Selected", this.state.selected, this.state.inputValue)
        switch (this.state.selected) {
            case "Id":
                this
                    .props
                    .actions
                    .usersGetRequestBySearch(this.state.inputValue, null, null);
                break;
            case "Name":
                this
                    .props
                    .actions
                    .usersGetRequestBySearch(null, this.state.inputValue, null);
                break;
            case "Code":
                this
                    .props
                    .actions
                    .usersGetRequestBySearch(null, null, this.state.inputValue);
                break;
            default:
                this
                    .props
                    .actions
                    .usersGetRequestBySearch(null, null, null);
                break;
        }
    }
    render() {
        return (
            <View>
                <AppHeader navigation={this.props.navigation}/>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TextInput
                        onChangeText={(inputValue) => this.setState({inputValue})}
                        value={this.state.inputValue}
                        onBlur={this.onChangeText}
                        underlineColorAndroid='transparent'
                        style={styles.searchInputStyle}/>
                    <Picker
                        style={styles.searchPickerStyle}
                        iosHeader="Select one"
                        mode="dropdown"
                        note={false}
                        selectedValue={this.state.selected}
                        onValueChange={(value) => {
                        this.setState({selected: value})
                    }}>
                        <Item label="" value=""/>
                        <Item label="Id" value="Id"/>
                        <Item label="Name" value="Name"/>
                        <Item label="Code" value="Code"/>
                    </Picker>
                </View>

                <ListElements users={this.props.users}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    //pass the providers
    return {users: state.users}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            usersGetRequestBySearch
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);