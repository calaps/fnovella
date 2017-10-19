import React from 'react';
import QueueAnim from 'rc-queue-anim';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import TableList from './TableList';
import ListElements from './ListElements';

const optionsName = "Activacion";

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
                    <a href="javascript:;"><i className="material-icons">check_circle</i></a>
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
                      <div onClick={() => this.props.changeView("ADD_ELEMENT") } className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">add</i></a>
                        </div>
                        <h6>Activaciones</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("VIEW_ELEMENT") } className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a><i className="material-icons">assignment</i></a>
                        </div>
                        <h6>Programas</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">dashboard</i></a>
                        </div>
                        <h6>Catalogos</h6>
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




class Program extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT"
    };
    this.changeView = this.changeView.bind(this); //bind this element
  }

  changeView(data){
    this.setState({ active: data });
  }

  activeView() {
    switch(this.state.active) {
      case 'ADD_ELEMENT':
        return <HorizontalLinearStepper changeView={this.changeView} />;
      case "VIEW_ELEMENT":
        return  <ListElements/>;
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

module.exports = Program;
