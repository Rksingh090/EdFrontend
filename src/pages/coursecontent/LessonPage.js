import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { API } from '../../constant'
import { useParams } from 'react-router-dom';

import ReactQuill from "react-quill";
import { throttle } from 'lodash';

import 'vidstack/styles/defaults.css';

import ReactPlayer from 'react-player'

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GrAttachment } from 'react-icons/gr';


import { Document, Page, pdfjs } from 'react-pdf';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import ItemViewWrapper from './ItemViewWrapper';
import MyReactPlayer from '../../utils/MyReactPlayer';
import { useSelector } from 'react-redux';


const LessonPage = () => {

    const { lesson_id } = useParams();
    const { showCourseContentSidebar } = useSelector(state => state.appsetting)


    // pdf  ref, initialWidth 
    const pdfWrapper = useRef(null);
    const [initialWidth, setInitialWidth] = useState(400);

    // loading state 
    const [isLoading, setIsLoading] = useState(false)

    const [lessonData, setLessonData] = useState({});

    // current tab view 
    const [currentTab, setCurrentTab] = useState("about")

    const [currentPdfPage, setCurrentPdfPage] = useState(1)
    const [totalPdfPage, setTotalPdfPage] = useState(1);

    const [enrollmentData, setEnrollmentData] = useState({
        enrollment: false,
        preview_available: true
    })


    // get lesson data by id 
    useEffect(() => {
        const getLessonData = (lessonId) => {
            try {
                setIsLoading(true)
                axios.get(`${API}/lesson/id/${lessonId}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                    .then(res => {
                        const { status, enrollment, preview_available } = res.data;
                        setEnrollmentData({
                            enrollment,
                            preview_available
                        })
                        if (status === "success") {
                            setLessonData(res.data?.lesson)
                        }
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            } catch (error) {
                console.log(error);
            }
        }
        if (!lesson_id || lesson_id === null || lesson_id === undefined || lesson_id === "") return;
        getLessonData(lesson_id);
    }, [lesson_id])

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
    }, []);

    useEffect(() => {
        const setPdfSize = () => {
            if (pdfWrapper && pdfWrapper?.current) {
                throttle(() => {
                    setInitialWidth(pdfWrapper?.current?.getBoundingClientRect()?.width);
                }, 1000)
            }
        };
        setPdfSize();
        window.addEventListener('resize', setPdfSize);
        return () => {
            window.removeEventListener('resize', setPdfSize);
        };
    }, [showCourseContentSidebar]);

    useEffect(() => {
        setCurrentTab("about")
    }, [])

    return (
        <ItemViewWrapper
            loading={isLoading}
            validAccess={enrollmentData.enrollment && enrollmentData.preview_available}
        >
            <div className='lessonPage'>

                <VideoPlayer videoType={lessonData?.video_source_type} url={lessonData?.video_source} />
                <div className='lessonAboutAttachment'>
                    <div className={`oneTab ${currentTab === "about" ? "active" : ""}`} onClick={() => setCurrentTab("about")}>
                        <AiOutlineInfoCircle size={20} />
                        <p>Lesson Notes</p>
                    </div>
                    {
                        (lessonData.pdf_attachment && lessonData.pdf_attachment !== "" && lessonData.pdf_attachment?.length > 0) && (
                            <div className={`oneTab ${currentTab === "attachment" ? "active" : ""}`} onClick={() => setCurrentTab("attachment")}>
                                <GrAttachment size={20} />
                                <p>PDF Attachment</p>
                            </div>
                        )
                    }
                </div>
                <div className={`tabData lessonAboutSection ${currentTab === "about" ? "active" : ""}`}>
                    <div className='lessonAboutContainer'>
                        <ReactQuill theme={"bubble"} value={lessonData?.lesson_content} readOnly={true} />
                    </div>
                </div>
                <div className={`tabData lessonAboutSection ${currentTab === "attachment" ? "active" : ""}`}>
                    <div className='lessonAboutContainer pdfWrapper' ref={pdfWrapper}>
                        <Document
                            file={lessonData?.pdf_attachment}
                            onLoadSuccess={(data) => setTotalPdfPage(data.numPages)}
                            className={"pdfViewPage"}
                        >
                            <Page
                                width={initialWidth}
                                pageNumber={currentPdfPage}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                canvasBackground='#FFFFFF'
                                className='pdfPageCanvasContainer'
                            />
                        </Document>
                        {currentPdfPage > 1 && (
                            <div className='goPrevPdfBTN' onClick={() => setCurrentPdfPage(prev => prev === 1 ? prev : prev - 1)}>
                                <IoArrowBack size={20} />
                            </div>
                        )}
                        {totalPdfPage > 1 && (
                            <div className='pdfPageActions'>
                                <p>Page {currentPdfPage} of {totalPdfPage} Pages</p>
                            </div>
                        )}
                        {currentPdfPage < totalPdfPage && (
                            <div className='goNextPdfBTN' onClick={() => setCurrentPdfPage(prev => prev >= totalPdfPage ? prev : prev + 1)}>
                                <IoArrowForward size={20} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ItemViewWrapper>
    )
}


export const VideoPlayer = ({ url, videoType }) => {
    return (
        <div className='mainVideoPlayerContainer'>
            {
                videoType === "youtube" && (
                    <div className='youtubeCustomStyle'>
                        <ReactPlayer
                            url={url}
                            controls
                            width={"100%"}
                            height={"100%"}
                            playsinline
                        />
                    </div>
                )
            }
            {
                videoType === "html5" && (
                    <div className='youtubeCustomStyle'>
                        <MyReactPlayer url={url} />
                    </div>
                )
            }

            {
                videoType === "external-url" && (
                    <div className='youtubeCustomStyle'>
                        <MyReactPlayer url={url} />
                        {/* <MediaPlayer
                            title="External Video"
                            src={url}
                            controls
                            playsinline
                        >
                            <MediaOutlet />
                        </MediaPlayer> */}
                    </div>
                )
            }

            {
                videoType === "embeded" && (
                    <div className='youtubeCustomStyle' dangerouslySetInnerHTML={{ "__html": url }} >

                    </div>
                )
            }

        </div>
    )
}


export default LessonPage