import React, { useState } from 'react';

const AuthForm = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simulate API call for registration
    if (isRegistering) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.find(u => u.username === username);

      if (userExists) {
        setError('Username already exists.');
        return;
      }

      const newUser = { username, password };
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      setSuccess('Registration successful! Please log in.');
      setIsRegistering(false);
      setUsername('');
      setPassword('');
      return;
    }

    // Simulate API call for login
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      onLogin(true);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? 'Register for D Inventory' : 'Login to D Inventory'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsRegistering(false)} className="text-blue-500 hover:text-blue-700 font-bold">
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button onClick={() => setIsRegistering(true)} className="text-blue-500 hover:text-blue-700 font-bold">
                Register
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;