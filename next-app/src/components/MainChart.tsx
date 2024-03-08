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
        // Assuming the first element in the array is the one you're interested in
        const element = elements[0];
        // Accessing specific properties of the clicked element
        const index = element.index; // Index of the clicked data point
        const datasetIndex = element.datasetIndex; // Dataset index, useful if you have multiple datasets
        const label = chartData.labels[index]; // Getting the label of the clicked data point
        const value = chartData.datasets[datasetIndex].data[index]; // Getting the value of the clicked data point
        const id = chartData.datasets[datasetIndex].id[index]; // Getting the value of the clicked data point

        // Here, you can add any action you want to perform on click, for example:
        console.log(
          `Clicked on: ${label} with value: ${value} and with id of ${id}`,
        );
        open({ entryId: id });
        setWeight(value);
        setDate(new Date(label));
        // Or call a function with the clicked data point details
        // handleDataPointClick(label, value);
      }
    },
  };

  //@ts-ignore
  return <Line data={chartData} options={options} />;
};

export default MainChart;
