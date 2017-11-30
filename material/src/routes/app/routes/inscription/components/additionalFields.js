import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import {
    programAdditionalFieldsGetRequest,
    programGetRequest,
    catalogsGetRequest,
    groupsGetRequest,
    participantAdditionalFieldsAddRequest,
    inscriptionAddRequest,
    inscriptionParticipantAddRequest
} from '../../../../../actions';
import {ParticipantAdditionalFieldsValidator} from "../../../../../actions/formValidations"; //form validations

class AdditionalFieldsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programId: '',
            participantData: this.props.participantData,
            participantAditionalFieldsValues: [],
            calatog: '',
            group: '',
            period: '',
            year: new Date().getFullYear(),
            isLoading: false,
            errors: {}
        };
        this.onSubmit = this
            .onSubmit
            .bind(this);
        {
            /* Makes a Bind of the actions, onChange, onSummit */
        }
        this.onChange = this
            .onChange
            .bind(this);
        this._handleCancel = this
            ._handleCancel
            .bind(this);
        self = this;
    }

    componentWillMount() {
        this
            .props
            .actions
            .programAdditionalFieldsGetRequest();
        this
            .props
            .actions
            .programGetRequest(null, 1000);
        this
            .props
            .actions
            .groupsGetRequest();
        this
            .props
            .actions
            .catalogsGetRequest(null, 1000);
    }

    _handleCancel() {
        this
            .props
            .onCancel();
    }

    isValid() {
        //local validation
        const {errors, isValid} = ParticipantAdditionalFieldsValidator(this.state);
        if (!isValid) {
            this.setState({errors});
            return false;
        }
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            let additionalFieldData = {
                participantAditionalFields: {
                    catalog: this.state.calatog,
                    group: this.state.group,
                    participant: this.state.participantData.id,
                    period: this.state.period,
                    year: this.state.year
                },
                participantAditionalFieldsValues: this.state.participantAditionalFieldsValues
            };
            console.log("Additional Fields :", additionalFieldData);
            this
                .props
                .actions
                .participantAdditionalFieldsAddRequest(additionalFieldData)
                .then((data, err) => {
                    if (data && data.data) {
                        let inscription = {
                            group: this.state.group,
                            period: this.state.period,
                            year: this.state.year,
                            status: 1
                        }
                        this
                            .props
                            .actions
                            .inscriptionAddRequest(inscription)
                            .then((res_data, error) => {
                                if (res_data && res_data.data) {
                                    let inscriptionParticipant = {
                                        inscription: res_data.data.id,
                                        participant: this.state.participantData.id
                                    }
                                    this
                                        .props
                                        .actions
                                        .inscriptionParticipantAddRequest(inscriptionParticipant)
                                        .then((response) => {
                                            if (response && response.data) {
                                                this
                                                    .props
                                                    .changeView('VIEW_ELEMENT');
                                            }
                                        })
                                }
                            })
                    }

                })

        }

    }

    onChange(e, value) {
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name == "programId") {
            let programs = this.props.programs.content || [];
            let programId = e.target.value;
            let program = programs.find((program) => {
                return programId == program.id;
            })
            let catalogs = this.props.catalogs.content || [];
            let programAdditionalFields = this.props.programAdditionalFields.content || [];
            let additionalFields = [];
            for (let i = 0; i < programAdditionalFields.length; i++) {
                if (programAdditionalFields[i].program == programId) {
                    for(let catalog of catalogs){
                        if(catalog.category == programAdditionalFields[i].category){
                            additionalFields.push({additional_field_id: catalog.id, initial_value: catalog.name, final_value: '', type: catalog.type});
                        }
                    }
                }
            }
            this.setState({participantAditionalFieldsValues: additionalFields});
        } else if (e.target.name == "additional_fields") {
            let fields = this.state.participantAditionalFieldsValues;
            fields = fields.map((field) => {
                if (field.additional_field_id == e.target.id) {
                    field.final_value = e.target.value;
                    return field;
                }
                return field;
            })
            this.setState({participantAditionalFieldsValues: fields})
        }
    }

    render() {

        const {errors} = this.state;
        let programsOpt = () => {
            let programs = this.props.programs.content || [];
            return programs.map((program) => {
                return <option key={program.id} value={program.id}>{program.name}</option>
            })
        }
        let renderAdditionalFields = () => {
            let additionalFields = this.state.participantAditionalFieldsValues;
            return additionalFields.map((field) => {
                return (
                    <div className="form-group row" key={field.additional_field_id}>
                        <label htmlFor={field.additional_field_id} className="col-md-3 control-label">{field.initial_value}</label>
                        <div className="col-md-9">
                            <input
                                type={field.type}
                                className="form-control"
                                id={field.additional_field_id}
                                name="additional_fields"
                                onChange={this.onChange}/> {errors.additionalFields && <span className="help-block text-danger">{errors.additionalFields}</span>}
                        </div>
                    </div>
                )
            })
        };
        let calatogsOpt = () => {
            let catalogs = this.props.catalogs.content || [];
            let programs = this.props.programs.content || [];
            let programId = this.state.programId;
            let program = programs.find((program) => {
                return programId == program.id;
            })
            return catalogs.map((catalog) => {
                if (program && (catalog.category == program.category)) {
                    return <option key={catalog.id} value={catalog.id}>{catalog.name}</option>
                }
            })
        }
        let groupsOpt = () => {
            let groups = this.props.groups.content || [];
            return groups.map((group) => {
                return <option key={group.id} value={group.id}>{group.correlativo}</option>
            })
        }
        return (
            <article className="article padding-lg-v article-bordered">
                <div className="container-fluid with-maxwidth">
                    <div className="row">
                        <div className="col-xl-12">

                            <div className="box box-default">
                                <div className="box-body padding-md">
                                    <p className="text-info">Ingresa la siguiente información:
                                    </p>
                                    <form onSubmit={this.onSubmit} role="form">
                                        <div className="form-group row">
                                            <label htmlFor="programId" className="col-md-3 control-label">Programa</label>
                                            <div className="col-md-9">
                                                <select
                                                    name="programId"
                                                    id="programId"
                                                    onChange={this.onChange}
                                                    value={this.state.programId}
                                                    className="form-control">
                                                    <option value="" disabled>Selecione el programa</option>
                                                    {programsOpt()}
                                                </select>
                                                {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="programId" className="col-md-3 control-label">Catalogos</label>
                                            <div className="col-md-9">
                                                <select
                                                    name="calatog"
                                                    id="calatog"
                                                    onChange={this.onChange}
                                                    value={this.state.calatog}
                                                    className="form-control">
                                                    <option value="" disabled>Selecione el Catalogos</option>
                                                    {calatogsOpt()}
                                                </select>
                                                {errors.calatog && <span className="help-block text-danger">{errors.calatog}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="group" className="col-md-3 control-label">Group</label>
                                            <div className="col-md-9">
                                                <select
                                                    name="group"
                                                    id="group"
                                                    onChange={this.onChange}
                                                    value={this.state.group}
                                                    className="form-control">
                                                    <option value="" disabled>Selecione el Group</option>
                                                    {groupsOpt()}
                                                </select>
                                                {errors.group && <span className="help-block text-danger">{errors.group}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="period" className="col-md-3 control-label">Period</label>
                                            <div className="col-md-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="period"
                                                    name="period"
                                                    onChange={this.onChange}
                                                    value={this.state.period}
                                                    placeholder="Enter Perid"/> {errors.calatog && <span className="help-block text-danger">{errors.calatog}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="year" className="col-md-3 control-label">Year</label>
                                            <div className="col-md-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="year"
                                                    name="year"
                                                    onChange={this.onChange}
                                                    value={this.state.year}
                                                    disabled={true}
                                                    placeholder="Enter Year"/>
                                            </div>
                                        </div>
                                        {renderAdditionalFields()}
                                        <FlatButton
                                            label="Cancelar"
                                            onTouchTap={this._handleCancel}
                                            style={{
                                            marginRight: 12
                                        }}/>
                                        <RaisedButton label='Siguiente' primary type='Crear'/>

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
    return {programAdditionalFields: state.programAdditionalFields, programs: state.programs, catalogs: state.catalogs, groups: state.groups};
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            programAdditionalFieldsGetRequest,
            programGetRequest,
            catalogsGetRequest,
            groupsGetRequest,
            participantAdditionalFieldsAddRequest,
            inscriptionAddRequest,
            inscriptionParticipantAddRequest
        }, dispatch)
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps,)(AdditionalFieldsForm);
