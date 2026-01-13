import { useState } from "react";
import styles from "../styles/ContractInvitations.module.scss";
import { FaUserCircle, FaCheck, FaTimes, FaFileSignature } from "react-icons/fa";

const ContractInvitations = () => {
    // Mock data (replace with real API data)
    const [invitations, setInvitations] = useState([
        { id: 1, sender: "John Doe", email: "john@example.com", contractTitle: "Freelance Agreement" },
        { id: 2, sender: "Alice Smith", email: "alice@example.com", contractTitle: "Partnership Contract" }
    ]);

    const handleAccept = (id) => {
        console.log(`Accepted contract ID: ${id}`);
        setInvitations(invitations.filter(invite => invite.id !== id));
    };

    const handleReject = (id) => {
        console.log(`Rejected contract ID: ${id}`);
        setInvitations(invitations.filter(invite => invite.id !== id));
    };

    return (
        <div className={styles.contractInvitations}>
            <h3><FaFileSignature className={styles.icon} /> Contract Invitations</h3>
            {invitations.length === 0 ? (
                <p className={styles.noInvites}>No pending invitations.</p>
            ) : (
                invitations.map(invite => (
                    <div key={invite.id} className={styles.inviteCard}>
                        <FaUserCircle className={styles.userIcon} />
                        <div className={styles.inviteDetails}>
                            <p><strong>{invite.sender}</strong> wants to form a contract.</p>
                            <span className={styles.contractTitle}><FaFileSignature /> {invite.contractTitle}</span>
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
