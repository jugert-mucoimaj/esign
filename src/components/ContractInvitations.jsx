import { useState, useEffect } from "react";
import styles from "../styles/ContractInvitations.module.scss";
import { FaUserCircle, FaCheck, FaTimes, FaFileSignature, FaSync } from "react-icons/fa";
import api from "../utils/api";
import { useToast } from "../components/Toast";

const ContractInvitations = () => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const toast = useToast();

    const fetchInvitations = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.get("/invitations/pending");
            setInvitations(response.data);
        } catch (err) {
            console.error("Error fetching invitations:", err);
            setError("Failed to load invitations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, []);

    const handleAccept = async (id) => {
        try {
            await api.post(`/invitations/${id}/accept`);
            setInvitations(invitations.filter(invite => invite.id !== id));
            toast.success("Invitation accepted!");
        } catch (err) {
            console.error("Error accepting invitation:", err);
            toast.error("Failed to accept invitation.");
        }
    };

    const handleReject = async (id) => {
        try {
            await api.post(`/invitations/${id}/reject`);
            setInvitations(invitations.filter(invite => invite.id !== id));
            toast.info("Invitation rejected.");
        } catch (err) {
            console.error("Error rejecting invitation:", err);
            toast.error("Failed to reject invitation.");
        }
    };

    return (
        <div className={styles.contractInvitations}>
            <h3>
                <FaFileSignature className={styles.icon} /> Contract Invitations
                <button className={styles.refreshButton} onClick={fetchInvitations} disabled={loading}>
                    <FaSync className={loading ? styles.spinning : ""} />
                </button>
            </h3>

            {loading ? (
                <p className={styles.noInvites}>Loading...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : invitations.length === 0 ? (
                <p className={styles.noInvites}>No pending invitations.</p>
            ) : (
                invitations.map(invite => (
                    <div key={invite.id} className={styles.inviteCard}>
                        <FaUserCircle className={styles.userIcon} />
                        <div className={styles.inviteDetails}>
                            <p><strong>{invite.sender_name}</strong> wants to form a contract.</p>
                            <span className={styles.senderEmail}>{invite.sender_email}</span>
                            {invite.message && (
                                <span className={styles.message}>"{invite.message}"</span>
                            )}
                        </div>
                        <div className={styles.actionButtons}>
                            <button className={styles.acceptButton} onClick={() => handleAccept(invite.id)}>
                                <FaCheck /> Accept
                            </button>
                            <button className={styles.rejectButton} onClick={() => handleReject(invite.id)}>
                                <FaTimes /> Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ContractInvitations;