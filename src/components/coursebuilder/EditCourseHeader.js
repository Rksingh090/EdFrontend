import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCourse } from '../../context/CourseBuilderProvider';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useSelector } from 'react-redux';

const EditCourseHeader = () => {

    const navigate = useNavigate();

    const { user } = useSelector(state => state.user)
    const { updateCourseData, courseData } = useCourse()

    return (
        <div className='CourseBuilderHeader'>
            <div className='CBHeaderBarResponsive'>
                {
                    user?.role === "admin" && (
                        <button onClick={() => navigate(-1)} className='CBBackBtn'>
                            <MdOutlineArrowBack size={20} />
                            <span>Back</span>
                        </button>
                    )
                }
                {
                    user?.role === "teacher" && (
                        <Link to={"/teacher/course"} className='CBBackBtn'>
                            <MdOutlineArrowBack size={20} />
                            <span className='text-[18px] font-[500]'>Back</span>
                        </Link>
                    )
                }
                <div className='flex gap-x-4 items-center'>
                    <div className={`CBStatusBtn courseStatus capitalize ${courseData?.status === "publish" ? "success" : courseData?.status === "draft" ? "warning" : "info" }`}>{courseData?.status}</div>
                    <div className='previewCourse'>Preview</div>
                    <button className='submitCourse' onClick={() => updateCourseData()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default EditCourseHeader