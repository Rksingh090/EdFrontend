import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Base = ({ children, noFooter, sticky, className, bodyClass }) => {
  return (
    <div className={`w-full mainBaseContainer ${className || ""}`} >
      <Navbar sticky={sticky} />
      <div className={`baseBody ${bodyClass || ""}`}>
        {children}
      </div>
      {!noFooter && <Footer />}

    </div>
  )
}

export default Base