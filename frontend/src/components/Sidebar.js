import React from 'react';
import { Home, BarChart3, PieChart, Settings, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      name: 'Home',
      icon: Home,
      path: '/home',
      active: location.pathname === '/home'
    },
    {
      name: 'Dashboard',
      icon: PieChart,
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      name: 'Referrals',
      icon: BarChart3,
      path: '/referrals',
      active: location.pathname === '/referrals'
    },
    {
      name: 'Customers',
      icon: TrendingUp,
      path: '/customers',
      active: location.pathname === '/customers'
    },
    {
      name: 'AI Marketing Assistant',
      icon: TrendingUp,
      path: '/marketing',
      active: location.pathname === '/marketing'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];

  return (
    <div className="w-80 bg-white shadow-lg h-full flex flex-col">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold text-gray-800">turtlefin</span>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-8 flex-1">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent size={20} />
                <span className="text-lg font-medium">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button 
          onClick={logout}
          className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;