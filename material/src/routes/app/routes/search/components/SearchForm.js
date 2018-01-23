import React from 'react';
import FlatButton from 'material-ui/FlatButton'; // For Buttons
import RaisedButton from 'material-ui/RaisedButton'; // For Buttons
import DatePicker from 'material-ui/DatePicker'; //date
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  programGetRequest,
  groupsGetRequest
} from '../../../../../actions';



class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      programId: '',
      groupId: '',
      year: '',
      documentValue: '',
      errors: {}
    };
  }

  componentWillMount() {
    this.props.actions.programGetRequest(0,10000);
    this.props.actions.groupsGetRequest(0, 10000);
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {

    let programsOpt = () => {
      let programs = this.props.programs.content || [];
      return programs.map((program) => {
        return <option key={program.id} value={program.id}>{program.name}</option>
      });
    };
    let groupsOpt = () => {
      let programs = this.props.groups.content || [];
      return programs.map((group) => {
        return <option key={group.id} value={group.id}>{group.correlativo}</option>
      });
    };

    let yearOpt = () => {
      let year = new Date().getFullYear();
      let option = 0;
      for (var i = 0; i < 10; i++) {
        option = year - i;
        return <option value={option}>{option}</option>
      }
    }

    const { errors } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">

            <div className="box box-default">
              <div className="box-body padding-md">
                <p className="text-info">Ingresa la siguiente información:
                </p>
                <form onSubmit={this.onSubmit} role="form">

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-md-3 control-label">Program</label>
                    <div className="col-md-9">
                      <select
                        name="programId"
                        id="programId"
                        onChange={this.onChange}
                        value={this.state.programId}
                        className="form-control"
                      >
                        <option value="" disabled>Selecione el programa...</option>
                        {programsOpt()}
                      </select>
                      {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-md-3 control-label">Selecciona el grupo</label>
                    <div className="col-md-9">
                      <select
                        name="groupId"
                        id="groupId"
                        onChange={this.onChange}
                        value={this.state.groupId}
                        className="form-control"
                      >
                        <option value="" disabled>Selecione el grupo...</option>
                        {groupsOpt()}
                      </select>
                      {errors.programId && <span className="help-block text-danger">{errors.programId}</span>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-md-3 control-label">Selecciona el año</label>
                    <div className="col-md-9">
                      <select
                        name="year"
                        id="year"
                        onChange={this.onChange}
                        value={this.state.year}
                        className="form-control"
                      >
                        <option value="" disabled>Selecione el año...</option>
                        {yearOpt()}
                      </select>
                      {errors.year && <span className="help-block text-danger">{errors.year}</span>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-md-3 control-label">Ingresa el documento de indentificación</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        id="appCode"
                        name="appCode"
                        value={this.state.documentValue}
                        onChange={this.onChange}
                        placeholder="eje: 999499812" /> {errors.documentValue && <span className="help-block text-danger">{errors.documentValue}</span>}
                    </div>
                  </div>


                  <div className="form-group row">
                    <div className="offset-md-3 col-md-10">
                      <FlatButton
                        disabled={this.state.isLoading}
                        label='Resetear'
                        style={{
                          marginRight: 12
                        }}
                        onTouchTap={this.handleCancel}
                        secondary
                        className="btn-w-md" />
                      <RaisedButton
                        disabled={this.state.isLoading}
                        type="submit"
                        label="Buscar"
                        secondary
                        className="btn-w-md" />
                    </div>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    programs: state.programs,
    groups: state.groups
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest,
      groupsGetRequest}, dispatch)
  };
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchForm);
