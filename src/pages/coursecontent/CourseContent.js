import React, { useState } from 'react';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../constant';

const CourseContent = () => {
    const { user } = useSelector(({ user }) => user)
    const data = useOutletContext();
    const { course_id } = useParams();
    const [marking, setMarking] = useState(false);

    const markMyAttendance = async () => {
        setMarking(true);
        try {
            const res = await axios.post(`${API}/attendance/self-mark/${course_id}`, {}, {
                headers: { token: localStorage.getItem("token") }
            });
            if (res.data.success) {
                alert(res.data.message);
            } else {
                alert(res.data.message || "Failed to mark attendance.");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to mark attendance.");
        }
        setMarking(false);
    };
    return (
        <div className='courseWelcomPage'>
            <div className="courseWelcomWrapper">
                <BsReverseLayoutTextSidebarReverse size={50} className='CCwelcomeIcon' />
                <div className='courseContentWelocomePage'>
                    <h3 className='subtitle'>{data.title} </h3>
                    <h2 className='title'>Welcome back {user?.first_name} {user?.last_name}!</h2>
                    <button 
                        onClick={markMyAttendance} 
                        disabled={marking}
                        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
                    >
                        {marking ? "Marking..." : "Mark My Attendance For Today"}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default CourseContent;