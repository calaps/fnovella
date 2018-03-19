import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

class Chart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      option1: props.option1,
      option2: this.props.option2,
    };
  };
  render(){
    const pie1 = {};
    pie1.options = {
      title: {
        text: 'Grafica de pie',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['Ganaron', 'Perdierón'],
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {show: true, title: 'save'}
        }
      },
      calculable: true,
      series: [
        {
          name: 'Vist source',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: this.props.options1, name: 'Ganaron'},
            {value: this.props.options2, name: 'Perdierón'},
          ]
        }
      ]
    };
    return (
      <ReactEcharts option={pie1.options} showLoading={false} />
    );
  }
}
module.exports = Chart;
