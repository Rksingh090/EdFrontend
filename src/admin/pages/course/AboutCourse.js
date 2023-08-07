import React, { useEffect, useState } from 'react'
import AdminBase from '../../adminBase/AdminBase'
import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '../../../utils/Breadcrumb'
import { getDayByNumber, toDateString } from '../../../functions/dateformate'
import axios from 'axios'
import { API } from '../../../constant'
import { BsCurrencyRupee } from 'react-icons/bs';
import Pagination from '../../../utils/Pagination'
import { MdModeEdit } from 'react-icons/md'




const AboutCourse = () => {

    const { courseId } = useParams()

    const [totalStudents, setTotalStudents] = useState(0)
    const [courseData, setCourseData] = useState({})

    const [pageNo, setPageNo] = useState(1)
    const [paginationArray, setPaginationArray] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState([]);


    useEffect(() => {
        if (!courseId || courseId === "" || courseId === null) return;
        axios.get(`${API}/admin/course/id/${courseId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    setCourseData(res.data?.course);
                    setTotalStudents(res.data?.totalStudents)
                }
            })
    }, [courseId])

    useEffect(() => {
        if (!courseId || courseId === "" || courseId === null) return;
        axios.get(`${API}/admin/course/student/${courseId}/${pageNo}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    setEnrolledStudents(res.data?.enrollments)
                    setPaginationArray(res.data?.pagination)
                }
            })
    }, [courseId, pageNo])
    return (
        <AdminBase>
            <div className='aboutCoursePage'>
                <div className="headingBar">
                    <h2 className='PageHeading'>About Course</h2>
                    <Breadcrumb breadcrumbData={[
                        {
                            link: "/admin/course",
                            text: "Course"
                        },
                        {
                            link: `/admin/course/about/${courseId}`,
                            text: courseData.title || "About Course",
                            noclick: true
                        }
                    ]}
                    />
                </div>

                <div className='aboutCourseTableFlex'>
                    <div className='aboutCourseGridData'>
                        <div className='aboutTeacherGridCol1'>
                            {/* card one  */}
                            <div className="adminCard aboutTeacherMeta">
                                <div className="rectImgDiv withOutline courseImgDiv">
                                    <img src={courseData.thumbnail ? courseData?.thumbnail : "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/elephant.jpg"} alt="" />
                                </div>
                                <div className="descLine noBorder">
                                    <b>Course Name</b>
                                    <p className='descLink capitalize'>{courseData?.title}</p>
                                </div>
                                <div className="descLine">
                                    <b>Course Price</b>
                                    <p className='descLink'><BsCurrencyRupee /><span>{courseData?.course_price}</span></p>
                                </div>
                                <div className="descLine">
                                    <b>Discount Price</b>
                                    <p className='descLink'><BsCurrencyRupee /><span>{courseData?.discount_price}</span></p>
                                </div>
                                <div className="descLine">
                                    <b>Total Students</b>
                                    <p className='descLink'>{totalStudents}</p>
                                </div>

                            </div>
                        </div>

                        <div className='aboutCourseGridCol2'>
                            <div className='CourseCol2Sec1'>

                                {/* card one  */}
                                <div className="adminCard">
                                    <div className="cardHeading">
                                        Teacher
                                    </div>
                                    <div className='teacherAboutMeCard'>
                                        <div className="descLine noBorder">
                                            <b>Name</b>
                                            <p className='descLink capitalize'>{courseData?.created_by?.first_name} {courseData?.created_by?.last_name}</p>
                                        </div>
                                        <div className="descLine">
                                            <b>Email</b>
                                            <p className='descLink'>{courseData?.created_by?.email}</p>
                                        </div>
                                        <div className="descLine">
                                            <b>Phone</b>
                                            <p className='descLink'>{courseData?.created_by?.phone || "-"}</p>
                                        </div>
                                        <div className="descLine">
                                            <b>Gender</b>
                                            <p className='descLink'>{courseData?.created_by?.gender}</p>
                                        </div>

                                    </div>
                                </div>


                                {/* card one  */}
                                <div className="adminCard">
                                    <div className="cardHeading">
                                        Additional
                                    </div>
                                    <div className='teacherAboutMeCard'>
                                        <div className="descLine noBorder">
                                            <b>Category</b>
                                            <p className='descLink capitalize'>{courseData?.category?.name}</p>
                                        </div>
                                        <div className="descLine">
                                            <b>Sub Category</b>
                                            <p className='descLink capitalize'>{courseData?.sub_category?.name}</p>
                                        </div>
                                        <div className="descLine">
                                            <b>Language</b>
                                            <p className='descLink capitalize'>{courseData?.course_language}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* card one  */}
                                <div className="adminCard">
                                    <div className="cardHeading">
                                        Bactch Details
                                    </div>
                                    <div className='teacherAboutMeCard'>
                                        <div className="descLine noBorder">
                                            <b>Batch Timing</b>
                                            <p className='descLink capitalize'>{courseData?.batch?.batch_timing?.start} - {courseData?.batch?.batch_timing?.end}</p>
                                        </div>
                                        <div className="descCol">
                                            <b>Batch Days</b>
                                            <div className='CourseBatchDays'>
                                                {
                                                    courseData?.batch?.batch_days
                                                        .sort((a, b) => a - b)
                                                        .map((item, daysIdx) => (
                                                            <p key={daysIdx}>{getDayByNumber(item).substring(0, 3)}</p>
                                                        ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* about card */}
                                <div className="adminCard">
                                    <div className="cardHeading">
                                        Course Duration
                                    </div>
                                    <div className='teacherAboutMeCard'>
                                        <div className="descLine noBorder">
                                            <b>Start Date</b>
                                            <p className='descLink capitalize'>{toDateString(courseData?.setting?.start_date)}</p>
                                        </div>
                                        <div className="descLine">
                                            <b>End Date</b>
                                            <p className='descLink capitalize'>{toDateString(courseData?.setting?.end_date)}</p>
                                        </div>


                                    </div>
                                </div>

                                <div className="adminCard">
                                    <div className="cardHeading">
                                        Course Status & Action
                                    </div>
                                    <div className='teacherAboutMeCard'>
                                        <div className="descLine noBorder">
                                            <b>Course Status</b>
                                            <div className={`descLink tableBadge ${courseData.status === "publish" ? "success" : courseData.status === "draft" ? "pending" : "error"}`}>
                                                <p className='sm'>{courseData?.status}</p>
                                            </div>
                                        </div>
                                        <div className="descLine">
                                            <b>Edit Course</b>
                                            <div className={`tableActionBtns`}>
                                                <Link to={`/admin/course/edit/${courseData?._id}`} title='Edit Course' className='edit'><MdModeEdit size={18} /></Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='tableContainer dashboard'>
                        <div className="tableHeading">
                            <h2 className="heading">Enrolled Students</h2>
                        </div>
                        <div className="dashTable">
                            <table className="dashboardTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Coupon</th>
                                        <th>Paid Amount</th>
                                        <th>Coupon Amount</th>
                                        <th>Joining Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        enrolledStudents &&
                                        enrolledStudents.length > 0 &&
                                        enrolledStudents.map((studentItem) => (
                                            <tr key={studentItem._id}>
                                                <td>{studentItem?.student?.first_name} {studentItem?.student?.last_name}</td>
                                                <td>{studentItem?.student?.email}</td>
                                                <td>{studentItem?.student?.phone}</td>
                                                <td>{studentItem?.coupon?.coupon_code || "-"}</td>
                                                <td>{studentItem?.final_price}</td>
                                                <td>{studentItem?.coupon_price}</td>
                                                <td>{toDateString(studentItem?.updatedAt, true)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            {totalStudents > 10 &&
                                <Pagination
                                    perPage={10}
                                    pageNo={pageNo}
                                    pagination={paginationArray}
                                    totalPages={totalStudents}
                                    goNext={() => pageNo >= paginationArray.length ? setPageNo(1) : setPageNo(prev => prev + 1)}
                                    goPrev={() => pageNo <= 1 ? null : setPageNo(prev => prev - 1)}
                                    onPageChange={(p) => setPageNo(p)}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </AdminBase>
    )
}

export default AboutCourse