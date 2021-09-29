import React from 'react';
import { Line } from 'react-chartjs-2';
import { Empty } from 'antd';

// Example
export const dataLineChart: IChartLine = {
  labels: ['T1', 'T2', 'T3'],
  datasets: [
    {
      label: 'line',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'orange',
      borderColor: 'orange',
      borderWidth: 2,
      data: [1, 2, 1],
    },
  ],
};

export interface ILineConfig {
  label: string;
  fill: boolean;
  lineTension: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: number[];
}

export interface IChartLine {
  labels: string[];
  datasets: ILineConfig[];
}

interface ILineChart {
  data: IChartLine | undefined;
  height?: number;
  width?: number;
}

const LineChart: React.FC<ILineChart> = ({ data, width, height }) => {
  return <div>{data ? <Line data={data} height={height} width={width} /> : <Empty />}</div>;
};
export default LineChart;
