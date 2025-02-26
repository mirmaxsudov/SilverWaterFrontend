import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { $api } from "../api/request";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("Palonchi");
  const [newApplicationCount, setNewApplicationCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  const fetchProfileName = async () => {
    const res = await $api.get("/api/v1/web-users/profile-name")
    setProfileName(res.data);
  }

  const fetchNewApplicationCount = async () => {
    const res = await $api.get("/api/v1/application/new-count");
    setNewApplicationCount(res.data);
  }

  useEffect(() => {
    fetchProfileName();
    fetchNewApplicationCount();
  }, []);

  const NavLinks = [
    {
      id: 0,
      title: "admin.sidebar.dashboard",
      link: "dashboard",
    },
    {
      id: 1,
      title: "admin.sidebar.users",
      link: "manage-users",
    },
    {
      id: 3154135,
      title: "Web Foydalanuvchilari",
      link: "manage-web-users",
    },
    {
      id: 2,
      title: "admin.sidebar.webProducts",
      link: "manage-web-products",
    },
    {
      id: 11,
      title: "Web3 products",
      link: "web3-products",
    },
    {
      id: 3,
      title: "admin.sidebar.botProducts",
      link: "manage-bot-products",
    },
    {
      id: 4,
      title: "admin.sidebar.categories",
      link: "manage-categories",
    },
    {
      id: 5,
      title: "admin.sidebar.auctions",
      link: "manage-auctions",
    },
    {
      id: 6,
      title: "admin.sidebar.promoCodes",
      link: "manage-promo-codes",
    },
    {
      id: 314,
      title: "admin.sidebar.takenPromoCode",
      link: "taken-promo-codes",
    },
    {
      id: 7,
      title: "admin.sidebar.orders",
      link: "manage-orders",
    },
    {
      id: 8,
      title: "admin.sidebar.applications",
      link: "manage-applications",
    },
    {
      id: 10,
      title: "INN",
      link: "manage-inn",
    },
    {
      id: 9,
      title: "admin.sidebar.settings",
      link: "settings",
    },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="border-b border-gray-200 p-4 flex items-center justify-center">
          <img src={Logo} alt="Silver water logo" className="h-8 mr-2" />
          <span className="font-semibold text-lg">Silver Water</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 nav-links-container">
          <ul className="space-y-2">
            {NavLinks.map(({ id, title, link }) => (
              <li key={id}>
                <NavLink
                  to={link}
                  className="nav-link flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="ml-3">{t(title)}</span>
                  {id === 8 && newApplicationCount > 0 && (
                    <span className="ml-auto bg-red-600 text-white rounded-full px-2 py-1 text-xs animate-bounce-3">
                      {newApplicationCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <NavLink className={"nav-link"} to={"profile/84"}>
            <p className="text-sm text-gray-600">{profileName}</p>
          </NavLink>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;