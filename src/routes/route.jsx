import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../error/NotFound.jsx";
import Login from "../pages/login/Login.jsx";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: []
    },
    {
        path: "/login",
        element: <Login/>,
        children: []
    },
    {
        path: "/admin",
        element: <Home/>,
        children: []
    },
    {
        path: "*",
        element: <NotFound/>,
        children: []
    }
])