import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  UserPlus, 
  Settings,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: Home, 
      path: '/', 
      exact: true 
    },
    { 
      name: 'Customers', 
      icon: Users, 
      path: '/customers' 
    },
    {
      name: 'AI Marketing',
      icon: BarChart3,
      path: '/marketing',
    },
    { 
      name: 'Referrals', 
      icon: UserPlus, 
      path: '/referrals' 
    },
    { 
      name: 'Learning', 
      icon: BookOpen, 
      path: '/learning' 
    }
    // { 
    //   name: 'Settings', 
    //   icon: Settings, 
    //   path: '/settings' 
    // }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleSubmenu = (itemName) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">InsuGrow</span>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isSubmenuOpen = openSubmenus[item.name];

          return (
            <div key={item.name}>
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                    active
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-r-2 border-teal-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform duration-200 ${
                      isSubmenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                    active
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-r-2 border-teal-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              )}

              {/* Submenu */}
              {hasSubmenu && (
                <div className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                  isSubmenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={`block px-3 py-2 text-base rounded-lg transition-colors duration-200 ${
                        isActive(subItem.path)
                          ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72 h-screen fixed top-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">

          <SidebarContent />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-black opacity-50" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-xs">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
