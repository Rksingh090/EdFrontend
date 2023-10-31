import React, { useEffect, useState } from 'react'
import { MdSlowMotionVideo } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { toDateString } from '../../functions/dateformate'
import { API } from '../../constant'
import axios from 'axios'
import { VideoPlayer } from './LessonPage'

const AllRecordings = () => {
    const { course_id, course_slug } = useParams();

    const [allRecordings, setAllRecordings] = useState([])

    const [videoOpened, setVideoOpened] = useState({
        open: false,
        hover: false,
        recording: {}
    })

    useEffect(() => {
        if (!course_id || course_id === "" || course_id === undefined) return;
        if (!course_slug || course_slug === "" || course_slug === undefined) return;
        axios.get(`${API}/recording/${course_id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res) => {
            const { status, recordings } = res.data;
            if (status === "success") {
                setAllRecordings(recordings)
            }
        }).catch((e) => {
            const { message, role, isEnrolled } = e.response.data;
            if (role === "student" && !isEnrolled) {
                alert("You are not enrolled")
            } else if (role === "teacher") {
                alert("Not authorised")
            } else {
                alert(message)
            }
            window.location.href = `/course/${course_id}/${course_slug}/content`
        })
    }, [course_id, course_slug])

    return (
        <div className={`CCAllRecordingPage ${videoOpened.open ? "opened" : ""} ${videoOpened.hover ? "hovered" : ""}`}>
            <div className='OneRecordingPage'>
                {
                    videoOpened.open && (
                        <VideoPlayer
                            url={videoOpened?.recording?.video_source}
                            videoType={videoOpened?.recording?.video_source_type}
                        />
                    )
                }
            </div>
            <div className={`CCRecordingContainer ${videoOpened.hover ? "hovered" : ""} ${videoOpened.open ? "opened" : ""}`}
                onMouseEnter={() => setVideoOpened(prev => ({ ...prev, hover: true }))}
                onMouseLeave={() => setVideoOpened(prev => ({ ...prev, hover: false }))}
            >
                {
                    allRecordings &&
                    allRecordings.length > 0 &&
                    allRecordings.map((recordingItem) => (
                        <button title={recordingItem?.title} onClick={() => setVideoOpened(prev => ({ ...prev, recording: recordingItem, open: true }))} key={recordingItem?._id} className="CBOneRecording">
                            <div className='RecordingFileIcon'>
                                <MdSlowMotionVideo />
                            </div>
                            <div className='OneRecordingMeta'>
                                <h2 >{recordingItem?.title}</h2>
                                <p>Class Date: {toDateString(recordingItem?.class_date)}</p>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default AllRecordings