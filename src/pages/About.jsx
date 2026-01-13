import styles from "../styles/About.module.scss";
import member1 from "../assets/team/member1.jpg";
import member2 from "../assets/team/member2.jpg";
import member3 from "../assets/team/member3.jpg";
import member4 from "../assets/team/member4.jpg";
import member5 from "../assets/team/member5.jpg";
import Navbar from "../components/Navbar.jsx";

const teamMembers = [
    { name: "Alice Johnson", role: "CEO & Founder", img: member1, bio: "Leading the vision of eSign." },
    { name: "John Smith", role: "CTO", img: member2, bio: "Building secure digital signing solutions." },
    { name: "Emma Davis", role: "Lead Engineer", img: member3, bio: "Architecting the core infrastructure." },
    { name: "Michael Brown", role: "Product Manager", img: member4, bio: "Shaping the user experience." },
    { name: "Sophia Wilson", role: "Security Analyst", img: member5, bio: "Ensuring data protection." },
];

const About = () => {
    return (
        <>
            <Navbar/>
        <section className={styles.about}>
            {/* Hero Section - Banner Style */}
            <div className={styles.hero}>
                <div className={styles.heroOverlay}></div> {/* Dark overlay for contrast */}
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>About eSign</h1>
                    <p className={styles.heroText}>
                        eSign is a cutting-edge document signing platform that ensures secure and verifiable transactions with cryptographic authentication.
                    </p>
                </div>
            </div>

            {/* Core Values Timeline */}
            <div className={styles.timeline}>
                <h2 className="text-4xl font-bold text-white text-center mb-8">Our Core Values</h2>
                <div className={styles.timelineContainer}>
                    {["Security First", "Transparency & Trust", "Innovation & Efficiency"].map((value, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <span className={styles.timelineDot}></span>
                            <div className={styles.timelineText}>
                                <h3>{value}</h3>
                                <p>
                                    {index === 0 && "eSign ensures maximum security by encrypting all and every documents using advanced cryptographic Public Key:Private Key pair, while its robust platform has a thriving environment that prioritizes strict confidentiality and guarantees other privacy layers like end-to-end encryption using a modern protection throughout every transaction process."}
                                    {index === 1 && "Our integrated system establishes an analysing verification system to processes between sophisticated authentication hashed mechanisms that streamline and authenticate compliance with international legal standards, while its advanced framework provides organizations and individual users with enhanced tamper-evident agreements using modernized protocols and legally binding digital signatures with authenticated certificates."}
                                    {index === 2 && "Through continuous technological innovation and enterprise-grade development, eSign optimizes the complete digital signing experience using intelligent automation procedures that expedite identity verification processes, while its dynamic platform orchestrates efficient workflows and eliminates time-consuming manual operations through smart task management."}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Company Structure - 3 Box Layout */}
            <div className={styles.companyStructure}>
                <div className={styles.leftColumn}>
                    <div className={styles.smallBox}>
                        <h3>Our Mission</h3>
                        <p>To revolutionize the way digital signatures work by ensuring security and ease of access for all.</p>
                    </div>
                    <div className={styles.smallBox}>
                        <h3>Our Vision</h3>
                        <p>To become the global standard for secure digital signing and verification.</p>
                    </div>
                </div>
                <div className={styles.largeBox}>
                    <h3>Why eSign?</h3>
                    <p>We provide a fast, reliable, and legally compliant digital signing platform trusted by businesses and individuals worldwide.</p>
                </div>
            </div>

            {/* Meet Our Team Section */}
            <div className={styles.team}>
                <h2 className="text-4xl font-bold text-white text-center mb-8">Meet Our Team</h2>
                <div className={styles.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className={styles.teamMember}>
                            <img src={member.img} alt={member.name} className={styles.teamImage} />
                            <h3 className={styles.teamName}>{member.name}</h3>
                            <p className={styles.teamRole}>{member.role}</p>
                            <p className={styles.teamBio}>{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
        </>
    );
};

export default About;
