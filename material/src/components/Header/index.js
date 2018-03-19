import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';
import ProgressBar from './../ProgressBar';

/**
 * #calaps //Hide until notification implementation
 <div className="top-nav-left hidden-md-down">
 <NavLeftList />
 </div>

 **/
class Header extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      $body.toggleClass('sidebar-mobile-open');
    });
  }

  render() {
    const { isFixedHeader, colorOption } = this.props;

    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner', {
            'bg-color-light': ['11', '12', '13', '14', '15', '16', '21'].indexOf(colorOption) >= 0,
            'bg-color-dark': colorOption === '31',
            'bg-color-primary': ['22', '32'].indexOf(colorOption) >= 0,
            'bg-color-success': ['23', '33'].indexOf(colorOption) >= 0,
            'bg-color-info': ['24', '34'].indexOf(colorOption) >= 0,
            'bg-color-warning': ['25', '35'].indexOf(colorOption) >= 0,
            'bg-color-danger': ['26', '36'].indexOf(colorOption) >= 0 })}
                >
          <div className="hidden-lg-up float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand hidden-md-down">
            <h2><Link to="/"><img src="assets/images/logo_white.png" alt={APPCONFIG.brand} /></Link></h2>
          </div>

          <div className="top-nav-right">
            <NavRightList router={this.props.router}/>
            <p className="nav_user_name float-right">{(this.props.auth.user)?(this.props.auth.user.firstName + ' ' + (this.props.auth.user.firstLastName  || this.props.auth.user.firstLastname)):' '}
            </p>
          </div>
        </div>
        <ProgressBar/>
      </section>
    );
  }
}

/* Map state to props */
function mapStateToProps(state){
  return {
    auth: state.auth,
    colorOption: state.settings.colorOption,
    isFixedHeader: state.settings.isFixedHeader
  }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, null)(Header)
