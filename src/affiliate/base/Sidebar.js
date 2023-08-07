import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { IoBarcodeOutline } from 'react-icons/io5';
import { TbMoneybag } from 'react-icons/tb';
import { LuLink } from 'react-icons/lu';
import { HiOutlineUsers } from 'react-icons/hi2';

const Sidebar = () => {
    const urlPath = useMemo(() => window.location.pathname, []);

    const { user } = useSelector(state => state.user);

    const [activeSubMenu, setActiveSubmenu] = useState("dashboard")
    const { sidebarOpen } = useSelector(state => state.admin);

    const handleMouseEnter = (value) => {
        if (sidebarOpen) return;
        setActiveSubmenu(prev => prev === value ? "" : value);
    }

    const handleMouseLeave = (value) => {
        if (sidebarOpen) return;
        setActiveSubmenu(prev => prev === value ? "" : value);
    }

    const handleActiveMenu = (value) => {
        if (!sidebarOpen) return;
        setActiveSubmenu(prev => prev === value ? "" : value);
    }

    const sidebarData = useMemo(() => [
        {
            type: "link",
            title: "Dashboard",
            Icon: RxDashboard,
            link: "/affiliate/dashboard"
        },
        {
            type: "link",
            title: "Coupons",
            Icon: IoBarcodeOutline,
            link: "/affiliate/coupon"
        },
        {
            type: "link",
            title: "Create Coupon",
            Icon: LuLink,
            link: "/affiliate/create-coupon"
        },
        {
            type: "link",
            title: "Sales",
            Icon: TbMoneybag,
            link: "/affiliate/sales"
        },

        {
            type: "link",
            title: "Student",
            Icon: HiOutlineUsers,
            link: "/affiliate/student"
        }
    ], []);

    return (
        <div className={`adminSidebar ${sidebarOpen ? "open" : "close"}`}>
            <div className={`sidebarAvatar ${!sidebarOpen ? "hidden" : "flex"}`}>
                <img src={user.dp ? user?.dp : "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/homeGirl.d9eeaffee7b085135ccc+(1).png"} alt="" className='imkl' />
                <h2>{user?.first_name} {user?.last_name}</h2>
                <p>Affiliate</p>
            </div>

            <ul className="adminSidebarUL">
                {sidebarData.map((listItem, idx) => {
                    let totalSubmenuItems = listItem?.submenu?.length || 0;
                    let totalHeight = totalSubmenuItems * 60;
                    return (
                        <li
                            key={idx}
                            onMouseEnter={() => listItem.hasMenu ? handleMouseEnter(listItem.title) : null}
                            onMouseLeave={() => listItem.hasMenu ? handleMouseLeave(listItem.title) : null}
                        >
                            {
                                listItem?.type === "button" ?
                                    (
                                        <button
                                            onClick={() => handleActiveMenu(listItem?.title)}

                                        >
                                            <div className='linkTextIcon'>
                                                {<listItem.Icon />}
                                                <span>{listItem?.title}</span>
                                            </div>
                                            {listItem.hasMenu && <MdOutlineKeyboardArrowRight className={`arrowIOS ${activeSubMenu === listItem?.title ? "active" : "inactive"}`} />}
                                        </button>
                                    )
                                    :
                                    (
                                        <Link
                                            to={listItem?.link}
                                            className={listItem?.link === urlPath ? "active" : ""}
                                        >
                                            <div className='linkTextIcon'>
                                                {<listItem.Icon />}
                                                <span>{listItem?.title}</span>
                                            </div>
                                        </Link>

                                    )
                            }
                            {
                                listItem?.hasMenu && (
                                    <ul
                                        style={{
                                            height: sidebarOpen ? activeSubMenu === listItem?.title ? `${totalHeight}px` : "0px" : `${totalHeight}px`
                                        }}
                                        className={`sidebarSubmenu ${sidebarOpen ? "open" : "close"} ${activeSubMenu === listItem?.title ? "showAbsMenu" : ""}`}>
                                        {listItem?.submenu &&
                                            listItem?.submenu.length > 0 &&
                                            listItem?.submenu.map((submenuItem, subMenuIdx) => (
                                                <li
                                                    className={`submenuLink`}
                                                    key={subMenuIdx}>
                                                    <Link
                                                        to={submenuItem?.link}
                                                        className={`${submenuItem?.link === urlPath ? "active" : ""}`}>
                                                        {submenuItem?.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </li>
                    )
                })}
            </ul>

        </div>


    )
}

export default Sidebar