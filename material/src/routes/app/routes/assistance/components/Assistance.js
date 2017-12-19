import React from "react";
import QueueAnim from 'rc-queue-anim';
import ListElements from './ListElements';
import AddAssistance from './AddAssistance';
import EnrolledStudents from './EnrolledStudents';

class Assistance extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active: 'VIEW_ELEMENTS',
            enrolledStudentData:{}
        }
        this.activeView= this.activeView.bind(this);
        this.changeView = this.changeView.bind(this);
    }
    changeView(view,data){
        if(view ==="ADD_ASSISTANCE"){
            this.setState({
                active:view,
                sessionNum:data,
            })
        }else if(view==="SHOW_ENROLLED_STUDENTS"){
            this.setState({
                active:view,
                enrolledStudentData:data
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
                             />;
            case "SHOW_ENROLLED_STUDENTS":
                return <EnrolledStudents
                    enrolledStudentData={this.state.enrolledStudentData}
                    query={this.props.location.query}
                    changeView={this.changeView}
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