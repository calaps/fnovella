import React from 'react';

class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      catalog:"",
      date: new Date(),
    }
    this.onChange=this.onChange.bind(this);
    this.AddAssistance = this.AddAssistance.bind(this);
  }
  componentDidMount(){
    this.AddAssistance();
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
    this.AddAssistance(e.target.value);

  }
  AddAssistance(value){
    let data = {
      inscription: this.props.inscriptionData.id,
      date: this.state.date,
      month: this.state.date.getMonth() + 1,
      session: this.props.sessionNum,
      value: (value)? value:'',
      participant:this.props.participantData.id,
  }

    this.props.AddAssistance(data)
  }
  render () {
    var calatogsOpt = () => {
      return this.props.catalogs
          ? this
              .props
              .catalogs
              .map((catalog) => {
                  return <option  key={catalog.id} value={catalog.type}>{catalog.name}</option>
              })
          : null
  }
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">{this.props.participantData.id}</td>
        <td className="mdl-data-table__cell--non-numeric" >
          {this.props.participantData.firstName + " " + this.props.participantData.firstLastname}
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
          <option value="" >Seleccionar</option>
            {calatogsOpt()}
          </select>
        </td>
       </tr>
    );
  }
}

export default ListItem;
