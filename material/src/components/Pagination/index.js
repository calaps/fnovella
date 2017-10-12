import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ContentRight from 'material-ui/svg-icons/navigation/chevron-right';

class Pagination extends React.Component {
  
    render() {
        console.log('range: ',this.props.range)
        var renderList = () => {
            for(var i=1;i <= 5 ; i++){
                console.log(i);
                return (
                    <li>
                    <FloatingActionButton
                        mini={true}
                    >
                     {i}
                    </FloatingActionButton>
    
                </li>
                );
            }
        }
        return (
                <div style = {{float:'right'}}>
                    <ul style={{display:'inline-flex',listStyle:'none'}}>
                        <li>
                            <FloatingActionButton
                                mini={true}
                                onClick = {this.props.onClickPrev}
                            >
                                <ContentLeft />
                            </FloatingActionButton>
                        </li>
                        {
                            renderList()
                        }
                        <li>
                            <FloatingActionButton
                            mini={true}
                            onClick={this.props.onClickNext}
                            >
                            <ContentRight />
                            </FloatingActionButton>
                        </li>
                    </ul>
                </div>
        );
    }
}

export default Pagination;