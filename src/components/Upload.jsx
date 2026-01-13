import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaFilePdf, FaFileWord, FaTrashAlt } from "react-icons/fa";
import styles from "../styles/Upload.module.scss";

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [signing, setSigning] = useState(false);
    const [signedFile, setSignedFile] = useState(null);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSignDocument = async () => {
        if (files.length === 0) return;
        setSigning(true);

        const formData = new FormData();
        formData.append("file", files[0]); // Sending only the first file

        try {
            const response = await axios.post("http://localhost:8000/sign/signDownload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(response);
            setSignedFile(response.data);
        } catch (error) {
            console.error("Error signing document:", error.response ? error.response.data : error);
        } finally {
            setSigning(false);
        }
    };

    const downloadFile = async () => {
        if (!signedFile) return;
        try {
            const response = await axios.get(signedFile.download_url, {
                responseType: "blob",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Create a temporary URL for the blob response
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", signedFile.filename);
            document.body.appendChild(link);
            link.click();
            // Clean up after download
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <h2 className={styles.uploadTitle}>Upload a Document</h2>

            <div
                className={styles.fileUpload}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <FaCloudUploadAlt className={styles.uploadIcon} />
                <p className={styles.uploadText}>Drag & Drop or Click to Upload</p>
                <input type="file" multiple onChange={handleFileChange} />
            </div>

            {/* File List */}
            <div className={styles.uploadedFiles}>
                {files.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                        <div className={styles.fileInfo}>
                            {file.type.includes("pdf") ? (
                                <FaFilePdf className={styles.fileIcon} />
                            ) : (
                                <FaFileWord className={styles.fileIcon} />
                            )}
                            <span className={styles.fileName}>{file.name}</span>
                        </div>
                        <button className={styles.actionButton} onClick={() => removeFile(index)}>
                            <FaTrashAlt />
                        </button>
                    </div>
                ))}
            </div>

            {/* Sign Button */}
            {files.length > 0 && (
                <button className={styles.signButton} onClick={handleSignDocument} disabled={signing}>
                    {signing ? "Signing..." : "Sign Document"}
                </button>
            )}

            {/* Download Signed Document */}
            {signedFile && (
                <div className={styles.signedFileContainer}>
                    <button onClick={downloadFile} className={styles.downloadButton}>
                        Download Signed File
                    </button>
                </div>
            )}
        </div>
    );
};

export default Upload;
