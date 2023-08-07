import React from 'react'
import Sidebar from './Sidebar'
import FranchiseNewNavbar from './Navbar';

import './franchiseBase.css';
import "../../styles/utils.css";

import { useSelector } from 'react-redux';


const FranchiseNewBaseOnline = ({ children }) => {
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
export default FranchiseNewBaseOnline;