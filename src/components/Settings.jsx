import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Settings.module.scss";
import { FaEye, FaEyeSlash, FaCopy, FaSyncAlt, FaShieldAlt, FaCogs } from "react-icons/fa";

const Settings = () => {
    const [showPublicKey, setShowPublicKey] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [autoDownload, setAutoDownload] = useState(true);
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [loadingKeys, setLoadingKeys] = useState(false);

    const copyToClipboard = (key) => {
        navigator.clipboard.writeText(key);
        alert("Copied to clipboard!");
    };

    const fetchKeys = async () => {
        setLoadingKeys(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/auth/retrieve_keys",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setPublicKey(response.data.public_key);
            setPrivateKey(response.data.private_key);
        } catch (error) {
            console.error("Error retrieving keys:", error.response ? error.response.data : error);
        } finally {
            setLoadingKeys(false);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    return (
        <div className={styles.settingsContainer}>
            <h2 className={styles.title}>Settings</h2>

            <div className={styles.section}>
                <h3 className={styles.someHeaders}>
                    <FaShieldAlt className={styles.icon} /> Security
                </h3>

                {/* Public Key */}
                <div className={styles.keyContainer}>
                    <span>Public Key</span>
                    <div className={styles.keyBox}>
                        <span>{showPublicKey ? publicKey : "••••••••••••••"}</span>
                        <button onClick={() => setShowPublicKey(!showPublicKey)}>
                            {showPublicKey ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button onClick={() => copyToClipboard(publicKey)}>
                            <FaCopy />
                        </button>
                    </div>
                </div>

                {/* Private Key */}
                <div className={styles.keyContainer}>
                    <span>Private Key</span>
                    <div className={styles.keyBox}>
                        <span>{showPrivateKey ? privateKey : "••••••••••••••"}</span>
                        <button onClick={() => setShowPrivateKey(!showPrivateKey)}>
                            {showPrivateKey ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button onClick={() => copyToClipboard(privateKey)}>
                            <FaCopy />
                        </button>
                    </div>
                </div>

                {/* Refresh Keys Button */}
                <button onClick={fetchKeys} className={styles.rotateButton} disabled={loadingKeys}>
                    <FaSyncAlt /> {loadingKeys ? "Refreshing..." : "Refresh Keys"}
                </button>
            </div>

            {/* Preferences Section */}
            <div className={styles.section}>
                <h3 className={styles.someHeaders}>
                    <FaCogs className={styles.icon} /> Preferences
                </h3>

                {/* Auto-Download Toggle */}
                <div className={styles.toggleContainer}>
                    <span>Auto-Download Signed Documents</span>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={autoDownload}
                            onChange={() => setAutoDownload(!autoDownload)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
