import Cookies from "js-cookie";

export const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
};
