import React from 'react';
// import default from 'material-ui/SvgIcon';

class PastAssistanceListItem extends React.Component {
//   constructor(props) {
//     super(props);
//     this.submitApprove = this
//       .submitApprove
//       .bind(this);
//   }
//   submitApprove(e) {
//     e.preventDefault();
//     this
//       .props
//       .approveAssistance(this.props.assistanceData);
//   }

  render() {
      alert("asc");
    // let {showInscriptions} = this.props;
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.month}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.date}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.status
            ? "True"
            : "False"}</td>
      </tr>
    );
  }
}

module.exports= PastAssistanceListItem;
