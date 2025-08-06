import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import SalesAndTools from './components/SalesAndTools'; // New component import
import initialUsers from './users.json';
import initialProducts from './products.json';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  const [currentPage, setCurrentPage] = useState('inventory');

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setCurrentPage('inventory'); // Reset to default page on logout
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (currentPage === 'inventory') {
      return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
    } else if (currentPage === 'sales') {
      return <SalesAndTools onLogout={handleLogout} onNavigate={handleNavigate} />;
    }
    return null;
  };

  return (
    <>
      {isLoggedIn ? (
        renderPage()
      ) : (
        <AuthForm onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;