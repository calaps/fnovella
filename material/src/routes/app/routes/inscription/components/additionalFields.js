import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import {programAdditionalFieldsGetRequest, programGetRequest, catalogsGetByCategoryRequest, groupsGetRequest, participantAdditionalFieldsAddRequest} from '../../../../../actions';

class AdditionalFieldsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programId: '',
            participantData: this.props.participantData,
            additionalFields: [],
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
    }

    _handleCancel() {
        this
            .props
            .onCancel();
    }

    isValid() {
        //local validation
        const {errors, isValid} = studentValidator(this.state);
        if (!isValid) {
            this.setState({errors});
            return false;
        }
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        // if (this.isValid()) {     //reset errors object and disable submit button
        // this.setState({errors: {}, isLoading: true}); let data = {}; this     .props
        //   .changeView('VIEW_ELEMENT'); // }
        let data = {
            catalog : this.state.calatog,
            group: this.state.group,
            participant: this.state.participantData.id,
            period: this.state.period,
            year: this.state.year,
            values: this.state.additionalFields
        };
        console.log("Additional Fields :", data);
        this.props.actions.participantAdditionalFieldsAddRequest(data);
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
            this
                .props
                .actions
                .catalogsGetByCategoryRequest(program.category);
            let programAdditionalFields = this.props.programAdditionalFields.content || [];
            let additionalFields = [];
            for(let i=0;i<programAdditionalFields.length;i++){
                if(programAdditionalFields[i].program == programId){
                    additionalFields.push({
                        additional_field_id: programAdditionalFields[i].id,
                        initial_value: programAdditionalFields[i].categoryData.name,
                        final_value: ''
                    });
                }
            }
            this.setState({additionalFields});
        } else if (e.target.name == "additional_fields") {
            let fields = this.state.additionalFields;
            fields = fields.map((field)=>{
                if(field.additional_field_id == e.target.id){
                    field.final_value = e.target.value;
                    return field;
                }
                return field;
            })
            this.setState({additionalFields: fields})
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
            let additionalFields = this.state.additionalFields;
                    return additionalFields.map((field) => {
                            return (
                                <div className="form-group row" key={field.additional_field_id}>
                                    <label htmlFor={field.additional_field_id} className="col-md-3 control-label">{field.initial_value}</label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={field.additional_field_id}
                                            name="additional_fields"
                                            onChange={this.onChange}/>
                                    </div>
                                </div>
                            )
                    })
        };
        let calatogsOpt = () => {
            let catalogs = this.props.catalogs.content || [];
            return catalogs.map((catalog) => {
                return <option key={catalog.id} value={catalog.id}>{catalog.name}</option>
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
                                                {errors.calatogId && <span className="help-block text-danger">{errors.calatogId}</span>}
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
                                                    placeholder="Enter Perid"/>
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
            catalogsGetByCategoryRequest,
            groupsGetRequest,
            participantAdditionalFieldsAddRequest
        }, dispatch)
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps,)(AdditionalFieldsForm);
