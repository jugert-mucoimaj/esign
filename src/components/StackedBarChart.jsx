import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "../styles/StackedBarChart.module.scss";

// Sample Data (API Requests per Day)
const data = [
    { name: "Mon", Verified: 20, Signed: 15, Uploaded: 10 },
    { name: "Tue", Verified: 35, Signed: 25, Uploaded: 15 },
    { name: "Wed", Verified: 50, Signed: 30, Uploaded: 20 },
    { name: "Thu", Verified: 45, Signed: 35, Uploaded: 25 },
    { name: "Fri", Verified: 60, Signed: 50, Uploaded: 30 },
    { name: "Sat", Verified: 40, Signed: 30, Uploaded: 15 },
    { name: "Sun", Verified: 30, Signed: 20, Uploaded: 10 },
];

const StackedBarChart = () => {
    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>API Usage Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <XAxis dataKey="name" stroke="#E4C580" />
                    <YAxis stroke="#E4C580" />
                    <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
                    <Legend />
                    <Bar dataKey="Verified" stackId="a" fill="#E4C580" />
                    <Bar dataKey="Signed" stackId="a" fill="#FFD700" />
                    <Bar dataKey="Uploaded" stackId="a" fill="#A67C00" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedBarChart;
