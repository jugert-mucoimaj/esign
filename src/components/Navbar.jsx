import { useState, useEffect } from "react";
import { FaHome, FaUpload, FaCog, FaUserCircle, FaSignInAlt, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import styles from "../styles/NavBar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check login state when component mounts
    useEffect(() => {
        const token = Cookies.get("token") || localStorage.getItem("token");
        setLoggedIn(!!token); // Convert token presence to boolean
    }, []);

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className={styles.navbar}>

            <div className={styles.logo}>
                <Link to="/" className={styles.logoLink}>eSign</Link>
            </div>

            {/* Desktop Navigation */}
            <ul className={styles.navLinks}>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/account/dashboard" className={styles.navItem}><FaHome /> Dashboard</Link></li>
                        <li><Link to="/account/dashboard" className={styles.navItem}><FaUpload /> Upload</Link></li>
                        <li><Link to="/account/dashboard" className={styles.navItem}><FaCog /> Settings</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/" className={styles.navItem}><FaHome /> Home</Link></li>
                        <li><Link to="/about" className={styles.navItem}><FaInfoCircle /> About Us</Link></li>
                    </>
                )}
            </ul>

            {/* Profile/Login Section */}
            {isLoggedIn ? (
                <div className={styles.profile} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    <FaUserCircle className={styles.profileIcon} />
                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <Link to="/account/dashboard">Profile</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className={styles.loginBtn}><FaSignInAlt /> Login</Link>
            )}

            {/* Mobile Menu Button */}
            <button className={styles.menuToggle} onClick={() => setMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className={styles.mobileNav}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/account/dashboard" className={styles.navItem}><FaHome /> Dashboard</Link>
                            <Link to="/account/dashboard" className={styles.navItem}><FaUpload /> Upload</Link>
                            <Link to="/account/dashboard" className={styles.navItem}><FaCog /> Settings</Link>
                            <Link to="/account/dashboard" className={styles.navItem}><FaUserCircle /> Profile</Link>
                            <button className={styles.navItem} onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className={styles.navItem}><FaHome /> Home</Link>
                            <Link to="/about" className={styles.navItem}><FaInfoCircle /> About Us</Link>
                            <Link to="/login" className={styles.navItem}><FaSignInAlt /> Login</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
