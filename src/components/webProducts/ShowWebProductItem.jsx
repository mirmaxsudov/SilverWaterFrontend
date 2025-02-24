const ShowWebProductItem = ({ product, handleDeleteWebProduct }) => {
  return (
    <div className="shadow-lg rounded border">
      <img
        className="w-full h-[200px] object-contain"
        src={product.image.url}
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
      </div>
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={() => {
            handleDeleteWebProduct(product.id);
          }}
          className="bg-red-300 text-red-700 font-semibold py-2 rounded px-4 hover:bg-red-600 transition-all duration-300 hover:text-[#fff]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShowWebProductItem;
