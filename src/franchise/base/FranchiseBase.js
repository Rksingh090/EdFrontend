import React from 'react'
import Sidebar from './Sidebar'
import FranchiseNavbar from './Navbar';


import { useSelector } from 'react-redux';


const FranchiseBase = ({ children }) => {
  const { sidebarOpen } = useSelector(state => state.admin);

  return (
    <div className='admin'>
      <FranchiseNavbar />
      <div className={`adminMainSection ${sidebarOpen ? "open" : "close"}`}>
        <Sidebar />
        <div className='adminContent'>
          {children}
        </div>
      </div>
    </div>
  )
}
export default FranchiseBase