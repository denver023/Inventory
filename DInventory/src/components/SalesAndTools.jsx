import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Calendar.css'; // Import your new custom stylesheet here

const SalesAndTools = ({ onLogout, onNavigate }) => {
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const messages = [
    { id: 1, text: 'New order received from Jane Doe.', time: '2h ago' },
    { id: 2, text: 'You have a new support ticket.', time: '5h ago' },
  ];
  const notifications = [
    { id: 1, text: 'Stock for "Black Matte Lighter" is low.', time: '1h ago' },
    { id: 2, text: 'New product "Venetian Brass Lighter" was added.', time: '4h ago' },
  ];

  const [toDos, setToDos] = useState([
    { id: 1, text: 'Restock Classic Chrome Lighter', completed: false },
    { id: 2, text: 'Review quarterly sales report', completed: true },
    { id: 3, text: 'Schedule team meeting for Friday', completed: false },
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Manager', text: 'Team, please review the latest inventory report.' },
    { id: 2, user: 'You', text: 'I have reviewed it. All looks good.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleTodo = (id) => {
    setToDos(toDos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const handleAddMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: chatMessages.length > 0 ? Math.max(...chatMessages.map(m => m.id)) + 1 : 1,
      user: 'You',
      text: newMessage,
    };
    setChatMessages([...chatMessages, newMsg]);
    setNewMessage('');
  };

  const series = [{
    name: 'Sales',
    data: [31, 40, 28, 51, 42, 109, 100]
  }];
  const options = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'category',
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    },
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
                className="text-gray-500 hover:text-gray-900 font-medium"
              >
                Inventory
              </button>
              <button
                onClick={() => onNavigate('sales')}
                className="text-blue-600 font-bold"
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
                    setHasUnreadMessages(false);
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
                  <div className="py-1">
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
                    setHasUnreadNotifications(false);
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
                  <div className="py-1">
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
        <h1 className="text-3xl font-bold mb-6">Sales & Tools Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Sales Performance</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Chart options={options} series={series} type="area" height={350} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">To-Do List</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul>
                {toDos.map(todo => (
                  <li key={todo.id} className="flex items-center space-x-2 py-2 border-b last:border-b-0">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="form-checkbox text-blue-600 h-4 w-4"
                    />
                    <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {todo.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-center">
              <Calendar
                onChange={setCalendarDate}
                value={calendarDate}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Team Chat</h2>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
              <div className="flex-1 overflow-y-auto mb-4 p-2 border rounded-md bg-gray-50">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex mb-4 ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg max-w-xs ${msg.user === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <p className="font-bold">{msg.user}</p>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAndTools;