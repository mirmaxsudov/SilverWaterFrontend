import { useEffect, useState } from "react";
import {
    deleteWeb3Product,
    fetchAllWeb3Products,
} from "../../api/request/admin/web3/main.api";
import Web3ProductAddModal from "./Web3ProductAddModal";
import { useTranslation } from "react-i18next";

const Web3Product = () => {
    const [web3Products, setWeb3Products] = useState([]);
    const [isAddOpenModal, setIsAddOpenModal] = useState(false);
    const { t } = useTranslation();

    const fetchWeb3Products = async () => {
        try {
            const res = await fetchAllWeb3Products();

            if (res.status === 200) {
                setWeb3Products(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWeb3Products();
    }, []);

    const handleWeb3ProductAdded = (newProduct) => {
        setWeb3Products([...web3Products, newProduct]);
    };

    const handleCloseAddModal = () => {
        setIsAddOpenModal(false);
    };

    const handleDeleteWeb3Product = (id) => {
        deleteWeb3Product(id);
        setWeb3Products(web3Products.filter((product) => product.id !== id));
    };

    return (
        <section className="web3-product">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">
                        {t("web3.title")} ({web3Products.length})
                    </h1>
                    <button
                        onClick={() => setIsAddOpenModal(true)}
                        className="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded hover:bg-green-600 hover:text-white transition"
                    >
                        {t("web3.add")}
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {web3Products.length > 0 ? (
                        <>
                            {web3Products.map((product) => (
                                <ShowWeb3ProductItem
                                    handleDeleteWeb3Product={handleDeleteWeb3Product}
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </>
                    ) : (
                        "No web3 product found"
                    )}
                </div>
            </div>
            {isAddOpenModal && (
                <Web3ProductAddModal
                    handleWeb3ProductAdded={handleWeb3ProductAdded}
                    onClose={handleCloseAddModal}
                />
            )}
        </section>
    );
};

const ShowWeb3ProductItem = ({ product, handleDeleteWeb3Product }) => {
    const { t } = useTranslation();

    return (
        <div className="shadow-lg rounded border">
            <img
                className="w-full h-[200px] object-contain"
                src={product.image.url}
            />
            <div className="p-4">
                <h1 className="text-xl font-semibold">{product.name}</h1>
                <p className="text-gray-600 mt-3">{product.price} so'm</p>
            </div>
            <div className="p-4 flex items-center gap-4">
                <button
                    onClick={() => handleDeleteWeb3Product(product.id)}
                    className="bg-red-300 text-red-700 font-semibold py-2 rounded px-4 hover:bg-red-600 transition-all duration-300 hover:text-[#fff]"
                >
                    {t("web3.delete")}
                </button>
            </div>
        </div>
    );
};

export default Web3Product;
