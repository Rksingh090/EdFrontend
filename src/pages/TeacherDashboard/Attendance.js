import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { API } from '../../constant';
import TeacherSidebar from '../../components/base/TeacherSidebar';

const Attendance = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API}/course/teacher/page/1?perPage=100`, {
                headers: { token: localStorage.getItem("token") }
            });
            if (res.data.status === "success") {
                setCourses(res.data.courses);
            }
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    const fetchStudentsAndAttendance = async () => {
        if (!selectedCourse || !date) return;
        setLoading(true);
        try {
            // Fetch enrolled students
            const enrolledRes = await axios.get(`${API}/attendance/enrolled/${selectedCourse}`, {
                headers: { token: localStorage.getItem("token") }
            });
            
            let enrolledStudents = [];
            if (enrolledRes.data.success) {
                enrolledStudents = enrolledRes.data.students;
                setStudents(enrolledStudents);
            }

            // Fetch attendance for the selected date
            const attRes = await axios.get(`${API}/attendance/${selectedCourse}?date=${date}`, {
                headers: { token: localStorage.getItem("token") }
            });
            
            const newRecords = {};
            // Initialize default presence
            enrolledStudents.forEach(student => {
                newRecords[student._id] = "present";
            });

            if (attRes.data.success && attRes.data.attendance.length > 0) {
                const existingRecords = attRes.data.attendance[0].records;
                existingRecords.forEach(record => {
                    if (record.student && record.student._id) {
                        newRecords[record.student._id] = record.status;
                    }
                });
            }

            setAttendanceRecords(newRecords);

        } catch (error) {
            alert("Failed to fetch data");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (selectedCourse) {
            fetchStudentsAndAttendance();
        }
    }, [selectedCourse, date]);

    const handleStatusChange = (studentId, status) => {
        setAttendanceRecords(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const submitAttendance = async () => {
        try {
            const recordsToSubmit = students.map(student => ({
                student: student._id,
                status: attendanceRecords[student._id] || "present"
            }));

            const res = await axios.post(`${API}/attendance/${selectedCourse}`, {
                date,
                records: recordsToSubmit
            }, {
                headers: { token: localStorage.getItem("token") }
            });

            if (res.data.success) {
                alert("Attendance saved successfully");
            } else {
                alert(res.data.message || "Failed to save attendance");
            }
        } catch (error) {
            alert("An error occurred");
        }
    };

    return (
        <TeacherSidebar>
            <div className="p-4 sm:p-8">
                <div className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white">Attendance</h2>
                        <p className="text-gray-500 dark:text-gray-400">Mark attendance for your classes</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2 dark:text-white">Select Course</label>
                        <select 
                            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a course...</option>
                            {courses.map(course => (
                                <option key={course._id} value={course._id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2 dark:text-white">Date</label>
                        <input 
                            type="date" 
                            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                {selectedCourse && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading students...</div>
                        ) : students.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No students enrolled in this course.</div>
                        ) : (
                            <>
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr>
                                            <th className="p-4 font-semibold dark:text-white">Student Name</th>
                                            <th className="p-4 font-semibold dark:text-white">Email</th>
                                            <th className="p-4 font-semibold dark:text-white">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(student => (
                                            <tr key={student._id} className="border-t dark:border-gray-700">
                                                <td className="p-4 dark:text-gray-200">
                                                    {student.first_name} {student.last_name}
                                                </td>
                                                <td className="p-4 dark:text-gray-400">
                                                    {student.email}
                                                </td>
                                                <td className="p-4">
                                                    <select
                                                        value={attendanceRecords[student._id] || "present"}
                                                        onChange={(e) => handleStatusChange(student._id, e.target.value)}
                                                        className={`p-2 rounded border focus:outline-none dark:bg-gray-700 dark:border-gray-600 
                                                            ${attendanceRecords[student._id] === 'present' ? 'text-green-600 font-semibold' : ''}
                                                            ${attendanceRecords[student._id] === 'absent' ? 'text-red-600 font-semibold' : ''}
                                                            ${attendanceRecords[student._id] === 'late' ? 'text-yellow-600 font-semibold' : ''}
                                                        `}
                                                    >
                                                        <option value="present">Present</option>
                                                        <option value="absent">Absent</option>
                                                        <option value="late">Late</option>
                                                        <option value="excused">Excused</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-4 border-t dark:border-gray-700 flex justify-end">
                                    <button 
                                        onClick={submitAttendance}
                                        className="bg-[#2b4eff] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Save Attendance
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </TeacherSidebar>
    );
};

export default Attendance;
