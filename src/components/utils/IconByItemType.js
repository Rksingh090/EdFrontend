import React from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { BsDashLg, BsQuestionSquare, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { LuPlayCircle } from 'react-icons/lu';
import { CiStickyNote } from 'react-icons/ci';


const IconByItemType = ({ type, video_type, size }) => {
    let item_type = String(type).toLocaleLowerCase()
    return (
        <div>
            {item_type === "quiz" && (
                <BsQuestionSquare size={size || 18} />
            )}
            {item_type === "assignment" && (
                <BsReverseLayoutTextSidebarReverse size={size || 18} />
            )}
            {item_type === "lesson" && video_type === "none" && (
                <CiStickyNote size={size || 20} />
            )}
            {item_type === "lesson" && video_type === "html5" && (
                <LuPlayCircle size={size || 20} />
            )}
            {item_type === "lesson" && video_type === "youtube" && (
                <AiOutlineYoutube size={size || 20} />
            )}
            {item_type === "lesson" && video_type === "external-url" && (
                <LuPlayCircle size={size || 20} />
            )}
            {item_type === "other" && (
                <BsDashLg size={size || 20} />
            )}

        </div>
    )
}

export default IconByItemType