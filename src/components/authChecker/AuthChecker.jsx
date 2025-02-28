import Cookies from "js-cookie";

const AuthChecker = ({ children }) => {
    const token = Cookies.get("token");

    if (token)
        return children
    else
        window.location.href = '/login';
}

export default AuthChecker;