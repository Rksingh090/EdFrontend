import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../constant';

import ReactQuill from 'react-quill';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

import { Document, Page, pdfjs } from "react-pdf";
import ItemViewWrapper from './ItemViewWrapper';

const AssignmentSubmission = () => {

    const [currentPdfPage, setCurrentPdfPage] = useState(1)
    const [totalPdfPage, setTotalPdfPage] = useState(1)
    const [assignmentData, setAssignmentData] = useState();

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


    const { assignment_id } = useParams()

    // get assignment details 
    useEffect(() => {
        const getAssignmentData = (assignmentId) => {
            try {
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
        <ItemViewWrapper validAccess={enrollmentData.enrollment && enrollmentData.preview_available} >
            <div className='assignmentContent'>
                <h2 className='assignmentContentTitle'>{assignmentData?.title}</h2>
                {

                }
                <h4 className='assignmentSubtitle'>Course Description</h4>
                <ReactQuill value={assignmentData?.description} theme={"bubble"} className='reactQuill' readOnly={true} />

                <h4 className='assignmentSubtitle'>Course PDF</h4>
                {
                    assignmentData?.assignment_pdf && (
                        <div>
                            <Document file={assignmentData?.assignment_pdf} onLoadSuccess={(data) => setTotalPdfPage(data.numPages)} className={"pdfViewPage"} >
                                <Page pageNumber={currentPdfPage} renderTextLayer={false} renderAnnotationLayer={false} canvasBackground='#FFFFFF' />
                            </Document>
                            <div className='pdfPageActions'>
                                <div className='goBackPdf' onClick={() => setCurrentPdfPage(prev => prev === 1 ? prev : prev - 1)}>
                                    <IoArrowBack size={20} />
                                </div>
                                <p>Page {currentPdfPage} of {totalPdfPage} Pages</p>
                                <div className='goBackPdf' onClick={() => setCurrentPdfPage(prev => prev >= totalPdfPage ? prev : prev + 1)}>
                                    <IoArrowForward size={20} />
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className='assignmentUploadArea'>
                    <button className='assignmentUploadBTN'>
                        <AiOutlinePaperClip size={22} />
                        <span>Upload Assignment</span>
                    </button>
                    <textarea
                        value={assignmentAnswer?.assignment_answer}
                        onChange={(e) => setAssignmentAnswer(prev => ({ ...prev, assignment_answer: e.target.value }))}
                        className='assignmentSubmitTextArea' rows="10"
                        placeholder='Write Here ...'>
                    </textarea>
                </div>
                <button className='assignmentSubmitBTN' onClick={submitAssignment}>
                    <span>Submit Assignment</span>
                </button>
            </div>
        </ItemViewWrapper>
    )
}

export default AssignmentSubmission