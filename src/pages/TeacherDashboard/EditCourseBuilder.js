import React, { useState, useRef, useEffect, useMemo } from 'react'

import { AiOutlineClockCircle, AiOutlineUp } from 'react-icons/ai';
import { AiOutlineInfoCircle, AiOutlineMenu } from 'react-icons/ai';
import { PiDotOutlineDuotone } from 'react-icons/pi';
import { MdSlowMotionVideo } from 'react-icons/md';
import { TbDeviceLandlinePhone, TbEdit, TbUpload } from 'react-icons/tb';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPlusCircle } from 'react-icons/bs';
import { FiPlusSquare } from 'react-icons/fi';
import { IoCloudUploadOutline, IoSettingsOutline } from 'react-icons/io5';
import { RxImage } from 'react-icons/rx';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'

import '../styles/coursebuilder.css';

import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

// course context 
import { useCourse } from '../../context/CourseBuilderProvider';

import Switch from '../../components/utils/Switch';
import AddNewTopic from '../../components/coursebuilder/AddNewTopic';
import AddNewQuiz from '../../components/coursebuilder/AddNewQuiz';
import { slugify } from '../../functions/slugify';
import AssignmentForm from '../../components/coursebuilder/AssignmentForm';
import { API, BACKEND_URL } from '../../constant';
import axios from 'axios';
import QuillToolbar, { formats, modules } from '../../components/utils/EditorToolbar';
import AddLessonForm from '../../components/coursebuilder/AddLessonForm';
import { uploadImage, uploadVideo } from '../../functions/uploader';
import EditCourseHeader from '../../components/coursebuilder/EditCourseHeader';
import AddRecording from '../../components/coursebuilder/AddRecording';
import { formatBytes } from '../../functions/formatebyte';
import SelectOption from '../../components/utils/SelectOption';

