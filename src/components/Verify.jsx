import { useState } from "react";
import axios from "axios";
import styles from "../styles/Verify.module.scss";
import { FaCloudUploadAlt, FaFilePdf, FaFileWord, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Verify = () => {
    const [file, setFile] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setVerificationResult(null); // Reset result when new file is added
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
        setVerificationResult(null);
    };

    const removeFile = () => {
        setFile(null);
        setVerificationResult(null);
    };

    const verifyDocument = async () => {
        if (!file) return;
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/sign/verify_signature", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log("Verification response:", response.data);
            // If the API call succeeds, consider the document valid.
            setVerificationResult("valid");
        } catch (error) {
            console.error("Error verifying document:", error.response ? error.response.data : error);
            // If there's an error, set the result to "invalid"
            setVerificationResult("invalid");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.verifyContainer}>
            <h2 className={styles.title}>Verify Document</h2>

            <div
                className={styles.fileUpload}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <FaCloudUploadAlt className={styles.uploadIcon} />
                <p className={styles.uploadText}>Drag & Drop or Click to Verify</p>
                <input type="file" accept=".pdf,.docx,.epub,.txt" onChange={handleFileChange} />
            </div>

            {file && (
                <div className={styles.fileItem}>
                    <div className={styles.fileInfo}>
                        {file.type.includes("pdf") ? (
                            <FaFilePdf className={styles.fileIcon} />
                        ) : (
                            <FaFileWord className={styles.fileIcon} />
                        )}
                        <span className={styles.fileName}>{file.name}</span>
                    </div>
                    <button className={styles.removeButton} onClick={removeFile}>
                        Remove
                    </button>
                </div>
            )}

            {file && !verificationResult && (
                <button className={styles.verifyButton} onClick={verifyDocument} disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify Document"}
                </button>
            )}

            {verificationResult && (
                <div className={`${styles.result} ${verificationResult === "valid" ? styles.valid : styles.invalid}`}>
                    {verificationResult === "valid" ? (
                        <>
                            <FaCheckCircle className={styles.icon} />
                            <p>Document is <strong>Valid</strong> & signed correctly</p>
                        </>
                    ) : (
                        <>
                            <FaTimesCircle className={styles.icon} />
                            <p>Document is <strong>Invalid</strong> or tampered</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Verify;
