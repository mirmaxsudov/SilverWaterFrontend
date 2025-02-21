import { useState, useEffect } from 'react';
import { FaSort, FaPlus, FaSearch } from 'react-icons/fa';
import { MdOutlineFileDownload } from 'react-icons/md';
import { FcInfo } from 'react-icons/fc';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import { fetchProductsPage } from '../../api/request/admin/product/main.api';
import { $api } from '../../api/request';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch products from API using the searchTerm
    const fetchProducts = async () => {
        try {
            const res = await fetchProductsPage(searchTerm);
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchTerm]);

    // Save products to localStorage when products change
    useEffect(() => {
        localStorage.setItem('botProducts', JSON.stringify(products));
    }, [products]);

    // Filter products when searchTerm or products change
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(
                product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.desc.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    // Toggle sort order and sort the filtered products by name
    const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        const sorted = [...filteredProducts].sort((a, b) =>
            newOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
        setFilteredProducts(sorted);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Download products as CSV
    const handleDownloadCSV = () => {
        const csvRows = [];
        const headers = [
            'ID',
            'Name',
            'Description',
            'Quantity',
            'One Price',
            'Blog Price',
            'Created At'
        ];
        csvRows.push(headers.join(','));

        products.forEach(product => {
            const row = [
                product.id,
                `"${product.name}"`,
                `"${product.desc}"`,
                product.quantity,
                product.onePrice,
                product.blogPrice,
                product.when
            ];
            csvRows.push(row.join(','));
        });

        const csvData = csvRows.join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // When the user clicks Delete, set the selected product and open confirm modal
    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setIsDeleteConfirmOpen(true);
    };

    // Call the API to delete the product and update the list
    const onDeleteProduct = id => {
        $api.delete(`/api/v1/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
                setIsDeleteConfirmOpen(false);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleEditProduct = (updatedProduct) => {
        const updatedProducts = products.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
        );
        setProducts(updatedProducts);
        setIsEditModalOpen(false);
        setSelectedProduct(updatedProduct);
    };

    // Helper function to format date strings
    const formatDate = dateString => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between mb-4'>
                <h1 className='text-2xl font-bold'>
                    Bot Mahsulot ({filteredProducts.length} / {products.length})
                </h1>
                <div className='flex gap-2'>
                    <button
                        onClick={handleDownloadCSV}
                        className='bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-colors'
                    >
                        <MdOutlineFileDownload /> Download
                    </button>
                    <button
                        onClick={() => {
                            setSelectedProduct(null);
                            setIsModalOpen(true);
                        }}
                        className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-colors'
                    >
                        <FaPlus /> Add
                    </button>
                </div>
            </div>

            <div className='mb-4 flex gap-2'>
                <div className='relative flex-grow'>
                    <input
                        type='text'
                        placeholder='Search by name or description...'
                        className='w-full border p-2 pl-10 rounded-xl'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                </div>
                <button
                    onClick={handleSort}
                    className='border p-2 rounded flex items-center gap-2 hover:bg-gray-50'
                >
                    <FaSort /> {sortOrder.toUpperCase()}
                </button>
            </div>

            <div className='overflow-x-auto bg-white rounded-lg shadow'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-50'>
                            <th className='border-b p-4 text-left'>ID</th>
                            <th className='border-b p-4 text-left'>Name</th>
                            <th className='border-b p-4 text-left'>Desc</th>
                            <th className='border-b p-4 text-left'>When</th>
                            <th className='border-b p-4 text-left'>Price</th>
                            <th className='border-b p-4 text-center'>Info</th>
                            <th className='border-b p-4 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr
                                key={product.id}
                                className={`border-b ${product.isDisabled ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                            >
                                <td className='p-4'>{product.id}</td>
                                <td className='p-4'>{product.name}</td>
                                <td className='p-4'>{product.desc}</td>
                                <td className='p-4'>{formatDate(product.when)}</td>
                                <td className='p-4'>${product.onePrice}</td>
                                <td className='p-4 text-center'>
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsInfoModalOpen(true);
                                        }}
                                        className='text-blue-500 hover:text-blue-600'
                                        title='View Details'
                                    >
                                        <FcInfo className='w-6 h-6' />
                                    </button>
                                </td>
                                <td className='p-4'>
                                    <div className='flex justify-center gap-3'>
                                        <button
                                            onClick={() => handleDeleteProduct(product)}
                                            type='button'
                                            className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <AddProductModal
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {/* Product Information Modal */}
            {isInfoModalOpen && selectedProduct && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6'>
                    <div className='bg-white rounded-2xl shadow-lg w-full max-w-3xl transform transition-all scale-105 animate-fadeIn'>
                        <div className='p-8'>
                            <div className='flex justify-between items-start mb-6 border-b pb-4'>
                                <h2 className='text-3xl font-bold text-gray-800'>
                                    Product Information
                                </h2>
                                <button
                                    onClick={() => setIsInfoModalOpen(false)}
                                    className='text-gray-500 hover:text-red-500 text-3xl transition-transform transform hover:scale-125'
                                >
                                    ×
                                </button>
                            </div>

                            <div className='grid grid-cols-2 gap-8'>
                                <div>
                                    <h3 className='text-xl font-semibold text-gray-700 mb-4'>
                                        Basic Information
                                    </h3>
                                    <div className='space-y-3 text-gray-700 text-lg'>
                                        <p>
                                            <strong>ID:</strong> {selectedProduct.id}
                                        </p>
                                        <p>
                                            <strong>Name:</strong> {selectedProduct.name}
                                        </p>
                                        <p>
                                            <strong>Description:</strong> {selectedProduct.desc}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>
                                            <span
                                                className={`ml-2 font-semibold ${selectedProduct.isDisabled
                                                    ? 'text-red-500'
                                                    : 'text-green-500'
                                                    }`}
                                            >
                                                {selectedProduct.isDisabled ? 'Disabled' : 'Active'}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className='text-xl font-semibold text-gray-700 mb-4'>
                                        Pricing & Inventory
                                    </h3>
                                    <div className='space-y-3 text-gray-700 text-lg'>
                                        <p>
                                            <strong>One Price:</strong> ${selectedProduct.onePrice}
                                        </p>
                                        <p>
                                            <strong>Blog Price:</strong> ${selectedProduct.blogPrice}
                                        </p>
                                        <p>
                                            <strong>Quantity:</strong> {selectedProduct.quantity}
                                        </p>
                                        <p>
                                            <strong>Created:</strong> {formatDate(selectedProduct.when)}
                                        </p>
                                    </div>
                                </div>

                                <div className='col-span-2 flex flex-col items-center gap-4'>
                                    {selectedProduct.photo ? (
                                        <div className='relative w-56 h-56 rounded-lg overflow-hidden shadow-md border'>
                                            <img
                                                src={
                                                    typeof selectedProduct.photo === 'string'
                                                        ? selectedProduct.photo
                                                        : URL.createObjectURL(selectedProduct.photo)
                                                }
                                                alt={selectedProduct.name}
                                                className='object-cover w-full h-full'
                                            />
                                        </div>
                                    ) : (
                                        <p className='text-gray-500'>No photo available</p>
                                    )}
                                </div>
                            </div>

                            <div className='flex justify-center gap-4 mt-6'>
                                <button
                                    className='bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition'
                                    onClick={() => {
                                        setIsInfoModalOpen(false);
                                        setIsEditModalOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className='bg-gray-300 px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition'
                                    onClick={() => setIsInfoModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {isEditModalOpen && selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleEditProduct}
                />
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'
                    onClick={() => setIsDeleteConfirmOpen(false)}
                    onKeyDown={e => e.key === 'Escape' && setIsDeleteConfirmOpen(false)}
                    tabIndex={0}
                >
                    <div
                        className='bg-white rounded-lg p-14'
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className='text-2xl font-bold mb-4'>Are you sure?</h2>
                        <div className='flex justify-center gap-4'>
                            <button
                                onClick={() => setIsDeleteConfirmOpen(false)}
                                className='px-4 py-2 border rounded hover:bg-gray-50'
                            >
                                No
                            </button>
                            <button
                                onClick={() => {
                                    onDeleteProduct(selectedProduct.id);
                                }}
                                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProduct;