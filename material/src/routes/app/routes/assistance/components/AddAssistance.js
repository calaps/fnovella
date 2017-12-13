import React from 'react';
import {RaisedButton} from "material-ui";
import {
    assistanceAddRequest,
    assistanceParticipantAddRequest,
    categoriesGetRequest,
    catalogsGetByCategoryRequest,
    participantsGetRequestBySearch,
    participantGetRequest,
    inscriptionParticipantGetRequest,
    inscriptionGetRequest,
    groupGetByIdRequest
} from '../../../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var sessionNumber= 1;
class AddAssistance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            catalogs: [],
            sessionValue: 0,
            session: 1,
            group: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.NumOfSessions=this.NumOfSessions.bind(this);
    }
    componentWillMount() {
        this
            .props
            .actions
            .categoriesGetRequest()
            .then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].name === "asistencia") {
                        this
                            .props
                            .actions
                            .catalogsGetByCategoryRequest(res.data[i].id)
                            .then((res) => {
                                this.setState({catalogs: res.data.content});
                            });
                    }
                }
            });
        this
            .props
            .actions
            .groupGetByIdRequest(this.props.query.id)
            .then((res) => {
                this.setState({group: res.data});
                console.log("res group:", res.data)
            })
    }
    NumOfSessions() {
        switch (this.state.date.getMonth() + 1) {
            case 1:
                return this.state.group.nsJan;
            case 2:
                return this.state.group.nsFeb;
            case 3:
                return this.state.group.nsMar;
            case 4:
                return this.state.group.nsApr;
            case 5:
                return this.state.group.nsMay;
            case 6:
                return this.state.group.nsJun;
            case 7:
                return this.state.group.nsJul;
            case 8:
                return this.state.group.nsAug;
            case 9:
                return this.state.group.nsSep;
            case 10:
                return this.state.group.nsOct;
            case 11:
                return this.state.group.nsNov;
            case 12:
                return this.state.group.nsDec
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
            // alert(true);
            let data = {
                inscription: this.props.inscriptionData.id,
                date: this.state.date,
                month: this.state.date.getMonth() + 1,
                session: this.state.session
            }
            this
                .props
                .actions
                .assistanceAddRequest(data).then((res)=>{
                    let assistanceParticipantData={
                        assistance: res.data.id,
                        participant: this.props.participantData.id,
                        value:this.state.sessionValue
                    }
                    this.props.actions.assistanceParticipantAddRequest(assistanceParticipantData)
                    .then((res)=>console.log("res assPar",res))
                })
            this.setState({session:this.state.session + 1})
            if(this.state.session===this.NumOfSessions()){
                this.props.changeView("VIEW_ELEMENTS");
            }
    }
    
    render() {
        var calatogsOpt = () => {
            console.log("abcdef", this.state.catalogs);
            return this.state.catalogs
                ? this
                    .state
                    .catalogs
                    .map((catalog) => {
                        return <option key={catalog.id} value={catalog.type}>{catalog.name}</option>
                    })
                : null
        }
        return (
            <article className="article padding-lg-v article-bordered">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-12">

                            <div className="box box-default">
                                <div className="box-body padding-md">
                                    <p className="text-info">Session # {this.state.session}:
                                    </p>
                                    <form role="form" onSubmit={this.onSubmit}>
                                        <div className="form-group row">
                                            <label className="col-md-3 control-label">Inscription</label>
                                            <div className="col-md-9">
                                                <input
                                                    id="programId"
                                                    name="programId"
                                                    className="form-control"
                                                    value={this.props.inscriptionData.id}
                                                    disabled={true}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-3 control-label">Month</label>
                                            <div className="col-md-9">
                                                <input
                                                    id="month"
                                                    name="month"
                                                    className="form-control"
                                                    value={this
                                                    .state
                                                    .date
                                                    .getMonth() + 1}
                                                    disabled={true}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-3 control-label">Session</label>
                                            <div className="col-md-9">
                                                <input
                                                    id="programId"
                                                    name="programId"
                                                    className="form-control"
                                                    value={this.state.session}
                                                    disabled={true}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="programId" className="col-md-3 control-label">Value</label>
                                            <div className="col-md-9">
                                                <select
                                                    name="sessionValue"
                                                    id="sessionValue"
                                                    onChange={this.onChange}
                                                    value={this.state.sessionValue}
                                                    className="form-control">
                                                    <option value="" disabled>Selecione el Catalogos</option>
                                                    {calatogsOpt()}
                                                </select>
                                                {/* //{errors.calatog && <span className="help-block text-danger">{errors.calatog}</span>} */}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-3 control-label">Date</label>
                                            <div className="col-md-9">
                                                <input
                                                    id="programId"
                                                    name="programId"
                                                    className="form-control"
                                                    value={this.state.date}
                                                    disabled={true}/>
                                            </div>
                                        </div>
                                        {/* <FlatButton
                                            label="Cancelar"
                                            onTouchTap={this._handleCancel}
                                            style={{
                                            marginRight: 12
                                        }}/> */}
                                        <RaisedButton label='Siguiente' primary type='submit'/>

                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </article>

        );
    }
}

function mapStateToProps(state) {
    //pass the providers
    return {participants: state.participants, inscriptions: state.inscriptions, catalogs: state.catalogs, inscriptionParticipants: state.inscriptionParticipants}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            catalogsGetByCategoryRequest,
            assistanceAddRequest,
            categoriesGetRequest,
            participantGetRequest,
            participantsGetRequestBySearch,
            inscriptionParticipantGetRequest,
            inscriptionGetRequest,
            assistanceParticipantAddRequest,
            groupGetByIdRequest
        }, dispatch)
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddAssistance);