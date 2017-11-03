import React from 'react';
import {View,Text,ListView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest,
} from '../../actions';
class ListElements extends React.Component{
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2'])
        };
    }
    componentWillMount(){
        console.log('this.props: ',this.props.actions);
        this.props.actions.programGetRequest();
    }
    render(){
        console.log(this.props.programs);
        return(
            <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}/>
        );
    }
}


function mapStateToProps(state) {
    //pass the providers
    return {
      programs: state.programs
    }
  }
  
  /* Map Actions to Props */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        programGetRequest,
      }, dispatch)
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListElements);