import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import AdminNavbar from './Navbar';

import './adminbase.css';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminBase = ({ children }) => {
  const navigate = useNavigate();

  const [isUserValid, setIsUserValid] = useState(false);
  
  const { sidebarOpen } = useSelector(state => state.admin);
  const { user,userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userLoading && user?.role !== "admin") {
      navigate("/")
    } else {
      setIsUserValid(true)
    }
  }, [navigate, user.role, userLoading])

  return (
    <div className='admin'>
      {
        isUserValid ?
          (
            <>

              <AdminNavbar />
              <div className={`adminMainSection ${sidebarOpen ? "open" : "close"}`}>
                <Sidebar />
                <div className='adminContent'>
                  {children}
                </div>
              </div>
            </>
          )
          :
          (
            <div>Loading..</div>
          )
      }
    </div>
  )
}
export default AdminBase