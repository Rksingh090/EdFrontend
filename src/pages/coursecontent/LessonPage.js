import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../constant'
import { useParams } from 'react-router-dom';

import ReactQuill from "react-quill";

import 'vidstack/styles/defaults.css';

import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import ReactPlayer from 'react-player'

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GrAttachment } from 'react-icons/gr';


import { Document, Page, pdfjs } from 'react-pdf';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import ItemViewWrapper from './ItemViewWrapper';
import MyReactPlayer from '../../utils/MyReactPlayer';


const LessonPage = () => {

    const [isLoading, setIsLoading] = useState(false)


    const [lessonData, setLessonData] = useState({});

    const [currentTab, setCurrentTab] = useState("about")

    const [currentPdfPage, setCurrentPdfPage] = useState(1)
    const [totalPdfPage, setTotalPdfPage] = useState(0);

    const [enrollmentData, setEnrollmentData] = useState({
        enrollment: false,
        preview_available: true
    })

    const { lesson_id } = useParams();

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
                    <ReactQuill theme={"bubble"} value={lessonData?.lesson_content} readOnly={true} />
                </div>
                <div className={`tabData lessonAboutSection ${currentTab === "attachment" ? "active" : ""}`}>
                    <div className='flex flex-col gap-2 items-start bg-white'>
                        <Document file={lessonData?.pdf_attachment} onLoadSuccess={(data) => setTotalPdfPage(data.numPages)} className={"pdfViewPage"} >
                            <Page pageNumber={currentPdfPage} renderTextLayer={false} renderAnnotationLayer={false} canvasBackground='#FFFFFF' />
                        </Document>
                        <div className='pdfPageActions w-[595px]'>
                            <div className='goBackPdf' onClick={() => setCurrentPdfPage(prev => prev === 1 ? prev : prev - 1)}>
                                <IoArrowBack size={20} />
                            </div>
                            <p>Page {currentPdfPage} of {totalPdfPage} Pages</p>
                            <div className='goBackPdf' onClick={() => setCurrentPdfPage(prev => prev >= totalPdfPage ? prev : prev + 1)}>
                                <IoArrowForward size={20} />
                            </div>
                        </div>
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
                        {/* <MyReactPlayer url={url} /> */}

                        <MediaPlayer
                            title="External Video"
                            src={url}
                            controls
                            playsinline
                        >
                            <MediaOutlet />
                        </MediaPlayer>
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