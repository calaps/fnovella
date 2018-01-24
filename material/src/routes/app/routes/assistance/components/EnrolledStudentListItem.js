import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  }
};

class EnrolledStudentListItem extends React.Component {


  render() {
    var date=new Date(this.props.assistanceData.date);
    var participantData=this.props.participantData || {};
    var assistanceData = this.props.assistanceData || {};
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Chip style={styles.chip}>
            {this.props.participantData.firstName + " " + this.props.participantData.firstLastname}
          </Chip>
        </td>
        <td className="mdl-data-table__cell--non-numeric">{date.toLocaleDateString()}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.catalogData.name}</td>
      </tr>
    );
  }
}

export default EnrolledStudentListItem;
