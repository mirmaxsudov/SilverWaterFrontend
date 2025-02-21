import { useState, useEffect } from 'react'
import {
    FaSort,
    FaPlus,
    FaSearch
} from 'react-icons/fa'
import { MdOutlineFileDownload } from 'react-icons/md'
import { FcInfo } from 'react-icons/fc'

const ManageProduct = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')
    const [searchTerm, setSearchTerm] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        onePrice: '',
        blogPrice: '',
        desc: '',
        photo: null,
        isDisabled: false,
        when: new Date().toISOString()
    })

    const defaultProducts = [
        {
            id: 1,
            name: 'Bot Pro Max',
            desc: 'Professional bot with advanced features',
            quantity: 50,
            onePrice: 999,
            blogPrice: 899,
            isDisabled: false,
            when: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Bot Lite',
            desc: 'Lightweight bot for basic tasks',
            quantity: 100,
            onePrice: 499,
            blogPrice: 449,
            isDisabled: false,
            when: new Date().toISOString()
        },
        {
            id: 3,
            name: 'Bot Enterprise',
            desc: 'Enterprise-grade bot solution',
            quantity: 30,
            onePrice: 1499,
            blogPrice: 1399,
            isDisabled: false,
            when: new Date().toISOString()
        },
        {
            id: 4,
            name: 'Bot Assistant',
            desc: 'Personal assistant bot',
            quantity: 75,
            onePrice: 299,
            blogPrice: 279,
            isDisabled: false,
            when: new Date().toISOString()
        },
        {
            id: 5,
            name: 'Bot Analytics',
            desc: 'Data analysis bot',
            quantity: 40,
            onePrice: 799,
            blogPrice: 749,
            isDisabled: true,
            when: new Date().toISOString()
        }
    ]

    useEffect(() => {
        const savedProducts = localStorage.getItem('botProducts')
        if (savedProducts) {
            try {
                const parsedProducts = JSON.parse(savedProducts)
                if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
                    setProducts(parsedProducts)
                    setFilteredProducts(parsedProducts)
                    return
                }
            } catch (error) {
                console.error('Error loading products:', error)
            }
        }
        setProducts(defaultProducts)
        setFilteredProducts(defaultProducts)
        localStorage.setItem('botProducts', JSON.stringify(defaultProducts))
    }, [])

    useEffect(() => {
        localStorage.setItem('botProducts', JSON.stringify(products))
    }, [products])

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter(
                product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.desc.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredProducts(filtered)
        }
    }, [searchTerm, products])

    const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
        setSortOrder(newOrder)
        const sorted = [...filteredProducts].sort((a, b) => {
            return newOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        })
        setFilteredProducts(sorted)
    }

    const handleSearch = e => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const newProduct = {
            ...formData,
            id: selectedProduct ? selectedProduct.id : Date.now(),
            when: new Date().toISOString()
        }

        if (selectedProduct) {
            const updated = products.map(p =>
                p.id === selectedProduct.id ? newProduct : p
            )
            setProducts(updated)
        } else {
            setProducts([...products, newProduct])
        }

        resetForm()
    }

    const resetForm = () => {
        setIsModalOpen(false)
        setSelectedProduct(null)
        setFormData({
            name: '',
            quantity: '',
            onePrice: '',
            blogPrice: '',
            desc: '',
            photo: null,
            isDisabled: false,
            when: new Date().toISOString()
        })
    }

    const formatDate = dateString => {
        return new Date(dateString).toLocaleString()
    }

    const handleDownloadCSV = () => {
        const csvRows = []
        const headers = [
            'ID',
            'Name',
            'Description',
            'Quantity',
            'One Price',
            'Blog Price',
            'Created At'
        ]
        csvRows.push(headers.join(','))

        products.forEach(product => {
            const row = [
                product.id,
                `"${product.name}"`,
                `"${product.desc}"`,
                product.quantity,
                product.onePrice,
                product.blogPrice,
                product.when
            ]
            csvRows.push(row.join(','))
        })

        const csvData = csvRows.join('\n')
        const blob = new Blob([csvData], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = 'products.csv'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const onDeleteProduct = id => {
        setProducts(products.filter(product => product.id !== id))
        setIsDeleteConfirmOpen(false)
        setSelectedProduct(null)
    }

    const onSaveProduct = product => {
        const updatedProducts = products.map(p =>
            p.id === product.id ? product : p
        )
        setProducts(updatedProducts)
        setIsInfoModalOpen(false)
        setSelectedProduct(null)
    }

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
                        onClick={() => setIsModalOpen(true)}
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
                                className={`border-b ${product.isDisabled ? 'bg-gray-50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <td className='p-4'>{product.id}</td>
                                <td className='p-4'>{product.name}</td>
                                <td className='p-4'>{product.desc}</td>
                                <td className='p-4'>{formatDate(product.when)}</td>
                                <td className='p-4'>${product.onePrice}</td>
                                <td className='p-4 text-center'>
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product)
                                            setIsInfoModalOpen(true)
                                        }}
                                        className='text-blue-500 hover:text-blue-600 '
                                        title='View Details'
                                    >
                                        <FcInfo className='w-6 h-6' />
                                    </button>
                                </td>
                                <td className='p-4'>
                                    <div className='flex justify-center gap-3'>
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product)
                                                setIsModalOpen(true)
                                            }}
                                            type='button'
                                            className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product)
                                                setIsDeleteConfirmOpen(true)
                                            }}
                                            type='button'
                                            className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
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

            {isModalOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'
                    onClick={resetForm}
                    onKeyDown={e => e.key === 'Escape' && resetForm()}
                    tabIndex={0}
                >
                    <div
                        className='bg-white rounded-lg w-full h-full max-w-5xl max-h-screen overflow-auto p-6'
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className='text-xl font-bold mb-4'>
                            {selectedProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium mb-1'>Name</label>
                                <input
                                    type='text'
                                    className='w-full border rounded p-2'
                                    value={formData.name}
                                    onChange={e =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-1'>
                                    Quantity
                                </label>
                                <input
                                    type='number'
                                    className='w-full border rounded p-2'
                                    value={formData.quantity}
                                    onChange={e =>
                                        setFormData({ ...formData, quantity: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-1'>
                                    One Price
                                </label>
                                <input
                                    type='number'
                                    className='w-full border rounded p-2'
                                    value={formData.onePrice}
                                    onChange={e =>
                                        setFormData({ ...formData, onePrice: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-1'>
                                    Blog Price
                                </label>
                                <input
                                    type='number'
                                    className='w-full border rounded p-2'
                                    value={formData.blogPrice}
                                    onChange={e =>
                                        setFormData({ ...formData, blogPrice: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-1'>
                                    Description
                                </label>
                                <textarea
                                    className='w-full border rounded p-2'
                                    value={formData.desc}
                                    onChange={e =>
                                        setFormData({ ...formData, desc: e.target.value })
                                    }
                                    required
                                    rows={5}
                                />
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='flex flex-col'>
                                    <label className='block text-sm font-medium mb-1'>
                                        Photo
                                    </label>
                                    <input
                                        type='file'
                                        className='border rounded p-2'
                                        onChange={e => {
                                            const file = e.target.files[0]
                                            if (file) {
                                                setFormData({ ...formData, photo: file })
                                            }
                                        }}
                                        accept='image/*'
                                    />
                                </div>

                                {formData.photo && (
                                    <div className='relative'>
                                        <img
                                            src={URL.createObjectURL(formData.photo)}
                                            alt='Preview'
                                            className='w-32 h-32 rounded-lg border'
                                        />
                                        <button
                                            type='button'
                                            className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-sm'
                                            onClick={() => setFormData({ ...formData, photo: null })}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    id='isDisabled'
                                    checked={formData.isDisabled}
                                    onChange={e =>
                                        setFormData({ ...formData, isDisabled: e.target.checked })
                                    }
                                    className='rounded border-gray-300'
                                />
                                <label htmlFor='isDisabled' className='text-sm font-medium'>
                                    Is Disabled
                                </label>
                            </div>

                            <div className='flex justify-end gap-2 mt-6'>
                                <button
                                    type='button'
                                    onClick={resetForm}
                                    className='px-4 py-2 border rounded text-red-500 border-red-500 hover:bg-red-50'
                                >
                                    Close
                                </button>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
                                >
                                    {selectedProduct ? 'Save' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                            <strong>Created:</strong>{' '}
                                            {formatDate(selectedProduct.when)}
                                        </p>
                                    </div>
                                </div>

                                <div className='col-span-2 flex flex-col items-center gap-4'>
                                    {selectedProduct.photo ? (
                                        <div className='relative w-56 h-56 rounded-lg overflow-hidden shadow-md border'>
                                            <img
                                                src={URL.createObjectURL(selectedProduct.photo)}
                                                alt={selectedProduct.name}
                                                className='object-cover w-full h-full'
                                            />
                                            <button
                                                className='absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition transform hover:scale-110'
                                                onClick={() =>
                                                    setSelectedProduct({
                                                        ...selectedProduct,
                                                        photo: null
                                                    })
                                                }
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <label className='flex flex-col items-center border border-dashed border-gray-400 p-6 rounded-lg cursor-pointer hover:border-gray-600'>
                                            <span className='text-gray-500'>
                                                Click to upload a photo
                                            </span>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                className='hidden'
                                                onChange={e => {
                                                    const file = e.target.files[0]
                                                    if (file) {
                                                        setSelectedProduct({
                                                            ...selectedProduct,
                                                            photo: file
                                                        })
                                                    }
                                                }}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className='flex justify-between mt-6'>
                                <button
                                    className='bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition'
                                    onClick={() => onDeleteProduct(selectedProduct.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className='bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition'
                                    onClick={() => onSaveProduct(selectedProduct)}
                                >
                                    Save
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
                        <h2 className='text-2xl font-bold mb-4'>Are you ready?</h2>
                        <div className='flex justify-center gap-4'>
                            <button
                                onClick={() => setIsDeleteConfirmOpen(false)}
                                className='px-4 py-2 border rounded hover:bg-gray-50'
                            >
                                No
                            </button>
                            <button
                                onClick={() => {
                                    onDeleteProduct(selectedProduct.id)
                                }}
                                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        onDeleteProduct(selectedProduct.id)
                                    }
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageProduct;