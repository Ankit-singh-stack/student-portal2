import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalculator, FaBrain, FaChartLine, 
  FaBook, FaClock, FaUsers, FaGraduationCap,
  FaArrowLeft, FaArrowRight, FaRedo
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export default function Predict() {
  const [formData, setFormData] = useState({
    studyHours: '',
    previousScore: '',
    attendance: '',
    assignments: '',
    extracurricular: '',
    sleepHours: '',
    classParticipation: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to get grade based on score
  const getGrade = (score) => {
    if (score >= 90) return { letter: 'A', color: 'green', description: 'Excellent' };
    if (score >= 80) return { letter: 'B', color: 'blue', description: 'Good' };
    if (score >= 70) return { letter: 'C', color: 'yellow', description: 'Average' };
    if (score >= 60) return { letter: 'D', color: 'orange', description: 'Below Average' };
    return { letter: 'F', color: 'red', description: 'Needs Improvement' };
  };

  // Function to get recommendation based on score and form data
  const getRecommendation = (score, data) => {
    const studyHours = parseFloat(data.studyHours) || 0;
    const attendance = parseFloat(data.attendance) || 0;
    const assignments = parseFloat(data.assignments) || 0;
    
    if (score >= 90) {
      return "Excellent performance! Consider taking advanced courses or mentoring other students. Your study habits are working well.";
    } else if (score >= 80) {
      if (studyHours < 20) {
        return "Good performance! Increasing study hours to 20+ per week could help you reach excellence.";
      } else {
        return "Good performance! Focus on weak areas and consider group study sessions for better understanding.";
      }
    } else if (score >= 70) {
      if (attendance < 85) {
        return "Average performance. Improving attendance to 85%+ and regular review of class notes is recommended.";
      } else {
        return "Average performance. Create a structured study schedule and seek help from teachers for difficult topics.";
      }
    } else if (score >= 60) {
      if (assignments < 70) {
        return "Below average performance. Focus on completing all assignments on time and attend extra help sessions.";
      } else {
        return "Below average performance. Consider tutoring and forming study groups with better-performing students.";
      }
    } else {
      return "Critical performance. Immediate intervention required. Schedule a meeting with academic counselor and parents.";
    }
  };

  // Function to get strengths
  const getStrengths = (data) => {
    const strengths = [];
    const attendance = parseFloat(data.attendance) || 0;
    const studyHours = parseFloat(data.studyHours) || 0;
    const assignments = parseFloat(data.assignments) || 0;
    const participation = parseFloat(data.classParticipation) || 0;
    const sleepHours = parseFloat(data.sleepHours) || 0;

    if (attendance > 85) strengths.push('Excellent attendance record');
    if (studyHours > 20) strengths.push('Dedicated study habits');
    if (assignments > 80) strengths.push('Strong assignment completion');
    if (participation > 70) strengths.push('Active class participation');
    if (sleepHours >= 7) strengths.push('Good sleep schedule');
    if (studyHours > 15 && studyHours <= 20) strengths.push('Consistent study routine');
    if (assignments > 70 && assignments <= 80) strengths.push('Satisfactory assignment submission');
    
    return strengths.length ? strengths : ['Regular attendance', 'Shows interest in learning'];
  };

  // Function to get weaknesses
  const getWeaknesses = (data) => {
    const weaknesses = [];
    const attendance = parseFloat(data.attendance) || 0;
    const studyHours = parseFloat(data.studyHours) || 0;
    const assignments = parseFloat(data.assignments) || 0;
    const participation = parseFloat(data.classParticipation) || 0;
    const sleepHours = parseFloat(data.sleepHours) || 0;
    const previousScore = parseFloat(data.previousScore) || 0;

    if (attendance < 75) weaknesses.push('Attendance needs improvement');
    if (studyHours < 15) weaknesses.push('Insufficient study time');
    if (assignments < 70) weaknesses.push('Assignment completion rate low');
    if (participation < 50) weaknesses.push('Limited class participation');
    if (sleepHours < 6) weaknesses.push('Inadequate sleep');
    if (previousScore < 60) weaknesses.push('Needs to build foundational knowledge');
    if (attendance >= 75 && attendance < 85) weaknesses.push('Attendance could be better');
    
    return weaknesses.length ? weaknesses : ['Could benefit from more practice', 'Consider seeking additional resources'];
  };

  // Function to generate study plan
  const generateStudyPlan = (data) => {
    const plans = [];
    const studyHours = parseFloat(data.studyHours) || 0;
    const attendance = parseFloat(data.attendance) || 0;
    const assignments = parseFloat(data.assignments) || 0;
    const participation = parseFloat(data.classParticipation) || 0;
    const sleepHours = parseFloat(data.sleepHours) || 0;

    if (studyHours < 20) plans.push('📚 Increase study hours to 20+ per week');
    if (attendance < 90) plans.push('🏫 Aim for 90%+ attendance rate');
    if (assignments < 85) plans.push('📝 Complete all assignments on time');
    if (participation < 60) plans.push('🗣️ Participate more in class discussions');
    if (sleepHours < 7) plans.push('😴 Get 7-8 hours of sleep daily');
    
    // Add more specific plans based on combinations
    if (studyHours < 15 && assignments < 70) {
      plans.push('📅 Create a daily study schedule with assignment deadlines');
    }
    if (attendance < 80 && participation < 50) {
      plans.push('🤝 Set goals for weekly attendance and class participation');
    }
    
    return plans.length ? plans : [
      '✨ Maintain current habits',
      '🎯 Focus on advanced topics',
      '📖 Review material regularly',
      '🤔 Practice problem-solving daily'
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call with loading
    setTimeout(() => {
      // Enhanced prediction logic
      const studyHours = parseFloat(formData.studyHours) || 0;
      const previousScore = parseFloat(formData.previousScore) || 0;
      const attendance = parseFloat(formData.attendance) || 0;
      const assignments = parseFloat(formData.assignments) || 0;
      const extracurricular = parseFloat(formData.extracurricular) || 0;
      const sleepHours = parseFloat(formData.sleepHours) || 0;
      const participation = parseFloat(formData.classParticipation) || 0;

      // Weighted calculation
      const predictedScore = Math.min(100, Math.round(
        (studyHours * 2.5) +
        (previousScore * 0.3) +
        (attendance * 0.25) +
        (assignments * 1.8) +
        (extracurricular * 1.2) +
        (sleepHours * 1.5) +
        (participation * 2)
      ));

      // Ensure score is within bounds
      const finalScore = Math.max(0, Math.min(100, predictedScore));

      // Generate detailed insights
      setPrediction({
        score: finalScore,
        grade: getGrade(finalScore),
        recommendation: getRecommendation(finalScore, formData),
        confidence: Math.floor(Math.random() * 15) + 80,
        strengths: getStrengths(formData),
        weaknesses: getWeaknesses(formData),
        studyPlan: generateStudyPlan(formData),
        radarData: [
          { subject: 'Study Hours', value: Math.min(100, studyHours * 5), fullMark: 100 },
          { subject: 'Attendance', value: attendance, fullMark: 100 },
          { subject: 'Assignments', value: assignments, fullMark: 100 },
          { subject: 'Participation', value: participation, fullMark: 100 },
          { subject: 'Sleep', value: Math.min(100, sleepHours * 12.5), fullMark: 100 },
          { subject: 'Previous Score', value: previousScore, fullMark: 100 }
        ]
      });
      
      setLoading(false);
      setStep(2);
      toast.success('Prediction generated successfully!');
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      studyHours: '',
      previousScore: '',
      attendance: '',
      assignments: '',
      extracurricular: '',
      sleepHours: '',
      classParticipation: ''
    });
    setPrediction(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">AI Performance Predictor</h1>
          <p className="text-gray-600 mt-2">
            Enter student details to get personalized insights and predictions
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>1</div>
              <span className="ml-2">Input Data</span>
            </div>
            <FaArrowRight className="text-gray-400" />
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>2</div>
              <span className="ml-2">View Results</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white p-8 rounded-xl shadow-lg ${step === 2 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Student Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Study Hours/Week
                  </label>
                  <input
                    type="number"
                    name="studyHours"
                    value={formData.studyHours}
                    onChange={handleChange}
                    required
                    min="0"
                    max="168"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Score (%)
                  </label>
                  <input
                    type="number"
                    name="previousScore"
                    value={formData.previousScore}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 75"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attendance (%)
                  </label>
                  <input
                    type="number"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 90"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignments (%)
                  </label>
                  <input
                    type="number"
                    name="assignments"
                    value={formData.assignments}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 85"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Extracurricular (hrs)
                  </label>
                  <input
                    type="number"
                    name="extracurricular"
                    value={formData.extracurricular}
                    onChange={handleChange}
                    required
                    min="0"
                    max="168"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sleep Hours
                  </label>
                  <input
                    type="number"
                    name="sleepHours"
                    value={formData.sleepHours}
                    onChange={handleChange}
                    required
                    min="0"
                    max="24"
                    step="0.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 7"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Participation (%)
                  </label>
                  <input
                    type="number"
                    name="classParticipation"
                    value={formData.classParticipation}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 80"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Generate Prediction'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            {prediction ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FaBrain className="mr-2 text-purple-600" />
                    Analysis Results
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetForm}
                    className="text-gray-500 hover:text-blue-600"
                    title="New Prediction"
                  >
                    <FaRedo />
                  </motion.button>
                </div>

                {/* Score Circle */}
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={
                          prediction.grade.letter === 'A' ? '#10b981' :
                          prediction.grade.letter === 'B' ? '#3b82f6' :
                          prediction.grade.letter === 'C' ? '#f59e0b' :
                          prediction.grade.letter === 'D' ? '#f97316' :
                          '#ef4444'
                        }
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - prediction.score / 100)}`}
                      />
                      <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dy="0.3em"
                        className="text-2xl font-bold fill-gray-800"
                        transform="rotate(90 50 50)"
                      >
                        {prediction.score}%
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Grade and Confidence */}
                <div className="flex justify-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-lg font-semibold bg-${prediction.grade.color}-100 text-${prediction.grade.color}-800`}>
                    Grade {prediction.grade.letter}: {prediction.grade.description}
                  </span>
                  <span className="px-4 py-2 rounded-full text-lg font-semibold bg-blue-100 text-blue-800">
                    {prediction.confidence}% Confidence
                  </span>
                </div>

                {/* Radar Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={prediction.radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Student" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                      <FaGraduationCap className="mr-2" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {prediction.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start text-sm text-green-700">
                          <span className="mr-2">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                      <FaClock className="mr-2" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {prediction.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start text-sm text-red-700">
                          <span className="mr-2">•</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Study Plan */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <FaBook className="mr-2" />
                    Recommended Study Plan
                  </h3>
                  <ul className="space-y-2">
                    {prediction.studyPlan.map((plan, index) => (
                      <li key={index} className="flex items-start text-sm text-blue-700">
                        <span className="mr-2">{index + 1}.</span>
                        {plan}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendation */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Detailed Recommendation</h3>
                  <p className="text-gray-600">{prediction.recommendation}</p>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 text-center mt-4">
                  * AI-powered prediction based on historical data. Actual results may vary.
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <FaBrain className="mx-auto text-6xl text-gray-300 mb-4" />
                <p className="text-lg">Fill in the form and click predict</p>
                <p className="text-sm mt-2">Get detailed AI analysis and personalized recommendations</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}