import React, { useEffect, useState } from 'react';
import '../styles/coursecontent.css';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { VscDeviceCameraVideo, VscLiveShare } from 'react-icons/vsc';
import { AiOutlineClose } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';

import IconByItemType from '../../components/utils/IconByItemType';

import { Link, Outlet, useParams } from 'react-router-dom';

import axios from 'axios';
import { API } from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCourseContentSidebar } from '../../reducers/AppSettingReducer';


const CourseContentBase = () => {

    const dispatch = useDispatch();
    const { course_slug, course_id } = useParams();

    const pathname = window.location.pathname;

    const { showCourseContentSidebar } = useSelector(({ appsetting }) => appsetting)

    const [courseContent, setCourseContent] = useState({});
    const [isEnrolled, setIsEnrolled] = useState(false)

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

    // get course data 
    useEffect(() => {
        if (!course_slug || course_slug === "" || course_slug === undefined) return;
        if (!course_id || course_id === "" || course_id === undefined) return;
        const getCourseBySlug = () => {
            try {
                axios.get(`${API}/course/topics/slug/${course_id}/${course_slug}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        if (res.data.status === "success") {
                            // console.log(res.data);
                            const { course } = res.data;
                            setCourseContent(course);
                        }
                        if (res.data.isEnrolled) {
                            setIsEnrolled(true)
                        }
                    })
            } catch (error) {
                console.warn(error);
            }
        }
        getCourseBySlug();
    }, [course_slug, course_id])

    const closeCourseContentSidebar = () => {
        dispatch(toggleCourseContentSidebar())
    }

    return (
        <div className={`courseContentPage ${showCourseContentSidebar ? "opened" : "collapsed"}`}>


            {/* side bar  */}
            <div className='courseContentSidebar'>
                <div className='courseSidebarHeader'>
                    <h2>&lt;EduTech /&gt;</h2>
                </div>
                <div className='courseTopicsContainer'>

                    {
                        courseContent && courseContent?.topics &&
                        courseContent?.topics.length > 0 &&
                        courseContent?.topics
                            .filter(topicWID => topicWID.topic !== null)
                            .map((topicWID) => {
                                const topic = topicWID?.topic;
                                const items = topic?.items;

                                const totalItems = items?.filter((itemWID) => itemWID.item !== null).length;
                                const totalHeight = Number(totalItems) * 40;

                                return (
                                    <div key={topic?._id} className='singleTopicsAndItems'>
                                        <div
                                            className={`courseTopicItem ${topicWID.showItems ? "active" : ""}`}
                                            onClick={() => handleToggleTopics(topicWID?._id)}
                                        >
                                            <h3 className='title'>{topic?.title}</h3>
                                            <p className='topicMetaContent'>
                                                <span>0/{totalItems || 0}</span>
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                height: topicWID.showItems ? `${totalHeight}px` : '0px'
                                            }}
                                            className={`courseItems`}>
                                            {
                                                items &&
                                                items?.length > 0 &&
                                                items
                                                    .filter((itemWID) => itemWID.item !== null)
                                                    .map((itemWID) => {
                                                        const item = itemWID.item;
                                                        const item_type = itemWID.item_type;
                                                        let title = "";

                                                        let itemLink = `/course/${courseContent?._id}/${courseContent?.slug}`;
                                                        let quizLink = "";
                                                        let quizAttemptDetailsPage = "";

                                                        switch (item_type) {
                                                            case "Quiz":
                                                                title = item?.quiz_title;
                                                                quizLink = itemLink + `/quiz/${item?._id}`
                                                                quizAttemptDetailsPage = itemLink + `/quiz-attempt/${item?._id}`
                                                                itemLink += `/quiz/result/${item?._id}`
                                                                break;
                                                            case "Assignment":
                                                                itemLink += `/assignment/${item?._id}`
                                                                title = item?.title;
                                                                break;
                                                            case "Lesson":
                                                                itemLink += `/lesson/${item?._id}`
                                                                title = item?.title;
                                                                break;
                                                            default:
                                                                break;
                                                        }

                                                        return (
                                                            <Link
                                                                key={item?._id}
                                                                className={`
                                                                courseItemLink 
                                                                ${(
                                                                        pathname === itemLink ||
                                                                        pathname === quizLink ||
                                                                        pathname === quizAttemptDetailsPage
                                                                    ) ? "active" : ""}`}
                                                                title={title}
                                                                to={itemLink}
                                                            >
                                                                <IconByItemType
                                                                    type={item_type}
                                                                    size={16}
                                                                    video_type={item?.video_source_type || "none"}
                                                                />
                                                                <p className='itemLinkTitle'>{title}</p>
                                                                <p className='itemMetaContent'>
                                                                    <span className='capitalize'>
                                                                        {item?.time_limit?.limit}
                                                                        {String(item?.time_limit?.limit_type).substring(0, 1)}
                                                                    </span>
                                                                    <BsFillCheckCircleFill className='courseicons' />
                                                                </p>
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
            </div>

            {/* main content area  */}
            <div>
                <div className='mainContentArea'>
                    <div className='contentHeaderBackBTN' onClick={closeCourseContentSidebar}>
                        <FiArrowRight size={20} />
                    </div>
                    <div className='contentAreaCourseProgress'>
                        {
                            isEnrolled && (
                                <Link to={`/course/${course_id}/${course_slug}/recordings`} className='liveLogin recording'>
                                    <VscDeviceCameraVideo size={20} />
                                    <span>Recording</span>
                                </Link>
                            )
                        }

                        {
                            isEnrolled && courseContent?.ms_team_link && (
                                <Link to={courseContent?.ms_team_link} target='_blank' className='liveLogin joinClass'>
                                    <VscLiveShare size={20} />
                                    <span>Join Live Class</span>
                                </Link>
                            )
                        }
                        <Link className='courseCloseBtn' to={"/student/enrolled-courses"}>
                            <AiOutlineClose />
                        </Link>

                    </div>
                </div>
                <div className='mainCourseContentArea'>
                    <Outlet context={courseContent} />
                </div>
            </div>
        </div>
    )
}

export default CourseContentBase