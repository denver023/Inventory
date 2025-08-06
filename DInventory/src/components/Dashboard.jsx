import React, { useState, useEffect } from 'react';

const Dashboard = ({ onLogout }) => {
  // Load products from local storage on initial render.
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Form state for creating and updating
  const [name, setName] = useState('');
  const [reference, setReference] = useState('');
  const [stock, setStock] = useState('');

  // Use useEffect to save products to local storage whenever they change.
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // CRUD functions
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name,
      reference,
      stock: parseInt(stock),
    };
    setProducts([...products, newProduct]);
    setIsAdding(false);
    setName('');
    setReference('');
    setStock('');
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setName(product.name);
    setReference(product.reference);
    setStock(product.stock);
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(p =>
      p.id === currentProduct.id
        ? { ...p, name, reference, stock: parseInt(stock) }
        : p
    ));
    setIsEditing(false);
    setCurrentProduct(null);
    setName('');
    setReference('');
    setStock('');
  };

  // Delete functions
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">D Inventory Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <button
          onClick={() => {
            setIsAdding(true);
            setIsEditing(false);
            setCurrentProduct(null);
            setName('');
            setReference('');
            setStock('');
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Product
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product Name (e.g., Classic Chrome Lighter)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Reference (e.g., Z-101)"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Stock (e.g., 50)"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex gap-4">
            {isEditing ? (
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Product
              </button>
            ) : (
              <button
                onClick={handleAddProduct}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Product
              </button>
            )}
            <button
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Reference</th>
                <th className="py-3 px-6 text-left">Stock</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                  <td className="py-3 px-6 text-left">{product.reference}</td>
                  <td className="py-3 px-6 text-left">{product.stock}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete **{productToDelete?.name}**?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;