import { useEffect, useState } from "react";
import { fetchAllWeb3Products } from "../api/request/admin/web3/main.api";

const Web3ProductForBot = () => {
    const [web3Products, setWeb3Products] = useState([]);

    useEffect(() => {
        const fetchWeb3Products = async () => {
            try {
                const res = await fetchAllWeb3Products();
                if (res.status === 200) {
                    setWeb3Products(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeb3Products();
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
                    Silver Water Mahsulotlari
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {web3Products.map((product) => (
                        <Web3ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Web3ProductItem = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 duration-300">
            <div className="relative pb-80 overflow-hidden">
                <img
                    src={product.image.url}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-center">${product.price}</p>
                <div className="mt-4 flex justify-center">
                </div>
            </div>
        </div>
    );
};

export default Web3ProductForBot;