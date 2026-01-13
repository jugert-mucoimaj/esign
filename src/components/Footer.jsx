import styles from "../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-start justify-between">

                {/* Left Side - Logo & About */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-[#E4C580]">eSign</h2>
                    <p className="text-gray-300 text-sm mt-2 max-w-xs">
                        Secure and fast document signing with cryptographic security.
                    </p>
                </div>

                {/* Middle - Quick Links */}
                <div className="flex flex-col mt-6 md:mt-0">
                    <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <Link to="/" className="flex items-center text-gray-300 hover:text-[#E4C580]">
                                <FaHome className="mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="flex items-center text-gray-300 hover:text-[#E4C580]">
                                <FaInfoCircle className="mr-2" /> About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="flex items-center text-gray-300 hover:text-[#E4C580]">
                                <FaSignInAlt className="mr-2" /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup" className="flex items-center text-gray-300 hover:text-[#E4C580]">
                                <FaUserPlus className="mr-2" /> Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right - Socials */}
                <div className="flex flex-col mt-6 md:mt-0">
                    <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#E4C580]">
                            <FaTwitter size={22} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#E4C580]">
                            <FaLinkedin size={22} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#E4C580]">
                            <FaGithub size={22} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
