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

            {profileCompletionCount < 3 && (

                <div className='border-[1px] w-full profileCompletion'>
                    <div className='w-full'>
                        <div>
                            <p className='font-[600] text-[20px]'>Complete Your Profile</p>
                        </div>
                        <div className='profileProgressBars py-4 w-[70%]'>
                            <div className={`profileProgress ${profileCompletionCount >= 1 && "filled"}`}>

                            </div>
                            <div className={`profileProgress ${profileCompletionCount >= 2 && "filled"}`}>

                            </div>
                            <div className={`profileProgress ${profileCompletionCount >= 3 && "filled"}`}>

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

            <div className='font-[600] text-[20px] mt-8'>Dashboard</div>

            <div className='mt-8 grid grid-cols-5 gap-8 max-xl:grid-cols-3 max-lg:grid-cols-2 max-lg:justify-items-center max-md:hidden'>

                <div className='border-[1px] w-[200px] h-[200px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                    <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                        <AiTwotoneAccountBook className='text-[30px] text-blue-500' />
                    </div>
                    <div>
                        <p className='font-[600] text-[40px]'>28</p>
                    </div>
                    <div>
                        <p>Enrolled Courses</p>
                    </div>
                </div>

                <div className='border-[1px] w-[200px] h-[200px] border-gray-400 flex flex-col justify-center items-center'>
                    <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                        <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                    </div>
                    <div>
                        <p className='font-[600] text-[40px]'>28</p>
                    </div>
                    <div>
                        <p>Active Courses</p>
                    </div>

                </div>
                <div className='border-[1px] w-[200px] h-[200px] border-gray-400 flex flex-col justify-center items-center'>
                    <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                        <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                    </div>
                    <div>
                        <p className='font-[600] text-[40px]'>3</p>
                    </div>
                    <div>
                        <p>Completed Courses</p>
                    </div>

                </div>
                <div className='border-[1px] w-[200px] h-[200px] border-gray-400 flex flex-col justify-center items-center'>
                    <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                        <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                    </div>
                    <div>
                        <p className='font-[600] text-[40px]'>0</p>
                    </div>
                    <div>
                        <p>Total Students</p>
                    </div>

                </div>
                <div className='border-[1px] w-[200px] h-[200px] border-gray-400 flex flex-col justify-center items-center'>
                    <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                        <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                    </div>
                    <div>
                        <p className='font-[600] text-[40px]'>23</p>
                    </div>
                    <div>
                        <p>Total Courses
                        </p>
                    </div>

                </div>
                <div className='border-[1px] w-[200px] h-[200px] border-gray-400 flex flex-col justify-center items-center'>
                    <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                        <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                    </div>
                    <div>
                        <p className='font-[600] text-[40px]'>₹0.00</p>
                    </div>
                    <div>
                        <p>Total Earnings</p>
                    </div>

                </div>
            </div>

            {/* mobile responsive */}
            <div className='py-3'>


                <div className='border-[1px] px-8 py-1 max-md:flex hidden justify-between items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-gray-200 w-[40px] h-[40px] rounded-full text-center flex items-center justify-center'>
                                <AiTwotoneAccountBook className='text-[20px] text-blue-500' />
                            </div>
                            <p>Enrolled Courses</p>

                        </div>
                    </div>
                    <div>
                        <p>28</p>
                    </div>
                </div>
            </div>
            <div className='py-2'>


                <div className='border-[1px] px-8 py-1 max-md:flex hidden justify-between items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-gray-200 w-[40px] h-[40px] rounded-full text-center flex items-center justify-center'>
                                <AiTwotoneAccountBook className='text-[20px] text-blue-500' />
                            </div>
                            <p>Active Courses</p>

                        </div>
                    </div>
                    <div>
                        <p>34</p>
                    </div>
                </div>
            </div>
            <div className='py-2'>


                <div className='border-[1px] px-8 py-1 max-md:flex hidden justify-between items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-gray-200 w-[40px] h-[40px] rounded-full text-center flex items-center justify-center'>
                                <AiTwotoneAccountBook className='text-[20px] text-blue-500' />
                            </div>
                            <p>Completed Courses</p>

                        </div>
                    </div>
                    <div>
                        <p>38</p>
                    </div>
                </div>
            </div>
            <div className='py-2'>


                <div className='border-[1px] px-8 py-1 max-md:flex hidden justify-between items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-gray-200 w-[40px] h-[40px] rounded-full text-center flex items-center justify-center'>
                                <AiTwotoneAccountBook className='text-[20px] text-blue-500' />
                            </div>
                            <p>Total Students</p>

                        </div>
                    </div>
                    <div>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <div className='py-2'>


                <div className='border-[1px] px-8 py-1 max-md:flex hidden justify-between items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-gray-200 w-[40px] h-[40px] rounded-full text-center flex items-center justify-center'>
                                <AiTwotoneAccountBook className='text-[20px] text-blue-500' />
                            </div>
                            <p>Total Courses</p>

                        </div>
                    </div>
                    <div>
                        <p>10</p>
                    </div>
                </div>
            </div>
            <div className='py-2'>


                <div className='border-[1px] px-8 py-1 max-md:flex hidden justify-between items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-gray-200 w-[40px] h-[40px] rounded-full text-center flex items-center justify-center'>
                                <AiTwotoneAccountBook className='text-[20px] text-blue-500' />
                            </div>
                            <p>Total Earnings</p>

                        </div>
                    </div>
                    <div>
                        <p>₹0.00</p>
                    </div>
                </div>
            </div>


            <div className='font-[600] text-[20px] mt-8'>In Progress Courses</div>

            <div className='flex flex-col items-start w-full'>
                {pending_courses.length > 0 && pending_courses.map((course) => {
                    return (
                        <div key={course._id} className='mt-5 flex items-center gap-8 max-xl:flex-col'>
                            <div className='w-[300px]'>
                                <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/studentDashboard.jpg"} alt="" />
                            </div>
                            <div className='w-[400px] leading-9 max-md:300px'>
                                <p className='flex gap-4 items-center text-yellow-600'>
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                </p>
                                <p className='font-[600] text-[20px]'>{course.title}</p>
                                <p> <span className='text-[#808080]'>Completed Lessons:</span> 1 of lesson</p>
                                <div className='flex justify-between'>
                                    <input type="range" name="" id="" className='w-[70%]' />
                                    <p> 33 % Complete</p>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </TeacherSidebar>
    )
}

export default Dashboard