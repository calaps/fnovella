import React from "react";
import QueueAnim from 'rc-queue-anim';
import ListElements from './ListElements';
import AddAssistance from './AddAssistance';

class Assistance extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active: 'VIEW_ELEMENTS',
            // hideAssist:false
        }
        this.activeView= this.activeView.bind(this);
        this.changeView = this.changeView.bind(this);
    }
    changeView(view,sessionValue){
        if(view ==="ADD_ASSISTANCE"){
            this.setState({
                active:view,
                sessionNum:sessionValue,
            })
        }else {
            this.setState({active:view})
        }
    }
    activeView(){
        switch(this.state.active){
            case 'VIEW_ELEMENTS':
                return <ListElements 
                            query={this.props.location.query}
                            changeView={this.changeView}
                            hideAssist={this.state.hideAssist}
                            />;
            case 'ADD_ASSISTANCE':
                return <AddAssistance
                             sessionNum={this.state.sessionNum}
                             query={this.props.location.query}    
                             changeView={this.changeView}
                            //  inscriptionData={this.state.inscriptionData} 
                            //  participantData={this.state.participantData} 
                             />;
            default:
                return null;
        }
    }
    render(){
        return(
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <QueueAnim type="bottom" className="ui-animate">
                    <div key="2">{this.activeView()}</div>
                </QueueAnim>
            </div>
        )
    }
}

module.exports = Assistance;