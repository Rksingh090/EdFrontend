import React, { } from 'react'
import { MdOutlineAssignment, MdOutlineAssignmentTurnedIn, MdOutlineQuiz } from 'react-icons/md';
import { AiOutlineUser, AiOutlineBuild, AiOutlineLogout } from 'react-icons/ai';
import { BsCalendar4Event, BsCameraVideo, BsGear } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { TfiAnnouncement, TfiWallet } from 'react-icons/tfi';
import { SlGraduation } from 'react-icons/sl';
import { RxDashboard } from 'react-icons/rx';
import { HiOutlineCalendar } from 'react-icons/hi';

import "./base.css";

import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { IoAnalytics, IoRocketOutline } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import { UserLogOut } from '../../reducers/UserReducer';

const TeacherSidebar = ({ children, showMenu, style }) => {

    const dispatch = useDispatch();

    const { show_sidebar } = useSelector(state => state.appsetting)
    const { user } = useSelector(state => state.user);

    const navigate = useNavigate();

    return (
        <div className='max-h-screen h-screen overflow-hidden' style={style}>
            <Navbar showSideMenu={showMenu ? false : true} />
            <div className='h-[calc(100vh-80px)] flex  overflow-hidden relative'>
                <div className={`flex showSidebar ${show_sidebar ? "active" : "deactive"}  z-[200] flex-col hideScrollbar overflow-auto border-r-[1px]`}>

                    {user.role === "student" && (
                        <>
                            <Link to="/dashboard" className='sidebarItemLink gap-3'>
                                <RxDashboard />
                                <span>Dashboard</span>
                            </Link>

                            <Link to="/student/profile" className='sidebarItemLink gap-3'>
                                <AiOutlineUser />
                                <span>My Profile</span>
                            </Link>
                            <Link to="/student/enrolled-courses" className='sidebarItemLink gap-3'>
                                <SlGraduation />
                                <span>Enrolled Courses</span>
                            </Link>
                            <Link to="/student/quiz-attempts" className='sidebarItemLink gap-3'>
                                <AiOutlineBuild />
                                <span>Quiz Attempts</span>
                            </Link>
                            <Link to="/student/order-history" className='sidebarItemLink gap-3'>
                                <FiShoppingCart />
                                <span>Order History</span>
                            </Link>
                            <Link to="/student/assignments" className='sidebarItemLink gap-3'>
                                <MdOutlineAssignment />
                                <span>Assignments</span>
                            </Link>
                            <Link to="/student/calender" className='sidebarItemLink gap-3'>
                                <HiOutlineCalendar />
                                <span>Calender</span>
                            </Link>
                        </>
                    )}

                    {user.role === "teacher" && (
                        <>
                            <p className='SidebarHintText'>Dashboard</p>

                            <Link to="/teacher/course" className='sidebarItemLink gap-3'>
                                <IoRocketOutline />
                                <span>My Course</span>
                            </Link>
                            <Link to="/teacher/profile" className='sidebarItemLink gap-3'>
                                <AiOutlineUser />
                                <span>My Profile</span>
                            </Link>
                            <Link to="/teacher/events" className='sidebarItemLink gap-3 border-gray-[100] pb-3'>
                                <BsCalendar4Event />
                                <span>Events</span>
                            </Link>
                            <Link to="/teacher/quiz" className='sidebarItemLink gap-3'>
                                <MdOutlineQuiz />
                                <span>Quiz</span>
                            </Link>
                            <Link to="/teacher/announcement" className='sidebarItemLink gap-3'>
                                <TfiAnnouncement />
                                <span>Announcements</span>
                            </Link>
                            <Link to="/teacher/assignment" className='sidebarItemLink gap-3'>
                                <MdOutlineAssignmentTurnedIn />
                                <span>Assignment</span>
                            </Link>
                            <Link to="/teacher/withdrawls" className='sidebarItemLink gap-3'>
                                <TfiWallet />
                                <span>Withdrawals</span>
                            </Link>
                            <Link to="/teacher/analytics" className='sidebarItemLink gap-3 border-gray-[100] pb-3'>
                                <IoAnalytics />
                                <span>Analytics</span>
                            </Link>
                        </>
                    )}
                    
                    <hr />

                    <Link to="/settings" className='sidebarItemLink gap-3'>
                        <BsGear />
                        <span>Settings</span>
                    </Link>
                    <div className='sidebarItemLink gap-3' onClick={() => {
                        dispatch(UserLogOut())
                        navigate("/login")
                    }}>
                        <AiOutlineLogout />
                        <span>Logout</span>
                    </div>
                </div>
                <div className='w-[100%] overflow-auto'>
                    <div className='px-8 py-4'>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherSidebar