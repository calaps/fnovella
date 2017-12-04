import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QueueAnim from 'rc-queue-anim';
import EditForm from './EditForm';
import ListElements from './ListElements';
const optionsName = "Usuario";
import FileUpload from './File'; //FILE CSV Module integrated
import { privilegesGetRequest, privilegesGetAllRequest } from '../../../../../actions';

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  isValid() {
    return true;
  }
  render() {
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-3">

              <div className="box-body">
                <div className="icon-box ibox-plain ibox-center">
                  <div className="ibox-icon">
                    <a href="javascript:;"><i className="material-icons">perm_identity</i></a>
                  </div>
                  <h5>{optionsName}s</h5>
                </div>
              </div>

            </div>
            <div className="col-xl-9">
              <div className="row">

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("VIEW_ELEMENT")} className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:"><i className="material-icons">remove_red_eye</i></a>
                        </div>
                        <h6>Visualizar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                {this.props.permission.ppersonalEntry &&
                  <div className="col-xl-4">
                    <div className="box box-default">
                      <div className="box-body">
                        <div
                          onClick={() => this.props.changeView("ADD_ELEMENT")}
                          className="icon-box ibox-plain ibox-center">
                          <div className="ibox-icon">
                            <a href="javascript:;"><i className="material-icons">add_circle_outline</i></a>
                          </div>
                          <h6>Agregar {optionsName}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {this.props.permission.ppersonalEntry &&
                  <div className="col-xl-4">
                    <div className="box box-default">
                      <div className="box-body">
                        <div onClick={() => this.props.changeView("CSV_LOAD")}
                          className="icon-box ibox-plain ibox-center">
                          <div className="ibox-icon">
                            <a href="javascript:;"><i className="material-icons">file_upload</i></a>
                          </div>
                          <h6>Carga masiva (CSV)</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

        </div>
      </article>
    )
  };
}




class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT",
      userData: {},
      permission: ''
    };
    this.changeView = this.changeView.bind(this); //bind this element
    this.onEditUser = this.onEditUser.bind(this);
  }
  componentWillMount() {
    console.log("running component will mount");

    // API action
    this
      .props
      .actions
      .privilegesGetRequest().then(data => {
        this.setState({ permission: data.data });
      });
  }
  changeView(data, reset = true) {
    if (reset) {
      this.setState({ userData: {} })
    }
    this.setState({ active: data });
  }

  onEditUser(userData) {
    this.setState({ userData })

    this.changeView('ADD_ELEMENT', false);
  }

  activeView() {
    switch (this.state.active) {
      case 'ADD_ELEMENT':
        return <EditForm changeView={this.changeView} userData={this.state.userData} />;
      case "VIEW_ELEMENT":
        return <ListElements onEdit={this.onEditUser} />;
      case "CSV_LOAD":
        return <FileUpload changeView={this.changeView} userData={this.state.userData} />;
      default:
        return null;
    }
  }
  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions changeView={this.changeView} permission={this.state.permission} /></div>
          <hr />
          <div key="2">{this.activeView()}</div>
        </QueueAnim>

      </div>
    );
  }
}

function mapStateToProps(state) {
  //pass the providers
  return { permission: state.permission }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      privilegesGetRequest,
      privilegesGetAllRequest
    }, dispatch)
  };
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(Users);
