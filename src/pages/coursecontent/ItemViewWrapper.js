import React from 'react'
import { BiBookAlt } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'

const ItemViewWrapper = ({ validAccess, children }) => {

    const { course_id, course_slug } = useParams()

    return (
        <>
            {
                validAccess ?
                    (

                        <>
                            {children}
                        </>
                    )
                    :
                    (
                        <div className='notAuthorizedView'>
                            <p className='notAuthorizedTitle'>You are not authorized to access this content.</p>
                            <p className='notAuthorizedTitle lgBold'>Buy Course to Get Access</p>
                            <Link className='notAuthorizedBtn' to={`/course/${course_id}/${course_slug}`}>
                                <BiBookAlt size={20} />
                                <span>Buy Now</span>
                            </Link>
                        </div>
                    )
            }
        </>
    )
}

export default ItemViewWrapper