import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  }
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog: "1", // By degault is always option 1 = assist
      date: new Date(),
    }
    this.onChange = this.onChange.bind(this);
    this.AddAssistance = this.AddAssistance.bind(this);
  }
  componentDidMount() {
    this.AddAssistance();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.AddAssistance(e.target.value);

  }
  AddAssistance(value){
    const data = {
      inscription: this.props.inscriptionData.id,
      date: this.state.date,
      month: this.state.date.getMonth() + 1,
      session: this.props.sessionNum,
      value: this.state.catalog,
      participant:this.props.participantData.id,
  };
    this.props.AddAssistance(data);
  }
  render() {
    const calatogsOpt = () => {
      return this.props.catalogs ? this.props.catalogs.map((catalog) => {
        return <option key={catalog.id} value={catalog.type}>{catalog.name}</option>;
      }) : null;
    };
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric" >
          <Chip style={styles.chip}>
            {this.props.participantData.firstName + " " + this.props.participantData.firstLastname}
          </Chip>
        </td>
        <td className="mdl-data-table__cell--non-numeric" >
          {this.props.sessionNum}
        </td>
        <td className="mdl-data-table__cell--non-numeric" >
          <select
          id={this.props.inscriptionData.id}
          name="catalog"
          className="form-control"
          value={this.state.catalog}
          onChange={this.onChange}
          >
            {calatogsOpt()}
          </select>
        </td>
       </tr>
    );
  }
}

export default ListItem;
