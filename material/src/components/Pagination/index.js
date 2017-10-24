import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ContentRight from 'material-ui/svg-icons/navigation/chevron-right';
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
        color:'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        backgroundColor:'#5CB85C'
    }
};

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 20,
            number: 0,
            currentPage: 0,
        }
        this.getNext = this.getNext.bind(this);
        this.getPrev = this.getPrev.bind(this);
    }
    getPrev() {
        var { currentPage, number, size } = this.state;
        if (currentPage > 0) {
            this.props.getRequest(currentPage, number - 1, size);
            this.setState({
                currentPage: this.state.currentPage - 1
            });
            console.log('currentPage: ', currentPage)
        }
    }
    getNext() {
        var { currentPage, number, size } = this.state;
        if (currentPage === this.props.totalElements) {
            //do nothing
        }
        else if (currentPage < Math.ceil(this.props.totalElements / 5)) {
            this.props.getRequest(currentPage, number + 1, size);
            this.setState({
                currentPage: this.state.currentPage + 1
            });
            console.log('currentPage: ', currentPage)
        }
    }

    // getRange(size, start, end) {
    //     var ret = [];
    //     // console.log(size,start, end);

    //     if (size < end) {
    //         end = size;
    //         if (size < 5) {
    //             start = 0;
    //         } else {
    //             start = size - 5;
    //         }

    //     }
    //     for (var i = start; i < end; i++) {
    //         ret.push(i);
    //     }
    //     console.log('range2:' ,ret);
    //     return ret;
    // }


    render() {
        console.log('range || pages: ', this.props.range);
        var numbers = [];
        for (var i = 1; i <= this.props.range; i++) {
            numbers.push(
                <li>
                    <Paper
                        key={i} style={
                            this.state.currentPage=== i-1?style.activeStyle:style.paperStyle
                        } zDepth={1} circle={true}
                    >
                        {i}
                    </Paper>
                </li>
            );
        }
        return (
            <div style={style.containerStyle}>
                <ul style={{ display: 'inline-flex', listStyle: 'none' }}>
                    <li>
                        <button
                            onClick={this.getPrev}
                            type="submit" className="btn btn-primary"
                        >
                            Prev
                        </button>

                    </li>
                    {numbers}
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
