import React from 'react';
import {View,Text,ListView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  usersGetRequestBySearch,
} from '../../actions';
import ListItem from './ListItem';


class ListElements extends React.Component{
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        //console.log('this.props: ',this.props.actions);
    }
    render(){
        //console.log(this.props.users);
        return(
            <View>
                {this.props.users.map((user)=>{
                    return <ListItem key={user.id} userData={user} />
                })}
            </View>
        );
    }
}


  
export default ListElements;