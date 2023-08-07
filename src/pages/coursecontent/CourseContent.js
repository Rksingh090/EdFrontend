import React from 'react';
import CourseContentBase from './CourseContentBase';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';

const CourseContent = () => {
    return (
        <CourseContentBase>
            <div className='courseWelcomPage'>
                <BsReverseLayoutTextSidebarReverse size={50} className='CCwelcomeIcon' />
                <h2>Welcome Back to Course!</h2>
            </div>
        </CourseContentBase>
    )
}


export default CourseContent