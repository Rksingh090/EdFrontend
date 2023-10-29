import React from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { BsQuestionSquare, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { LuPlayCircle } from 'react-icons/lu';
import { CiStickyNote } from 'react-icons/ci';


const IconByItemType = ({ type, video_type, size }) => {
    return (
        <div>
            {type === "Quiz" && (
                <BsQuestionSquare size={size || 18} />
            )}
            {type === "Assignment" && (
                <BsReverseLayoutTextSidebarReverse size={size || 18} />
            )}
            {type === "Lesson" && video_type === "none" && (
                <CiStickyNote size={size || 20} />
            )}
            {type === "Lesson" && video_type === "html5" && (
                <LuPlayCircle size={size || 20} />
            )}
            {type === "Lesson" && video_type === "youtube" && (
                <AiOutlineYoutube size={size || 20} />
            )}

        </div>
    )
}

export default IconByItemType