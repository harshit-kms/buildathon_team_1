import React from 'react';
import { Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ title = "Dashboard" }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="text-gray-400" size={24} />
          <span className="text-xl font-semibold text-gray-800">
            Hello {user?.name} - {title}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <input 
            type="search" 
            placeholder="Search" 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

