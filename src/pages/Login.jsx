import { useEffect, useRef, useState } from "react";
import styles from "../styles/Login.module.scss";
import api from "../utils/api";
import Cookies from "js-cookie";
import { auth, googleProvider, signInWithPopup } from "../utils/firebase";
import {FaEnvelope, FaLock, FaGoogle, FaUser, FaEyeSlash, FaEye, FaPhone} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { useToast } from "../components/Toast";

const Login = () => {
    const canvasRef = useRef(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [transitionClass, setTransitionClass] = useState(styles.fadeIn);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let particles = [];
        let animationFrameId;

        // Debounce resize handler to prevent excessive calls
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        };

        const getParticleSize = () => {
            if (window.innerWidth < 480) return Math.random() * 3 + 2;
            if (window.innerWidth < 768) return Math.random() * 4 + 1.5;
            return Math.random() * 4 + 1;
        };

        const getSpeed = () => {
            if (window.innerWidth < 480) return (Math.random() - 0.5) * 0.4;
            if (window.innerWidth < 768) return (Math.random() - 0.5) * 0.6;
            return (Math.random() - 0.5);
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            initParticles();
        };

        const debouncedResize = debounce(resizeCanvas, 100);
        window.addEventListener("resize", debouncedResize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = getParticleSize();
                this.speedX = getSpeed();
                this.speedY = getSpeed();
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                // Keep particles within bounds
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = "rgba(228, 197, 128, 0.7)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            const numParticles = window.innerWidth < 480 ? 100 : window.innerWidth < 768 ? 80 : 50;
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animateParticles);
        };

        // Initial setup
        resizeCanvas();
        animateParticles();

        // Cleanup
        return () => {
            window.removeEventListener("resize", debouncedResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleToggle = () => {
        setTransitionClass(styles.fadeOut);
        setTimeout(() => {
            setIsSignUp(prev => !prev);
            setTransitionClass(styles.fadeIn);
        }, 800);
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Send email to backend (no token verification)
            const response = await api.post("/auth/google-login", {
                email: user.email,
                first_name: user.displayName.split(" ")[0],
                last_name: user.displayName.split(" ")[1] || ""
            });

            Cookies.set("token", response.data.access_token, { expires: 7 });
            localStorage.setItem("token", response.data.access_token);
            toast.success("Logged in with Google!");
            navigate("/account/dashboard");
        } catch (error) {
            console.error("Google Login Failed:", error);
            toast.error("Google login failed. Please try again.");
        }
    };

    useEffect(() => {
        const token = Cookies.get("token") || localStorage.getItem("token");
        if (token) {
            navigate("/account/dashboard");
        }
    }, [navigate]);

    const handleSignup = async () => {
        if (!first_name || !last_name || !phone || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                first_name,
                last_name,
                phone,
                email,
                password,
            });

            console.log("Signup Success:", response.data);
            toast.success("Account created successfully! Please log in.");
            setIsSignUp(false);
        } catch (err) {
            console.log(err);
            const errorMsg = err.response?.data?.message || "Signup failed.";
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            if (response.data.access_token) {
                Cookies.set("token", response.data.access_token, { expires: 7 });
                localStorage.setItem("token", response.data.access_token);
                toast.success("Welcome back!");
                navigate("/account/dashboard");
            } else {
                setError("Invalid login credentials.");
                toast.error("Invalid login credentials.");
            }
        } catch (err) {
            console.log(err);
            const errorMsg = err.response?.data?.message || "Login failed.";
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };


    return (
        <div className={styles.loginPage}>
            <canvas ref={canvasRef} className={styles.particleCanvas}></canvas>
            <div className={`${styles.loginForm} ${transitionClass}`}>
                <h2 className={styles.title}>
                    {isSignUp ? "Create an account" : "Welcome Back!"}
                </h2>
                <p className={styles.subtitle}>
                    {isSignUp ? "Sign up to get started" : "Sign in to continue"}
                </p>

                {error && <p className={styles.error}>{error}</p>}

                {isSignUp && (
                    <>
                        <div className={styles.inputGroup}>
                            <FaUser className={styles.icon} />
                            <input
                                type="text"
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <FaUser className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <FaPhone className={styles.icon} />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div className={styles.inputGroup}>
                    <FaEnvelope className={styles.icon} />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <FaLock className={styles.icon} />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className={styles.toggleIcon} onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                </div>

                <button className={styles.loginButton} onClick={isSignUp ? handleSignup : handleLogin}>
                    {isSignUp ? "Sign Up" : "Login"}
                </button>

                <div className={styles.socialLogin}>
                    <button className={styles.googleButton} onClick={handleGoogleLogin}>
                        <FaGoogle /> Google
                    </button>
                </div>

                {!isSignUp && <p className={styles.forgotPassword}>Forgot password?</p>}

                <p className={styles.registerLink}>
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                    <span onClick={handleToggle} className={styles.link}>
                    {isSignUp ? "Login" : "Sign Up"}
                </span>
                </p>
            </div>
        </div>
    );

};

export default Login;