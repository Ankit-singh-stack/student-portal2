import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaChartLine, FaSignOutAlt, FaUser, FaTachometerAlt, FaMagic, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - Always visible */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaChartLine className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 group-hover:text-purple-600 transition-colors" />
              </motion.div>
              <span className="font-bold text-sm sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <span className="hidden xs:inline">StudentPerformance</span>
                <span className="xs:hidden">SP</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/predict"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <FaMagic />
                  <span>Predict</span>
                </Link>
                <div className="flex items-center space-x-3 ml-4">
                  <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <FaUser className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.name || currentUser.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300 hover:border-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:shadow-lg transition-all"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button - Visible only on mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {currentUser ? (
                <>
                  {/* User Info - Mobile */}
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaUser className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.name || currentUser.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <FaTachometerAlt className="text-gray-500" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  
                  <Link
                    to="/predict"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <FaMagic className="text-gray-500" />
                    <span className="font-medium">Predict</span>
                  </Link>

                  {/* Logout Button - Mobile */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200 mt-2 pt-3"
                  >
                    <FaSignOutAlt />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3 pt-2">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block w-full text-center px-4 py-3 rounded-lg text-gray-700 font-medium border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}