const EditCourseBuilder = () => {
    const navigate = useNavigate();
    const { course_id } = useParams();

    const { categories, subcategories } = useSelector(state => state.category);
    const { user } = useSelector(state => state.user);

    // ctx 
    const { courseData, showAssignmentForm, setShowAssignmentForm,
        setCourseData, showQuizForm, setShowQuizForm, setQuizData,
        setQuizUpdateData, setQuizId, createNewTopic,
        setTopicId, setAssignmentId,
        setAssignmentUpdateData, setAssignmentData,
        deleteAssignmentById,
        deleteQuizById, deleteTopicById,
        showLessonForm, setShowLessonForm,
        setTopicUpdateData,
        showTopicForm, setShowTopicForm,
        setTopicData,
        setLessonData,
        setLessonUpdateData,
        setLessonId,
        setShowRecordingForm,
        allRecordings, setAllRecordings
    } = useCourse();

    const courseDescRef = useRef(null);

    const videoInputRef = useRef(null);
    const thumbnailImgRef = useRef(null)

    const [courseMenu, setCourseMenu] = useState("general");
    const [landscape, setLandscape] = useState("landscape");

    const [subCategory, setSubCategory] = useState([]);

    // toggle certificate page
    const toggleLandscape = () => {
        let a = landscape === "landscape" ? 'portrait' : 'landscape';
        setLandscape(a);
    }

    // handle video file 
    const handleVideoFile = () => {
        if (videoInputRef.current) {
            videoInputRef.current.click()
        }
    }

    // handle title  
    const handleTitleChange = (e) => {
        const slug = slugify(e.target.value);
        setCourseData((data) => {
            return {
                ...data,
                title: e.target.value,
                slug: slug
            }
        })
    }

    // handle quill datat 
    const handleQuillData = (description) => {
        setCourseData((data) => {
            return {
                ...data,
                description: description
            }
        })
    }

    // course type change  free/paid 
    const handleCourseTypeChange = (e) => {
        setCourseData(data => {
            return {
                ...data,
                course_type: e.target.value
            }
        });
    }

    // topic hide show logic  
    const handleToggleTopicItem = (topic_id) => {
        let allTopic = courseData.topics;

        allTopic = allTopic.map((topic) => {
            let topicData = {};
            if (topic._id === topic_id) {
                if (topic.showTopicItem === true) {
                    Object.assign(topicData, topic, { showTopicItem: false })
                } else {
                    Object.assign(topicData, topic, { showTopicItem: true })
                }
                return topicData;
            }
            return topic;
        });

        setCourseData({
            ...courseData,
            topics: allTopic
        })
    }

    // change content drip 
    const handleChangeContentGrip = (e) => {
        setCourseData({
            ...courseData,
            content_drip: {
                ...courseData.content_drip,
                drip_type: e.target.value
            }
        })
    }

    // add new topic 
    const handleAddTopic = (data) => {
        createNewTopic(course_id, data);
        setShowTopicForm(false);
    }

    // new quiz btn show add form 
    const handleNewQuizBtn = (topic_id) => {
        setTopicId(topic_id)
        setQuizUpdateData({
            isEditType: false,
        })
        setShowQuizForm(true);
    }

    // update quiz form
    const handleUpdateQuizForm = (topic_id, item) => {
        setTopicId(topic_id)
        setQuizId(item._id)
        setQuizUpdateData({
            isEditType: true,
            item_id: item._id
        })
        setQuizData(item)
        setShowQuizForm(true);
    }

    // add new lesson 
    const handleNewLessonBtn = (topic_id) => {
        setTopicId(topic_id)
        setLessonUpdateData({
            isEditType: false
        })
        setShowLessonForm(true);
    }

    // update lesson 
    const handleUpdateLessonForm = (topic_id, item) => {
        setTopicId(topic_id)
        setLessonId(item._id)
        setLessonUpdateData({
            isEditType: true
        })
        setLessonData(item)
        setShowLessonForm(true);
    }

    // add new assignment opener 
    const handleNewAssignmentBtn = (topic_id) => {
        setTopicId(topic_id)
        setShowAssignmentForm(true)
        setAssignmentUpdateData({
            isEditType: false
        })
    }

    // update assignment form opener 
    const handleUpdateAssignmentForm = (topic_id, item) => {
        setTopicId(topic_id)
        setAssignmentId(item._id)
        setAssignmentUpdateData({
            isEditType: true,
            item_id: item._id
        })
        setAssignmentData(item);
        setShowAssignmentForm(true);
    }

    // add new topic 
    const handleShowAddTopic = () => {
        setShowTopicForm(true)
        setTopicUpdateData({
            isEditType: false
        })
    }

    // update a topic 
    const handleUpdateTopic = (topic) => {
        setShowTopicForm(true)
        setTopicUpdateData({
            isEditType: true
        })
        setTopicData(topic)
    }

    // get month price 
    const getMonthDiff = () => {
        const startDate = new Date(courseData?.setting?.start_date);
        const endDate = new Date(courseData?.setting?.end_date);

        let monthDiff = endDate.getMonth() - startDate.getMonth();
        let yearDiff = endDate.getFullYear() - startDate.getFullYear();
        if (yearDiff > 0) {
            monthDiff += (12 * Number(yearDiff))
        }

        if (endDate.getDate() < startDate.getDate()) {
            monthDiff -= 1;
        }

        return monthDiff;
    }

    // price by percent
    const calculatePriceByPercent = (percent) => {
        const monthDiff = getMonthDiff();
        let fullCourseValue = Number(courseData.course_price) / monthDiff;
        let percent25 = fullCourseValue * percent;
        fullCourseValue += percent25;
        fullCourseValue = Math.round(fullCourseValue);
        let modVal = fullCourseValue % 100;
        if (modVal > 0) {
            fullCourseValue += (100 - modVal);
        }
        fullCourseValue = Math.ceil(fullCourseValue);
        return fullCourseValue;
    }

    // get monthly price
    const getMonthlyPrice = () => {
        if (courseData.offers.findIndex((item) => item.duration === 1) !== -1) {
            let allOffersArray = courseData.offers.filter((offerItem) => Number(offerItem.duration) !== 1);
            setCourseData(prev => ({
                ...prev,
                offers: allOffersArray
            }))
        } else {
            const monthlyPrice = calculatePriceByPercent(0.30);
            setCourseData(prev => ({
                ...prev,
                offers: [
                    ...prev.offers,
                    {
                        duration: 1,
                        price: monthlyPrice
                    }
                ]
            }))
        }
    }

    // get quarterly price
    const getQuaterlyPrice = () => {
        if (courseData.offers.findIndex((item) => item.duration === 3) !== -1) {
            let allOffersArray = courseData.offers.filter((offerItem) => Number(offerItem.duration) !== 3);
            setCourseData(prev => ({
                ...prev,
                offers: allOffersArray
            }))
        } else {
            const quaterlyPrice = calculatePriceByPercent(0.20) * 3;
            setCourseData(prev => ({
                ...prev,
                offers: [
                    ...prev.offers,
                    {
                        duration: 3,
                        price: quaterlyPrice
                    }
                ]
            }))
        }
    }

    // get half year price
    const getHalfYearPrice = () => {
        if (courseData.offers.findIndex((item) => item.duration === 6) !== -1) {
            let allOffersArray = courseData.offers.filter((offerItem) => Number(offerItem.duration) !== 6);
            setCourseData(prev => ({
                ...prev,
                offers: allOffersArray
            }))
        } else {
            const halfyearPrice = calculatePriceByPercent(0.10) * 6;
            setCourseData(prev => ({
                ...prev,
                offers: [
                    ...prev.offers,
                    {
                        duration: 6,
                        price: halfyearPrice
                    }
                ]
            }))
        }
    }

    // upload thumbnail course 
    const handleUploadThubnail = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const imgData = await uploadImage(file, "course-thumbnail");

        setCourseData(prev => ({
            ...prev,
            thumbnail: `${BACKEND_URL}/${imgData.imgUrl}`
        }))
    }

    // upload video thumbnail course 
    const handleUploadVThumbnail = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const videoData = await uploadVideo(file, "course-vthumbnail");

        setCourseData(prev => ({
            ...prev,
            video: `${BACKEND_URL}/${videoData.videoUrl}`
        }))
    }


    // img upload and add to quill editor 
    const uploadImageInCourseDesc = () => {
        if (!courseDescRef?.current) return;
        const editor = courseDescRef.current.getEditor();
        console.log(editor)

        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                const { status, imgUrl } = await uploadImage(file, "course-description"); // upload data into server or aws or cloudinary
                if (status === "success") {
                    editor.insertEmbed(editor.getSelection(), "image", imgUrl);
                }
            } else {
                alert('You could only upload images.');
            }
        };
    }

    // img upload editor 
    const memoModules = useMemo(() => ({
        ...modules,
        toolbar: {
            ...modules.toolbar,
            handlers: {
                ...modules.toolbar.handlers,
                image: uploadImageInCourseDesc
            }
        }
    }), [])


    // set and remove days in batch.batch_days 
    const handleSetBatchDays = (e) => {
        let { value } = e.target;
        value = Number(value);

        if (courseData.batch?.batch_days?.includes(value)) {
            let filterBatch = courseData.batch.batch_days.filter((batch) => batch !== value);
            setCourseData(prev => ({
                ...prev,
                batch: {
                    ...prev.batch,
                    batch_days: filterBatch
                }
            }))
        } else {
            setCourseData(prev => ({
                ...prev,
                batch: {
                    ...prev.batch,
                    batch_days: [...prev.batch.batch_days, value]
                }
            }))
        }
    }

    // get course data and set 
    useEffect(() => {
        if (course_id === "" || course_id === undefined) return;
        // get course by id: onLoad
        const getCourseById = async (courseId) => {
            try {
                const response = await axios.get(`${API}/course/teacher/${courseId}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
                setCourseData(response.data.course);
            } catch (error) {
                navigate("/teacher/course")
            }
        }
        getCourseById(course_id);
    }, [course_id, setCourseData])

    // select subcategory and set first sub_cat in courseData 
    // if sub_cat === ""
    useEffect(() => {
        if (!subcategories || subcategories?.length === 0) return;
        if (courseData.category === "") return;

        const getSubCatsForCategory = subcategories.filter((subCat) => subCat.parent_category === courseData.category);
        if (getSubCatsForCategory?.length === 0) {
            setSubCategory([]);
        } else {
            setSubCategory(getSubCatsForCategory);
            if (!courseData?.sub_category || courseData?.sub_category === "") {
                setCourseData(data => {
                    return {
                        ...data,
                        sub_category: getSubCatsForCategory[0]._id
                    }
                })
            }
        }
    }, [courseData?.category, courseData?.sub_category, setCourseData, subcategories])

    // calculate course price
    useEffect(() => {
        if (courseData.offers.length > 0) {
            let offers = [];
            courseData.offers.forEach((courseOffer) => {
                let price;
                if (courseOffer.duration === 1) {
                    price = calculatePriceByPercent(0.30);
                }
                else if (courseOffer.duration === 3) {
                    price = calculatePriceByPercent(0.20) * 3;
                }
                else if (courseOffer.duration === 6) {
                    price = calculatePriceByPercent(0.10) * 6;
                }
                offers.push({
                    duration: courseOffer.duration,
                    price: price
                })
            });

            setCourseData(prev => ({
                ...prev,
                offers: offers
            }))
        }
    }, [courseData.course_price, courseData.setting.start_date, courseData.setting.end_date])

    // get recordings data 
    useEffect(() => {
        if (!courseData?._id || courseData?._id === "" || courseData?._id === undefined) return;
        axios.get(`${API}/recording/${courseData?._id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res) => {
            const { status, recordings } = res.data;
            if (status === "success") {
                setAllRecordings(recordings)
            }
        })
    }, [courseData?._id])



    console.log(courseData);

    return (
        <div>
            {/* back submit and cancle  */}
            <EditCourseHeader />

            {/* topic form  */}
            <AddNewTopic value={showTopicForm} onClose={() => setShowTopicForm(false)} onSubmit={(topicData) => handleAddTopic(topicData)} />

            {/* quiz form */}
            <AddNewQuiz quizVisibility={showQuizForm} onClose={() => setShowQuizForm(false)} />

            {/* assignment form  */}
            <AssignmentForm showAssignment={showAssignmentForm} />

            {/* lesson form  */}
            <AddLessonForm showLesson={showLessonForm} />

            {/* add recording form  */}
            <AddRecording />


            <div className='courseBuilderResponsive'>

                <div className='courseBuilderMainContainer'>

                    <div className='courseBuilderDiv1'>

                        {/* course meta  */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Course Meta</h2>
                            </div>
                            <div className='CBContainerBody'>
                                <div className='flexColInput'>
                                    <label>Course Title</label>
                                    <input type="text" className='CBInput' value={courseData?.title} onChange={handleTitleChange} placeholder='New Course' />
                                </div>

                                <div className='flexColInput'>
                                    <label>Course Slug</label>
                                    <input value={courseData.slug} type="text" placeholder='course-slug' disabled className='CBInput' />
                                    <Link className='CBCourseLink' target='_blank' to={`/course/${courseData?._id}/${courseData.slug}`}>
                                        <span className='textSubtle'>Permalink: </span>
                                        <span className='CBCourseLinkSpan'>{`/course/${courseData?._id}/${courseData.slug}`}</span>
                                    </Link>
                                </div>

                                <div className='flexColInput'>
                                    <label>About Course</label>
                                    <div className='courseDescriptionRQ'>
                                        <QuillToolbar hasSeparation={"true"} />
                                        <ReactQuill
                                            theme={"snow"}
                                            placeholder={"Write something awesome..."}
                                            modules={memoModules}
                                            formats={formats}
                                            ref={courseDescRef}
                                            onChange={handleQuillData}
                                            value={courseData.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* course thumbnail  */}
                        <div className="tableContainer dashboard overflowAllow">
                            <div className="tableHeading">
                                <h2 className="heading">Course Thumbnail</h2>
                            </div>
                            <div className='courseMediaUpload'>
                                <div className="flexColImg">
                                    <p className='labelText'>Upload Thumbnail</p>
                                    <div className='CBThumbnailContainer'>
                                        <div className='courseThumbnailImg'>
                                            {
                                                courseData?.thumbnail ?
                                                    (
                                                        <img src={courseData.thumbnail} alt="upload file" />
                                                    ) : (
                                                        <RxImage size={30} />
                                                    )
                                            }
                                        </div>

                                        <div className='courseThumbnailMeta'>
                                            <p className='font-[600]'>Size: 700x430 pixels</p>
                                            <p>File Support: jpg, .jpeg,. gif, or .png.</p>
                                            <div className='mt-2'>
                                                <input type="file" hidden={true} ref={thumbnailImgRef} onChange={handleUploadThubnail} />
                                                <button
                                                    onClick={() => {
                                                        thumbnailImgRef.current?.click()
                                                    }}
                                                    className='thumbnailUploadImg'>
                                                    <TbUpload size={18} />
                                                    <p>
                                                        {
                                                            courseData?.thumbnail
                                                                ? "Upload Image"
                                                                : "Change Image"
                                                        }
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex flex-col gap-4`}>
                                    <div className={`flexColImg`}>
                                        <p className='labelText'>Upload Preview Video</p>
                                        <div className='VideoThumbnailContainer'>
                                            <p>Drag & Drop Your Video</p>
                                            <p>File Format: .mp4</p>
                                            <p>or</p>
                                            <input type="file" ref={videoInputRef} onChange={handleUploadVThumbnail} name="file" accept='video/*' hidden />
                                            <button onClick={handleVideoFile} className='browseFileBTN'> Browse File</button>
                                        </div>
                                    </div>

                                    <div className='flexColInput'>
                                        <label>Course Video Type</label>
                                        <SelectOption
                                            label={"Select Video Type"}
                                            options={[
                                                { val: "html5", text: "HTML 5 (mp4)" },
                                                { val: "youtube", text: "Youtube" },
                                                { val: "vimeo", text: "Vimeo" },
                                                { val: "embeded", text: "Embeded" },
                                                { val: "external-url", text: "External URL" },
                                            ]}
                                            textField={"text"}
                                            valueField={"val"}
                                            style={{
                                                height: "40px"
                                            }}
                                        />
                                        {/* <select className='w-[100%] outline-none border-[1px] border-gray-400 p-2 py-2  flex items-start rounded-md hover:border-[1px] focus:border-[#5656b6]'>
                                            <option value="html5">HTML 5 (mp4)</option>
                                            <option value="youtube">Youtube</option>
                                            <option value="vimeo">Vimeo</option>
                                            <option value="embeded">Embeded</option>
                                            <option value="external-url">External URL</option>
                                        </select> */}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* course builder  */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Course Builder</h2>
                            </div>
                            <div className={'p-[20px] CBBuilder'}>
                                {/* course builder  */}
                                {courseData && courseData.topics?.length > 0 && courseData.topics.map((topicWID) => {
                                    const topic = topicWID.topic;
                                    return (

                                        <div key={topicWID._id} className='CBTopicContainer'>
                                            {/* single topic  */}
                                            <div className='CBTopicItem'>
                                                <div className='orderAndTitle'>
                                                    <AiOutlineMenu size={18} />
                                                    <p>{topic?.title}</p>
                                                </div>
                                                <div className='CBTopicActions'>
                                                    <div className='CBTopicIcon'>
                                                        <TbEdit size={20} onClick={() => handleUpdateTopic(topic)} />
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            deleteTopicById(topic._id)
                                                        }}
                                                        className='CBTopicIcon'>
                                                        <RiDeleteBin6Line size={17} />
                                                    </div>
                                                    <div className='CBTopicIcon'
                                                        onClick={() => handleToggleTopicItem(topicWID._id)} >
                                                        <AiOutlineUp size={17} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`${topicWID.showTopicItem ? "flex" : "hidden"} CBItemContainer`}>

                                                {/* populating items  */}
                                                {topic?.items && topic?.items.length > 0 && topic?.items.map((itemWID) => {
                                                    const itemType = itemWID.item_type;
                                                    const item = itemWID.item;

                                                    let title = "";
                                                    switch (itemType) {
                                                        case "Quiz":
                                                            title = item?.quiz_title;
                                                            break;
                                                        case "Assignment":
                                                            title = item?.title;
                                                            break;
                                                        case "Lesson":
                                                            title = item?.title;
                                                            break;
                                                        default:
                                                            break;
                                                    }

                                                    return (
                                                        <div key={itemWID?._id} className='CBOneItem'>
                                                            <div className='orderAndTitle'>
                                                                <AiOutlineMenu size={16} />
                                                                <p>{itemType}: {title}</p>
                                                            </div>
                                                            <div className='CBTopicActions'>
                                                                <div
                                                                    onClick={() => {
                                                                        itemType === "Quiz" ? handleUpdateQuizForm(topic?._id, item)
                                                                            : itemType === "Assignment" ? handleUpdateAssignmentForm(topic?._id, item)
                                                                                : itemType === "Lesson" && handleUpdateLessonForm(topic?._id, item)

                                                                    }}
                                                                    className='CBTopicIcon'
                                                                >
                                                                    <TbEdit size={20} />
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        itemType === "Quiz" ? deleteQuizById(topic?._id, item?._id)
                                                                            :
                                                                            itemType === "Assignment" &&
                                                                            deleteAssignmentById(topic?._id, item?._id)
                                                                    }}
                                                                    className='CBTopicIcon'
                                                                >
                                                                    <RiDeleteBin6Line size={17} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                {/* add new Quiz, Assignment, and Lesson button  */}
                                                <div className='CBItemActions'>
                                                    <button className='CBItemAddBtn' onClick={() => handleNewLessonBtn(topic?._id)}>
                                                        <FiPlusSquare size={18} />
                                                        <p>Lesson Notes</p>
                                                    </button>
                                                    <button onClick={() => handleNewQuizBtn(topic?._id)} className='CBItemAddBtn'>
                                                        <FiPlusSquare size={18} />
                                                        <p>Quiz</p>
                                                    </button>
                                                    <button
                                                        onClick={() => handleNewAssignmentBtn(topic?._id)}
                                                        className='CBItemAddBtn'>
                                                        <FiPlusSquare size={18} />
                                                        <p>Assignments</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                <button className='CBAddNewTopic' onClick={() => handleShowAddTopic()}>
                                    <BsPlusCircle size={25} />
                                    <p>Add new topic </p>
                                </button>
                            </div>
                        </div>

                        {/* recordings upload area  */}
                        {
                            user?.role === "admin" && (
                                <div className="tableContainer dashboard">
                                    <div className="tableHeading">
                                        <h2 className="heading">Course Recordings</h2>
                                    </div>
                                    <div className={"p-[20px] CBBuilder"}>
                                        {
                                            allRecordings &&
                                            allRecordings.length > 0 && (
                                                <div className='recordingItemArea'>
                                                    {


                                                        allRecordings.map((recordingItem) => (
                                                            <div className="CBOneRecording" key={recordingItem?._id}>
                                                                <div className='RecordingFileIcon'>
                                                                    <MdSlowMotionVideo size={40} />
                                                                </div>
                                                                <div className='OneRecordingMeta'>
                                                                    <h2 title={recordingItem?.title}>{recordingItem?.title}</h2>
                                                                    <p>File Type: {recordingItem?.video_source_type}</p>
                                                                    {
                                                                        recordingItem?.video_source_type === "html5" && (
                                                                            <span>File Size: {formatBytes(recordingItem?.file_size)}</span>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>

                                                        ))}
                                                </div>
                                            )
                                        }
                                        <button className='CBAddNewTopic gap-2' onClick={() => setShowRecordingForm(prev => !prev)}>
                                            <IoCloudUploadOutline size={25} />
                                            <p>Upload Recording</p>
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        {/* microsoft team  */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Live Class Link</h2>
                            </div>
                            <div className='p-[20px]'>
                                <input type="text" className='CBInput'
                                    placeholder='Paste Live Class Link Here...'
                                    value={courseData?.ms_team_link}
                                    onChange={(e) => setCourseData(prev => ({
                                        ...prev,
                                        ms_team_link: e.target.value
                                    }))}
                                />
                            </div>
                        </div>

                        {/* course additional setting */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Additional Settings</h2>
                            </div>
                            <div className='newCourseSetting mt-3 p-[20px]'>

                                <div className='courseSettingContainer'>
                                    <div className='courseSettingMenu'>
                                        <div className={`${courseMenu === "general" ? "selectedTab" : ""}`} onClick={() => setCourseMenu("general")}>
                                            <IoSettingsOutline size={22} />
                                            <p>General</p>
                                        </div>
                                        <div className={`${courseMenu === "content" ? "selectedTab" : ""}`} onClick={() => setCourseMenu("content")}>
                                            <AiOutlineClockCircle size={22} />
                                            <p>Content Drip</p>
                                        </div>

                                    </div>

                                    {courseMenu === "general" ? (
                                        <div className='courseSettingGeneral'>


                                            <div className='gridTwoByThree'>
                                                <h4>Difficulty Level</h4>
                                                <div>
                                                    <SelectOption
                                                        style={{
                                                            height: "40px"
                                                        }}
                                                        label={"Select Levels"}
                                                        onChange={(val) => setCourseData(data => {
                                                            return {
                                                                ...data,
                                                                setting: {
                                                                    ...data.setting,
                                                                    difficulty_level: val
                                                                }
                                                            }
                                                        })}
                                                        options={[
                                                            { val: "begginner", text: "Beginner" },
                                                            { val: "intermediate", text: "Intermediate" },
                                                            { val: "expert", text: "Expert" }
                                                        ]}
                                                        textField={"text"}
                                                        valueField={"val"}
                                                    />
                                                    {/* <select
                                                        name="cars" id="cars" className='w-full outline-none border-[1px] border-gray-500 p-2 flex items-start rounded-md hover:border-[1px] hover:border-[#5151d1]'>
                                                        <option disabled>Select Levels</option>
                                                        <option value="begginner">Beginner</option>
                                                        <option value="intermediate">Intermediate</option>
                                                        <option value="expert">Expert</option>
                                                    </select> */}
                                                    <p className='flexAIC gap1'>
                                                        <AiOutlineInfoCircle size={18} className='textMuted fill' />
                                                        <span className='textMuted'>Course difficulty level</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='gridTwoByThree'>
                                                <h4>Enrolment Expiration</h4>
                                                <div>
                                                    <input value={courseData?.setting?.expiration}
                                                        onChange={(e) => setCourseData(data => {
                                                            return {
                                                                ...data,
                                                                setting: {
                                                                    ...data.setting,
                                                                    expiration: Number(e.target.value)
                                                                }
                                                            }
                                                        })}
                                                        type="number"
                                                        className="GrayedInput"
                                                    />
                                                    <p className='flex gap1 textMuted '>
                                                        <span className='w-[20px]'>
                                                            <AiOutlineInfoCircle size={18} className='textMuted fill' />
                                                        </span>
                                                        <span className='m-[-2px] textMuted'>
                                                            Student's enrolment will be removed after this number of days. Set 0 for lifetime enrolment.
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>



                                            <div className='gridTwoByThree'>
                                                <h4>Q&A</h4>
                                                <div>
                                                    <Switch
                                                        value={courseData?.setting?.qna}
                                                        onChange={(check) => setCourseData(data => {
                                                            return {
                                                                ...data,
                                                                setting: {
                                                                    ...data.setting,
                                                                    qna: check
                                                                }
                                                            }
                                                        })} />
                                                    <p className='flex gap1'>
                                                        <span className='w-[20px]'>
                                                            <AiOutlineInfoCircle className='textMuted fill' size={18} />
                                                        </span>
                                                        <span className='m-[-2px] textMuted'>
                                                            Number of students that can enrol in this course. Set 0 for no limits.
                                                        </span>
                                                    </p>

                                                </div>
                                            </div>

                                        </div>)
                                        :
                                        (<div className='CBContentDrip'>
                                            <div className='flexRowCenter'>
                                                <input
                                                    type="checkbox"
                                                    checked={courseData?.content_drip?.enabled === true}
                                                    value={courseData?.content_drip?.enabled}
                                                    onChange={() => setCourseData({ ...courseData, content_drip: { ...courseData.content_drip, enabled: !courseData?.content_drip?.enabled } })}
                                                    className='llInput sm'
                                                    id='enableContentDrip'
                                                />
                                                <label htmlFor="enableContentDrip" className='CBContentDripEnable'>Enable</label>
                                            </div>
                                            <div className='infoIconText muted my-4'>
                                                <AiOutlineInfoCircle size={16} />
                                                <p>Enable / Disable content drip</p>
                                            </div>
                                            <div className='mt-[20px]'>
                                                <h3 className='text-[17px] text-[#50545d] font-[500]'>Content Drip Type</h3>
                                            </div>
                                            <div>
                                                <h3 className='text-[13px] text-[#808080] my-2 font-[400]'>You can schedule your course content using the above content drip options.</h3>
                                            </div>
                                            <div className='ContentDripRadioButtons'>
                                                <div className='CBContentDripRadio'>
                                                    <input disabled={courseData?.content_drip?.enabled ? false : true}
                                                        type="radio"
                                                        id="vicky"
                                                        name="gender"
                                                        value="by_date"
                                                        onChange={handleChangeContentGrip}
                                                        className='llInput'
                                                    />
                                                    <label
                                                        htmlFor="vicky"
                                                        className=''
                                                    >
                                                        Schedule course contents by date
                                                    </label>
                                                </div>
                                                <div className='CBContentDripRadio'>
                                                    <input id="female1" disabled={courseData?.content_drip?.enabled ? false : true} type="radio" name="gender" value="date_from_enrollment"
                                                        onChange={handleChangeContentGrip}
                                                        className='llInput'
                                                    />
                                                    <label htmlFor="female1"> Content available after X days from enrolment</label>
                                                </div>
                                                <div className='CBContentDripRadio'>
                                                    <input id="female2" disabled={courseData?.content_drip?.enabled ? false : true} type="radio" name="gender" value="sequentially"
                                                        onChange={handleChangeContentGrip}
                                                        className='llInput'
                                                    />
                                                    <label htmlFor="female2">Course content available sequentially</label>
                                                </div>
                                                <div className='CBContentDripRadio'>
                                                    <input id="female3" disabled={courseData?.content_drip?.enabled ? false : true} type="radio" name="gender" value="presequisites"
                                                        onChange={handleChangeContentGrip}
                                                        className='llInput'
                                                    />
                                                    <label htmlFor="female3"> Course content unlocked after finishing prerequisites</label>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                </div>
                            </div>
                        </div>


                        {/* certificate */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Certificate Setting</h2>
                                <div className='CertificateChangeBTNS'>
                                    <button className={`changeBTN ${landscape === "landscape" ? "active" : ""}`} onClick={toggleLandscape}>
                                        <TbDeviceLandlinePhone />
                                        <p>Landscape</p>
                                    </button>
                                    <button className={`changeBTN ${landscape === "portrait" ? "active" : ""}`} onClick={toggleLandscape}>
                                        <TbDeviceLandlinePhone />
                                        <p>Portrait</p>
                                    </button>
                                </div>
                            </div>
                            <div className='p-[20px]'>

                                <div className='courseBuilderCertificates'>
                                    {landscape === "landscape" &&
                                        <>
                                            <div>
                                                <img src="https://eict.iitr.ac.in/wp-content/uploads/Slide1-1024x724.jpg" alt="" />
                                            </div>
                                            <div>
                                                <img src="https://study.iitm.ac.in/diploma/assets/img/certificates/cert_2.jpg" alt="" />
                                            </div>
                                            <div>
                                                <img src="https://priyadogra.com/wp-content/uploads/2021/05/iit-madras-certificate.jpg" alt="" />
                                            </div>
                                            <div>
                                                <img src="https://cxl-web-prod-uploads.s3.amazonaws.com/public/filestore-uploads/70cd701c5836d1e7318e7fc167f16d21ee06dcd7.jpg" alt="" />
                                            </div>
                                            <div>
                                                <img src="https://iitb.emeritus.org/iitb-certificate-program-in-machine-learning-and-ai-with-python/images/iitb-mlaip-certificate.jpg" alt="" />
                                            </div>
                                        </>
                                    }

                                    {landscape === "portrait" &&
                                        <>
                                            <div>
                                                <img src="https://intellipaat.com/course-image/2021/05/Certificate_Intellipaat_IIT-Roorkee-BIG.png" alt="" />
                                            </div>
                                            <div>
                                                <img src="https://www.classcentral.com/report/wp-content/uploads/2022/02/freecodecamp-certificate.png" alt="" />
                                            </div>
                                            <div>
                                                <img src="https://study.iitm.ac.in/ds/assets/img/academics/cert_2.jpg" alt="" />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='courseBuilderDiv2'>
                        {/* course pricing card admin only  */}
                        {user?.role === "admin" && (
                                <div className="tableContainer dashboard">
                                    <div className="tableHeading">
                                        <h2 className="heading">Course Publish</h2>
                                    </div>
                                    <div className="p-[20px]">
                                        <div className='flexColInput'>
                                            <label>Publish Course</label>
                                            <Switch
                                                value={courseData?.status === "publish"}
                                                onChange={(check) => setCourseData(data => {
                                                    return {
                                                        ...data,
                                                        status: check ? "publish" : "draft"
                                                    }
                                                })} />
                                            <span className='infoText xs flexed'>
                                                <div>
                                                    <AiOutlineInfoCircle size={18} />
                                                </div>
                                                <span>Make This Course Public. No enrolment required.</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* course pricing card admin only  */}
                        {user?.role === "admin" && (
                                <div className='tableContainer dashboard'>
                                    <div className="tableHeading">
                                        <h2 className="heading">Course Pricing (Admin Only.)</h2>
                                    </div>

                                    <div className='CBContainerBody'>
                                        <div className='flexColInput'>
                                            <label>Course Type</label>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex flex-row items-center gap-x-2'>
                                                    <input type="radio" name="courseType" className='llInput sm' id="free" value="free" checked={courseData.course_type === "free"} onChange={handleCourseTypeChange} />
                                                    <label htmlFor="free" className='text-[17px] font-[600] text-[#50545d] cursor-pointer'>Free</label>
                                                </div>
                                                <div className='flex flex-row items-center gap-x-2'>
                                                    <input type="radio" name="courseType" className='llInput sm' id="paid" value="paid" checked={courseData.course_type === "paid"} onChange={handleCourseTypeChange} />
                                                    <label htmlFor="paid" className='text-[17px] font-[600] text-[#50545d] cursor-pointer'> Paid</label>
                                                </div>
                                            </div>
                                        </div>

                                        {courseData?.course_type === "paid" && (
                                            <div className='flexColInput'>
                                                <label>Course Price (Rs.)</label>
                                                <input
                                                    value={courseData?.course_price}
                                                    onChange={(e) => setCourseData(data => {
                                                        return {
                                                            ...data,
                                                            course_price: Number(e.target.value)
                                                        }
                                                    })}
                                                    type="number"
                                                    className='CBInput noNumberStyle'
                                                    placeholder='Normal Price' />
                                            </div>
                                        )
                                        }
                                        {
                                            courseData?.course_type === "paid" && (
                                                <div className='flexColInput'>
                                                    <label>Course Discount (Rs.)</label>
                                                    <input
                                                        value={courseData?.discount_price}
                                                        onChange={(e) => setCourseData(data => {
                                                            return {
                                                                ...data,
                                                                discount_price: Number(e.target.value)
                                                            }
                                                        })}
                                                        type="number"
                                                        className='CBInput noNumberStyle'
                                                        placeholder='Discounted Price' />
                                                </div>
                                            )
                                        }






                                        <div className=''>
                                            <h1 className='courseSubHeading py-2'>Offer if Any</h1>

                                            <div className='courseStartedOrNot'>
                                                <p>Course Started Or Not</p>
                                                <Switch value={courseData?.choose_start_date} onChange={(value) => setCourseData(prev => ({ ...prev, choose_start_date: value }))} />
                                            </div>

                                            <div className='courseOffersCheckbox'>
                                                <div className='checkBoxItem'>
                                                    <div className='subscriptionChekbox'>
                                                        <input id="oneMonth" checked={courseData.offers.findIndex((item) => item.duration === 1) !== -1} onChange={getMonthlyPrice} type="checkbox" />
                                                        <label htmlFor="oneMonth">1 Month</label>
                                                    </div>
                                                    <input type="text" className='courseSubscriptionInput' disabled={true} value={courseData.offers.filter((item) => item.duration === 1)[0]?.price || 0} />
                                                </div>
                                                {
                                                    getMonthDiff() >= 5 && (
                                                        <div className='checkBoxItem'>
                                                            <div className='subscriptionChekbox' >
                                                                <input id="threeMonth" checked={courseData.offers.findIndex((item) => item.duration === 3) !== -1} onChange={getQuaterlyPrice} type="checkbox" />
                                                                <label htmlFor="threeMonth">3 Month</label>
                                                            </div>
                                                            <input type="text" className='courseSubscriptionInput' disabled={true} value={courseData.offers.filter((item) => item.duration === 3)[0]?.price || 0} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    getMonthDiff() >= 8 && (
                                                        <div className='checkBoxItem'>
                                                            <div className='subscriptionChekbox'>
                                                                <input id="sixMonth" checked={courseData.offers.findIndex((item) => item.duration === 6) !== -1} onChange={getHalfYearPrice} type="checkbox" />
                                                                <label htmlFor="sixMonth">6 Month</label>
                                                            </div>
                                                            <input type="text" className='courseSubscriptionInput' disabled={true} value={courseData.offers.filter((item) => item.duration === 6)[0]?.price || 0} />
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* course discount (admin only) */}
                        {
                            user?.role === "admin" && (
                                <div className='tableContainer dashboard'>
                                    <div className="tableHeading">
                                        <h2 className="heading">Course Discount</h2>
                                    </div>

                                    <div className='CBContainerBody'>
                                        <div className='flex flex-col gap-2'>
                                            <label>Affiliate Discount</label>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div className="flexColInput">
                                                    <label htmlFor='affiliateDiscount'>Discount (Rs. or %)</label>
                                                    <input
                                                        value={courseData?.affiliate?.discount}
                                                        onChange={(e) => setCourseData(data => ({
                                                            ...data,
                                                            affiliate: {
                                                                ...data.affiliate,
                                                                discount: e.target.value
                                                            }
                                                        }))}
                                                        type="text" placeholder='' id="affiliateDiscount" className='CBInput' />
                                                </div>
                                                <div className="flexColInput">
                                                    <label htmlFor='affiliateDisType'>Type</label>
                                                    <select id="affiliateDisType" className="CBInput"
                                                        value={courseData?.affiliate?.discount_type}
                                                        onChange={(e) => setCourseData(data => ({
                                                            ...data,
                                                            affiliate: {
                                                                ...data.affiliate,
                                                                discount_type: e.target.value
                                                            }
                                                        }))}
                                                    >
                                                        <option value="percent">Percent</option>
                                                        <option value="amount">Amount</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label>Franchise Discount</label>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div className="flexColInput">
                                                    <label htmlFor='franchiseDiscount'>Discount (Rs. or %)</label>
                                                    <input
                                                        value={courseData?.franchise?.discount}
                                                        onChange={(e) => setCourseData(data => ({
                                                            ...data,
                                                            franchise: {
                                                                ...data.franchise,
                                                                discount: e.target.value
                                                            }
                                                        }))}
                                                        type="text" placeholder='' id="franchiseDiscount" className='CBInput' />
                                                </div>
                                                <div className="flexColInput">
                                                    <label htmlFor='franchiseDisType'>Type</label>
                                                    <select id="franchiseDisType" className="CBInput"
                                                        value={courseData?.franchise?.discount_type}
                                                        onChange={(e) => setCourseData(data => ({
                                                            ...data,
                                                            franchise: {
                                                                ...data.franchise,
                                                                discount_type: e.target.value
                                                            }
                                                        }))}
                                                    >
                                                        <option value="percent">Percent</option>
                                                        <option value="amount">Amount</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label>Bussiness Ass. Discount</label>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div className="flexColInput">
                                                    <label htmlFor='businessAssDiscount'>Discount (Rs. or %)</label>
                                                    <input
                                                        value={courseData?.business_associate?.discount}
                                                        onChange={(e) => setCourseData(data => ({
                                                            ...data,
                                                            business_associate: {
                                                                ...data.business_associate,
                                                                discount: e.target.value
                                                            }
                                                        }))}
                                                        type="text" placeholder='' id="businessAssDiscount" className='CBInput' />
                                                </div>
                                                <div className="flexColInput">
                                                    <label htmlFor='businessAssDisType'>Type</label>
                                                    <select id="businessAssDisType" className="CBInput"
                                                        value={courseData?.business_associate?.discount_type}
                                                        onChange={(e) => setCourseData(data => ({
                                                            ...data,
                                                            business_associate: {
                                                                ...data.business_associate,
                                                                discount_type: e.target.value
                                                            }
                                                        }))}
                                                    >
                                                        <option value="percent">Percent</option>
                                                        <option value="amount">Amount</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* category and language  */}
                        <div className='tableContainer dashboard overflowAllow'>
                            <div className="tableHeading">
                                <h2 className="heading">Course Category & Language</h2>
                            </div>

                            <div className='CBContainerBody'>

                                {/* choose category  */}
                                <div className='flexColInput'>
                                    <label>Choose a category</label>
                                    <SelectOption
                                        selectStyle={{
                                            height: "40px",
                                            zIndex: 2000
                                        }}
                                        label={"Select Category"}
                                        onChange={(val) => setCourseData(data => { return { ...data, category: val } })}
                                        options={categories}
                                        textField={"category.name"}
                                        valueField={"category._id"}
                                        value={courseData?.category}
                                    />
                                </div>

                                {/* choose subcategory  */}
                                <div className='flexColInput'>
                                    <label>Choose a subcategory</label>
                                    <SelectOption
                                        selectStyle={{
                                            height: "40px"
                                        }}
                                        label={"Select Sub-Category"}
                                        onChange={(val) => setCourseData(data => { return { ...data, sub_category: val } })}
                                        options={subCategory}
                                        textField={"name"}
                                        valueField={"_id"}
                                        value={courseData?.sub_category}
                                    />
                                    {/* <select
                                        value={courseData?.sub_category}
                                        className='CBInput'>
                                        <option value={""} disabled>Select Class</option>
                                        {subCategory && subCategory?.length > 0 && subCategory.map((subCat) => {
                                            return (
                                                <option key={subCat?._id} value={subCat?._id}>{subCat?.name}</option>
                                            )
                                        })}
                                    </select> */}
                                </div>


                                {/* choose language  */}
                                <div className='flexColInput'>
                                    <label>Choose Language</label>
                                    <SelectOption
                                        selectStyle={{
                                            height: "40px"
                                        }}
                                        label={"Select Language"}
                                        onChange={(val) => setCourseData(data => ({ ...data, course_language: val }))}
                                        options={[
                                            { val: "hinglish", text: "Hinglish" },
                                            { val: "english", text: "English" },
                                            { val: "hindi", text: "Hindi" },
                                        ]}
                                        textField={"text"}
                                        valueField={"val"}
                                        value={courseData?.course_language}
                                    />
                                    {/*                                     
                                    <select
                                        value={courseData?.course_language} 
                                        onChange={(e) => setCourseData(data => { return { ...data, course_language: e.target.value } })}
                                        name="cars" id="cars"
                                        className='CBInput'>
                                        <option value="" disabled={true}>Select Language</option>
                                        <option value="hinglish">Hinglish</option>
                                        <option value="english">English</option>
                                        <option value="hindi">Hindi</option>
                                    </select> */}
                                </div>

                            </div>
                        </div>

                        {/* batch details  */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Batch Details</h2>
                            </div>
                            <div className='CBContainerBody'>

                                <div className='flex flex-col gap-2'>
                                    <label>Batch Timing</label>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='flexColInput'>
                                            <label>Start Time</label>
                                            <input
                                                type="text"
                                                className='GrayedInput'
                                                placeholder='HH:MM AM/PM (Please Enter time in this formate)'
                                                value={courseData?.batch?.batch_timing?.start}
                                                onChange={(e) => setCourseData(data => ({
                                                    ...data,
                                                    batch: {
                                                        ...data.batch,
                                                        batch_timing: {
                                                            ...data.batch.batch_timing,
                                                            start: e.target.value
                                                        }
                                                    }
                                                }
                                                ))}
                                            />
                                            <span className='infoText flexed xs'>
                                                <div>
                                                    <AiOutlineInfoCircle size={14} />
                                                </div>
                                                <span>Format: (HH:MM AM/PM).</span>
                                            </span>
                                        </div>
                                        <div className='flexColInput'>
                                            <label>Batch End Time</label>
                                            <input
                                                type="text"
                                                placeholder='HH:MM AM/PM (Please Enter time in this formate)'
                                                className='GrayedInput'
                                                value={courseData?.batch?.batch_timing?.end}
                                                onChange={(e) => setCourseData(data => ({
                                                    ...data,
                                                    batch: {
                                                        ...data.batch,
                                                        batch_timing: {
                                                            ...data.batch.batch_timing,
                                                            end: e.target.value
                                                        }
                                                    }
                                                }
                                                ))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flexColInput'>
                                    <label>Batch Days</label>
                                    <div className='flex flex-row gap-4 flex-wrap'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input onChange={handleSetBatchDays} type="checkbox" className='llInput sm' id="MON" checked={courseData.batch?.batch_days?.includes(0)} value={0} />
                                            <label htmlFor="MON">MON</label>
                                        </div>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input onChange={handleSetBatchDays} type="checkbox" className='llInput sm' id="TUE" checked={courseData.batch?.batch_days?.includes(1)} value={1} />
                                            <label htmlFor="TUE">TUE</label>
                                        </div>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input onChange={handleSetBatchDays} type="checkbox" className='llInput sm' id="WED" checked={courseData.batch?.batch_days?.includes(2)} value={2} />
                                            <label htmlFor="WED">WED</label>
                                        </div>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input onChange={handleSetBatchDays} type="checkbox" className='llInput sm' id="THU" checked={courseData.batch?.batch_days?.includes(3)} value={3} />
                                            <label htmlFor="THU">THU</label>
                                        </div>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input onChange={handleSetBatchDays} type="checkbox" className='llInput sm' id="FRI" checked={courseData.batch?.batch_days?.includes(4)} value={4} />
                                            <label htmlFor="FRI">FRI</label>
                                        </div>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input onChange={handleSetBatchDays} type="checkbox" className='llInput sm' id="SAT" checked={courseData.batch?.batch_days?.includes(5)} value={5} />
                                            <label htmlFor="SAT">SAT</label>
                                        </div>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input onChange={handleSetBatchDays} type="checkbox" className='llInput sm' id="SUN" checked={courseData.batch?.batch_days?.includes(6)} value={6} />
                                            <label htmlFor="SUN">SUN</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* course settings  */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Course Setting</h2>
                            </div>
                            <div className='CBContainerBody'>

                                <div className='flexColInput'>
                                    <label>Course Start Date</label>
                                    <input
                                        type="date"
                                        className='CBInput'
                                        value={String(courseData?.setting?.start_date).substring(0, 10)}
                                        onChange={(e) => setCourseData(data => {
                                            return {
                                                ...data,
                                                setting: {
                                                    ...data.setting,
                                                    start_date: e.target.value
                                                }
                                            }
                                        })}
                                    />
                                    <span className='infoText xs flexed'>
                                        <div>
                                            <AiOutlineInfoCircle size={18} />
                                        </div>
                                        <span>
                                            Course will start from this date.
                                        </span>
                                    </span>
                                </div>

                                <div className='flexColInput'>
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        className='CBInput'
                                        value={String(courseData?.setting?.end_date).substring(0, 10)}
                                        onChange={(e) => setCourseData(data => {
                                            return {
                                                ...data,
                                                setting: {
                                                    ...data.setting,
                                                    end_date: e.target.value
                                                }
                                            }
                                        })}
                                    />
                                    <span className='infoText xs flexed'>
                                        <div>
                                            <AiOutlineInfoCircle size={14} />
                                        </div>
                                        <span>
                                            Course will end on this date.
                                        </span>
                                    </span>
                                </div>



                            </div>
                        </div>

                        {/* other settings  */}
                        <div className="tableContainer dashboard">
                            <div className="tableHeading">
                                <h2 className="heading">Other Settings</h2>
                            </div>
                            <div className='CBContainerBody'>
                                <h1 className='font-[500] text-[#50545d]'>Total Course Duration</h1>

                                <div className='flexColInput'>
                                    <label htmlFor="" className='text-[#808080] font-[500] px-1'>Hour</label>
                                    <input
                                        onChange={(e) => setCourseData(data => {
                                            return {
                                                ...data,
                                                additional: {
                                                    ...data.additional,
                                                    course_duration: {
                                                        ...data.additional.course_duration,
                                                        hours: Number(e.target.value)
                                                    }
                                                }
                                            }
                                        })}
                                        value={courseData?.additional?.course_duration?.hours}
                                        type="number"
                                        className='CBInput noNumberStyle' />
                                </div>

                                <div className='flexColInput'>
                                    <label>Minute</label>
                                    <input
                                        onChange={(e) => setCourseData(data => {
                                            return {
                                                ...data,
                                                additional: {
                                                    ...data.additional,
                                                    course_duration: {
                                                        ...data.additional.course_duration,
                                                        minute: Number(e.target.value)
                                                    }
                                                }
                                            }
                                        })}
                                        value={courseData?.additional?.course_duration?.minute}
                                        type="number"
                                        className='CBInput noNumberStyle' />
                                </div>


                                <div className='flexColInput'>
                                    <label>Requirements/Instructions</label>
                                    <textarea
                                        onChange={(e) => setCourseData(data => {
                                            return {
                                                ...data,
                                                additional: {
                                                    ...data.additional,
                                                    requirements: e.target.value
                                                }
                                            }
                                        })}
                                        value={courseData?.additional?.requirements}
                                        rows="7"
                                        placeholder='Additional requirements or special instructions for the students (One per line)'
                                        className='CBInput'></textarea>
                                </div>
                            </div>
                        </div>

                        {/* course edit notes */}
                        <div className='tableContainer dashboard'>
                            <div className='tableHeading'>
                                <h2 className='heading'>Course Upload Tips</h2>
                            </div>

                            <div className='p-[20px] flex flex-col text-[#50545d] list-none gap-4'>
                                <div className='courseUploadTip '>
                                    <PiDotOutlineDuotone className='text-[#3e64de]' />
                                    <p>Set the Course Price option or make it free.</p>
                                </div>
                                <div className='courseUploadTip '>
                                    <PiDotOutlineDuotone className='text-[#3e64de]' />
                                    <p>Standard size for the course thumbnail is 700x430.</p>
                                </div>
                                <div className='courseUploadTip '>
                                    <PiDotOutlineDuotone className='text-[#3e64de]' />
                                    <p>Video section controls the course overview video.</p>
                                </div>
                                <div className='courseUploadTip '>
                                    <PiDotOutlineDuotone className='text-[#3e64de]' />
                                    <p>Course Builder is where you create & organize a course.</p>
                                </div>
                                <div className='courseUploadTip '>
                                    <PiDotOutlineDuotone className='text-[#3e64de]' />
                                    <p>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</p>
                                </div>
                                <div className='courseUploadTip '>
                                    <PiDotOutlineDuotone className='text-[#3e64de]' />
                                    <p>Prerequisites refers to the fundamental courses to complete before taking this particular course..</p>
                                </div>
                                <div className='courseUploadTip '>
                                    <PiDotOutlineDuotone className='text-[#3e64de]' />
                                    <p className='p-0 m-0'>Information from the Additional Data section shows up on the course single page.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}


export default EditCourseBuilder