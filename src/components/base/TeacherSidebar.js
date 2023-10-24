import React, { useMemo } from 'react'
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
    const path = useMemo(() => window.location.pathname, []);

    const { show_sidebar } = useSelector(state => state.appsetting)
    const { user } = useSelector(state => state.user);

    const navigate = useNavigate();

    const studentMenu = useMemo(() => [
        {
            link: "/dashboard",
            icon: <RxDashboard />,
            text: "Dashboard"
        },
        {
            link: "/student/profile",
            icon: <AiOutlineUser />,
            text: "My Profile"
        },
        {
            link: "/student/enrolled-courses",
            icon: <SlGraduation />,
            text: "Enrolled Courses"
        },
        {
            link: "/student/quiz-attempts",
            icon: <AiOutlineBuild />,
            text: "Quiz Attempts"
        },
        {
            link: "/student/assignments",
            icon: <MdOutlineAssignment />,
            text: "Assignments"
        },
        {
            link: "/student/calendar",
            icon: <HiOutlineCalendar />,
            text: "Calendar"
        },
        {
            link: "/settings",
            icon: <BsGear />,
            text: "Settings"
        },
    ], [])

    const teacherMenu = useMemo(() => [
        {
            link: "/teacher/course",
            icon: <IoRocketOutline />,
            text: "My Courses"
        },
        {
            link: "/teacher/profile",
            icon: <AiOutlineUser />,
            text: "My Profile"
        },
        {
            link: "/teacher/events",
            icon: <BsCalendar4Event />,
            text: "Events"
        },
        {
            link: "/teacher/quiz",
            icon: <MdOutlineQuiz />,
            text: "Quizes"
        },
        {
            link: "/teacher/announcement",
            icon: <TfiAnnouncement />,
            text: "Announcements"
        },
        {
            link: "/teacher/assignment",
            icon: <MdOutlineAssignmentTurnedIn />,
            text: "Assignments"
        },
        {
            link: "/teacher/withdrawls",
            icon: <TfiWallet />,
            text: "Withdrawls"
        },
        {
            link: "/teacher/analytics",
            icon: <IoAnalytics />,
            text: "Analytics"
        },
        {
            link: "/settings",
            icon: <BsGear />,
            text: "Settings"
        },
    ], [])

    return (
        <div className="TeacherBaseMain">
            <Navbar showSideMenu={showMenu ? false : true} />
            <div className='teacherBaseBody'>
                <div className='MaxAreaContainer sidebarAndNavGrid' style={style}>
                    <div className={`showSidebar ${show_sidebar ? "active" : "deactive"} hideScrollbar`}>

                        {user.role === "student" && studentMenu.map((sm, idx) => {
                            return (
                                <Link to={sm.link} key={idx} className={`sidebarItemLink ${path === sm.link ? "active" : ""}`}>
                                    {sm.icon}
                                    <span>{sm.text}</span>
                                </Link>
                            )
                        })}
                        {user.role === "teacher" && teacherMenu.map((sm, idx) => {
                            return (
                                <Link to={sm.link} key={idx} className={`sidebarItemLink ${path === sm.link ? "active" : ""}`}>
                                    {sm.icon}
                                    <span>{sm.text}</span>
                                </Link>
                            )
                        })}




                        <div className='sidebarItemLink' onClick={() => {
                            dispatch(UserLogOut())
                            navigate("/login")
                        }}>
                            <AiOutlineLogout />
                            <span>Logout</span>
                        </div>
                    </div>
                    <div className='teacherSidebarBody hideScrollbar'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherSidebar