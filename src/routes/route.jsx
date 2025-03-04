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
import ManageAuction from "../components/manageAuction/ManageAuction.jsx";
import Web3Product from "../components/web3Product/Web3Product.jsx";
import TokenPromoCode from "../components/takenPromoCode/TokenPromoCode.jsx";
import ManageProduct from "../components/manageProduct/ManageProduct.jsx";
import Web3ProductForBot from "../pages/Web3ProductForBot.jsx";
import WebUser from "../components/webUser/WebUser.jsx";
import Settings from "../pages/settings/Settings.jsx";
import AuthChecker from "../components/authChecker/AuthChecker.jsx";
import ManageNotification from "../components/manageNotification/ManageNotification.jsx";
import BotNotificationDetails from "../components/manageNotification/details/BotNotificationDetails.jsx";

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
    path: "/web-three-products",
    element: <Web3ProductForBot />,
  },
  {
    path: "/admin",
    element: <AuthChecker><AdminLayout /></AuthChecker>,
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
        path: "manage-web-users",
        element: <WebUser />,
      },
      {
        path: "manage-web-products",
        element: <WebProducts />,
        loader: manageWebProductsAction,
      },
      {
        path: "manage-bot-products",
        element: <ManageProduct />,
      },
      {
        path: "web3-products",
        element: <Web3Product />,
      },
      {
        path: "manage-categories",
        element: <ManageCategory />,
        loader: manageCategoryAction,
      },
      {
        path: "manage-auctions",
        element: <ManageAuction />,
      },
      {
        path: "manage-promo-codes",
        element: <PromoCode />,
      },
      {
        path: "manage-orders",
        element: <Settings />,
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
        path: "taken-promo-codes",
        element: <TokenPromoCode />,
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "manage-inn",
        element: <Inn />,
      },
      {
        path: "notifications",
        element: <ManageNotification />
      },
      {
        path: "notifications/:id",
        element: <BotNotificationDetails />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    children: [],
  },
]);
