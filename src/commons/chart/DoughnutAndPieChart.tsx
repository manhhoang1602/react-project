import React, { Component } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';

interface IConfigChart {
  label: string;
  data: number[];
  backgroundColor: string[];
}

interface IDataDoughnutAndPieChart {
  labels: string[];
  datasets: IConfigChart[];
}

const dataDoughnutAndPie: IDataDoughnutAndPieChart = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 56, 47, 12, 52],
      backgroundColor: ['red', 'black', 'green', 'orange', 'gray'],
    },
  ],
};

class DoughnutAndPieChart extends Component {
  render() {
    return (
      <div>
        <Doughnut data={dataDoughnutAndPie} height={200} width={200} />
      </div>
    );
  }
}

export default DoughnutAndPieChart;
