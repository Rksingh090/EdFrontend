import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Base = ({ children, noFooter, clearScrollSticky, className, bodyClass }) => {
  return (
    <div className={`w-full mainBaseContainer ${className || ""}`} >
      <Navbar clearScrollSticky={clearScrollSticky} />
      <div className={`baseBody ${bodyClass || ""}`}>
        {children}
      </div>
      {!noFooter && <Footer />}

    </div>
  )
}

export default Base