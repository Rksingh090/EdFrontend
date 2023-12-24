import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

import TeacherSidebar from '../../components/base/TeacherSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCourse, getTeacherCourses, removeCourseById } from '../../reducers/CourseReducer';

import Pagination from '../../utils/Pagination';
import { createNewCourse } from '../../functions/createNewCourse';
import { toDateString } from '../../functions/dateformate';

const Course = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [previousTab, setPreviousTab] = React.useState("");
    const [openTab, setOpenTab] = React.useState("publish");

    const { teacher: { mycourses, courseCount, pagination }, totalCourses } = useSelector(state => state.course);

    const perPage = useMemo(() => 10, [])
    const [pageNo, setPageNo] = useState(1);

    // get all course created by teacher 
    useEffect(() => {
        if (previousTab === openTab) {
            dispatch(getTeacherCourses({
                pageNo: pageNo,
                perPage: perPage,
                status: openTab
            }))
        } else {
            setPreviousTab(openTab)
            setPageNo(1)
            dispatch(getTeacherCourses({
                pageNo: pageNo,
                perPage: perPage,
                status: openTab
            }))
        }
    }, [dispatch, pageNo, perPage, openTab])


    // delete course by courseId
    const deleteCourse = (courseId) => {
        dispatch(removeCourseById({ courseId }))
    }

    const handleCreateNewCourse = async () => {
        const courseRes = await createNewCourse();
        const { status, course } = courseRes.data;
        if (status === "success") {
            dispatch(addCourse({ course: course }));
            navigate(`/teacher/edit-course/${course._id}`);
        }
    }

    return (
        <TeacherSidebar>
            <div className='teacherCoursesPage'>
                <div className='myCourseHeading'>
                    <h1 className='headingText'>My Courses</h1>
                    <button className='createNewCourseBTN' onClick={handleCreateNewCourse}>Create New Course</button>
                </div>

                <div className='tabMenu'>
                    <p className={`${openTab === "publish" ? "active" : ""}`} onClick={() => setOpenTab("publish")}>Publish ({courseCount?.publish})</p>
                    <p className={`${openTab === "pending" ? "active" : ""}`} onClick={() => setOpenTab("pending")}>Pending ({courseCount?.pending})</p>
                    <p className={`${openTab === "draft" ? "active" : ""}`} onClick={() => setOpenTab("draft")}>Draft ({courseCount?.draft})</p>
                </div>

                <div className="courseSection">
                    {
                        mycourses &&
                        mycourses?.length > 0 &&
                        mycourses?.map((course) => {
                            return (
                                <div key={course._id} className='courseItem'>
                                    <div className='enrollCourseThumb'>
                                        <img src={course?.thumbnail || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/courseCover.webp"} alt="" />
                                    </div>
                                    <div className=' pt-6 leading-6 p-3'>
                                        <p className='text-[#5f5f5f] text-[10px] poppinsFF'>{toDateString(course.createdAt)}</p>
                                        <h3 className='courseTitle'>{course.title}</h3>
                                        <p className='poppinsFF text-[13px]'>Category: {course?.category?.name}</p>
                                        <p className='poppinsFF text-[13px]'>Subcategory: {course?.sub_category?.name}</p>
                                        <div>
                                        </div>
                                        <div className=''>
                                            <div className='flex justify-between pt-8 items-center'>
                                                <div className='courseActions'>
                                                    <div onClick={() => navigate(`/teacher/edit-course/${course._id}`)}><MdOutlineModeEditOutline /></div>
                                                    <div onClick={() => deleteCourse(course?._id)} ><AiOutlineDelete /></div>
                                                    {/* <div><AiOutlineDelete /></div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <Pagination
                    perPage={perPage}
                    pageNo={pageNo}
                    pagination={pagination}
                    onPageChange={page => setPageNo(page)}
                    goPrev={() => setPageNo(prev => prev > 1 ? prev - 1 : prev)}
                    goNext={() => setPageNo(prev => prev < pagination.length ? prev + 1 : prev)}
                    totalPages={totalCourses}
                />

            </div>
        </TeacherSidebar>
    )
}

export default Course