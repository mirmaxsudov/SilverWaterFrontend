import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../error/NotFound.jsx";
import Login from "../pages/login/Login.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import Profile, { profileAction } from "../components/profile/Profile.jsx";
import Dashboard from "../components/admin/dashboard/Dashboard.jsx";
import Applications from "../components/admin/applications/Applications.jsx";
import ManageCategory, {
  manageCategoryAction,
} from "../components/manageCategory/ManageCategory.jsx";
import WebProducts, {
  loader as manageWebProductsAction,
} from "../components/webProducts/WebProducts.jsx";
import PromoCode from "../components/promoCodes/PromoCode.jsx";
import Inn from "../components/inn/Inn.jsx";
import ManageUsers from "../components/manageUsers/ManageUsers.jsx";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    // errorElement: <NotFound/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
        children: [
          {
            path: "user-detail/:id",
            element: <div>User Detail page</div>,
          },
        ],
      },
      {
        path: "manage-web-products",
        element: <WebProducts />,
        loader: manageWebProductsAction,
      },
      {
        path: "manage-bot-products",
        element: <div>Manage Bot Products</div>,
      },
      {
        path: "web3-products",
        element: <div>Web3 Products</div>,
      },
      {
        path: "manage-categories",
        element: <ManageCategory />,
        loader: manageCategoryAction,
      },
      {
        path: "manage-auctions",
        element: <div>Manage Auctions</div>,
      },
      {
        path: "manage-promo-codes",
        element: <PromoCode />,
      },
      {
        path: "manage-orders",
        element: <div>Manage Orders</div>,
      },
      {
        path: "manage-applications",
        element: <Applications />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
        loader: profileAction,
      },
      {
        path: "settings",
        element: <div>Settings</div>,
      },
      {
        path: "manage-inn",
        element: <Inn />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    children: [],
  },
]);
