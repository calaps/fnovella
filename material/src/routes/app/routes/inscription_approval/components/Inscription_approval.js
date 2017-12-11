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
                    <h6>APROBACIÓN DE INSCRIPCIONES</h6>
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

class Inscription_approval extends React.Component {
  constructor(props){
    super(props);
    this.handleInscriptionParticipant=this.handleInscriptionParticipant.bind(this);
    
  }

    handleInscriptionParticipant(id){
      console.log(this)
      
      this.context.router.push({
        pathname: '/app/inscription_participant',
        query:{
          inscriptionId: id
        }
      })
    }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions/></div>
          <hr/>
          <div key="2"><ListElements handleInscriptionParticipant={this.handleInscriptionParticipant}/></div>
        </QueueAnim>

      </div>
    );
  }
}

Inscription_approval.contextTypes= {
  router: PropTypes.object.isRequired
}


module.exports = connect()(Inscription_approval);