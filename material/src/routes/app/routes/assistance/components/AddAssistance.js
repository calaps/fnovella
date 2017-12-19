import React from 'react';
import {RaisedButton} from "material-ui";
import {
    assistanceAddRequest,
    assistanceParticipantAddRequest,
    categoriesGetRequest,
    catalogsGetByCategoryRequest,
    participantsGetRequestBySearch,
    participantGetRequest,
    inscriptionParticipantGetRequest,
    inscriptionGetRequest,
    groupGetByIdRequest,

    inscriptionParticipantGetByGroupId,
    inscriptionGetByGroupId
} from '../../../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListItem from './ListItem';

var sessionNumber= 1;

let size = 10; //limit
let number = 0; //page
class AddAssistance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            catalogs: [],
            inscriptions:[],
            errors:{},
            dataCount:0,
            sessionValue: 0,
            session: 1,
            group: '',
            assistanceData:[],
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.AddData=this.AddData.bind(this);
        this.addRequest=this.addRequest.bind(this);
    }
    componentWillMount() {
        this.props.actions.inscriptionParticipantGetByGroupId(this.props.query.id,number,size);
        this
          .props
          .actions
          .inscriptionGetByGroupId(this.props.query.id)
          .then((response) => {
            if (response) {
              this.setState({inscriptions: response.data})
            }
          });
        this
          .props
          .actions
          .inscriptionGetRequest(0, 1000);
        this
          .props
          .actions
          .participantGetRequest(0, 1000);
          this
          .props
          .actions
          .groupGetByIdRequest(this.props.query.id)
          .then((res) => {
              this.setState({group: res.data});
          })
        //   this.props.actions.assistanceGetRequest(0,1000)
      
        this
            .props
            .actions
            .categoriesGetRequest()
            .then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].name === "asistencia") {
                        this
                            .props
                            .actions
                            .catalogsGetByCategoryRequest(res.data[i].id)
                            .then((res) => {
                                this.setState({catalogs: res.data.content});
                            });
                    }
                }
            });
        
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    isValid(data){
    for(var i=0; i<data.length;i++){
        if(data[i].value===''){
            this.setState({
                errors:{
                    catalog:"Catalog is required"
                }
            })
            // alert(false);
            return false;       
        }
    }
    return true;
    }

    async addRequest(assistanceData){
        let data={
           inscription: assistanceData.inscription,
           date: assistanceData.date,
           month: assistanceData.month,
           session: assistanceData.session,
       }
       await this
           .props
           .actions
           .assistanceAddRequest(data).then((res)=>{
               let assistanceParticipantData={
                   assistance: res.data.id,
                   participant: assistanceData.participant,
                   value:assistanceData.value
               }
               this.props.actions.assistanceParticipantAddRequest(assistanceParticipantData)

           })
   }

    onSubmit(e) {
        e.preventDefault();
        // alert('adasdada');

        let {assistanceData}=this.state;
            if(this.isValid(assistanceData)){
                for(var i = 0; i<assistanceData.length;i++){
                    this.addRequest(assistanceData[i]); 
                }   
                this.props.changeView("VIEW_ELEMENTS")
            }
    }
    AddData(data) {
        let assistance = this.state.assistanceData.find(element =>{ return element.inscription == data.inscription});
        let _assistanceData = this.state.assistanceData;
        if(assistance){
            _assistanceData = _assistanceData.map(element => element.inscription ==  assistance.inscription ? {...element, value : data.value} : element);
        } else{
            _assistanceData.push(data);
        }
        this.setState({
            assistanceData: _assistanceData
        })
        
    }
    render() {
        const {errors} = this.state;        
        var i = 0;
            var renderCurrentMonth = (month)=> {
                switch (this.state.date.getMonth()+ 1) {
                  case 1:
                      return "January";
                  case 2:
                      return "February";
                  case 3:
                      return "March";
                  case 4:
                      return "April";
                  case 5:
                      return "May";
                  case 6:
                      return "June";
                  case 7:
                      return "July";
                  case 8:
                      return "August";
                  case 9:
                      return "September";
                  case 10:
                      return "October";
                  case 11:
                      return "November";
                  case 12:
                      return "December";
              }
            }
      let showInscribedParticipantList = ()=>{
      let inscriptionParticipants = this.props.inscriptionParticipants.content || [];
      let inscriptions = this.state.inscriptions;
      let participants = this.props.participants.content || [];
      return inscriptionParticipants.map((inscriptionParticipant) => {
        let inscription = inscriptions.find(_inscription => {
          if(_inscription.status == 1){
            return (_inscription.id == inscriptionParticipant.inscription)
          }
        });
        let participant = participants.find(_participant => {
          return (_participant.id == inscriptionParticipant.participant)
        });
        if (inscription && participant) {
            return <ListItem
            sessionNum={this.props.sessionNum}
            changeView= {this.props.changeView}
            key={inscriptionParticipant.id}
            number={i++}
            catalogs={this.state.catalogs}
            participantData={participant}
            inscriptionData={inscription}
            AddAssistance={this.AddData}
            />
        }
      })
    };

     return (
            <article className="article">
              <h2 className="article-title">Assistance Evaluation<br/> {renderCurrentMonth()} Session {this.props.sessionNum}</h2>
              <div className="row">
                <div className="col-xl-12">
                  <div className="box box-transparent">
                    <div className="box-body no-padding-h">

                    <form onSubmit={this.onSubmit}>
                      <div className="box box-default table-box mdl-shadow--2dp">
                        <table className="mdl-data-table">
                          <thead>
                            <tr>
                              <th className="mdl-data-table__cell--non-numeric">#</th>
                              <th className="mdl-data-table__cell--non-numeric">Partcipant</th>
                              <th className="mdl-data-table__cell--non-numeric">Number Of Session</th>
                              <th className="mdl-data-table__cell--non-numeric">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                          {showInscribedParticipantList()}
                          </tbody>
                        </table>
                        
                      </div>
                      
                        <div className="form-group row">
                          {errors.catalog && <span className="help-block text-danger">{errors.catalog}</span>}
                        </div>

                      <button
                      className="btn btn-primary float-right"
                      type="submit"
                      onClick={this.onSubmit}
                      >Submit</button>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
            </article>

        );
    }
}

function mapStateToProps(state) {
    //pass the providers
    return {
        participants: state.participants, 
        inscriptions: state.inscriptions, 
        catalogs: state.catalogs, 
        inscriptionParticipants: state.inscriptionParticipants
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            catalogsGetByCategoryRequest,
            assistanceAddRequest,
            categoriesGetRequest,
            participantGetRequest,
            participantsGetRequestBySearch,
            inscriptionParticipantGetRequest,
            inscriptionGetRequest,
            assistanceParticipantAddRequest,
            groupGetByIdRequest,

            inscriptionParticipantGetByGroupId,
            inscriptionGetByGroupId
        }, dispatch)
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddAssistance);