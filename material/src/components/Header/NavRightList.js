import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

/* Actions */
import { logOut } from './../../actions';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {

  constructor(props){
    super(props);
    this.onLogOut = this.onLogOut.bind(this);
  }

  handleChange = (event, value) => {
    if(value === '/login'){
      this.onLogOut();
    }
    else{
      hashHistory.push(value);
    }
  };

  async onLogOut(){
    let response = await this.props.actions.logOut()
    if(response){
      this.props.router.push('/login');
    }
  }

  render() {
    return (
      <ul className="list-unstyled float-right">
        <li style={{marginRight: '10px'}}>
          <IconMenu
            iconButtonElement={<IconButton style={ImgIconButtonStyle}><img src="assets/images/g1.jpg" alt="" className="rounded-circle img30_30" /></IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            menuStyle={{minWidth: '150px'}}
                    >
            <MenuItem
              value="/app/dashboard"
              primaryText="Inicio"
              style={{fontSize: '14px', lineHeight: '48px'}}
              innerDivStyle={listItemStyle}
              leftIcon={<i className="material-icons">home</i>}
                        />
            <MenuItem
              value="/app/page/profile"
              primaryText="My perfil"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">person_outline</i>}
                        />
            <MenuItem
              value="/login"
              primaryText="Cerrar sesión"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">forward</i>}
                        />
          </IconMenu>
        </li>
      </ul>
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
      logOut
    }, dispatch)
  };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(NavRightList)
