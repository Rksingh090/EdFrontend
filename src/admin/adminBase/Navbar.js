import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { RxHamburgerMenu } from 'react-icons/rx';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineHome } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoScanOutline } from 'react-icons/io5';
import { VscMail } from 'react-icons/vsc';
import { GrUserSettings } from 'react-icons/gr';
import { SlSettings } from 'react-icons/sl';
import { BiLockAlt } from 'react-icons/bi';

import { DivOutsideClick } from "../../components/utils/Outsideclick"

import { Link, useNavigate } from 'react-router-dom';
import { MdLanguage } from 'react-icons/md';

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
                    <div className='languageSelect adminNavIcon'>
                        <MdLanguage size={25} onClick={() => handleNavBtnClick("language")} />
                        <div className={`navAbsBox language ${activeNavMenu === "language" ? "show" : ""}`}>
                            <p>English</p>
                            <p>Hindi</p>
                            <p>Bengali</p>
                            <p>Marathi</p>
                        </div>
                    </div>
                    {/* notification  */}
                    <div className='adminNavIcon'>
                        <IoMdNotificationsOutline size={25} onClick={() => handleNavBtnClick("notification")} />
                        <div className={`navAbsBox notification ${activeNavMenu === "notification" ? "show" : ""}`}>
                            <div className='notificationHead'>
                                <h4>Notifications</h4>
                            </div>
                            <div className='navNotificationArea'>
                                <div className="singleNotification">
                                    <p className='ntfn'>You have a new follower !</p>
                                    <p className="ntfnTime">just now</p>
                                </div>
                                <div className="singleNotification">
                                    <p className='ntfn'>Hello, First notification is here !</p>
                                    <p className="ntfnTime">2 sec</p>
                                </div>
                                <div className="singleNotification">
                                    <p className='ntfn'>Congrats !!!</p>
                                    <p className="ntfnTime">6 mins</p>
                                </div>
                            </div>
                            <div className='notificationFooter'>
                                <a href="/all/notification">All Notifications</a>
                            </div>
                        </div>
                    </div>
                    <div className='adminNavIcon'>
                        <VscMail size={25} onClick={() => handleNavBtnClick("mail")} />
                        <div className={`navAbsBox notification ${activeNavMenu === "mail" ? "show" : ""}`}>
                            <div className='notificationHead'>
                                <h4>Messages</h4>
                            </div>
                            <div className='navNotificationArea'>
                                <div className="singleMessage">
                                    <div className='msgProfile'>
                                        <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/harminder-sir.jpeg"} alt="" />
                                    </div>
                                    <div className="msgWithSenderTime">
                                        <div className='senderMsg'>
                                            <strong className='sender'>Rishab Singh</strong>
                                            <p className='msg'>Hello, Sir !!</p>
                                        </div>
                                        <p className="msgTime">just now</p>
                                    </div>
                                </div>
                            </div>
                            <div className='notificationFooter'>
                                <a href="/all/notification">All Messages</a>
                            </div>
                        </div>
                    </div>
                    {/* <div className='adminNavProfile adminNavIcon'>
                        <div className='navProfileBtn'>
                            <div className='avatar'>
                                <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/logoLandscape.png"} alt="profile avatar" />
                            </div>
                            <p>Dinesh Kumar Jain</p>
                        </div>
                    </div> */}
                    <div className="adminNavIcon" >
                        <BsThreeDotsVertical size={23} onClick={() => handleNavBtnClick("profile")} />
                        <div className={`navAbsBox profile ${activeNavMenu === "profile" ? "show" : ""}`}>
                            <div>
                                <GrUserSettings />
                                <span>Profile</span>
                            </div>
                            <div>
                                <SlSettings />
                                <span>Setting</span>
                            </div>
                            <div>
                                <BiLockAlt />
                                <span>Lock</span>
                            </div>
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