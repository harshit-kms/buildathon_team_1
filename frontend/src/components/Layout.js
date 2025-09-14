import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";


const Layout = ({ children, title }) => {
  useKeyboardShortcuts();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:ml-72">
          <Header title={title} />
          
          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;