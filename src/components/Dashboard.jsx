import { useState } from "react";
import { FaDatabase, FaChartBar, FaSync, FaServer } from "react-icons/fa";
import styles from "../styles/Dashboard.module.scss";
import StackedBarChart from "./StackedBarChart";

const Dashboard = () => {
    // Mock Data
    const [storageUsed, setStorageUsed] = useState(62); // Example: 62% Storage Used
    const [apiCallsTotal, setApiCallsTotal] = useState(12450);
    const [apiCallsMonthly, setApiCallsMonthly] = useState(342);

    return (
        <div className={styles.dashboardContainer}>
            {/* 🔝 Top Section - Summary Cards */}
            <div className={styles.topCards}>
                {/* Storage Card */}
                <div className={styles.card}>
                    <FaDatabase className={styles.icon} />
                    <div className={styles.cardContent}>
                        <h3>Storage Usage</h3>
                        <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: `${storageUsed}%` }}></div>
                        </div>
                        <span>{storageUsed}% Used</span>
                        <button className={styles.manageBtn}>Manage Storage</button>
                    </div>
                </div>

                {/* API Calls (All Time) */}
                <div className={styles.card}>
                    <FaChartBar className={styles.icon} />
                    <div className={styles.cardContent}>
                        <h3>API Calls (All Time)</h3>
                        <p>{apiCallsTotal.toLocaleString()}</p>
                    </div>
                </div>

                {/* API Calls (This Month) */}
                <div className={styles.card}>
                    <FaSync className={styles.icon} />
                    <div className={styles.cardContent}>
                        <h3>API Calls (This Month)</h3>
                        <p>{apiCallsMonthly.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* 📊 Middle Section - Split Left & Right */}
            <div className={styles.dashboardContent}>
                {/* Left: Stacked Bar Chart */}
                <div className={styles.leftChart}>
                    <h3>API Usage Trends</h3>
                    <StackedBarChart />
                </div>

                {/* Right: Future Expansion */}
                <div className={styles.rightSection}>
                    <h3>Coming Soon...</h3>
                    <p>More insights and analytics will be available here.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
