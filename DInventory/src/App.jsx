import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import initialUsers from './users.json';
import initialProducts from './products.json';
import './App.css';

function App() {
  // Initialize isLoggedIn state from local storage.
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  useEffect(() => {
    // Populate local storage with initial user data only if it doesn't exist.
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
    // Populate local storage with initial product data only if it doesn't exist.
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
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <AuthForm onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;