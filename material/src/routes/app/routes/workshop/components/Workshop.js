import React from 'react';
import QueueAnim from 'rc-queue-anim';
import EditForm from './EditForm';
import ListElements from './ListElements';

const optionsName = "Taller";

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
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
                    <a href="javascript:;"><i className="material-icons">store</i></a>
                  </div>
                  <h5>{optionsName}es</h5>
                </div>
              </div>

            </div>
            <div className="col-xl-9">
              <div className="row">

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("VIEW_ELEMENT") } className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">remove_red_eye</i></a>
                        </div>
                        <h6>Visualizar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("ADD_ELEMENT") } className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">add_circle_outline</i></a>
                        </div>
                        <h6>Agregar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="#/app/program"><i className="material-icons">dashboard</i></a>
                        </div>
                        <h6>Programas</h6>
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




class Workshop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT",
      workshopData: {}
    };
    this.changeView = this.changeView.bind(this); //bind this element
    this.onEditProgram = this.onEditProgram.bind(this);
  }

  onEditProgram(workshopData) {
    this.setState({workshopData});
    this.changeView('ADD_ELEMENT', false);
  }

  changeView(data, reset = true) {
    if (reset) {
      this.setState({workshopData: {}})
    }
    this.setState({active: data});
  }

  activeView() {
    switch (this.state.active) {
      case 'ADD_ELEMENT':
        return <EditForm changeView={this.changeView} workshopData={this.state.workshopData}/>;
      case "VIEW_ELEMENT":
        return <ListElements onEdit={this.onEditProgram}/>;
      default:
        return null;
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

module.exports = Workshop;
