import React from 'react'
import { BsPatchQuestion } from 'react-icons/bs'
import { GrNotes } from 'react-icons/gr'
import { LuPlayCircle } from 'react-icons/lu'
import { MdOutlineAssignment } from 'react-icons/md'


const IconByItemType = ({ type, video_type }) => {
    return ( 
        <div>
            {type === "Quiz" && (
                <BsPatchQuestion size={20} />
            )}
            {type === "Assignment" && (
                <MdOutlineAssignment size={20} />
            )}
            {type === "Lesson" && video_type === "none" && (
                <GrNotes size={20} />
            )}
            {type === "Lesson" && video_type !== "none" && (
                <LuPlayCircle size={20} />
            )}

        </div>
    )
}

export default IconByItemType