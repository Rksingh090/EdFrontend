import React from 'react'
import { BiBookAlt } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'

import { AiOutlineLoading3Quarters } from 'react-icons/ai'



const ItemViewWrapper = ({ loading, validAccess, children }) => {

    const { course_id, course_slug } = useParams()

    if (loading) {
        return (
            <div className="loadingFullSizeWrapper">
                <AiOutlineLoading3Quarters className="spin360" size={40} />
            </div>
        )
    }

    return validAccess ? children :
        (
            <div className="loadingFullSizeWrapper">
                <div className='notAuthorizedView'>
                    <p className='notAuthorizedTitle'>You don't have access to this content.</p>
                    <p className='notAuthorizedTitle lgBold'>Enroll in this course to get access.</p>
                    <Link className='notAuthorizedBtn' to={`/course/${course_id}/${course_slug}`}>
                        <BiBookAlt size={20} />
                        <span>Buy Now</span>
                    </Link>
                </div>
            </div>
        )
}

export default ItemViewWrapper