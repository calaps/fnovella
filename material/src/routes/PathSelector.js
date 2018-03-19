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
      publicRoutes: ['/login', '/sign-up', '/forgot-password']
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.onRouteUpdate = this.onRouteUpdate.bind(this);
  }

  // async componentDidMount() {
  //   this.setState({ isLoaded: true });
  // }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  async onRouteUpdate() {
    console.log("-*-*-*-*-* RUNNING ONUPDATE *-*-*-*-");

    const token = localStorage.getItem('@fnovella:token');

    if(token && !this.props.auth.user){
      console.log("Router: TOKEN IN STORAGE & USER IS NOT PRESENT");
      let response = await this.props.actions.getUserDetails(token);
      if(response){
        if(this.state.publicRoutes.indexOf(this.props.history.getCurrentLocation().pathname) >= 0){
          console.log("Router: going to public, redirect to dashboard");
          // navigate to dashboard
          this.props.history.push('/app/dashboard');
        }
        else{
          // let him go
          console.log("Router: going to private, allowed and letting go")
        }
      }
      else{
        console.log("Router: TOKEN EXPIRED OR INCORRECT");
        localStorage.removeItem('@fnovella:token')
        // navigate to login
        console.log("Router: going to login");
        this.props.history.push('/login');
      }
    }
    else if(token && this.props.auth.user){
      console.log("Router: TOKEN IN STORAGE & USER IS PRESENT");
      if(this.state.publicRoutes.indexOf(this.props.history.getCurrentLocation().pathname) >= 0){
        console.log("Router: going to public, redirect to dashboard");
        // navigate to dashboard
        this.props.history.push('/app/dashboard');
      }
      else{
        // do nothing, let him go
        console.log("Router: going to private, allowed and letting go")
      }
    }
    else{
      console.log("Router: NO TOKEN IN STORAGE ");
      // check if going to public state
      if(this.state.publicRoutes.indexOf(this.props.history.getCurrentLocation().pathname) >= 0){
        // let him go
        console.log("Router: going to public, letting go");
      }
      else{
        // navigate to login
        console.log("Router: going to private state, redirect to login");
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
