import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./utils/ProtectedRoute";
import MainPage from "./pages/MainPage.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
    return (
        <Router>
            {/*<Navbar />*/}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/account/dashboard" element={<MainPage />} />
                    <Route path="/account/profile" element={<Profile />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
