import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class ListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisable: false
    };
  }

  componentDidMount() {
    this.isCurrentYear();
  };

  isCurrentYear() {
    const activationYear = this.props.activationData.year;
    const currentYear = (new Date()).getFullYear();

    this.setState({
      isDisable: (activationYear !== currentYear)
    });
  }

  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.activationData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.activationData.nameProgram}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.activationData.year}</td>
        <td className="mdl-data-table__cell--non-numeric">
          {
            this.props.activationData.activationStatus
              ?<div className="ibox-icon">
                <a href="javascript:;"><i className="material-icons">done</i></a>
              </div>
              :<div className="ibox-icon">
                <a href="javascript:;"><i className="material-icons">clear</i></a>
              </div>
          }
        </td>
        <td className="mdl-data-table__cell--non-numeric"style={{textAlign:'center'}}>
          {/* <button
            onClick={()=>{this.props.onDelete(this.props.activationData.id)}}

            type="submit" className="btn btn-primary">Delete</button> */}
          &nbsp;
          &nbsp;
          <RaisedButton
            disabled={this.state.isLoading}
            label='Evaluación 1'
            primary
            onTouchTap={this.onGroupActivate}
          />
          &nbsp;
          &nbsp;
          <RaisedButton
            disabled={this.state.isLoading}
            label='Evaluación 2'
            primary
            onTouchTap={this.onGroupActivate}
          />
          &nbsp;
          &nbsp;

          <button
            onClick={()=>{this.props.onEdit(this.props.activationData)}}
            disabled={this.state.isDisable}
            type="submit"
            className="btn btn-primary">{ (this.state.isDisable) ? "Activación pasada" : "Modificar"}</button>
        </td>
      </tr>
    );
  }
}

export default ListItem;
