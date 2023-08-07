import React from 'react'
import Sidebar from './Sidebar'
import BussinessAssNavbar from './Navbar';

import { useSelector } from 'react-redux';


const BussinessAssBase = ({ children }) => {
  const { sidebarOpen } = useSelector(state => state.admin);

  return (
    <div className='admin'>
      <BussinessAssNavbar />
      <div className={`adminMainSection ${sidebarOpen ? "open" : "close"}`}>
        <Sidebar />
        <div className='adminContent'>
          {children}
        </div>
      </div>
    </div>
  )
}
export default BussinessAssBase