import React from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

/* Actions */
import { getUserDetails } from './../actions';

class PathSelector extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoaded: true,
      userDataReceived: false,
      publicRoutes: ['/login', '/sign-up']
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.onRouteUpdate = this.onRouteUpdate.bind(this);
  }

  async componentWillMount(){

    console.log("-*-*-*-*-* RUNNING COMPONENT WILL MOUNT *-*-*-*-");

    const token = localStorage.getItem('@fnovella:token')

    if(token && !this.props.auth.user){
      console.log("TOKEN IN STORAGE: ",token );
      let response = await this.props.actions.getUserDetails(token);
      console.log("GOT REPSONSE");
      if(response){
        // navigate to dashboard
        console.log("going to dashboard");
        this.props.history.push('/app/dashboard');
      }
      else{
        console.log("TOKEN EXPIRED OR INCORRECT");
        localStorage.removeItem('@fnovella:token')
        // navigate to login
        console.log("going to login");
        this.props.history.push('/login');
      }
    }
    else if(token && this.props.auth.user){
      // do nothing, let him go
    }
    else{
      console.log("NO TOKEN IN STORAGE: ", this.props.history.getCurrentLocation());
      // check if going to public state
      if(this.state.publicRoutes.indexOf(this.props.history.getCurrentLocation().pathname) >= 0){
        // let him go
        console.log("going to public, letting go");
      }
      else{
        // navigate to login
        console.log("going to login");
        this.props.history.push('/login');
      }
    }

  }

  // async componentDidMount() {
  //   this.setState({ isLoaded: true });
  // }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  async onRouteUpdate() {
    console.log("-*-*-*-*-* RUNNING ONUPDATE *-*-*-*-");

    const token = localStorage.getItem('@fnovella:token')

    if(token && !this.props.auth.user){
      console.log("TOKEN IN STORAGE: ",token );
      let response = await this.props.actions.getUserDetails(token);
      console.log("GOT REPSONSE");
      if(response){
        // navigate to dashboard
        console.log("going to dashboard");
        this.props.history.push('/app/dashboard');
      }
      else{
        console.log("TOKEN EXPIRED OR INCORRECT");
        localStorage.removeItem('@fnovella:token')
        // navigate to login
        console.log("going to login");
        this.props.history.push('/login');
      }
    }
    else if(token && this.props.auth.user){
      // do nothing, let him go
    }
    else{
      console.log("NO TOKEN IN STORAGE: ", this.props.history.getCurrentLocation());
      // check if going to public state
      if(this.state.publicRoutes.indexOf(this.props.history.getCurrentLocation().pathname) >= 0){
        // let him go
        console.log("going to public, letting go");
      }
      else{
        // navigate to login
        console.log("going to login");
        this.props.history.push('/login');
      }
    }
  }

  render(){
    return (
      this.state.isLoaded ?
        <Provider store={this.props.store}>
          <Router
            onUpdate={this.onRouteUpdate}
            history={this.props.history}
            routes={this.props.rootRoute}
          />
        </Provider>
        :
        // TODO: can add global loader here
        null
    );
  }
}

/* Map state to props */
function mapStateToProps(state){
  return {
    auth: state.auth,
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators({
      getUserDetails
    }, dispatch)
  };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(PathSelector)
