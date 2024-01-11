import React, { useEffect, useState } from 'react'
import "../styles/teacher_course.css";

import TeacherSidebar from '../../components/base/TeacherSidebar'

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStudentCourses } from '../../reducers/CourseReducer';

import { toDateString } from '../../functions/dateformate';

const EnrolledCourses = () => {

    const [openTab, setOpenTab] = useState("active");
    const dispatch = useDispatch()

    const { student: { courses, pending_courses, completed_courses } } = useSelector(state => state.course)

    const [showCourses, setShowCourses] = useState([]);

    useEffect(() => {
        dispatch(getStudentCourses())
    }, [dispatch])

    useEffect(() => {
        if (openTab === "enrolled") {
            setShowCourses(courses)
        } else if (openTab === "active") {
            setShowCourses(pending_courses)
        } else if (openTab === "completed") {
            setShowCourses(completed_courses)
        }
    }, [openTab, courses, pending_courses, completed_courses])

    return (
        <TeacherSidebar>
            <div className='enrolledCoursePage'>
                <div className='tabMenu whiteBG roundSM withShadow'>
                    <p className={`${openTab === "active" && "active"}`} onClick={() => setOpenTab("active")}>
                        Active Courses ({pending_courses?.filter(course => course.course !== null)?.length || 0})
                    </p>
                    <p className={`${openTab === "enrolled" && "active"}`} onClick={() => setOpenTab("enrolled")}>
                        Enrolled Courses ({courses?.filter(course => course.course !== null)?.length || 0})
                    </p>
                    <p className={`${openTab === "completed" && "active"}`} onClick={() => setOpenTab("completed")}>
                        Completed Courses ({completed_courses?.filter(course => course.course !== null)?.length || 0})
                    </p>
                </div>
                <div className='studentCourseSection'>
                    {showCourses.length > 0 &&
                        showCourses
                            .filter((courseWID) => courseWID?.course !== null)
                            .map((courseData) => {
                                let course = courseData.course;
                                return (
                                    <Link to={`/course/${course?._id}/${course?.slug}`} key={course?._id} className='StudentCourseItem' >
                                        <div className='enrollCourseThumb'>
                                            <img src={course?.thumbnail || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/courseCover.webp"} alt="" />
                                        </div>
                                        <div className='EnrollCourseBody'>
                                            <div>
                                                <p className='EC_date'>{toDateString(course?.createdAt)}</p>
                                                <h2 title={course?.title} className='EnrollCourseTitle'>{course?.title}</h2>
                                            </div>


                                            <div className='flex flex-col items-start gap-2'>
                                                <p className='EC_sub_cat'>
                                                    {course?.sub_category?.name}
                                                </p>
                                                <p className='EC_cat'>
                                                    <span>By: </span>
                                                    {course?.created_by?.first_name} {course.created_by?.last_name}
                                                </p>
                                            </div>

                                        </div>
                                    </Link>
                                )
                            })}
                </div>
            </div>
        </TeacherSidebar>
    )
}

export default EnrolledCourses