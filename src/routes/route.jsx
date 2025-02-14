import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../error/NotFound.jsx";
import Login from "../pages/login/Login.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import Profile, {profileAction} from "../components/profile/Profile.jsx";

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
        element: <AdminLayout/>,
        // errorElement: <NotFound/>,
        children: [
            {
                path: "manage-users",
                element: <div>Manage Users</div>
            },
            {
                path: "manage-web-products",
                element: <div>Manage Web Products</div>
            },
            {
                path: "manage-bot-products",
                element: <div>Manage Bot Products</div>
            },
            {
                path: "manage-categories",
                element: <div>Manage Categories</div>
            },
            {
                path: "manage-auctions",
                element: <div>Manage Auctions</div>
            },
            {
                path: "manage-promo-codes",
                element: <div>Manage Promo Codes</div>
            },
            {
                path: "manage-orders",
                element: <div>Manage Orders</div>
            },
            {
                path: "manage-applications",
                element: <div>Manage Applications</div>
            },
            {
                path: "profile/:id",
                element: <Profile/>,
                loader: profileAction
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>,
        children: []
    }
])