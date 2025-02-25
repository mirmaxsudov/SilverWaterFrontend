import { useEffect, useState } from "react";
import {
    deleteWeb3Product,
    fetchAllWeb3Products,
    updateWeb3ProductPriority,
} from "../../api/request/admin/web3/main.api";
import Web3ProductAddModal from "./Web3ProductAddModal";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { notifyError } from "../../helper/toast";

const Web3Product = () => {
    const [web3Products, setWeb3Products] = useState([]);
    const [isAddOpenModal, setIsAddOpenModal] = useState(false);
    const { t } = useTranslation();

    const fetchWeb3Products = async () => {
        try {
            const res = await fetchAllWeb3Products();
            if (res.status === 200)
                setWeb3Products(res.data);

        } catch (error) {
            notifyError("Malumot yuklashda xatolik yuz berdi.")
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

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newOrder = Array.from(web3Products);
        const [movedItem] = newOrder.splice(result.source.index, 1);
        newOrder.splice(result.destination.index, 0, movedItem);
        setWeb3Products(newOrder);

        const total = newOrder.length;
        newOrder.forEach((product, index) => {
            const newPriority = total - index;
            if (product.priority !== newPriority) {
                updateWeb3ProductPriority(product.id, newPriority)
            }
        });
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
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="web3Products" direction="horizontal">
                        {(provided) => (
                            <div
                                className="grid grid-cols-4 gap-4 mt-4"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {web3Products.length > 0 ? (
                                    web3Products.map((product, index) => (
                                        <Draggable
                                            key={product.id.toString()}
                                            draggableId={product.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <ShowWeb3ProductItem
                                                        handleDeleteWeb3Product={handleDeleteWeb3Product}
                                                        product={product}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                ) : (
                                    <h1 className="text-1xl font-bold">Malumotlar topilmadi</h1>
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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
                alt={product.name}
            />
            <div className="p-4">
                <h1 className="text-xl font-semibold">{product.name}</h1>
                <p className="text-gray-600 mt-3">{product.price} so'm</p>
            </div>
            <div className="p-4 flex items-center gap-4">
                <button
                    onClick={() => handleDeleteWeb3Product(product.id)}
                    className="bg-red-300 text-red-700 font-semibold py-2 rounded px-4 hover:bg-red-600 transition-all duration-300 hover:text-white"
                >
                    {t("web3.delete")}
                </button>
            </div>
        </div>
    );
};

export default Web3Product;