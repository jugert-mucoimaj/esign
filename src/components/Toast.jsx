import { createContext, useContext, useState, useCallback } from "react";
import styles from "../styles/Toast.module.scss";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = {
        success: (message, duration) => addToast(message, "success", duration),
        error: (message, duration) => addToast(message, "error", duration),
        info: (message, duration) => addToast(message, "info", duration),
        warning: (message, duration) => addToast(message, "warning", duration),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    if (toasts.length === 0) return null;

    return (
        <div className={styles.toastContainer}>
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

const ToastItem = ({ toast, onClose }) => {
    const icons = {
        success: <FaCheckCircle />,
        error: <FaTimesCircle />,
        info: <FaInfoCircle />,
        warning: <FaExclamationTriangle />,
    };

    return (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
            <span className={styles.icon}>{icons[toast.type]}</span>
            <p className={styles.message}>{toast.message}</p>
            <button className={styles.closeButton} onClick={onClose}>
                <FaTimes />
            </button>
        </div>
    );
};

export default ToastProvider;