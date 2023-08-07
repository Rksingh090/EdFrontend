import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { RxHamburgerMenu } from 'react-icons/rx';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineHome } from 'react-icons/hi';
import { IoScanOutline } from 'react-icons/io5';
import { GrUserSettings } from 'react-icons/gr';

import { DivOutsideClick } from "../../components/utils/Outsideclick"

import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { sidebarOpen, activeNavMenu } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const toggleFullScreen = async () => {
        if (document?.fullscreenElement === null) {
            await document.documentElement.requestFullscreen()
        }
        else {
            await document.exitFullscreen()
        }
    }

    const handleNavBtnClick = (btnName) => {
        dispatch({ type: "admin/setActiveNavMemu", payload: btnName })
    }

    return (
        <div className={`adminNavbarGrid  ${sidebarOpen ? "open" : "close"}`}>
            <div className='adminNavLogo'>
                <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/logoLandscape.png"} alt="Edtech Name" />
                <p className='adminNavCloseTXT'>LL</p>
            </div>
            <div className={`adminNavbarMain`}>
                <div className='navMain1'>
                    <RxHamburgerMenu className='hmb' onClick={() => dispatch({ type: "admin/toggleSidebar" })} size={24} />
                    <div className='adminNavSearch'>
                        <input type="text" placeholder='Search...' />
                        <AiOutlineSearch size={20} />
                    </div>
                </div>
                <DivOutsideClick onOutsideClick={() => dispatch({ type: "admin/hideActiveMenus" })} className='navMain2'>
                    <Link to="/" ><HiOutlineHome size={24} /></Link>
                    <IoScanOutline onClick={() => toggleFullScreen()} size={22} />
                    <div className="adminNavIcon" >
                        <BsThreeDotsVertical size={23} onClick={() => handleNavBtnClick("profile")} />
                        <div className={`navAbsBox profile ${activeNavMenu === "profile" ? "show" : ""}`}>
                            <Link to={"/affiliate/profile"}>
                                <GrUserSettings />
                                <span>Profile</span>
                            </Link>
                            <div onClick={() => {
                                dispatch({ type: "user/UserLogOut" })
                                navigate("/login")
                            }}>
                                <AiOutlineLogout />
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                </DivOutsideClick>
            </div>
        </div>
    )
}

export default Navbar