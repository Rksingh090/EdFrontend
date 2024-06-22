import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import AdminNavbar from './Navbar';

import './adminbase.css';

import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatContext from '../../context/ChatContext';


const AdminBase = () => {
  const navigate = useNavigate();

  const [isUserValid, setIsUserValid] = useState(false);

  const { sidebarOpen } = useSelector(state => state.admin);
  const { user, userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userLoading && user?.role !== "admin") {
      navigate("/")
    } else {
      setIsUserValid(true)
    }
  }, [navigate, user.role, userLoading])

  return (
    <ChatContext>
      <div className='admin'>
        {
          isUserValid ?
            (
              <>

                <AdminNavbar />
                <div className={`adminMainSection ${sidebarOpen ? "open" : "close"}`}>
                  <Sidebar />
                  <div className='adminContent'>
                    <Outlet />
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
    </ChatContext>

  )
}
export default AdminBase