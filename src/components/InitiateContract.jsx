import { useState } from "react";
import styles from "../styles/InitiateContract.module.scss";
import { FaEnvelope, FaPaperPlane, FaComment } from "react-icons/fa";
import api from "../utils/api";
import { useToast } from "../components/Toast";

const InitiateContract = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const toast = useToast();

    const handleSendInvitation = async () => {
        if (!email.trim()) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await api.post("/invitations", {
                receiver_email: email,
                message: message || undefined,
            });
            toast.success(`Invitation sent to ${email}`);
            setEmail("");
            setMessage("");
        } catch (err) {
            const errorMsg = err.response?.data?.detail || err.response?.data?.message || "Failed to send invitation.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.contractContainer}>
            <h2 className={styles.title}>Initiate Contract</h2>
            <p className={styles.subtitle}>Enter the recipient's email to send an invitation</p>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.inputGroup}>
                <FaEnvelope className={styles.icon} />
                <input
                    type="email"
                    placeholder="Recipient Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <FaComment className={styles.icon} />
                <input
                    type="text"
                    placeholder="Message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <button
                className={styles.sendButton}
                onClick={handleSendInvitation}
                disabled={loading}
            >
                <FaPaperPlane className={styles.buttonIcon} />
                {loading ? "Sending..." : "Send Invitation"}
            </button>
        </div>
    );
};

export default InitiateContract;