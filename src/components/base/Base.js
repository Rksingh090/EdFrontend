import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Base = ({ children, noFooter, clearScrollSticky, className }) => {
  return (
    <div className={`w-full ${className}`} >
        <Navbar clearScrollSticky={clearScrollSticky} />
        <div className='baseBody'>
            {children}
        </div>
        {!noFooter && <Footer/>}
       
    </div>
  )
}

export default Base