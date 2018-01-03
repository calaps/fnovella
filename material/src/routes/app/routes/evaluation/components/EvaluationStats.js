import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

class EvaluationState extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {

    // Engagment pie charts
    const labelTop = {
      normal: {
        show: true,
        position: 'center',
        formatter: '{b}',
        textStyle: {
          color: 'rgba(0,0,0,.54)',
          baseline: 'bottom',
          fontSize: 14
        }
      }
    };
    const labelFromatter = {
      normal: {
        label: {
          formatter(params) {
            return `${100 - params.value}%`;
          },
          textStyle: {
            color: 'rgba(0,0,0,.54)',
            baseline: 'bottom',
            fontSize: 12
          }
        }
      },
    };
    const labelBottom = {
      normal: {
        color: 'rgba(0,0,0,.1)',
        label: {
          show: true,
          position: 'center'
        },
        labelLine: {
          show: false
        }
      }
    };
    const radius = [65, 70];
    const pie1 = {};
    const pie2 = {};

    pie1.options = {
      series: [{
        type: 'pie',
        radius,
        itemStyle: labelFromatter,
        data: [
          {name: 'Porcentaje de aprovados', value: this.props.options1, label: labelTop, labelLine: {normal: {show: false}}, itemStyle: {normal: {color: CHARTCONFIG.color.success}}},
          {name: 'other', value: this.props.options1, itemStyle: labelBottom}
        ]
      }]
    };

    pie2.options = {
      series: [{
        type: 'pie',
        radius,
        itemStyle: labelFromatter,
        data: [
          {name: 'Porcentaje de reporvados', value: this.props.options2, label: labelTop, itemStyle: {normal: {color: CHARTCONFIG.color.info}}},
          {name: 'other', value: this.props.options2, itemStyle: labelBottom}
        ]
      }]
    };
    return (
      <div className="row">
        <div className="col-xl-3 col-lg-6">
          <ReactEcharts style={{height: '200px'}} option={pie1.options} showLoading={false} />
        </div>
        <div className="col-xl-3 col-lg-6">
          <ReactEcharts style={{height: '200px'}} option={pie2.options} showLoading={false} />
        </div>
      </div>
    );
  }
}

module.exports = EvaluationState;
