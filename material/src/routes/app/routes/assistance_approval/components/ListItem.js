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
          return "Enero";
        case 2:
          return "Febrero";
        case 3:
          return "Marzo";
        case 4:
          return "Abril";
        case 5:
          return "Mayo";
        case 6:
          return "Junio";
        case 7:
          return "Julio";
        case 8:
          return "Agosto";
        case 1:
          return "Septiembre";
        case 10:
          return "Octubre";
        case 11:
          return "Noviembre";
        case 12:
          return "Diciembre";
        default:
          return null;
      }
    };

    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.inscription}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.session}</td>
        <td className="mdl-data-table__cell--non-numeric">{renderMonth()}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.assistanceData.status
            ? "Aprobada"
            : "No ha sido aprobada"}</td>
        <td className="mdl-data-table__cell--non-numeric">
          {/* <button
            onClick={()=>{this.props.handleInscriptionParticipant(this.props.inscriptionData.id)}}
            type="submit" className="btn btn-primary">Enrolled Students Visualization</button>

          &nbsp;
          &nbsp; */}
          {this.props.assistanceData.status
            ? null
            : <button onClick={this.submitApprove} className="btn btn-primary">He visto</button>
}

        </td>
      </tr>
    );
  }
}

export default ListItem;
