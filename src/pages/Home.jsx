import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  FaChartLine, FaRobot, FaShieldAlt, FaUsers, 
  FaArrowRight, FaStar, FaClock, 
} from 'react-icons/fa';

export default function Home() {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <FaChartLine className="h-8 w-8 text-blue-600" />,
      title: 'Real-time Analytics',
      description: 'Get instant insights into student performance with live data visualization and tracking'
    },
    {
      icon: <FaRobot className="h-8 w-8 text-purple-600" />,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms to predict student outcomes with 95% accuracy'
    },
    {
      icon: <FaShieldAlt className="h-8 w-8 text-green-600" />,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with encrypted data storage and privacy protection'
    },
    {
      icon: <FaUsers className="h-8 w-8 text-red-600" />,
      title: 'Collaborative Tools',
      description: 'Share insights and collaborate with teachers, parents, and administrators'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Principal, Springfield High',
      content: 'This platform has transformed how we track student progress. The predictions are incredibly accurate!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Math Teacher',
      content: 'The real-time analytics help me identify struggling students early. Game-changer for my classroom.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'School Counselor',
      content: 'Finally, a tool that helps us provide targeted support to students who need it most.',
      rating: 5
    }
  ];

  const stats = [
    { number: '95%', label: 'Prediction Accuracy', icon: <FaStar className="text-yellow-500" /> },
    { number: '10K+', label: 'Students Tracked', icon: <FaUsers className="text-blue-500" /> },
    { number: '500+', label: 'Schools Using', icon: <FaChartLine className="text-green-500" /> },
    { number: '24/7', label: 'Real-time Updates', icon: <FaClock className="text-purple-500" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-semibold text-sm mb-6"
            >
              🚀 AI-Powered Education Platform
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Predict Student Success
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Harness the power of artificial intelligence to predict and improve student performance. 
              Make data-driven decisions for better educational outcomes with our advanced analytics platform.
            </p>
            
            <div className="flex justify-center space-x-4">
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all flex items-center space-x-2"
                  >
                    <span>Get Started Free</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to track, analyze, and improve student performance in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-8 rounded-xl shadow-lg card-hover"
              >
                <div className="mb-4 p-3 bg-white rounded-lg inline-block">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What Educators Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied educators who have transformed their approach to student performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Transform Student Performance?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands of educators who are already using our platform to make a difference
            </p>
            {currentUser ? (
              <Link
                to="/dashboard"
                className="inline-block bg-white text-blue-600 px-12 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="inline-block bg-white text-blue-600 px-12 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition-all"
              >
                Start Your Free Trial
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}