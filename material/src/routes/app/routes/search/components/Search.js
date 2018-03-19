import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect } from 'react-redux';
import SearchForm from './SearchForm';


class MainOptions extends React.Component
{
  render() {
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-12">
              <div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;">
                        <i className="material-icons">search</i>
                      </a>
                    </div>
                    <h6>Buscar</h6>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }
}

class Search extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions/></div>
          <hr/>
          <div key="2"><SearchForm /></div>
        </QueueAnim>

      </div>
    );
  }
}


module.exports = connect()(Search);
