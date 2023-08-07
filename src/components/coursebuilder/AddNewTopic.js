import { useState } from "react";
import ModalForm from "../utils/ModalForm";

import { RxCross1 } from "react-icons/rx";
import { FiInfo } from "react-icons/fi";
import { useCourse } from "../../context/CourseBuilderProvider";
import Switch from "../utils/Switch";

// add new topic form 
const AddNewTopic = ({ value, onClose, onSubmit }) => {
    const { topicData, setTopicData, topicUpdateData, updateTopicById } = useCourse();

    const handleSubmit = () => {
        if (topicUpdateData.isEditType) {
            updateTopicById(topicData?._id, topicData)
        } else {
            onSubmit(topicData);
            setTopicData({
                title: "",
                description: "",
                items: []
            })
        }
    }

    return (
        <ModalForm visible={value}>
            <div className='topicModalFormDiv'>
                <div className='topicHeading'>
                    <h2>Add Topic</h2>
                    <RxCross1 onClick={() => onClose()} size={22} />
                </div>
                <div className='topicBody'>
                    <div className='topicBodyWidthGuider'>
                        <div>
                            <input type="text" placeholder='Topic Title' value={topicData.title} onChange={(e) => setTopicData({ ...topicData, title: e.target.value })} />
                            <div className='cardInputInfo'>
                                <FiInfo size={18} />
                                <span>Topic titles are displayed publicly wherever required. Each topic may contain one or more lessons, quiz and assignments.</span>
                            </div>
                        </div>
                        <div>
                            <textarea rows="6" placeholder='Topic Description' value={topicData.description} onChange={(e) => setTopicData({ ...topicData, description: e.target.value })}></textarea>
                            <div className="cardInputInfo">
                                <FiInfo size={18} />
                                <span>Add a summary of short text to prepare students for the activities for the topic. The text is shown on the course page beside the tooltip beside the topic name.</span>
                            </div>
                        </div>
                        <div>
                            <p>Preview Available.</p>
                            <Switch value={topicData.preview_available} onChange={(value) => setTopicData(prev => ({ ...prev, preview_available: value }))} />
                        </div>
                    </div>
                </div>
                <div className='topicFooter'>
                    <div className='topicFooterWidthGuider'>
                        <button type="button" className="btn cusCancle" onClick={() => onClose()}>Cancle</button>
                        <button type="button" className="btn cusSubmit" onClick={() => handleSubmit()}>{topicUpdateData.isEditType ? "Update" : "Submit"}</button>
                    </div>
                </div>
            </div>
        </ModalForm>
    )
}


export default AddNewTopic;