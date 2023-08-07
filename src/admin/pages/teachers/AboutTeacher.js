import React, { useEffect, useState } from 'react'
import AdminBase from '../../adminBase/AdminBase'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API } from '../../../constant'
import Breadcrumb from '../../../utils/Breadcrumb';


import { getDayByNumber, toDateString } from "../../../functions/dateformate"
import Pagination from '../../../utils/Pagination'


const AboutTeacher = () => {

    const { teacherId } = useParams();

    const [teacherData, setTeacherData] = useState({});
    const [courseData, setCourseData] = useState([]);

    const [totalCourseCount, setTotalCourseCount] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [paginationArray, setPaginationArray] = useState([]);


    // get teacher data 
    useEffect(() => {
        if (!teacherId || teacherId === "" || teacherId === null) return;
        axios.get(`${API}/admin/teachers/about/${teacherId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status, teacher } = res.data;
                if (status === "success") {
                    setTeacherData(teacher);
                }
            })
    }, [teacherId])

    // get all courses by teacherId and pageNo 
    useEffect(() => {
        if (!pageNo || pageNo <= 0 || pageNo === null) return;
        if (!teacherId || teacherId === "" || teacherId === null) return;
        axios.get(`${API}/admin/teachers/about/course/${teacherId}?pageNo=${pageNo}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status, courses, pagination, totalCourses } = res.data;
                if (status === "success") {
                    setCourseData(courses);
                    setPaginationArray(pagination);
                    setTotalCourseCount(totalCourses)
                }
            })
    }, [teacherId, pageNo])

    return (
        <AdminBase>
            <div className='aboutTeacherPage'>
                <div className="headingBar">
                    <h2 className='PageHeading'>Teachers</h2>
                    <Breadcrumb breadcrumbData={[
                        {
                            link: "/admin/teachers",
                            text: "Teachers"
                        },
                        {
                            link: `/admin/teacher/about/${teacherId}`,
                            text: teacherData.first_name + " " + teacherData.last_name || "About"
                        }
                    ]} />
                </div>
                <div className='aboutTeacherGridData'>


                    <div className='aboutTeacherGridCol1'>
                        {/* card one  */}
                        <div className="adminCard aboutTeacherMeta">
                            <div className="roundedImgDiv withOutline" style={{ height: "120px" }}>
                                <img src={teacherData.dp ? teacherData.dp : "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/elephant.jpg"} alt="" />
                            </div>
                            <div className='flexCenter pt-1 pb-3'>
                                <h2 className='adminBoldMDHeading'>{teacherData?.name}</h2>
                                <p className="adminSubtitle">Teacher</p>
                            </div>
                            <div className="descLine">
                                <b>Email</b>
                                <a href={`mailto:${teacherData?.email}`} className='descLink'>{teacherData?.email}</a>
                            </div>
                            <div className="descLine lastItem">
                                <b>Phone No.</b>
                                <a href={`tel:${teacherData?.phone}`} className='descLink'>{teacherData?.phone}</a>
                            </div>
                        </div>

                        {/* card one  */}
                        <div className="adminCard">
                            <div className="cardHeading">
                                About Me
                            </div>
                            <div className='teacherAboutMeCard'>
                                <div className='text-[14px]'>
                                    {teacherData?.bio}
                                </div>
                                <div className="descLine mt-4">
                                    <b>Gender</b>
                                    <p>{teacherData?.gender}</p>
                                </div>
                                {
                                    teacherData?.education?.name && (
                                        <div className="descLine">
                                            <b>Degree</b>
                                            <p>{teacherData?.education?.name}</p>
                                        </div>
                                    )
                                }

                                <div className="descLine lastItem">
                                    <b>Courses</b>
                                    <p>{totalCourseCount}</p>
                                </div>

                                <div className='aboutTeacherSkills'>
                                    <p>Skills</p>
                                    <div className='skillItem'>
                                        {
                                            teacherData?.skills &&
                                            teacherData?.skills?.length > 0 &&
                                            teacherData?.skills.map((skillItem, idx) => (
                                                <p key={idx}>{skillItem?.name}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tableContainer dashboard'>
                        <div className="tableHeading">
                            <h2 className="heading">Teacher Courses</h2>
                        </div>
                        <div className="dashTable">
                            <table className="dashboardTable">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Batch Timing</th>
                                        <th>Batch Days</th>
                                        <th>Total Students</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courseData &&
                                        courseData.length > 0 &&
                                        courseData.map((courseItem) => (
                                            <tr key={courseItem._id}>
                                                <td className='teacherCourseSubCat'>
                                                    <span>{courseItem?.title}</span>
                                                    <span className='sub_cat'>{courseItem?.sub_category?.name}</span>
                                                </td>
                                                <td>{courseItem?.setting.start_date ? toDateString(courseItem?.setting.start_date) : "-"}</td>
                                                <td>{courseItem?.setting.end_date ? toDateString(courseItem?.setting.end_date) : "-"}</td>
                                                <td>{courseItem?.batch?.batch_timing?.start} - {courseItem?.batch?.batch_timing?.end}</td>
                                                <td>
                                                    {
                                                        courseItem?.batch?.batch_days &&
                                                        courseItem?.batch?.batch_days.length > 0 &&
                                                        courseItem?.batch?.batch_days?.sort((a, b) => a - b)
                                                            .map((date) => getDayByNumber(date).substring(0, 3))
                                                            .join(", ")
                                                    }
                                                </td>
                                                <td>{courseItem?.totalStudents}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                totalCourseCount > 10 &&
                                <Pagination
                                    perPage={10}
                                    pageNo={pageNo}
                                    pagination={paginationArray}
                                    totalPages={totalCourseCount}
                                    goNext={() => pageNo >= paginationArray.length ? setPageNo(1) : setPageNo(prev => prev + 1)}
                                    goPrev={() => pageNo <= 1 ? null : setPageNo(prev => prev - 1)}
                                    onPageChange={(p) => setPageNo(p)}
                                    options={{
                                        noPad: true
                                    }}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AdminBase>
    )
}

export default AboutTeacher