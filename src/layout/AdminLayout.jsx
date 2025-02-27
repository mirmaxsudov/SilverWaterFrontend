import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { $api } from "../api/request";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaQrcode, FaUsers } from "react-icons/fa";
import { MdCategory, MdDashboard, MdDiscount, MdNotificationsActive, MdWebStories } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { SiAwssecretsmanager, SiProbot } from "react-icons/si";
import { BsFillBasket3Fill, BsGiftFill } from "react-icons/bs";
import { IoLogoWhatsapp, IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("Palonchi");
  const [newApplicationCount, setNewApplicationCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchProfileName = async () => {
    const res = await $api.get("/api/v1/web-users/profile-name");
    setProfileName(res.data);
  };

  const fetchNewApplicationCount = async () => {
    const res = await $api.get("/api/v1/application/new-count");
    setNewApplicationCount(res.data);
  };

  useEffect(() => {
    fetchProfileName();
    fetchNewApplicationCount();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const NavLinks = [
    { id: uuid(), title: "admin.sidebar.dashboard", link: "dashboard", icon: <MdDashboard className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.users", link: "manage-users", icon: <FaUsers className="size-[20px]" /> },
    { id: uuid(), title: "Web Foydalanuvchilari", link: "manage-web-users", icon: <RiUserSettingsFill className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.webProducts", link: "manage-web-products", icon: <AiFillProduct className="size-[20px]" /> },
    { id: uuid(), title: "Web3 products", link: "web3-products", icon: <MdWebStories className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.botProducts", link: "manage-bot-products", icon: <SiProbot className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.categories", link: "manage-categories", icon: <MdCategory className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.auctions", link: "manage-auctions", icon: <MdDiscount className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.promoCodes", link: "manage-promo-codes", icon: <FaQrcode className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.takenPromoCode", link: "taken-promo-codes", icon: <BsGiftFill className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.orders", link: "manage-orders", icon: <BsFillBasket3Fill className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.applications", link: "manage-applications", icon: <IoLogoWhatsapp className="size-[20px]" /> },
    { id: uuid(), title: "INN", link: "manage-inn", icon: <SiAwssecretsmanager className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.notifications", link: "notifications", icon: <MdNotificationsActive className="size-[20px]" /> },
    { id: uuid(), title: "admin.sidebar.settings", link: "settings", icon: <IoMdSettings className="size-[20px]" /> },
  ];

  // Framer Motion variants for sidebar width.
  const sidebarVariants = {
    open: {
      width: 256,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      width: 80,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="flex h-screen relative">
      <motion.aside
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="bg-white border-r border-gray-200 flex flex-col sidebar-container"
      >
        <Link to={"/admin"}>
          <div className="border-b border-gray-200 p-4 flex items-center justify-center">
            <img
              src={Logo}
              alt="Silver water logo"
              className={`h-8 mr-2 object-contain ${isSidebarOpen ? "block" : "size-[40px]"}`}
            />
            {isSidebarOpen && (
              <span className="font-semibold text-lg">Silver Water</span>
            )}
          </div>
        </Link>

        <nav className="flex-1 overflow-y-auto p-4 nav-links-container">
          <ul className="space-y-2">
            {NavLinks.map(({ id, title, link, icon }) => (
              <li key={id} className="relative">
                <NavLink
                  to={link}
                  className="transition-all text-start scale-100 duration-300 flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 nav-link relative"
                >
                  {icon}
                  {isSidebarOpen && <span className="ms-3">{t(title)}</span>}
                  {link === "manage-applications" && newApplicationCount > 0 && isSidebarOpen && (
                    <span className="ml-auto bg-red-600 text-white rounded-full px-2 py-1 text-xs animate-bounce-3">
                      {newApplicationCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`border-t flex items-center ${isSidebarOpen ? "justify-start" : "justify-center"} border-gray-200 p-4`}>
          <NavLink className="nav-link" to={"profile/84"}>
            {isSidebarOpen ? (
              <p className="text-sm text-gray-600">{profileName}</p>
            ) : (
              <CgProfile className="size-[25px] me-2" />
            )}
          </NavLink>
        </div>
      </motion.aside>

      {/* Toggle button positioned to the right of the sidebar */}
      <div
        className="sidebar-toggle-container"
        style={{ left: isSidebarOpen ? "256px" : "80px" }}
      >
        <button
          className="sidebar-toggle size-[40px] flex items-center justify-center font-bold ms-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <FaArrowAltCircleLeft className="size-[20px]" />
          ) : (
            <FaArrowAltCircleRight className="size-[20px]" />
          )}
        </button>
      </div>

      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
