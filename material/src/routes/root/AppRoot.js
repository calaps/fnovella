import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from  'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import { getUserDetails } from './../../actions';

class AppRoot extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentWillMount(){
    const token = localStorage.getItem('@fnovella:token');
    if(token){
      let response = this.props.actions.getUserDetails(token);
      if(response){
        this.context.router.push('/app/dashboard');
      }
      else{
        localStorage.removeItem('@fnovella:token');
        this.context.router.push('/login');
      }
    }
  }

  render(){
    return(
      <div>
        <CircularProgress size={80} thickness={5}
                          style={{marginLeft: '50%',left:'-20px'}}
        />
      </div>
      )
  }
}

//To get the routers
AppRoot.contextTypes = {
  router: PropTypes.object.isRequired
};

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators({
      getUserDetails
    }, dispatch)
  };
}

/* Connect Component with Redux */
module.exports = connect(null, mapDispatchToProps)(AppRoot);
