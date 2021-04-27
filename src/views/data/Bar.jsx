import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react'

class Line extends Component {
  getOptions = () => {
    return {
      title: {
        text: '测试',
        textAlign: 'left',
        left: 'center'
      },
      legend: {
        bottom: 'bottom',
        data: ['1季度销量']
      },
      tooltip: {
        show: true
      },
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          name:'1季度销量',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
      }]
    }
  }
  render() {
    return (
      <div>
        柱状图
        <ReactECharts option={this.getOptions()}></ReactECharts>
      </div>
    );
  }
}

export default Line;