import { useState } from "react";
import styles from "../styles/MainPage.module.scss";
import { FaBars, FaUserCircle } from "react-icons/fa";
import Settings from "../components/Settings.jsx";
import Upload from "../components/Upload.jsx";
import Verify from "../components/Verify.jsx";
import Dashboard from "../components/Dashboard.jsx";
import InitiateContract from "../components/InitiateContract.jsx";
import { logout } from "../utils/auth";
import ContractInvitations from "../components/ContractInvitations.jsx";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState("dashboard");

    const navigate = useNavigate();

    const handleProfile = () => {
        navigate("/account/profile");
    };

    return (
        <div className={styles.mainContainer}>
            {/* Top Navbar */}
            <header className={styles.topNavbar}>
                <FaBars className={styles.menuIcon} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <h2 className={styles.title}>Dashboard</h2>

                {/* Profile Dropdown */}
                <div className={styles.profile} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    <FaUserCircle className={styles.profileIcon} />
                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <button onClick={handleProfile}>Profile</button>
                            <button onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
            </header>

            <div className={styles.contentWrapper}>
                {/* Sidebar */}
                <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
                    <nav className={styles.navLinks}>
                        <button onClick={() => setSelectedComponent("dashboard")}>Dashboard</button>
                        <button onClick={() => setSelectedComponent("contract")}>Create Contract</button>
                        <button onClick={() => setSelectedComponent("upload")}>Upload</button>
                        <button onClick={() => setSelectedComponent("verify")}>Verify Document</button>
                        <button onClick={() => setSelectedComponent("settings")}>Settings</button>
                    </nav>
                </aside>

                {/* Main Content (Middle Section) */}
                <main className={styles.middleContent}>
                    {selectedComponent === "dashboard" && <Dashboard />}
                    {selectedComponent === "contract" && <InitiateContract />}
                    {selectedComponent === "upload" && <Upload />}
                    {selectedComponent === "verify" && <Verify />}
                    {selectedComponent === "settings" && <Settings />}
                </main>

                {/* Right Panel */}
                <aside className={styles.rightPanel}>
                    <ContractInvitations/>
                </aside>
            </div>
        </div>
    );
};

export default MainPage;
