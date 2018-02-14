import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.workshopData.id}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.workshopData.name}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.workshopData.nameProgram}</td>
        <td className="mdl-data-table__cell--non-numeric">{this.props.workshopData.description}</td>
        <td className="mdl-data-table__cell--non-numeric" style={{textAlign: 'right'}}>
          {(this.props.workshopData.createdGroup) ?
            (this.props.workshopData.groupExists) ?
              <button
                onClick={() => {
                  this.props.onViewGroup(this.props.workshopData.id);
                }}
                type="submit"
                className="btn btn-info">
                Visualizar grupo
              </button>
              :
              <button
                onClick={() => {
                  this.props.onCreateGroup(this.props.workshopData.id);
                }}
                type="submit"
                className="btn btn-primary">
                Crear grupo
              </button>
            :
            <button
              disabled
              className="btn btn-primary">
              El programa no esta activado
            </button>
          }
          &nbsp;
          &nbsp;
          <button
            onClick={() => {
              this.props.onEdit(this.props.workshopData)
            }}

            type="submit" className="btn btn-primary">Editar
          </button>
          &nbsp;
          <button
            onClick={() => {
              this.props.onDelete(this.props.workshopData.id)
            }}

            type="submit" className="btn btn-danger">Eliminar
          </button>
          &nbsp;
        </td>
      </tr>
    );
  }
}

export default ListItem;
