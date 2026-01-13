import styles from "../styles/Features.module.scss";
import { HiOutlineLockClosed, HiOutlineCheckCircle, HiOutlinePencilAlt } from "react-icons/hi"; // Outlined icons

const Features = () => {
    return (
        <section className={styles.features}>
            <h2 className="text-4xl font-bold text-white text-center mb-12">
                Why Choose eSign?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Feature 1 - Secure Digital Signatures */}
                <div className={styles.featureCard}>
                    <HiOutlineLockClosed className={styles.featureIcon} />
                    <h3 className="text-xl font-semibold text-white mt-4">Secure Digital Signatures</h3>
                    <p className="text-gray-300 text-sm mt-2">
                        Sign documents with cryptographic security, ensuring authenticity and integrity.
                    </p>
                </div>

                {/* Feature 2 - Verification & Authenticity */}
                <div className={styles.featureCard}>
                    <HiOutlineCheckCircle className={styles.featureIcon} />
                    <h3 className="text-xl font-semibold text-white mt-4">Verification & Authenticity</h3>
                    <p className="text-gray-300 text-sm mt-2">
                        Ensure every signature is verifiable and trusted with blockchain-level validation.
                    </p>
                </div>

                {/* Feature 3 - Seamless User Experience */}
                <div className={styles.featureCard}>
                    <HiOutlinePencilAlt className={styles.featureIcon} />
                    <h3 className="text-xl font-semibold text-white mt-4">Seamless User Experience</h3>
                    <p className="text-gray-300 text-sm mt-2">
                        Sign documents anytime, anywhere with an intuitive and easy-to-use platform.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Features;
