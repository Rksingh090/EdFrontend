import React, { useRef } from 'react';
import ModalForm from '../utils/ModalForm';

import { MdOutlineClose } from 'react-icons/md';
import { QuizFormFooter } from './FormFooter';
import { useCourse } from '../../context/CourseBuilderProvider';
import { ImHtmlFive } from 'react-icons/im';
import { BsCodeSlash } from 'react-icons/bs';
import { BiLink } from 'react-icons/bi';
import { AiOutlineYoutube } from 'react-icons/ai';
import { TfiShortcode } from 'react-icons/tfi';

import { uploadVideo } from '../../functions/uploader';
import axios from 'axios';
import { API, BACKEND_URL } from '../../constant';
import SelectOption from '../utils/SelectOption';

const AddRecording = () => {
    const {
        showRecordingForm, setShowRecordingForm,
        recordingData, setRecordingData,
        courseData,
        closeRecordingForm,
        setAllRecordings
    } = useCourse();

    const recordingHTML5VideoRef = useRef();

    const handleUploadVideo = async (e) => {
        let videoFile = e.target.files[0];
        if (!videoFile || videoFile === null) return;

        const formData = new FormData();
        formData.append("video", videoFile);


        const { videoUrl, videoKey, fileSize, status } = await uploadVideo(videoFile, "recordings");

        if (status === "success") {
            setRecordingData(prev => ({
                ...prev,
                video_source_title: videoKey,
                video_source: videoUrl,
                file_size: fileSize
            }))
        }
    }

    const handleAddRecording = () => {
        axios.post(`${API}/recording`, { ...recordingData, course: courseData._id }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res) => {
            const { status, recording } = res.data;
            if (status === "success") {
                closeRecordingForm()
                setAllRecordings(prev => [...prev, recording])
            }
        })
    }

    return (
        <ModalForm visible={showRecordingForm}>
            <div className="CBRecordingForm">
                <div className="assignmentHeader">
                    <h1 className='lessonFormHeading'>Add Recording</h1>
                    <div className='closeAssignmentFormBtn'>
                        <MdOutlineClose size={20} />
                    </div>
                </div>

                <div className='CBRecordingFormBody'>
                    <div className="CBInputGroup">
                        <label htmlFor="recordingTitle">Title</label>
                        <input type="text"
                            value={recordingData.title}
                            onChange={(e) => setRecordingData(prev => ({
                                ...prev,
                                title: e.target.value
                            }))}
                            id="recordingTitle" className='CBFormInput' />
                    </div>
                    <div className="CBInputGroup">
                        <label htmlFor="recordingDescription">Description</label>
                        <textarea rows={7}
                            value={recordingData.description}
                            onChange={(e) => setRecordingData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                            id="recordingDescription" className='CBFormInput'>

                        </textarea>
                    </div>

                    <div className='assignButton'>
                        <p className="quizFormInputText">Video Source</p>
                        {/* <div className='customSelectInput'>
                            <div className='fixedSelectIcon'>
                                {recordingData.video_source_type === "html5" && (
                                    <ImHtmlFive size={20} />
                                )}
                                {recordingData.video_source_type === "embeded" && (
                                    <BsCodeSlash size={20} />
                                )}
                                {recordingData.video_source_type === "external-url" && (
                                    <BiLink size={20} />
                                )}
                                {recordingData.video_source_type === "youtube" && (
                                    <AiOutlineYoutube size={20} />
                                )}
                                {recordingData.video_source_type === "shortcode" && (
                                    <TfiShortcode size={20} />
                                )}
                            </div> */}
                            <SelectOption
                                value={recordingData.video_source_type}
                                onChange={(val) => {
                                    setRecordingData(prev => ({
                                        ...prev,
                                        video_source: "",
                                        video_source_type: val
                                    }))
                                }}
                                maxHeight={"400px"}
                                label={"Select Upload Type"}
                                valueField={"val"}
                                textField={"text"}
                                iconField={"icon"}
                                options={[
                                    { icon: <ImHtmlFive size={20} />, text: "HTML 5(mp4", val: "html5" },
                                    { icon: <BsCodeSlash size={20} />, text: "External URL", val: "external-url" },
                                    { icon: <BiLink size={20} />, text: "YouTube", val: "youtube" },
                                    { icon: <TfiShortcode size={20} />, text: "Embeded", val: "embeded" },
                                ]}
                                
                                selectStyle={{
                                    height: "auto"
                                }}
                                optionStyle={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                                style={{
                                    padding: "10px",
                                }}
                            />


                        {recordingData.video_source_type === "html5" && (
                            <>

                                {
                                    recordingData.video_source &&
                                        recordingData.video_source !== "" ? (
                                        <div className='h-max w-full overflow-hidden'>
                                            <video controls>
                                                <source src={`${BACKEND_URL}/${recordingData.video_source}`} />
                                            </video>
                                        </div>

                                    ) : (
                                        <div className='videoSource noPadding html5Style'>
                                            <span className='bold'>Drag & Drop Your Video</span>
                                            <span>File Format: .mp4</span>
                                            <span>or</span>
                                            <button className="browseVideo" onClick={() => recordingHTML5VideoRef.current && recordingHTML5VideoRef?.current?.click()}>Browse File</button>
                                            <input type="file" hidden={true} onChange={handleUploadVideo} ref={recordingHTML5VideoRef} accept="video/mp4" />
                                        </div>
                                    )
                                }
                            </>
                        )}

                        {recordingData.video_source_type === "external-url" && (
                            <div className='videoSource externalUrl'>
                                <input type="text"
                                    value={recordingData.video_source}
                                    onChange={(e) => setRecordingData(prev => ({
                                        ...prev,
                                        video_source: e.target.value
                                    }))}
                                    placeholder='Paste External Video URL' />
                            </div>
                        )}

                        {recordingData.video_source_type === "youtube" && (
                            <div className='videoSource youtubeURL'>
                                <input type="text"
                                    value={recordingData.video_source}
                                    onChange={(e) => setRecordingData(prev => ({
                                        ...prev,
                                        video_source: e.target.value
                                    }))}
                                    placeholder='Paste Youtube Video URL' />
                            </div>
                        )}

                        {recordingData.video_source_type === "embeded" && (
                            <div className='videoSource embededCoded'>
                                <textarea
                                    value={recordingData.video_source}
                                    onChange={(e) => setRecordingData(prev => ({
                                        ...prev,
                                        video_source: e.target.value
                                    }))}
                                    rows={6} placeholder='Place your embed code here'></textarea>
                            </div>
                        )}

                        {recordingData.video_source_type === "shortcode" && (
                            <div className='videoSource shortCode'>
                                <input
                                    value={recordingData.video_source}
                                    onChange={(e) => setRecordingData(prev => ({
                                        ...prev,
                                        video_source: e.target.value
                                    }))}
                                    type="text" placeholder='Paste Shortcode' />
                            </div>
                        )}
                    </div>

                </div>

                {/* quiz form footer  */}
                <div className="quizFormFooter">
                    <QuizFormFooter
                        onCancle={() => setShowRecordingForm(prev => !prev)}
                        submitText={"Add Recording"}
                        onSubmit={handleAddRecording}

                    />
                </div>

            </div>
        </ModalForm>
    )
}

export default AddRecording