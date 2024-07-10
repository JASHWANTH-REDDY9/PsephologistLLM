import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const VotesChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Your JSON data
        const data = [
            { "Party": "TRS", "total_votes": 596048 },
            { "Party": "INC", "total_votes": 279621 },
            { "Party": "BJP", "total_votes": 201567 },
            { "Party": "IND", "total_votes": 51045 },
            { "Party": "NOTA", "total_votes": 15390 },
            { "Party": "SHS", "total_votes": 2624 },
            { "Party": "SUCI(C)", "total_votes": 2445 },
            { "Party": "PPOI", "total_votes": 1483 }
        ];

        // Extract party names and total votes
        const labels = data.map(item => item.Party);
        const votes = data.map(item => item.total_votes);

        // Create the chart
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Change to 'pie' or 'line' if needed
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Votes',
                    data: votes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(199, 199, 199, 0.2)',
                        'rgba(83, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)',
                        'rgba(83, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);

    return (
        <canvas ref={chartRef} width="400" height="200"></canvas>
    );
};

export default VotesChart;
