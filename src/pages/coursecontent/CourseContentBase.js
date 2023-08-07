import React, { useEffect, useState } from 'react';
import '../styles/coursecontent.css';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { AiOutlineClose, AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineUp } from 'react-icons/ai';
import { IoVideocamOutline } from 'react-icons/io5';

import IconByItemType from '../../components/utils/IconByItemType';

import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { API } from '../../constant';
import { TbLivePhoto } from 'react-icons/tb';


const CourseContentBase = ({ children }) => {

    const navigate = useNavigate();
    const { course_slug, course_id } = useParams();

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

    return (
        <div className='courseContentPage'>


            {/* side bar  */}
            <div className='courseContentSidebar'>
                <div className='courseSidebarHeader'>
                    <h1>Course Content</h1>
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
                                const totalHeight = Number(totalItems) * 50;

                                return (
                                    <div className='flex flex-col' key={topic?._id}>
                                        <div className='courseTopicItem' onClick={() => handleToggleTopics(topicWID?._id)}>
                                            <h3 className='title'>{topic?.title}</h3>
                                            <p className='topicMetaContent'>
                                                <span>0/{totalItems || 0}</span>
                                                <AiOutlineUp />
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                height: !topicWID.showItems ? `${totalHeight}px` : '0px'
                                            }}
                                            className={`courseItems overflow-hidden`}>
                                            {items
                                                &&
                                                items?.length > 0
                                                && items
                                                    .filter((itemWID) => itemWID.item !== null)
                                                    .map((itemWID) => {
                                                        const item = itemWID.item;
                                                        const item_type = itemWID.item_type;
                                                        let title = "";
                                                        let itemLink = "";
                                                        switch (item_type) {
                                                            case "Quiz":
                                                                title = item?.quiz_title;
                                                                itemLink = `/course/${courseContent?._id}/${courseContent?.slug}/quiz/result/${item?._id}`
                                                                break;
                                                            case "Assignment":
                                                                itemLink = `/course/${courseContent?._id}/${courseContent?.slug}/assignment/${item?._id}`
                                                                title = item?.title;
                                                                break;
                                                            case "Lesson":
                                                                itemLink = `/course/${courseContent?._id}/${courseContent?.slug}/lesson/${item?._id}`
                                                                title = item?.title;
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                        return (
                                                            <Link className='courseItemLink' title={title} key={item?._id} to={itemLink}>
                                                                <IconByItemType type={item_type} video_type={item?.video_source_type || "none"} />
                                                                <p className='itemLinkTitle'>{title}</p>
                                                                <p className='itemMetaContent'>
                                                                    <span className='capitalize'>{item?.time_limit?.limit} {String(item?.time_limit?.limit_type).substring(0, 1)}</span>
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
                    <div className='contentAreatHeader'>
                        <div className='contentHeaderBackBTN' onClick={() => navigate(-1)}>
                            <AiOutlineLeft />
                        </div>
                        <p>{courseContent?.title}</p>
                    </div>
                    <div className='contentAreaCourseProgress'>
                        {
                            isEnrolled && (
                                <Link to={`/course/${course_id}/${course_slug}/recordings`} className='goToRecordingsPage'>
                                    <VscDeviceCameraVideo size={25} />
                                    <span>Recording</span>
                                </Link>
                            )
                        }
                        {
                            isEnrolled && !courseContent?.ms_team_link && (
                                <Link to={"https://class.letslearn.live/login"} target='_blank' className='liveLogin'>
                                    <TbLivePhoto size={25} />
                                    <span>Login for Live Class</span>
                                </Link>
                            )
                        }
                        {
                            isEnrolled && courseContent?.ms_team_link && (
                                <Link to={courseContent?.ms_team_link} target='_blank' className='liveLogin'>
                                    <IoVideocamOutline size={25} />
                                    <span>Join Live Class</span>
                                </Link>
                            )
                        }
                        <Link className='contentHeaderBackBTN' to={"/student/enrolled-courses"}>
                            <AiOutlineClose />
                        </Link>

                    </div>
                </div>
                <div className='mainCourseContentArea'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CourseContentBase