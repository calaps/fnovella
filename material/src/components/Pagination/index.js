import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ContentRight from 'material-ui/svg-icons/navigation/chevron-right';

class Pagination extends React.Component {
    
    getPrev(string){
        switch(string){
            case 'Programs':
                break;
        }
    }
    getNext(string){
        switch(string){
            case 'Programs':
                break;
        }
    }
    render() {
        return (
            // <section className="app-footer">
                <div style = {{float:'right'}}>
                    <ul style={{display:'inline-flex',listStyle:'none'}}>
                        <li>
                            <FloatingActionButton
                                mini={true}
                                onClick = {this.getPrev}
                                // style={{height:'20px',width:'20px' }}
                            >
                                <ContentLeft />
                            </FloatingActionButton>
                        </li>
                        <li>
                            <FloatingActionButton
                                mini={true}
                                // style={{height:'20px',width:'20px' }}
                            >
                             1
                            </FloatingActionButton>

                        </li>
                        <li>
                            <FloatingActionButton
                            mini={true}
                                //style={{ height:'20px',width:'20px' }}
                            >
                            <ContentRight />
                            </FloatingActionButton>
                        </li>
                    </ul>
                    {/* <span className="float-left">
            <span>Todos los derechos reservados © <a className="brand" target="_blank" href={APPCONFIG.productLink}>{APPCONFIG.brand}</a> {APPCONFIG.year}</span>
          </span>
          <span className="float-right">
            <span><a href={APPCONFIG.developerLink}>Calaps.com</a></span>
          </span> */}
                </div>
            // </section>
        );
    }
}

export default Pagination;