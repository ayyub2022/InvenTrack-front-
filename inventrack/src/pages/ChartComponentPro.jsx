import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import './ChartComponent.css';

const ChartComponentPro = () => {
    const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/product_sales");
        const data = response.data;

        // Extract labels and data for the chart
        const labels = data.map(item => item.product);
        const quantities = data.map(item => item.total_quantity);

        // Generate a set of distinct colors
        const colors = ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(231, 233, 237, 0.2)'];
        const borderColors = ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(231, 233, 237, 1)'];

        // Ensure the colors array length matches the number of data points
        const chartColors = colors.slice(0, quantities.length);
        const chartBorderColors = borderColors.slice(0, quantities.length);

        setChartData({
          labels,
          datasets: [{
            data: quantities,
            backgroundColor: chartColors,
            borderColor: chartBorderColors,
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (canvasRef.current && chartData.labels.length > 0) {
      chartInstance.current = new Chart(canvasRef.current, {
        type: 'pie', // Pie chart type
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value}`;
                }
              }
            },
            datalabels: {
              display: true,
              color: '#000',
              formatter: (value, context) => {
                const total = context.chart._metasets[0].total;
                const percentage = ((value / total) * 100).toFixed(2);
                return `${percentage}%`;
              },
              anchor: 'end',
              align: 'center',
              offset: 0,
              font: {
                weight: 'bold',
                size: 16
              }
            }
          }
        },
        plugins: [ChartDataLabels] // Register the plugin
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};


export default ChartComponentPro;
