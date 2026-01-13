import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.scss";
import {FaUser, FaEnvelope, FaPhone, FaLock, FaArrowLeft, FaSignOutAlt, FaEyeSlash, FaEye} from "react-icons/fa";
import api from "../utils/api";
import Cookies from "js-cookie";
import { useToast } from "../components/Toast";

const Profile = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [activeSection, setActiveSection] = useState("name");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/user/profile");
                const userData = response.data;
                setFirstName(userData.first_name);
                setLastName(userData.last_name || "");
                setPhone(userData.phone || "");
                setEmail(userData.email);
            } catch (err) {
                setError("Failed to fetch profile");
                toast.error("Failed to fetch profile");
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        if (password && password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await api.put("/user/profile", {
                first_name: firstName,
                last_name: lastName,
                phone,
                password: password || undefined,
            });
            toast.success("Profile updated successfully!");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError("Failed to update profile");
            toast.error("Failed to update profile");
        }
    };

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.removeItem("token");
        toast.info("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className={styles.profilePage}>
            <header className={styles.navbar}>
                <button onClick={() => navigate("/account/dashboard")} className={styles.navButton}>
                    <FaArrowLeft /> Dashboard
                </button>
                <button onClick={handleLogout} className={styles.navButton}>
                    <FaSignOutAlt /> Logout
                </button>
            </header>

            <div className={styles.profileLayout}>
                {/* Sidebar Navigation */}
                <aside className={styles.sidebar}>
                    <button className={`${styles.sidebarButton} ${activeSection === "name" ? styles.active : ""}`} onClick={() => setActiveSection("name")}>Personal Info</button>
                    <button className={`${styles.sidebarButton} ${activeSection === "contact" ? styles.active : ""}`} onClick={() => setActiveSection("contact")}>Contact Details</button>
                    <button className={`${styles.sidebarButton} ${activeSection === "security" ? styles.active : ""}`} onClick={() => setActiveSection("security")}>Security</button>
                </aside>

                {/* Right Content Area */}
                <div className={styles.profileContent}>
                    <h2 className={styles.title}>Profile Settings</h2>
                    {error && <p className={styles.error}>{error}</p>}

                    {activeSection === "name" && (
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Personal Information</h3>
                            <div className={styles.inputGroup}>
                                <label>First Name</label>
                                <div className={styles.inputWrapper}>
                                    <FaUser className={styles.icon} />
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Last Name</label>
                                <div className={styles.inputWrapper}>
                                    <FaUser className={styles.icon} />
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeSection === "contact" && (
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Contact Details</h3>
                            <div className={styles.inputGroup}>
                                <label>Phone Number</label>
                                <div className={styles.inputWrapper}>
                                    <FaPhone className={styles.icon} />
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Email</label>
                                <div className={styles.inputWrapper}>
                                    <FaEnvelope className={styles.icon} />
                                    <input type="email" value={email} disabled />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeSection === "security" && (
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Security</h3>

                            <div className={styles.inputGroup}>
                                <label>New Password (Optional)</label>
                                <div className={styles.inputWrapper}>
                                    <FaLock className={styles.icon} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Confirm Password</label>
                                <div className={styles.inputWrapper}>
                                    <FaLock className={styles.icon} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span className={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </section>
                    )}

                    <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;