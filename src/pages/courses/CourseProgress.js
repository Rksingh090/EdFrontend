import React, { useEffect, useMemo, useState } from 'react'

import Base from '../../components/base/Base';
import IconByItemType from '../../components/utils/IconByItemType';

import { API } from '../../constant';
import '../styles/courseprogress.css';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';

import { VscDebugRestart } from 'react-icons/vsc'
import { FaCaretDown } from 'react-icons/fa'
import { TbCertificate } from 'react-icons/tb';
import {
    AiOutlineSchedule, AiOutlineQuestionCircle, AiOutlineExclamationCircle,
    AiOutlineShoppingCart, AiOutlineCalendar
} from 'react-icons/ai';
import { FiBarChart } from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi'

import { addIntoPendinCourse } from '../../reducers/CourseReducer';
import { getQAttemptsByCourse } from '../../reducers/QuizAttemptReducer';
import { getCourseAnnouncement } from '../../reducers/AnnouncementReducer';
import { toDateString } from '../../functions/dateformate';
import { BsFillPlayFill } from 'react-icons/bs';
import CustomRangeInput from '../../components/utils/CustomRangeInput';


const CourseProgress = () => {
    const dispatch = useDispatch();
    const { course_slug, course_id } = useParams();

    const currUrl = useMemo(() => window.location.pathname, []);

    const { loggedIn } = useSelector(state => state.user);
    const { student: { course_qattempts } } = useSelector((state) => state.quizattempts);
    const { course_announcement } = useSelector((state) => state.announcement);

    const [progressValue, setProgressValue] = useState(.4);

    // tab index 
    const [tabIndex, setTabIndex] = useState("description");
    const [enrollData, setEnrollData] = useState({
        isStudent: false,
        isEnrolled: false
    });

    const [courseContent, setCourseContent] = useState({});

    // get course data 
    useEffect(() => {
        if (!course_id || course_id === "" || course_id === undefined) return;
        const getCourseBySlug = () => {
            try {
                axios.get(`${API}/course/id/${course_id}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        if (res.data.status === "success") {
                            const { course, isEnrolled, isStudent, enrollment } = res.data;
                            setEnrollData({
                                isEnrolled,
                                isStudent,
                                enrollment
                            })
                            setCourseContent(course);
                        }
                    })
            } catch (error) {
                console.warn(error);
            }
        }
        getCourseBySlug();
    }, [course_id])

    // hide show topic content 
    const handleToggleTopics = (topicId) => {
        const findIdx = courseContent.topics.findIndex((topicWID) => topicWID._id === topicId);
        if (findIdx === -1) return;
        let allTopics = courseContent.topics;
        allTopics[findIdx].showItems = !allTopics[findIdx].showItems;
        setCourseContent(prev => {
            return {
                ...prev,
                topics: allTopics
            }
        })
    }

    // enroll in course
    const handleEnrollNow = async (courseContent) => {

        let expiration = Number(courseContent?.setting?.expiration);
        const expireData = new Date(new Date().setMonth(new Date().getMonth() + expiration));

        let data = {
            course: courseContent._id,
            completion_date: expireData
        }

        // enroll new student in course: free
        const response = await axios.post(`${API}/enrollment`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        });

        const { status, enrollment, course } = response.data;
        if (status === "success") {
            setEnrollData({
                isEnrolled: true,
                isStudent: true,
                enrollment: enrollment
            })
            dispatch(addIntoPendinCourse({ course, enrollment }))
        }
    }


    // get announcement and Quiz attempts by course id 
    useEffect(() => {
        if (!loggedIn || loggedIn === undefined) return;
        if (courseContent?._id === "" || courseContent?._id === null || courseContent?._id === undefined) return;
        if (!enrollData.isEnrolled || !enrollData.isStudent) return;

        dispatch(getQAttemptsByCourse(courseContent?._id))
        dispatch(getCourseAnnouncement(courseContent?._id))
    }, [dispatch, courseContent?._id, loggedIn, enrollData?.isEnrolled, enrollData?.isStudent])



    return (
        <Base>
            <div className='courseProgressMainPage'>
                <div className='MaxAreaContainer courseProgressContainer'>
                    <div className='courseProgressCol1'>
                        <div className='courseThumbnailAndMeta'>
                            <div className='courseTitleAndCat'>
                                <h1 className='CPCourseTitle'>{courseContent?.title}</h1>
                                <h3 className='CPCourseSubTitle'>{courseContent?.category?.name}, {courseContent?.sub_category?.name}</h3>
                            </div>
                            <div className="playIconForVideo">
                                <BsFillPlayFill size={25} />
                            </div>
                            <img src={courseContent?.thumbnail || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/image/front-view-1686118474450.webp"} alt="" className='object-cover' />
                        </div>

                        {/* tabmenu  */}
                        <div className='tabMenu whiteBG withShadow roundSM'>
                            <p className={`flex-fill ${tabIndex === "description" && "active"}`} onClick={() => setTabIndex("description")}>Description</p>
                            <p className={`${tabIndex === 1 && "active"}`} onClick={() => setTabIndex(1)}>{enrollData.isEnrolled ? "Course Content" : "Course Demo"}</p>
                            {
                                enrollData?.isEnrolled && (
                                    <>
                                        <p className={`flex-fill ${tabIndex === 2 && "active"}`} onClick={() => setTabIndex(2)}>Reviews</p>
                                        <p className={`${tabIndex === 3 && "active"}`} onClick={() => setTabIndex(3)}>Announcements</p>
                                    </>
                                )
                            }
                        </div>


                        {/* course content tab  */}
                        {tabIndex === "description" && (
                            <div className='courseDescriptionRQ whiteBGQuillDesc'>
                                <ReactQuill value={courseContent?.description} readOnly={true} theme="bubble" />
                            </div>
                        )}

                        {/* course content tab  */}
                        {tabIndex === 1 &&
                            <div className={`courseContentTab`}>
                                {
                                    courseContent && courseContent.topics &&
                                    courseContent.topics?.length > 0 &&
                                    courseContent.topics
                                        .filter((topicWID) => topicWID.topic !== null)
                                        .map((topicWID) => {

                                            const topic = topicWID.topic;
                                            const totalItem = topicWID.topic?.items.filter((itemWIC) => itemWIC.item !== null).length;

                                            const totalHeight = Number(totalItem) * 50;

                                            return (
                                                <div className={`coursecontentDiv`} key={topic._id}>
                                                    <div className={`courseProTopicItem`} onClick={() => handleToggleTopics(topicWID._id)}>
                                                        <h2>{topic?.title}</h2>
                                                        <p>{totalItem} Items</p>
                                                        <FaCaretDown className={`${!topicWID?.showItems ? "rotateZ180deg" : ""}`} size={20} />
                                                    </div>
                                                    <div
                                                        style={{
                                                            height: topicWID?.showItems ? `${totalHeight}px` : "0px"
                                                        }}
                                                        className={`topicItems `}
                                                    >
                                                        {
                                                            topic &&
                                                            topic?.items &&
                                                            topic.items.length > 0 &&
                                                            topic.items
                                                                .filter((itemWID) => itemWID.item !== null)
                                                                .map((itemWID) => {
                                                                    const item = itemWID.item;
                                                                    const itemType = itemWID.item_type;

                                                                    let title = "";
                                                                    let itemLink = "/course";

                                                                    switch (itemType) {
                                                                        case "Quiz":
                                                                            title = item?.quiz_title;
                                                                            itemLink += `/${courseContent?._id}/${courseContent?.slug}/quiz/result/${item?._id}`
                                                                            break;

                                                                        case "Assignment":
                                                                            itemLink += `/${courseContent?._id}/${courseContent?.slug}/assignment/${item?._id}`
                                                                            title = item?.title;
                                                                            break;
                                                                        case "Lesson":
                                                                            itemLink += `/${courseContent?._id}/${courseContent?.slug}/lesson/${item?._id}`
                                                                            title = item?.title;
                                                                            break;
                                                                        default:
                                                                            title = "No Title"
                                                                            break;
                                                                    }

                                                                    return (
                                                                        <Link to={itemLink} className='courseProItem' key={item?._id}>
                                                                            <div className='flex items-center font-[500] text-[#424242] gap-2'>
                                                                                <IconByItemType type={itemType} video_type={item?.video_source_type || "none"} />
                                                                                <p>{title}</p>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                }

                            </div>
                        }

                        {/* tab 2: rating and review  */}
                        {tabIndex === 2 &&
                            <div className={`reviewsTab`}>
                                <h2>No Review Yet</h2>
                            </div>
                        }

                        {/* announcement's */}
                        {tabIndex === 3 &&
                            <div className={`courseContent `}>
                                <div className='toggletab announcementTabView'>
                                    {
                                        course_announcement &&
                                        course_announcement.length > 0 &&
                                        course_announcement.map((cattempt) => {
                                            return (
                                                <div className='announcementItem' key={cattempt?._id}>
                                                    <div className='announcementMeta'>
                                                        <p className='itemTitle'>{cattempt?.title}</p>
                                                        <p className='itemDate'>{new Date(cattempt?.createdAt).toDateString().replace(" ", ", ")}</p>
                                                    </div>
                                                    {/* passing status: p, f, w  */}
                                                    <div className='gradeStatus'>
                                                        {
                                                            cattempt?.passing_status === "pass" && (
                                                                <p className='pass' title="Pass">P</p>
                                                            )
                                                        }
                                                        {
                                                            cattempt?.passing_status === "fail" && (
                                                                <p className='fail' title="Fail">F</p>
                                                            )
                                                        }
                                                        {
                                                            (cattempt?.passing_status === "pending" || cattempt?.passing_status === "" || cattempt?.passing_status === undefined) && (
                                                                <p className='pending' title="Pending">W</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        course_announcement &&
                                        course_announcement.length === 0 && (

                                            <div className={`reviewsTab`}>
                                                <h2>No Announcement Yet</h2>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        }


                    </div>


                    {/* grid column 2 - course progress or enroll details */}
                    <div className='flex flex-col gap-4'>
                        <div className='CPCourseDataBorder'>
                            {enrollData.isEnrolled ? (
                                <div className='courseEnrolledProgress'>
                                    <div className='CPEFirstContainer'>
                                        <h1 className='CPEHeader'>Course Progress</h1>
                                        <CustomRangeInput
                                            min={0}
                                            max={1}
                                            step={'any'}
                                            value={progressValue}
                                            onChange={(e) => setProgressValue(prev => e.target.value)}
                                        />
                                        {/* <input type="range" value={35} min={1} max={100} className='w-full customRangeInput' /> */}
                                        <Link to={`/course/${courseContent?._id}/${course_slug}/content`} className='CPEnrollBtn'>

                                            Continue Learning
                                        </Link>
                                        <div className='CourseCompleteInfo'>
                                            <AiOutlineExclamationCircle size={25} />
                                            <p>Complete all lessons to mark this course as complete</p>
                                        </div>
                                        <div className='flexRowIconTxt'>
                                            <AiOutlineShoppingCart className='mainColor' size={20} />
                                            <p>
                                                You enrolled in this course on  <span className='mainColor'>{toDateString(enrollData?.enrollment?.start_date)}</span>
                                            </p>
                                        </div>
                                        <div className='flexRowIconTxt'>
                                            <AiOutlineSchedule className='mainColor' size={20} />
                                            <p>Enrolment validity: <span className='mainColor'>{courseContent?.setting?.expiration} Months</span></p>
                                        </div>
                                    </div>
                                    <div className='CPExtraDetailsContainer'>
                                        <p className='CPExtraDetailItem'>
                                            <FiBarChart />
                                            <span>Intermediate</span>
                                        </p>
                                        <p className='CPExtraDetailItem'>
                                            <VscDebugRestart />
                                            <span> {new Date(courseContent?.updatedAt).toDateString().replace(" ", ", ")} Last Updated</span>
                                        </p>
                                        <p className='CPExtraDetailItem'>
                                            <TbCertificate />
                                            <span>Certificate of Completion</span>
                                        </p>
                                    </div>
                                </div>

                            ) : (
                                <div className='courseNotEnrolled'>
                                    <div className='CPCourseEnrollData'>
                                        <h1 className='CPcoursePrice'>
                                            {Number(courseContent?.course_price) === 0
                                                ?
                                                <span>Free</span>
                                                :
                                                <>
                                                    <BiRupee />
                                                    <span>{courseContent?.discount_price}</span>
                                                </>
                                            }
                                        </h1>
                                        {loggedIn ?
                                            Number(courseContent?.course_price) === 0 ?
                                                (
                                                    <button onClick={() => handleEnrollNow(courseContent)} className='CPEnrollBtn'>
                                                        <p>Enroll Now</p>
                                                    </button>
                                                ) : (
                                                    <Link to={`/payment/course/${courseContent?._id}/${courseContent?.title}`} className='CPEnrollBtn'>Enroll Now</Link>
                                                )
                                            : (
                                                <Link to={`/login?next=${currUrl}`} className='CPEnrollBtn'>
                                                    Enroll Now
                                                </Link>
                                            )}
                                        <p className='CPenrollmentProp'>
                                            {/* <AiOutlineCalendar /> */}
                                            <span>Enrollment Validity: {courseContent?.setting?.expiration} Months</span>
                                        </p>
                                        {courseContent?.setting?.start_date && (
                                            <p className='CPenrollmentProp'>
                                                <AiOutlineCalendar />
                                                <span className='capitalize'>Start Date: {toDateString(courseContent?.setting?.start_date)}</span>
                                            </p>

                                        )}
                                        {courseContent?.setting?.end_date && (
                                            <p className='CPenrollmentProp'>
                                                <AiOutlineCalendar />
                                                <span className='capitalize'>End Date: {toDateString(courseContent?.setting?.end_date)}</span>
                                            </p>
                                        )}

                                    </div>

                                    <div className='CPExtraDetailsContainer'>
                                        <p className='CPExtraDetailItem'>
                                            <FiBarChart />
                                            <span>Intermediate</span>
                                        </p>
                                        <p className='CPExtraDetailItem'>
                                            <VscDebugRestart />
                                            <span> {new Date(courseContent?.updatedAt).toDateString().replace(" ", ", ")} Last Updated</span>
                                        </p>
                                        <p className='CPExtraDetailItem'>
                                            <TbCertificate />
                                            <span>Certificate of Completion</span>
                                        </p>
                                    </div>

                                    <div className='CPCourseOfferContainer'>
                                        <h2>Offers Available</h2>
                                        <div className='CPcourseOffer'>
                                            {
                                                courseContent?.offers &&
                                                courseContent.offers.length > 0 &&
                                                courseContent.offers
                                                    .sort((a, b) => a.duration - b.duration)
                                                    .map((offerItem) => {
                                                        return (
                                                            <div key={offerItem?._id} className='CPCourseOfferItem'>
                                                                <p>{offerItem.duration} Month</p>
                                                                <p>{offerItem.price} Rs.</p>
                                                            </div>
                                                        )
                                                    })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='coursebyteacher'>
                            <h1 className='font-[500] text-[#333] text-[16px]'>Course By</h1>
                            <div className='CPCourseCreator pt-3'>
                                <div className='CPCourseDP'>
                                    {courseContent?.created_by?.dp ? (
                                        <img src={courseContent?.created_by?.dp} alt="" />
                                    ) : (
                                        <>
                                            {courseContent?.created_by?.first_name ? String(courseContent?.created_by?.first_name).substring(0, 1) : "L"}
                                            {courseContent?.created_by?.last_name ? String(courseContent?.created_by?.last_name).substring(0, 1) : ""}

                                        </>
                                    )}
                                </div>
                                <p className='font-[500]'>
                                    {courseContent?.created_by?.first_name} {courseContent?.created_by?.last_name}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default CourseProgress