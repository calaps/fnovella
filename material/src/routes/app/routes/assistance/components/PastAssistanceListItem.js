import React from 'react';

class PastAssistanceListItem extends React.Component {

    constructor(props) {
    super(props);
  }
  componentWillMount(){
  }

  render() {
    var date=new Date(this.props.date);
    let enrolledStudentData={
      ...this.props
    }
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.month}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.session}</td>
        <td className="mdl-data-table__cell--non-numeric">{date.toLocaleDateString()}</td>

        <td className="mdl-data-table__cell--non-numeric">
          <button className="btn btn-primary"
          onClick={()=>this.props.changeView('SHOW_ENROLLED_STUDENTS',enrolledStudentData)}
          >
            Visualizar asistencia
          </button>
        </td>
      </tr>
    );
  }
}

export default PastAssistanceListItem;
