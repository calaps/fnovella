import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  evaluationActivityGetByEvaluationId,
  evaluationActivityParticipantGetByActivityId
} from '../../../../../actions';
import ListItem from './ListItem';

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluationActivities: [],
      evaluationActivityParticipants: [],
    };

  }

  componentWillMount() {
    this.props.actions.evaluationActivityGetByEvaluationId(this.props.evaluationId)
      .then(
        (response) => {
          if (response) {
            this.setState({
              evaluationActivities: response.data
            });
            for(let act of this.state.evaluationActivities){
              this.props.actions.evaluationActivityParticipantGetByActivityId(act.id)
                .then((res)=>{
                  if(res){
                   this.setState({
                     evaluationActivityParticipants: [...this.state.evaluationActivityParticipants,...res.data.content]
                   })
                  }
                });
            }
          }
        }
      );
  }

  render() {
    let i = 1;
    let showEvaluationActivityParticipant = () => {
      let evaluationActivityParticipants = this.state.evaluationActivityParticipants;
      return evaluationActivityParticipants.map((evaluationActivityParticipant) => {
        return <ListItem
          key={evaluationActivityParticipant.id}
          number={i++}
          evaluationActivityParticipantData={evaluationActivityParticipant}
        />
      });
    };

    return (

      <article className="article">
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">

              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Id</th>
                      <th className="mdl-data-table__cell--non-numeric">Activity Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Participant Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Participant Email</th>
                      <th className="mdl-data-table__cell--non-numeric">Participant Genero</th>
                      <th className="mdl-data-table__cell--non-numeric">Grade Initial</th>
                      <th className="mdl-data-table__cell--non-numeric">Grade Final</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showEvaluationActivityParticipant()}
                    </tbody>
                  </table>
                </div>

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

  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      evaluationActivityGetByEvaluationId,
      evaluationActivityParticipantGetByActivityId
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);
