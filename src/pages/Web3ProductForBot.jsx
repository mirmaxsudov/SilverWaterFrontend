import { useEffect, useState } from "react";
import { fetchAllWeb3Products } from "../api/request/admin/web3/main.api";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
    <section className="py-16 bg-sky-100 min-h-screen max-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Silver Water Mahsulotlari
        </h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {web3Products.map((product) => (
            <Web3ProductItem key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Web3ProductItem = ({ product }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 duration-300"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative pb-80 overflow-hidden bg-white">
        <img
          src={product.image.url}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          {product.name}
        </h3>
        <p className="bg-[#4046BD] inline-block text-white py-1 px-4 font-bold tracking-wider rounded-md">{product.price} so'm</p>
      </div>
    </motion.div>
  );
};

export default Web3ProductForBot;
