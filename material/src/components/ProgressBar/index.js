import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import {bindActionCreators} from 'redux';

class ProgressBar extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        {
          (this.props.progress.requestInProgress > 0)?
            <LinearProgress mode="indeterminate" />
            :
            null
        }
      </div>
    );
  }
}

/* Map state to props */
function mapStateToProps(state){
  return {
    progress: state.progress
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)
