'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function RatingLineChart({ 
  data: inputData = [3.2, 4.1, 4.8, 3.5, 2.8, 4.2, 4.6, 3.8, 4.4, 4.9],
  labels: inputLabels = ['01.04', '05.04', '10.04', '15.04', '20.04', '25.04', '30.04', '05.05', '10.05', '15.05']
}: {
  data?: number[];
  labels?: string[];
}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#022440',
        titleFont: { size: 12, weight: 'bold' as const },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Rating: ${context.parsed.y}`,
          title: (context: any) => `Dato: ${context[0].label}`,
        }
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    scales: {
      x: {
        display: false,
        offset: true,
      },
      y: {
        display: false,
        min: 1,
        max: 5,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
      },
      point: {
        radius: 2, // Small dot
        hoverRadius: 6,
        backgroundColor: '#022440',
        borderColor: '#FFFFFF',
        borderWidth: 1,
      },
    },
  };

  const labels = inputLabels;
  const data = {
    labels,
    datasets: [
      {
        data: inputData,
        borderColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#2B3D5D';
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, '#FF8C69');    // C (Rating 1)
          gradient.addColorStop(0.25, '#FFB347'); // C+ (Rating 2)
          gradient.addColorStop(0.5, '#FFD733');  // B (Rating 3)
          gradient.addColorStop(0.75, '#B5D333'); // B+ (Rating 4)
          gradient.addColorStop(1, '#38B1DA');    // A (Rating 5)
          return gradient;
        },
        borderWidth: 5,
        fill: false,
        clip: false,
        borderCapStyle: 'round' as const,
        borderJoinStyle: 'round' as const,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '110px', overflow: 'visible' }}>
      <Line options={options} data={data} />
    </div>
  );
}
