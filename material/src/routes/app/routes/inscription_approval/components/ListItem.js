import React from 'react';
import Chip from 'material-ui/Chip';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  chip: {
    margin: 4,
  }
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.submitApprove = this.submitApprove.bind(this);
  }

  submitApprove(e) {
    e.preventDefault();
    this.props.approveInscription(this.props.inscriptionData);
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.number}</TableRowColumn>
        <TableRowColumn>
          <Chip
            style={styles.chip}>
            {this.props.participantData.firstName} {this.props.participantData.firstLastname}
          </Chip>
        </TableRowColumn>
        <TableRowColumn><a href={this.props.participantData.email}>{this.props.participantData.email}</a></TableRowColumn>
        <TableRowColumn>{(this.props.participantData.gender === 'male') ? 'hombre' : 'mujer'}</TableRowColumn>
        <TableRowColumn>{this.props.inscriptionData.id}</TableRowColumn>
        <TableRowColumn>{(this.props.inscriptionData.status == 1) ? <label className={"text-success"}>Aprovado</label> : <label className={"text-warning"}>Pendiente</label>}</TableRowColumn>
        <TableRowColumn>
          {
            this.props.inscriptionData.status ? null :
              <button
                onClick={this.submitApprove}

                className="btn btn-primary">Aprovar inscripción</button>
          }
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default ListItem;
