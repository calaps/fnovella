import React from 'react';
import QueueAnim from 'rc-queue-anim';
import EditForm from './EditForm';
import ListElements from './ListElements';

const optionsName = "Categoria";

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
                    <a href="javascript:;"><i className="material-icons">list</i></a>
                  </div>
                  <h5>{optionsName}s para catalogos</h5>
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
                          <a href="#/app/catalog"><i className="material-icons">dashboard</i></a>
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




class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT",
      categoryData: {}
    };
    this.changeView = this.changeView.bind(this); //bind this element
    this.onEditCatalog = this.onEditCatalog.bind(this);
  }
  onEditCatalog (categoryData){
    this.setState({categoryData});

    this.changeView('ADD_ELEMENT',false);
  }

  changeView(data,reset=true){
    if(reset){
      this.setState({ categoryData: {} })
    }
    this.setState({ active: data });
  }

  activeView() {
    switch(this.state.active) {
      case 'ADD_ELEMENT':
        return <EditForm changeView={this.changeView} categoryData={this.state.categoryData} />;
      case "VIEW_ELEMENT":
        return <ListElements onEdit={this.onEditCatalog}  />;
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

module.exports = Category;
