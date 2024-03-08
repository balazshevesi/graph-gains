"use client";

import React from "react";
import { Line } from "react-chartjs-2";

import useEntryModal from "@/zustand/useEntryModal";
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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

// Register the components we will need from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
);

interface TimeSeriesChartProps {
  data: {
    timestamp: string; // Assuming ISO string format for timestamps
    value: number;
    id: number | string;
  }[];
}

const MainChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const { open, setDate, setWeight } = useEntryModal();

  const chartData = {
    labels: data.map((d) => d.timestamp),
    datasets: [
      {
        label: "Weigth",
        data: data.map((d) => d.value),
        id: data.map((d) => d.id),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "yyyy-MM-dd",
        },
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: "kg",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    // Adding the onClick event listener
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const element = elements[0];
        const index = element.index;
        const datasetIndex = element.datasetIndex;

        // get data from data point
        const date = chartData.labels[index];
        const value = chartData.datasets[datasetIndex].data[index];
        const id = chartData.datasets[datasetIndex].id[index];

        //act on click
        open({ entryId: id });
        setWeight(value);
        setDate(new Date(date));
      }
    },
  };

  //@ts-ignore
  return <Line data={chartData} options={options} />;
};

export default MainChart;
