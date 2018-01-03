import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const bar4 = {};

bar4.options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Ganaron', 'Perdieron'],
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
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      data: ['Examen.', 'Taller.', 'Tareas.', 'Pruebas.', 'Campo.', 'Curso.', 'Asistencia.'],
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
      name: 'Ganaron',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [1, 2, 0, 2, 1, 2, 2]
    },
    {
      name: 'Perdieron',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [2, 1, 2, 1, 2, 1, 1]
    },
  ]
};


const Bar = () => (
  <ReactEcharts option={bar4.options} showLoading={false} />
);

module.exports = Bar;
