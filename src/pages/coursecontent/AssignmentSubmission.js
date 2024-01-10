import React, { useEffect, useRef, useState } from 'react'

import { throttle } from "lodash"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../constant';

import ReactQuill from 'react-quill';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

import { Document, Page, pdfjs } from "react-pdf";
import ItemViewWrapper from './ItemViewWrapper';
import IconByItemType from '../../components/utils/IconByItemType';
import { useSelector } from 'react-redux';

const AssignmentSubmission = () => {
    const { assignment_id } = useParams()
    const { showCourseContentSidebar } = useSelector(state => state.appsetting)

    // loading for assignment data 
    const [isLoading, setIsLoading] = useState(false)

    // for resizing pdf 
    const pdfWrapper = useRef(null);

    // padf page track 
    const [currentPdfPage, setCurrentPdfPage] = useState(1)
    const [totalPdfPage, setTotalPdfPage] = useState(1)
    const [assignmentData, setAssignmentData] = useState();

    const [initialWidth, setInitialWidth] = useState(400);

    const [enrollmentData, setEnrollmentData] = useState({
        enrollment: false,
        preview_available: false
    })

    const [assignmentAnswer, setAssignmentAnswer] = useState({
        course: "",
        assignment_id: "",
        upload_file: "",
        assignment_answer: ""
    });


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


    // get assignment details 
    useEffect(() => {
        const getAssignmentData = (assignmentId) => {
            try {
                setIsLoading(true)
                axios.get(`${API}/assignment/id/${assignmentId}`, {
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
                            setAssignmentData(res.data?.assignment)
                        }
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            } catch (error) {
                console.log(error);
            }
        }
        if (!assignment_id || assignment_id === null || assignment_id === undefined || assignment_id === "") return;
        getAssignmentData(assignment_id);
    }, [assignment_id])

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
    }, []);

    // submit assignment 
    const submitAssignment = () => {
        console.log(assignmentAnswer);
    }

    return (
        <ItemViewWrapper
            loading={isLoading}
            validAccess={enrollmentData.enrollment && enrollmentData.preview_available}
        >
            <div className='assignmentContent'>
                <div className='CCAssignmentHeading'>
                    <IconByItemType type={"assignment"} size={22} />
                    <h2 className='assignmentContentTitle'>{assignmentData?.title}</h2>
                </div>

                {/* pdf and description */}
                <div className='AssignmentDescriptionGrid'>


                    <div className='AssignmentSubFirstColumn'>

                        {assignmentData?.description &&
                            String(assignmentData?.description).trim().length > 20 && (
                                <div className='CCAssignmentDescriptionBox'>
                                    <h4 className='assignmentSubtitle'>Assignment Description</h4>
                                    <ReactQuill value={assignmentData?.description} theme={"bubble"} className='assignmentPageReactQuill' readOnly={true} />
                                </div>
                            )}

                        <div className='assignmentUploadArea'>
                            <textarea
                                value={assignmentAnswer?.assignment_answer}
                                onChange={(e) => {
                                    setAssignmentAnswer((prev) => ({ ...prev, assignment_answer: e.target.value }))
                                }}
                                className='assignmentSubmitTextArea'
                                rows="15"
                                placeholder='Write Here ...'
                            >
                            </textarea>
                            <button className='assignmentUploadBTN'>
                                <AiOutlinePaperClip size={22} />
                                <span>Upload Assignment</span>
                            </button>
                            <button className='assignmentSubmitBTN' onClick={submitAssignment}>
                                <span>Submit Assignment</span>
                            </button>
                        </div>

                    </div>

                    {assignmentData?.assignment_pdf && (
                        <div className='CCAssignmentPDFBox pdfWrapper' ref={pdfWrapper} >
                            <h4 className='assignmentSubtitle' >Assignment Help PDF</h4>

                            <Document
                                file={assignmentData?.assignment_pdf}
                                onLoad={console.log}
                                onLoadSuccess={(data) => {
                                    setTotalPdfPage(data.numPages)
                                }}
                                className={"pdfViewPage"}
                            >
                                <Page
                                    width={initialWidth}
                                    pageNumber={currentPdfPage}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    canvasBackground='#FFFFFF'
                                    className='pdfViewCanvasContainer'
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
                    )}
                    {!assignmentData?.assignment_pdf && (
                        <div className='pdfWrapper noPdfGivenByInstructor'>
                            <h2>No PDF given by instructor.</h2>
                        </div>
                    )}

                </div>



            </div>
        </ItemViewWrapper>
    )
}

export default AssignmentSubmission