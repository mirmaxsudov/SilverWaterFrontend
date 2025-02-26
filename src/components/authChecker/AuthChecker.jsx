import Cookies from "js-cookie";

const AuthChecker = ({ children }) => {
    const token = Cookies.get("token");

    console.log(token);
    

    if (token)
        return children
    else
        window.location.href = '/login';

}

export default AuthChecker