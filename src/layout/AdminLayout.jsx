import {Link, Outlet} from "react-router-dom";
import Logo from "../assets/logo.png"

const AdminLayout = () => {
    const NavLinks = [
        {
            id: 1,
            title: "Users",
            link: "manage-users"
        },
        {
            id: 2,
            title: "Web Products",
            link: "manage-web-products"
        },
        {
            id: 3,
            title: "Bot Products",
            link: "manage-bot-products"
        },
        {
            id: 4,
            title: "Categories",
            link: "manage-categories"
        },
        {
            id: 5,
            title: "Auctions",
            link: "manage-auctions"
        },
        {
            id: 6,
            title: "Promo Codes",
            link: "manage-promo-codes"
        },
        {
            id: 7,
            title: "Orders",
            link: "manage-orders"
        },
        {
            id: 8,
            title: "Applications",
            link: "manage-applications"
        }
    ]

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="border-b border-gray-200 p-4 flex items-center justify-center">
                    <img
                        src={Logo}
                        alt="Silver water logo"
                        className="h-8 mr-2"
                    />
                    <span className="font-semibold text-lg">Silver Water</span>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        {
                            NavLinks.map(({id, title, link}) => (
                                <li key={id}>
                                    <Link
                                        to={link}
                                        className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="ml-3">{title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="border-t border-gray-200 p-4">
                    <p className="text-sm text-gray-600">Abdurahmon Mirmaxsudov</p>
                </div>
            </aside>
            <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                <Outlet/>
            </main>
        </div>
    );
};

export default AdminLayout;
