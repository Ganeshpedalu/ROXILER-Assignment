import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import "../PieChart/PieChart.css";
import axios from 'axios'


export default function PieChart(props) {
    const[pieChartData ,setPieChartData]= useState([])

    useEffect(() => {
        axios
            .get('http://localhost:4000/pie-chart-data', {
                params: {
                    month: props.month,
                },
            }).then((response)=>{
                setPieChartData(response.data)
            }).catch((error)=>{
                console.error('Error fetching data:', error);
            });

    },[])

        const labels = pieChartData.map((data) => data._id);
        const series = pieChartData.map((data) => data.itemCount);

        const chartOptions = {
            labels: labels,
            legend: {
              show: true,
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  style: {
                    colors: ['#fff'], 
                  },
                },
              },
            },
          };
          
          

   
    







    return (
        <div className='pie-container'>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="pie"
          width={480}
          className = "pie"
        />
      </div>
    )
}
