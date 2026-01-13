import { useState } from "react";
import styles from "../styles/Sidebar.module.scss";
import { FaUpload, FaCheckCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
            {/* Sidebar Toggle Button for Mobile */}
            <button className={styles.toggleButton} onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation Links */}
            <nav className={styles.nav}>
                <Link to="/dashboard" className={styles.navItem}>Dashboard</Link>
                <Link to="/upload" className={styles.navItem}>Upload</Link>
                <Link to="/settings" className={styles.navItem}>Settings</Link>
            </nav>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
                <h3 className={styles.sectionTitle}>Quick Actions</h3>

                {/* New Upload Button */}
                <button className={styles.actionButton} onClick={() => document.getElementById("fileUpload").click()}>
                    <FaUpload className={styles.icon} />
                    New Upload
                </button>
                <input type="file" id="fileUpload" className={styles.hiddenInput} />

                {/* Verify Document Button */}
                <button className={styles.actionButton}>
                    <FaCheckCircle className={styles.icon} />
                    Verify Document
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
