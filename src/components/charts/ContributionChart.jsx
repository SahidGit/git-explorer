import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ContributionChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Process data: GitHub returns array of weeks. We'll take last 12 weeks for better view
    const recentWeeks = data.slice(-12);
    const labels = recentWeeks.map((week, index) => `Week ${index + 1}`);
    const commitCounts = recentWeeks.map(week => week.total);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Commits',
                data: commitCounts,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#3b82f6',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f8fafc',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(51, 65, 85, 0.5)',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    display: false, // Hide labels for cleaner look
                },
            },
            y: {
                grid: {
                    color: 'rgba(51, 65, 85, 0.2)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    stepSize: 1,
                },
                beginAtZero: true,
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    };

    return (
        <div className="h-64 w-full">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ContributionChart;
