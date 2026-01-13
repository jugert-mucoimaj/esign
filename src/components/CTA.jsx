import styles from "../styles/CTA.module.scss";

const CTA = () => {
    return (
        <section className={styles.cta}>
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between">
                {/* Left Side - Text Content */}
                <div className="text-left max-w-lg">
                    <h2 className="text-4xl font-bold text-black">
                        Get Started with eSign Today!
                    </h2>
                    <p className="text-lg text-black mt-3">
                        Secure, fast, and easy document signing. Sign your first document in seconds.
                    </p>
                </div>

                {/* Right Side - CTA Button */}
                <button className="mt-6 md:mt-0 bg-black text-[#E4C580] font-semibold py-3 px-6 rounded-lg text-lg transition duration-300 hover:bg-gray-900 shadow-lg shadow-black/50">
                    Start Signing Now
                </button>
            </div>
        </section>
    );
};

export default CTA;
