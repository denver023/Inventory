import React, { useState, useEffect } from 'react';

const Dashboard = ({ onLogout, onNavigate }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // New state for unread indicators
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  // Form state for creating and updating
  const [name, setName] = useState('');
  const [reference, setReference] = useState('');
  const [stock, setStock] = useState('');

  // Dummy data for messages and notifications
  const messages = [
    { id: 1, text: 'New order received from Jane Doe.', time: '2h ago' },
    { id: 2, text: 'You have a new support ticket.', time: '5h ago' },
  ];
  const notifications = [
    { id: 1, text: 'Stock for "Black Matte Lighter" is low.', time: '1h ago' },
    { id: 2, text: 'New product "Venetian Brass Lighter" was added.', time: '4h ago' },
  ];

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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 text-xl font-bold text-gray-800">
              D Inventory
            </div>

            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => onNavigate('inventory')}
                className="text-blue-600 font-bold"
              >
                Inventory
              </button>
              <button
                onClick={() => onNavigate('sales')}
                className="text-gray-500 hover:text-gray-900 font-medium"
              >
                Sales & Tools
              </button>
            </div>

            <div className="flex items-center space-x-4 relative">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowMessages(!showMessages);
                    setShowNotifications(false);
                    setHasUnreadMessages(false); // Mark as read
                  }}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">View messages</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
                {hasUnreadMessages && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
                )}
              </div>
              {showMessages && (
                <div className="absolute right-0 mt-52 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <p className="block px-4 py-2 text-sm text-gray-700 font-bold border-b">Messages</p>
                    {messages.map(msg => (
                      <div key={msg.id} className="flex justify-between px-4 py-2 hover:bg-gray-100">
                        <span className="text-sm text-gray-700">{msg.text}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowMessages(false);
                    setHasUnreadNotifications(false); // Mark as read
                  }}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {hasUnreadNotifications && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
                )}
              </div>
              {showNotifications && (
                <div className="absolute right-0 mt-52 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <p className="block px-4 py-2 text-sm text-gray-700 font-bold border-b">Notifications</p>
                    {notifications.map(notif => (
                      <div key={notif.id} className="flex justify-between px-4 py-2 hover:bg-gray-100">
                        <span className="text-sm text-gray-700">{notif.text}</span>
                        <span className="text-xs text-gray-500">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={onLogout}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
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
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Stock"
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
    </div>
  );
};

export default Dashboard;