import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  FaUsers, FaChartLine, FaTrophy, FaClock, 
  FaGraduationCap, FaBookOpen, FaUserGraduate, 
  FaArrowUp, FaArrowDown, FaDownload 
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [performanceData, setPerformanceData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageScore: 0,
    topPerformers: 0,
    attendanceRate: 0,
    improvementRate: 0,
    atRiskStudents: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Simulate real-time data updates
  useEffect(() => {
    generateNewData();
    const interval = setInterval(generateNewData, 30000);
    return () => clearInterval(interval);
  }, []);

  const generateNewData = () => {
    setLoading(true);
    
    // Generate subject performance data
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science'];
    const newData = subjects.map(subject => ({
      subject,
      score: Math.floor(Math.random() * 25) + 70,
      average: Math.floor(Math.random() * 20) + 65,
      students: Math.floor(Math.random() * 100) + 150,
      target: 85
    }));
    setPerformanceData(newData);

    // Generate trend data for the last 12 periods
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const newTrendData = months.map(month => ({
      month,
      score: Math.floor(Math.random() * 20) + 65,
      attendance: Math.floor(Math.random() * 15) + 75,
      participation: Math.floor(Math.random() * 25) + 60
    }));
    setTrendData(newTrendData);

    // Update stats
    setStats({
      totalStudents: Math.floor(Math.random() * 500) + 2350,
      averageScore: Math.floor(Math.random() * 12) + 78,
      topPerformers: Math.floor(Math.random() * 80) + 320,
      attendanceRate: Math.floor(Math.random() * 8) + 87,
      improvementRate: Math.floor(Math.random() * 15) + 65,
      atRiskStudents: Math.floor(Math.random() * 30) + 45
    });

    setLoading(false);
  };

  const handleExportData = () => {
    toast.success('Report downloaded successfully!');
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const StatCard = ({ icon, title, value, change, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-xs sm:text-sm mb-1">{title}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{value}</p>
          {change && (
            <div className="flex items-center mt-1 sm:mt-2">
              {change > 0 ? (
                <FaArrowUp className="text-green-500 mr-1 text-xs sm:text-sm" />
              ) : (
                <FaArrowDown className="text-red-500 mr-1 text-xs sm:text-sm" />
              )}
              <span className={`text-xs sm:text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 lg:p-4 rounded-lg bg-${color}-100 text-${color}-600 ml-2`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8"
        >
          <div className="w-full sm:w-auto mb-3 sm:mb-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Welcome back, {currentUser?.name || currentUser?.email?.split('@')[0] || 'Educator'}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Here's your real-time performance dashboard
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportData}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              <FaDownload />
              <span>Export</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid - Responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <StatCard
            icon={<FaUsers size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
            title="Students"
            value={stats.totalStudents.toLocaleString()}
            change={3.2}
            color="blue"
          />
          <StatCard
            icon={<FaChartLine size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
            title="Avg. Score"
            value={`${stats.averageScore}%`}
            change={2.1}
            color="green"
          />
          <StatCard
            icon={<FaTrophy size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
            title="Top"
            value={stats.topPerformers.toLocaleString()}
            change={5.4}
            color="yellow"
          />
          <StatCard
            icon={<FaClock size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
            title="Attendance"
            value={`${stats.attendanceRate}%`}
            change={-1.2}
            color="purple"
          />
          <StatCard
            icon={<FaArrowUp size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
            title="Improvement"
            value={`${stats.improvementRate}%`}
            change={4.8}
            color="indigo"
          />
          <StatCard
            icon={<FaUserGraduate size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
            title="At Risk"
            value={stats.atRiskStudents}
            change={-8.3}
            color="red"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          {/* Performance by Subject */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 flex items-center">
              <FaBookOpen className="mr-2 text-blue-600 text-sm sm:text-base" />
              <span className="text-sm sm:text-base">Performance by Subject</span>
            </h2>
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tick={{fontSize: 10}} />
                  <YAxis dataKey="subject" type="category" width={60} tick={{fontSize: 10}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: '10px'}} />
                  <Bar dataKey="score" fill="#3b82f6" name="Score" />
                  <Bar dataKey="average" fill="#10b981" name="Average" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Student Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 flex items-center">
              <FaGraduationCap className="mr-2 text-purple-600 text-sm sm:text-base" />
              <span className="text-sm sm:text-base">Grade Distribution</span>
            </h2>
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'A', value: Math.floor(Math.random() * 100) + 200 },
                      { name: 'B', value: Math.floor(Math.random() * 150) + 300 },
                      { name: 'C', value: Math.floor(Math.random() * 100) + 250 },
                      { name: 'D', value: Math.floor(Math.random() * 80) + 150 },
                      { name: 'F', value: Math.floor(Math.random() * 50) + 50 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Performance Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg lg:col-span-2"
          >
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 flex items-center">
              <FaChartLine className="mr-2 text-green-600 text-sm sm:text-base" />
              <span className="text-sm sm:text-base">Performance Trends</span>
            </h2>
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: '10px'}} />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Score"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    name="Attendance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity Table - Horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: 'Alice Johnson', subject: 'Math', score: 95, status: 'Excellent', time: '5 min' },
                    { name: 'Bob Smith', subject: 'Science', score: 78, status: 'Good', time: '15 min' },
                    { name: 'Carol Davis', subject: 'English', score: 82, status: 'Good', time: '25 min' },
                    { name: 'David Wilson', subject: 'History', score: 65, status: 'Needs Help', time: '35 min' },
                    { name: 'Eva Brown', subject: 'CS', score: 98, status: 'Excellent', time: '45 min' },
                  ].map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{student.name}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{student.subject}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.score >= 90 ? 'bg-green-100 text-green-800' :
                          student.score >= 80 ? 'bg-blue-100 text-blue-800' :
                          student.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.score}%
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{student.status}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{student.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Real-time Updates Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500"
        >
          <span className="inline-flex items-center">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 rounded-full animate-pulse mr-1 sm:mr-2"></span>
            Live updates • {new Date().toLocaleTimeString()}
          </span>
        </motion.div>
      </div>
    </div>
  );
}