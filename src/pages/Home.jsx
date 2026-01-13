import Hero from "../components/Hero";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import CTA from "../components/CTA";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
        </>
    );
}

export default Home;
