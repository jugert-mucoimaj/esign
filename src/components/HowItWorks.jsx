import styles from "../styles/HowItWorks.module.scss";
import { HiOutlineUpload, HiOutlineKey, HiOutlineDownload } from "react-icons/hi";
import { FaArrowRightLong } from "react-icons/fa6"; // Arrow icon

const HowItWorks = () => {
    return (
        <section className={styles.howItWorks}>
            <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Step 1 */}
                <div className={styles.step}>
                    <HiOutlineUpload className={styles.icon} />
                    <h3 className="text-xl font-semibold text-white mt-4">Upload Your Document</h3>
                    <p className="text-gray-300 text-sm mt-2">Select and upload the document you want to sign.</p>
                </div>

                {/* Arrow */}
                <FaArrowRightLong className={styles.arrow} />

                {/* Step 2 */}
                <div className={styles.step}>
                    <HiOutlineKey className={styles.icon} />
                    <h3 className="text-xl font-semibold text-white mt-4">Sign with Public/Private Key</h3>
                    <p className="text-gray-300 text-sm mt-2">Use secure encryption to sign your document.</p>
                </div>

                {/* Arrow */}
                <FaArrowRightLong className={styles.arrow} />

                {/* Step 3 */}
                <div className={styles.step}>
                    <HiOutlineDownload className={styles.icon} />
                    <h3 className="text-xl font-semibold text-white mt-4">Verify & Download</h3>
                    <p className="text-gray-300 text-sm mt-2">Ensure authenticity and download the signed document.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
