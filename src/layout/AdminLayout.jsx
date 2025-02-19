import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./AdminLayout.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const AdminLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // if (localStorage.getItem("token"))
    // navigate("/login")
  }, [navigate])


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
      id: 2,
      title: "admin.sidebar.webProducts",
      link: "manage-web-products",
    },
    {
      id: 11,
      title: "Web3 products",
      link: "web3-products"
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
      link: "manage-inn"
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
                  className="nav-link flex text-wrap items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="ml-3">{t(title)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <NavLink className={"nav-link"} to={"profile/84"}>
            <p className="text-sm text-gray-600">Abdurahmon Mirmaxsudov</p>
          </NavLink>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </main>

      {/* <iframe
                allow="microphone;"
                width="350"
                height="430"
                src="https://console.dialogflow.com/api-client/demo/embedded/c77f02fe-d989-4079-9a75-b236b00980a1">
            </iframe> */}
    </div>
  );
};

export default AdminLayout;
