import React, { useEffect, useState } from 'react';

import TeacherSidebar from '../../components/base/TeacherSidebar';

import { AiFillStar } from 'react-icons/ai'
import { AiTwotoneAccountBook } from 'react-icons/ai'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/student.css';


const Dashboard = () => {

    const { student: { pending_courses } } = useSelector(state => state.course)
    const { user } = useSelector(state => state.user)

    const [profileCompletionCount, setProfileCompletionCount] = useState(0);

    useEffect(() => {
        let count = 0;
        if (user.bio && user.bio !== "" && user.bio.length > 0) {
            count++;
        }
        if (user.dp && user.dp !== "" && user.dp.length > 0) {
            count++;
        }
        setProfileCompletionCount(count);
    }, [user])

    return (
        <TeacherSidebar>
            <div className='StudentDashboardPage'>

                {profileCompletionCount < 3 && (

                    <div className='profileCompletion'>
                        <div className='w-full'>
                            <h3 className='completeProfileHeading'>Complete Your Profile</h3>
                            <div className='profileProgressBars'>
                                <div className={`profileProgress ${profileCompletionCount >= 1 ? "filled" : ""}`}>

                                </div>
                                <div className={`profileProgress ${profileCompletionCount >= 2 ? "filled" : ""}`}>

                                </div>
                                <div className={`profileProgress ${profileCompletionCount >= 3 ? "filled" : ""}`}>

                                </div>
                            </div>
                            <div>
                                <p>Please Complete Profile: {profileCompletionCount}/3</p>
                            </div>
                        </div>
                        <div className='profileCompletionAction'>

                            {!user.dp || user.dp === "" ?
                                <Link to="/settings">Set Your Profile Photo</Link> : <></>
                            }
                            {!user.bio || user.bio === "" ?
                                <Link to="/settings">Set Your Bio</Link> : <></>
                            }
                            <Link to={"#"}>Set your Method</Link>

                        </div>
                    </div>
                )}

                <h2 className='dashboardPageHeading'>Dashboard</h2>

                <div className='dashboardStatusBoxes'>

                    <div className='dashboardStatusBox'>
                        <p className='count'>28</p>
                        <p className='title'>Enrolled Courses</p>
                    </div>

                    <div className='dashboardStatusBox'>
                        <p className='count'>10</p>
                        <p className='title'>Active Courses</p>
                    </div>

                    <div className='dashboardStatusBox'>
                        <p className='count'>10</p>
                        <p className='title'>Complete Courses</p>
                    </div>

                    <div className='dashboardStatusBox'>
                        <p className='count'>10</p>
                        <p className='title'>Total Courses</p>
                    </div>

                </div>
            </div>

        </TeacherSidebar>
    )
}

export default Dashboard