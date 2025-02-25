import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import AddWebProductModal from "./AddWebProductModal";
import ShowWebProductItem from "./ShowWebProductItem";
import { $api } from "../../api/request";
import { deleteById, updateWebProductPriority } from "../../api/request/admin/webProduct/main.api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const WebProducts = () => {
  const data = useLoaderData();
  const { revalidate } = useRevalidator();
  const [products, setProducts] = useState(data);
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const handleProductAdded = () => revalidate();

  const handleDeleteWebProduct = async (id) => {
    await deleteById(id);
    revalidate();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newOrder = Array.from(products);
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setProducts(newOrder);

    const total = newOrder.length;
    newOrder.forEach((product, index) => {
      const newPriority = total - index;
      if (product.priority !== newPriority) {
        updateWebProductPriority(product.id, newPriority)
      }
    });
  };

  return (
    <>
      <section className="web-products-section">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              WebProducts <span className="text-gray-600">({products.length})</span>
            </h1>
            <button
              onClick={() => setIsShowAddModal(true)}
              className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-white"
            >
              Add new
            </button>
          </div>
          {isShowAddModal && (
            <AddWebProductModal
              revalidate={handleProductAdded}
              onClose={() => setIsShowAddModal(false)}
              onCategoryAdded={handleProductAdded}
            />
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="webProducts" direction="horizontal">
              {(provided) => (
                <div
                  className="grid grid-cols-4 mt-10 gap-5"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {products.map((product, index) => (
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
                          <ShowWebProductItem
                            handleDeleteWebProduct={handleDeleteWebProduct}
                            product={product}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
    </>
  );
};


export const loader = async () => {
  const res = await $api.get(`/api/v1/web-product`);
  return res.data;
};

export default WebProducts;