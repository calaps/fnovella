import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  containerStyle: {
    float: 'right',
    marginTop: 10,
  },
  paperStyle: {
    height: 30,
    width: 30,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex'
  },
  activeStyle: {
    height: 30,
    width: 30,
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    backgroundColor: '#5CB85C'
  }
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      number: 0
    };
    this.getNext = this.getNext.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.getRange = this.getRange.bind(this);
  }

  getPrev() {
    let {number, size} = this.state;
    if (number > 0) {
      this.props.getRequest(number - 1, size);
      this.setState({
        number: this.state.number - 1
      });
    }
  }

  getNext() {
    let {number, size} = this.state;
    if (this.props.totalPages > number + 1) {
      this.props.getRequest(number + 1, size);
      this.setState({
        number: this.state.number + 1
      });
    }
  }

  getRange(size, start, end) {
      let ret = [];
      if (size < end) {
          end = size;
          if (size < this.state.size) {
              start = 0;
          } else {
              start = size - this.state.size;
          }
      }
      for (let i = start; i < end; i++) {
          ret.push(
            <li>
              <Paper
                key={i} style={
                this.state.number === i  ? style.activeStyle : style.paperStyle
              } zDepth={1} circle={true}
              >
                {i+1}
              </Paper>
            </li>
          );
      }
      return ret;
  }


  render() {
    return (
      <div style={style.containerStyle}>
        <ul style={{display: 'inline-flex', listStyle: 'none'}}>
          <li>
            <button
              onClick={this.getPrev}
              type="submit" className="btn btn-primary"
            >
              Prev
            </button>

          </li>
          {this.getRange(Math.ceil(this.props.totalElements/this.state.size), this.state.number, this.state.number + this.state.size)}
          <li>
            <button
              onClick={this.getNext}
              type="submit" className="btn btn-primary"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
