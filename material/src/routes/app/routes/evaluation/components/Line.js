import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const line4 = {};

line4.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Aprobado', 'Reprobado'],
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
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Aprobado',
      type: 'line',
      stack: 'Sum',
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [17, 12, 11, 18, 15, 13, 15]
    },
    {
      name: 'Reprobado',
      type: 'line',
      stack: 'Sum',
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [3, 8, 9, 2, 5, 7, 5]
    },
  ]
};


const Line = () => (
  <ReactEcharts option={line4.options} showLoading={false} />
);

module.exports = Line;
