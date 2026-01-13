import { useState } from "react";
import styles from "../styles/InitiateContract.module.scss";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

const InitiateContract = () => {
    const [email, setEmail] = useState("");

    const handleSendInvitation = () => {
        if (!email.trim()) {
            alert("Please enter a valid email address.");
            return;
        }
        console.log(`Invitation sent to: ${email}`);
        // TODO: Implement API call to send contract invitation
        alert(`Invitation successfully sent to ${email}`);
        setEmail("");
    };

    return (
        <div className={styles.contractContainer}>
            <h2 className={styles.title}>Initiate Contract</h2>
            <p className={styles.subtitle}>Enter the recipient&#39;s email to send an invitation</p>

            <div className={styles.inputGroup}>
                <FaEnvelope className={styles.icon} />
                <input
                    type="email"
                    placeholder="Recipient Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button className={styles.sendButton} onClick={handleSendInvitation}>
                <FaPaperPlane className={styles.buttonIcon} /> Send Invitation
            </button>
        </div>
    );
};

export default InitiateContract;
