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
import chartTrendline from "chartjs-plugin-trendline";
import zoomPlugin from "chartjs-plugin-zoom";

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
  chartTrendline,
  zoomPlugin,
);

interface TimeSeriesChartProps {
  showTrendline: boolean;
  showRounded: boolean;
  data: {
    timestamp: string; // Assuming ISO string format for timestamps
    value: number;
    id: number | string;
  }[];
}

const MainChart: React.FC<TimeSeriesChartProps> = ({
  data,
  showTrendline,
  showRounded,
}) => {
  const { open, setDate, setWeight } = useEntryModal();

  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  const colorMin = `hsla(${primaryColor}, 0.5)`; // Assuming 0.5 opacity

  const chartData = {
    // maintainAspectRatio: false,
    labels: data.map((d) => d.timestamp),
    datasets: [
      {
        // pointRadius: 4,
        // pointHoverRadius: 6,

        label: "Weigth",
        data: data.map((d) => d.value),
        id: data.map((d) => d.id),
        borderColor: `hsl(${primaryColor})`,

        backgroundColor: `rgba(0,0,0,0)`,
        fill: true,
        tension: showRounded ? 0.5 : 0.01,

        trendlineLinear: {
          colorMin: `hsla(${primaryColor})`,
          colorMax: `hsl(${primaryColor})`,
          lineStyle: "dotted",
          width: showTrendline ? 2 : 0.0000000000001,
          // xAxisKey: "time"(optional),
          // yAxisKey: "usage"(optional),
          // projection: true,
        },
      },
    ],
  };

  const options = {
    // aspectRatio: 1.5,
    maintainAspectRatio: false,

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
      zoom: {
        zoom: { wheel: { enabled: true, speed: 0.1 } },
        pan: { enabled: true },
      },
      legend: {
        display: false, //lets the user switch between datasets
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "black",
        bodyColor: "black",
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
