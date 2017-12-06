import React from 'react';
import {RaisedButton} from 'material-ui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    inscriptionAddRequest,
    inscriptionParticipantAddRequest
} from '../../../../../actions';


class SecondForm extends React.Component{
    
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        this
            .props
            .actions
            .inscriptionAddRequest(this.props.inscription)
            .then((res_data, error) => {
                if (res_data && res_data.data) {
                    let inscriptionParticipant = {
                        inscription: res_data.data.id,
                        participant: this.props.participantData.id
                    }
                    this
                        .props
                        .actions
                        .inscriptionParticipantAddRequest(inscriptionParticipant)
                        .then((response) => {
                            if (response && response.data) {
                                this.props.handleNext(null);                                
                            }
                        })
                }
            })
    }
    render(){
        console.log(this.props.inscription)
        return (
            <article className="article padding-lg-v article-bordered">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-12">

                            <div className="box box-default">
                                <div className="box-body padding-md">
                                    <p className="text-info">Información:
                                    </p>
                                    <form onSubmit={this.onSubmit} >
                                        <div className="form-group row">
                                            <label className="col-md-3 control-label">Group</label>
                                            <div className="col-md-9">
                                                <input
                                                   value={this.props.inscription.group || ""}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group row">
                                            <label className="col-md-3 control-label">Period</label>
                                            <div className="col-md-9">
                                                <input
                                                   value={this.props.inscription.period || ""}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>
                
                                        <div className="form-group row">
                                            <label className="col-md-3 control-label">Year</label>
                                            <div className="col-md-9">
                                                <input
                                                   value={this.props.inscription.year || ""}
                                                    className="form-control">
                                                </input>
                                            </div>
                                        </div>
                                        <RaisedButton label='Siguiente' primary type='Crear'/>
                                        </form>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </article>
        )
    }
}


/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            inscriptionAddRequest,
            inscriptionParticipantAddRequest
        }, dispatch)
    };  
}

module.exports = connect(null, mapDispatchToProps,)(SecondForm);
