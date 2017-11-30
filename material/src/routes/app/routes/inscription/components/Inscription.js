import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ListElements from './ListElements';
import AdditionalFieldsForm from './additionalFields';
import EditForm from './EditForm';

const optionsName = "INSCRIPCIONES";

class MainOptions extends React.Component {
    constructor(props) {
        super(props);
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
                                        <a href="javascript:;">
                                            <i className="material-icons">supervisor_account</i>
                                        </a>
                                    </div>
                                    <h5>{optionsName}</h5>
                                </div>
                            </div>

                        </div>

                        <div className="col-xl-9">
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="box box-default">
                                        <div className="box-body">
                                            <div className="icon-box ibox-plain ibox-center">
                                                <div className="ibox-icon">
                                                    <a href="javascript:;">
                                                        <i className="material-icons">add_circle_outline</i>
                                                    </a>
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
                                                    <a href="javascript:;">
                                                        <i className="material-icons">remove_red_eye</i>
                                                    </a>
                                                </div>
                                                <h6>Visualizar {optionsName}</h6>
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

class Inscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: (this.props.location.query.add)
                ? "VIEW_ELEMENT"
                : "VIEW_INSCRIPTIONS",
            participantData: {},
            participantId: '',
            inscriptionParticipantId:''
        };
        this.changeView = this
            .changeView
            .bind(this); //bind this element
        this.onInscribeStudent = this
            .onInscribeStudent
            .bind(this); //bind this element
        this.handleCancel = this
            .handleCancel
            .bind(this);
        this.onEdit = this
            .onEdit
            .bind(this);
    }

    changeView(data) {
        this.setState({active: data});
    }

    onInscribeStudent(participantData, participantId) {
        this.setState({participantData, participantId});
        this.changeView('ADD_ELEMENT', false);
    }
    handleCancel() {
        this.changeView('VIEW_INSCRIPTIONS', false);
    }
    onEdit(inscriptionParticipantId) {
        this.setState({inscriptionParticipantId});
        this.changeView('EDIT_VIEW', false);
    }
    activeView() {
        switch (this.state.active) {
            case "VIEW_INSCRIPTIONS":
                return <ListElements
                    onInscribe={this.onInscribeStudent}
                    onEdit={this.onEdit}
                    showInscriptions={true}/>;
            case "VIEW_ELEMENT":
                return <ListElements
                    onInscribe={this.onInscribeStudent}
                    onEdit={this.onEdit}
                    showInscriptions={false}/>;
            case "ADD_ELEMENT":
                return <AdditionalFieldsForm
                    participantData={this.state.participantData}
                    changeView={this.changeView}
                    onCancel={this.handleCancel}/>;
            case "EDIT_VIEW":
                return <EditForm 
                        inscriptionParticipantId={this.state.inscriptionParticipantId}
                        changeView={this.changeView}
                        handleCancel={this.handleCancel}/>
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">

                <QueueAnim type="bottom" className="ui-animate">
                    <div key="1"><MainOptions changeView={this.changeView}/></div>
                    <hr/>
                    <div key="2">{this.activeView()}</div>
                </QueueAnim>

            </div>
        );
    }
}

module.exports = Inscription;