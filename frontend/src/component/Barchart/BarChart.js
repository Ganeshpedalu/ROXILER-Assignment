import React, { useEffect, useState,  } from 'react';
import axios from 'axios';
import '../Barchart/BarChart.css'

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from 'recharts';

export default function Barchart(props) {
  const [barChart, setBarChart] = useState([]);
  const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

  useEffect(() => {
    axios
      .get('http://localhost:4000/bar-chart-data', {
        params: {
          month: props.month,
        },
      })
      .then((response) => {
        const modifiedData = response.data.map((entry, index, array) => ({
          ...entry,
          priceRange: index === array.length - 1 ? '901-above' : entry.priceRange,
        }));
        setBarChart(modifiedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='chart-container'>
      <Text
        x="50%"
        y="10%"
        fontSize={50}
        fontWeight="bold"
        fill="#000"
        textAnchor="middle"
        className="chart-title" 
      >
        Bar - Chart Stats {monthNames[props.month-1]}
      </Text>
      <ResponsiveContainer width="50%" height={300}>
        <BarChart data={barChart} className="chart"> 
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="priceRange"
            position="bottom"
            angle={-45}
            textAnchor="end"
            label=""
            tick={{ fontSize: 11, dy: 10 }}
            className="x-axis" 
          />
          <YAxis domain={[0, 80]} />
          <Tooltip className="tooltip" />
          <Legend className="legend" /> 
          <Bar dataKey="itemCount" fill="#8884d8" className="bar" /> 
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
