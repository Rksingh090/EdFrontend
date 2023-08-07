import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'

const Breadcrumb = ({ type, breadcrumbData }) => {

    return (
        <div className='Breadcrumb'>
            <Link to={`/${type || "admin" }/dashboard`} className='homeBreadCrumb'>
                <AiFillHome className='mt-[-3px]' size={20} />
                <p>Home</p>
            </Link>
            {breadcrumbData &&
                breadcrumbData.length > 0
                && breadcrumbData.map((bc, idx) => (
                    <React.Fragment key={idx}>
                        <div className="bcSeparator"><IoIosArrowForward /></div>
                        {
                            bc?.noclick ? (
                                <Link to={bc?.link} className='disabledLink'>
                                    <p>{bc?.text}</p>
                                </Link>

                            ) : (
                                <Link to={bc?.link}>
                                    <p>{bc?.text}</p>
                                </Link>

                            )
                        }
                    </React.Fragment>
                ))
            }
        </div >
    )
}

export default Breadcrumb