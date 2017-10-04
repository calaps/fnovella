import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class TableList extends React.Component {
  constructor(){
    super();
    this.state = {
      program_id: '',
      program_name: '',
    };
    this.onRowSelection = this.onRowSelection.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
  }
  onRowSelection(e) {
    console.log("seleccionado");
  }

  render() {
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Descripción</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>CENCA</TableRowColumn>
            <TableRowColumn>Cenca es un programa creado especificamente para el desarollo de los
              estudiantes</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>Mejores familias</TableRowColumn>
            <TableRowColumn>Es un programa para instruir a las familias con información y
              capacitaciones</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>Futbol</TableRowColumn>
            <TableRowColumn>Busca promover el deporte como una herramienta para ayudarlos</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

module.exports = TableList;
