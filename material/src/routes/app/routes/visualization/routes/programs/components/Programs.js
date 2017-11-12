import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest
} from '../../../../../../../actions';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/photo-1438893761775-f1db119d27b2.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Programs</h1>
      </div>
    </div>
  </section>
);

const CardExampleExpandable = (props) => (
  <Card>
    <CardHeader
      title={props.program.name.toUpperCase()}
      subtitle={props.program.clasification.toUpperCase()
      + ' - ' + props.program.description[0].toUpperCase() + props.program.description.substring(1)}
      actAsExpander={true}
      showExpandableButton={true}
    />
    {/*<CardActions>*/}
      {/*<FlatButton label="Action1" />*/}
      {/*<FlatButton label="Action2" />*/}
    {/*</CardActions>*/}
    <CardText expandable={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
  </Card>
);

let self;
let size = 10; //limit
let number = 0; //page

class Programs extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      size,
      number,
      incrementFactor: 10,
      isLoading: true
    };
    this.loadMore = this.loadMore.bind(this);
    self = this;
  }

  async componentWillMount() {
    // type: 2 reflects all programs
    let response = await this.props.actions.programGetRequest(this.state.number, this.state.size);
    this.setState({isLoading: false});
  }

  async loadMore(){
    this.setState({isLoading: true});
    await this.props.actions.programGetRequest(this.state.number, this.state.size+this.state.incrementFactor);
    this.setState({
      isLoading: false,
      size: this.state.size+this.state.incrementFactor
    })
  }

  render(){
    let programs = this.props.programs.content || [];

    return (
      <section className="page-about chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><Hero /></div>
          <div key="2">
            {
              programs.map((program, index)=>{
                return <CardExampleExpandable key={index} program={program}></CardExampleExpandable>;
              })
            }
          </div>
          <div key="3" className="text-center">
            {
              (this.state.isLoading)?
                <LinearProgress mode="indeterminate" />:
                <FlatButton label="Load More" primary={true} onClick={this.loadMore}/>
            }
          </div>
        </QueueAnim>
      </section>
    )
  }
}

function mapStateToProps(state) {
  //pass the providers
  return {
    programs: state.programs
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(Programs);
