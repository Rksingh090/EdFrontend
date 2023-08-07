import React from 'react'
import Sidebar from './Sidebar'
import AffiliateNavbar from './Navbar';


import { useSelector } from 'react-redux';


const AffiliateBase = ({ children }) => {
  const { sidebarOpen } = useSelector(state => state.admin);

  return (
    <div className='admin'>
      <AffiliateNavbar />
      <div className={`adminMainSection ${sidebarOpen ? "open" : "close"}`}>
        <Sidebar />
        <div className='adminContent'>
          {children}
        </div>
      </div>
    </div>
  )
}
export default AffiliateBase