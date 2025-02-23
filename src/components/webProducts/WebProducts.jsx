import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import AddWebProductModal from "./AddWebProductModal";
import ShowWebProductItem from "./ShowWebProductItem";
import { $api, BASE_API_URL } from "../../api/request";
import { deleteById } from "../../api/request/admin/webProduct/main.api";

const WebProducts = () => {
  const data = useLoaderData();
  const { revalidate } = useRevalidator();
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const handleProductAdded = () => revalidate();

  const handleDeleteWebProduct = async id => {
    alert("delete")
    await deleteById(id);
    revalidate();
  }

  return (
    <>
      <section className="web-products-section">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              WebProducts <span className="text-gray-600">({data.length})</span>
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
              onClose={() => setIsShowAddModal(false)}
              onCategoryAdded={handleProductAdded}
            />
          )}
          <div className="grid grid-cols-4 mt-10 gap-5">
            {data.map((product) => (
              <ShowWebProductItem
                handleDeleteWebProduct={handleDeleteWebProduct}
                key={product.id}
                product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export const loader = async () => {
  const res = await $api.get(`${BASE_API_URL}/api/v1/web-product`);
  return res.data;
};

export default WebProducts;
