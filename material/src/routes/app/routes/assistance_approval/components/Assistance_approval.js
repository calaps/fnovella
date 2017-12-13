import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ListElements from './ListElements';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';


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
                        <i className="material-icons">assignment</i>
                      </a>
                    </div>
                    <h6>APROBACIÓN DE ASSISTANCE</h6>
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

class Assistance_approval extends React.Component {
  constructor(props){
    super(props);    
  }

    // handleassistanceParticipant(id){
    //   console.log(this)
      
    // //   this.context.router.push({
    // //     pathname: '/app/assistance_participant',
    // //     query:{
    // //       AssistanceId: id
    // //     }
    // //   })
    // }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions/></div>
          <hr/>
          <div key="2"><ListElements
          query={this.props.location.query}
           //handleassistanceParticipant={this.handleassistanceParticipant}
           /></div>
        </QueueAnim>

      </div>
    );
  }
}

// Assistance_approval.contextTypes= {
//   router: PropTypes.object.isRequired
// }


module.exports = connect()(Assistance_approval);