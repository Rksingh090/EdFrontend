import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../constant';
import TeacherSidebar from '../../components/base/TeacherSidebar';
import { 
  AiOutlineBook, 
  AiOutlineUsergroupAdd, 
  AiOutlineStar, 
  AiOutlineDollar,
  AiOutlineArrowDown
} from 'react-icons/ai';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      {change && (
        <p className={`text-sm mt-2 font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last month
        </p>
      )}
    </div>
    <div className="bg-blue-50 p-4 rounded-full">
      <Icon className="text-2xl text-blue-600" />
    </div>
  </div>
);

const Analytics = () => {
  const [currentTab, setCurrentTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    overview: { totalCourses: 0, totalStudents: 0, averageRating: 0, totalRevenue: 0 },
    earningsData: [],
    coursePerformanceData: [],
    recentStudentsData: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API}/analytics/teacher`, {
        headers: { token: localStorage.getItem("token") }
      });
      if (res.data.status === "success") {
        setAnalyticsData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
    } finally {
      setLoading(false);
    }
  };

  const { overview, earningsData, coursePerformanceData, recentStudentsData } = analyticsData;


  return (
    <TeacherSidebar>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Track your courses, students, and revenue performance.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-lg px-4 pt-2">
          {["overview", "courses", "earning", "students", "statements", "export"].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-4 py-3 font-medium text-sm capitalize transition-colors duration-200 border-b-2 ${
                currentTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : currentTab === "overview" && (
            <div className="animate-fadeIn">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard icon={AiOutlineBook} title="Total Courses" value={overview.totalCourses} />
                <StatCard icon={AiOutlineUsergroupAdd} title="Total Students" value={overview.totalStudents} />
                <StatCard icon={AiOutlineStar} title="Average Rating" value={overview.averageRating} />
                <StatCard icon={AiOutlineDollar} title="Total Revenue" value={`$${overview.totalRevenue.toLocaleString()}`} />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={earningsData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} tickFormatter={(val) => `$${val}`} />
                        <Tooltip 
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                          formatter={(value) => [`$${value}`, 'Revenue']}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Student Enrollments</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                        <Tooltip 
                          cursor={{fill: '#f3f4f6'}}
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                        />
                        <Bar dataKey="students" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Top Courses Table */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Top Performing Courses</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3">Course Name</th>
                        <th className="px-6 py-3 text-right">Enrollments</th>
                        <th className="px-6 py-3 text-right">Revenue</th>
                        <th className="px-6 py-3 text-right">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coursePerformanceData.length > 0 ? coursePerformanceData.map((course, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{course.name}</td>
                          <td className="px-6 py-4 text-right">{course.enrollments}</td>
                          <td className="px-6 py-4 text-right">${course.revenue.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right font-medium text-green-600">★ {course.rating}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No courses available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentTab === "courses" && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fadeIn">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">All Courses Analytics</h3>
                <div className="flex gap-2">
                  <select className="border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                    <option>Sort by Revenue</option>
                    <option>Sort by Enrollments</option>
                    <option>Sort by Rating</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3">Course Name</th>
                      <th className="px-6 py-3 text-right">Enrollments</th>
                      <th className="px-6 py-3 text-right">Revenue</th>
                      <th className="px-6 py-3 text-right">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursePerformanceData.length > 0 ? coursePerformanceData.map((course, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{course.name}</td>
                        <td className="px-6 py-4 text-right">{course.enrollments}</td>
                        <td className="px-6 py-4 text-right">${course.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium text-green-600">★ {course.rating}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No courses available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentTab === "earning" && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard icon={AiOutlineDollar} title="This Month" value={`$${(earningsData[earningsData.length - 1]?.revenue || 0).toLocaleString()}`} />
                <StatCard icon={AiOutlineDollar} title="Total Lifetime" value={`$${overview.totalRevenue.toLocaleString()}`} />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Detailed Revenue Chart</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 font-medium rounded-md">1M</button>
                    <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 font-medium rounded-md">6M</button>
                    <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 font-medium rounded-md">1Y</button>
                    <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 font-medium rounded-md">ALL</button>
                  </div>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} tickFormatter={(val) => `$${val}`} />
                      <Tooltip 
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {currentTab === "students" && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fadeIn">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Enrollments</h3>
                <div className="flex gap-4 w-full sm:w-auto">
                  <select className="border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 w-full sm:w-auto">
                    <option value="all">All Courses</option>
                    {coursePerformanceData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                  <input type="date" className="border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 w-full sm:w-auto" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3">Course</th>
                      <th className="px-6 py-3 text-center">Enrollment Date</th>
                      <th className="px-6 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudentsData.length > 0 ? recentStudentsData.map((student) => (
                      <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 text-gray-700">{student.course}</td>
                        <td className="px-6 py-4 text-center">{new Date(student.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No recent enrollments</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {currentTab === "statements" && (
            <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm text-center animate-fadeIn">
               <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/nodata.png" alt="No Statements" className="w-64 mx-auto mb-6 opacity-75" />
               <h3 className="text-xl font-bold text-gray-900 mb-2">No statements available</h3>
               <p className="text-gray-500 max-w-md mx-auto">You don't have any generated statements for this period. Statements are generated automatically at the end of each month.</p>
            </div>
          )}

          {currentTab === "export" && (
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm animate-fadeIn">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Export Your Analytics Data</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Download a detailed CSV report of your sales, student enrollments, and course performance. Keep a local copy for your personal records or accounting purposes.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
                    <h4 className="font-medium text-gray-900 mb-2">Select Date Range</h4>
                    <div className="flex gap-4">
                      <input type="date" className="border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none w-full" />
                      <span className="text-gray-500 self-center">to</span>
                      <input type="date" className="border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none w-full" />
                    </div>
                  </div>

                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    <AiOutlineArrowDown className="text-xl" />
                    Download CSV Report
                  </button>
                </div>
                <div className="flex-1 hidden md:block">
                  <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/analytics.jpg" alt="Analytics Export" className="w-full rounded-xl shadow-md border border-gray-100" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </TeacherSidebar>
  );
}

export default Analytics;