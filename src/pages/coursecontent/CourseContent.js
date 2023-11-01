import React from 'react';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const CourseContent = () => {
    const { user } = useSelector(({ user }) => user)
    const data = useOutletContext();
    return (
        <div className='courseWelcomPage'>
            <div className="courseWelcomWrapper">
                <BsReverseLayoutTextSidebarReverse size={50} className='CCwelcomeIcon' />
                <div className='courseContentWelocomePage'>
                    <h3 className='subtitle'>{data.title} </h3>
                    <h2 className='title'>Welcome back {user?.first_name} {user?.last_name}!</h2>
                </div>
            </div>
        </div>
    )
}


export default CourseContent;