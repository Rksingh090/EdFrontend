import React, { useEffect, useState } from 'react'
import "./course.css";
import AdminBase from '../../adminBase/AdminBase';
import Breadcrumb from '../../../utils/Breadcrumb';
import Pagination from '../../../utils/Pagination';


import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseByPage } from '../../reducers/AdminReducer';
import { BsCheck2 } from 'react-icons/bs';
import { RxCopy } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Course = () => {
    const dispatch = useDispatch()
    const { course: { pageNo, perPage, pagination, totalCourses } } = useSelector(state => state.admin);

    const [viewMode, setViewMode] = useState("table");


    useEffect(() => {
        dispatch(getCourseByPage({ pageNo, perPage }))
    }, [dispatch, perPage, pageNo])


    const goNext = () => {
        if (pageNo < pagination[pagination.length - 1]) {
            dispatch({ type: "admin/setCoursePage", payload: pageNo + 1 })
        }
    }

    const goPrev = () => {
        if (pageNo > 1) {
            dispatch({ type: "admin/setCoursePage", payload: pageNo - 1 })
        }
    }



    return (
        <AdminBase>
            <div className='adminCoupons'>
                <div className="headingBar">
                    <h2 className='PageHeading'>Courses</h2>
                    <Breadcrumb breadcrumbData={[
                        {
                            link: "/admin/course",
                            text: "Course"
                        }
                    ]} />
                </div>

                <div className='displayDataView'>
                    <button className={`${viewMode === "table" ? "active" : ""}`} onClick={() => setViewMode("table")}>List View</button>
                    <button className={`${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>Grid View</button>
                </div>
                {viewMode === "table" ?
                    (
                        <CourseTableView />
                    )
                    : (
                        <CourseGridView />
                    )
                }

                <Pagination
                    perPage={perPage}
                    pageNo={pageNo}
                    pagination={pagination}
                    totalPages={totalCourses}
                    onPageChange={(page) => dispatch({ type: "admin/setCoursePage", payload: page })}
                    goNext={goNext}
                    goPrev={goPrev}
                    options={{
                        whiteBG: true
                    }}
                />

            </div>
        </AdminBase>
    )
}

const CourseGridView = () => {

    const { course: { courses } } = useSelector(state => state.admin);

    return (
        <div className="mainCourseGrid">
            <div className='courseGridView'>
                {
                    courses &&
                    courses.length > 0 &&
                    courses.map((courseItem) => {
                        return (
                            <div className='courseCard' key={courseItem?._id}>
                                <div className='cardThumbnail'>
                                    <img src={courseItem?.thumbnail || "https://www.einfosoft.com/templates/admin/smart/source/assets/img/course/course1.jpg"} alt={courseItem?.title} />
                                </div>
                                <div className='spaceBtwn'>
                                    <div className='cardBody'>
                                        <h2 className='headingText'> {courseItem?.title}</h2>
                                        <div className='subheadingSBtwn'>
                                            <p className='subheadingText1'> {new Date(courseItem?.createdAt).toLocaleDateString()}</p>
                                            <p className='subheadingText2'>
                                                <BiRupee />
                                                <span>{Number(courseItem?.course_price) === 0 ? "Free" : courseItem?.course_price}</span>
                                            </p>
                                        </div>
                                        <div className='additionalData'>
                                            <p className='normalText'>Duration: {courseItem?.setting?.expiration || 6} Months</p>
                                            <p className='normalText'>Teacher: {courseItem?.created_by?.first_name} {courseItem?.created_by?.last_name}</p>
                                        </div>
                                        <p className='footerText'>Students: {courseItem?.totalStudents}</p>
                                    </div>
                                    <div>
                                        <button className='footerBtn'>Read More</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

const CourseTableView = () => {
    const dispatch = useDispatch();

    const { course: { courses, perPage, pageNo } } = useSelector(state => state.admin);

    const [currentCopyId, setCurrentCopyId] = useState("")

    const copyID = (teacherId) => {
        navigator.clipboard.writeText(teacherId)
        setCurrentCopyId(teacherId)
        setTimeout(() => {
            setCurrentCopyId("")
        }, 1000)
    }


    return (
        <div className='tableContainer'>
            <div className='tableHeading'>
                <h2 className='heading'>All Courses</h2>
            </div>
            <div className='couponCreateDiv'>
                <button>
                    <span>Add New</span>
                    <AiOutlinePlus color='white' size={18} />
                </button>
            </div>
            <div className='tableSearchDiv'>
                <div className='perEntrySelect'>
                    <span>Show</span>
                    <select value={perPage} onChange={(e) => dispatch({ type: "admin/setCoursePerPage", payload: e.target.value })}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span>Entries</span>
                </div>
                <div className='tableSearchContainer'>
                    <p>Search: </p>
                    <input type="text" className='inputBG' placeholder='Search Course...' />
                </div>
            </div>
            <div className="couponTable">
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Sub Cat.</th>
                            <th>Teacher</th>
                            <th>Created On</th>
                            <th>Duration</th>
                            <th>Student</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses &&
                            courses.length > 0 &&
                            courses.map((courseItem, idx) => {
                                let courseStatusClass = "";
                                let courseStatus = "";
                                switch (courseItem?.status) {
                                    case "publish":
                                        courseStatusClass = "success";
                                        courseStatus = "active"
                                        break;
                                    case "draft":
                                        courseStatusClass = "pending";
                                        courseStatus = "draft"
                                        break;
                                    default:
                                        courseStatusClass = "pending";
                                        courseStatus = "draft"
                                        break;
                                }
                                return (
                                    <tr className='singleRow' key={courseItem?._id}>
                                        <td>{(Number(perPage) * Number(pageNo - 1)) + idx + 1}</td>
                                        <td>
                                            <Link className='text-[var(--main)]' to={`/admin/course/about/${courseItem?._id}`} >
                                                {courseItem?.title}
                                            </Link>
                                        </td>
                                        <td>{courseItem?.sub_category?.name || "-"}</td>
                                        <td>{courseItem?.created_by?.first_name} {courseItem?.created_by?.last_name}</td>
                                        <td>{new Date(courseItem?.createdAt).toLocaleDateString()}</td>
                                        <td>{courseItem?.setting?.expiration} Month</td>
                                        <td>{courseItem?.totalStudents}</td>
                                        <td className={`tableBadge ${courseStatusClass}`}><p>{courseStatus}</p></td>
                                        <td className='tableActionBtns'>
                                            <Link to={`/admin/course/edit/${courseItem?._id}`} title='Edit Course' className='edit'><MdModeEdit size={18} /></Link>
                                            <div title='Delete Course' className='delete'><AiOutlineDelete size={17} /></div>
                                            <div title='Copy Course ID' className='view' onClick={() => copyID(courseItem?._id)} >
                                                {
                                                    currentCopyId === courseItem?._id ?
                                                        (
                                                            <BsCheck2 size={20} />
                                                        ) :
                                                        (
                                                            <RxCopy size={20} />
                                                        )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default Course