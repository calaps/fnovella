import React from 'react';
import QueueAnim from 'rc-queue-anim';
import EditForm from './EditForm';
import ListElements from './ListElements';
const optionsName = "Usuario";

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  isValid(){
    return true;
  }
  render() {
    return(
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
                      <div
                        onClick={() => this.props.changeView("ADD_ELEMENT") }
                        className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">add</i></a>
                        </div>
                        <h6>Agregar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("VIEW_ELEMENT") } className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a><i className="material-icons">mode_edit</i></a>
                        </div>
                        <h6>Editar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">remove</i></a>
                        </div>
                        <h6>Eliminar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>

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
      userData: {}
    };
    this.changeView = this.changeView.bind(this); //bind this element
    this.onEditUser=this.onEditUser.bind(this);
  }

  changeView(data){
    this.setState({ active: data });
  }

onEditUser (userData){
  this.setState({userData})

  this.changeView('ADD_ELEMENT');
}

  activeView() {
    switch(this.state.active) {
      case 'ADD_ELEMENT':
        return <EditForm changeView={this.changeView} userData={this.state.userData} />;
      case "VIEW_ELEMENT":
        return <ListElements onEdit={this.onEditUser} />;
      default:
        return null ;
    }
  }
  render() {
      return (
        <div className="container-fluid no-breadcrumbs page-dashboard">

          <QueueAnim type="bottom" className="ui-animate">
            <div key="1"><MainOptions changeView={ this.changeView } /></div>
            <hr/>
            <div key="2">{ this.activeView() }</div>
          </QueueAnim>

        </div>
      );
  }
}

module.exports = Users;
