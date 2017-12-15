import React from 'react';
// import default from 'material-ui/SvgIcon';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.submitApprove = this
      .submitApprove
      .bind(this);
  }
  submitApprove(e) {
    e.preventDefault();
    this
      .props
      .approveAssistance(this.props.assistanceData);
  }

  render() {
    // let {showInscriptions} = this.props;
    var renderMonth = () => {
      switch (this.props.assistanceData.month) {
        case 1:
          return "January";
        case 2:
          return "February";
        case 3:
          return "March";
        case 4:
          return "April";
        case 5:
          return "May";
        case 6:
          return "June";
        case 7:
          return "July";
        case 8:
          return "August";
        case 1:
          return "September";
        case 10:
          return "October";
        case 11:
          return "November";
        case 12:
          return "December";
        default:
          return null;
      }
    }
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.inscription}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.session}</td>
        <td className="mdl-data-table__cell--non-numeric">{renderMonth()}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.status
            ? "True"
            : "False"}</td>
        <td className="mdl-data-table__cell--non-numeric">
          {/* <button
            onClick={()=>{this.props.handleInscriptionParticipant(this.props.inscriptionData.id)}}
            type="submit" className="btn btn-primary">Enrolled Students Visualization</button>

          &nbsp;
          &nbsp; */}
          {this.props.assistanceData.status
            ? null
            : <button onClick={this.submitApprove} className="btn btn-primary">Approve</button>
}

        </td>
      </tr>
    );
  }
}

export default ListItem;
