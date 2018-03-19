import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import {bindActionCreators} from 'redux';

/* Actions */
import { snackBarRemove } from './../../actions';

class SnackBar extends React.Component {

  constructor(props){
    super(props);
    this.handleSnackBarRequestClose = this.handleSnackBarRequestClose.bind(this);
  }

  handleSnackBarRequestClose(){
    this.props.actions.snackBarRemove();
  }

  render() {
    return (
        <Snackbar
          open={this.props.snackBar.open}
          message={this.props.snackBar.message}
          autoHideDuration={this.props.snackBar.autoHideDuration}
          onRequestClose={this.handleSnackBarRequestClose}
        />
    );
  }
}

/* Map state to props */
function mapStateToProps(state){
  return {
    snackBar: state.snackBar
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      snackBarRemove
    }, dispatch)
  };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
