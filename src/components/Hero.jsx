import styles from "../styles/Hero.module.scss";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className="flex flex-col items-center justify-center w-full text-center px-6">
                <h1 className="text-6xl font-extrabold text-white tracking-wide">
                    Sign Documents Securely
                </h1>

                <p className="text-lg text-gray-300 mt-4 max-w-2xl leading-relaxed">
                    eSign allows you to sign documents securely with a public/private key pair.
                    Ensure authenticity and verification effortlessly.
                </p>

                {/*conditional based button probably: if the user is logged in -> redirect to dashboard otherwise login page*/}
                <button className={styles.button}>
                    Start Signing Now
                </button>

            </div>
        </section>
    );
};

export default Hero;
