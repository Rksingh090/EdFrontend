import React from 'react'
import { Link } from 'react-router-dom'

const ErrorBase = ({ img, heading, subheading }) => {
    return (
        <div className='errorPageContainer'>
            <div className="errorPage">
                <div className='sideOne'>
                    <img src={img} alt="" />
                </div>
                <div className='sideTwo'>
                    <h2 className='heading'>{heading}</h2>
                    <p className='subHeading'>{subheading}</p>
                    <Link to={-1} className='homePageBTN'>Go Back</Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorBase