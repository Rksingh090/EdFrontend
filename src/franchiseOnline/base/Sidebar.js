import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { BsCurrencyDollar } from 'react-icons/bs';
import { IoBarcodeOutline } from 'react-icons/io5';
import { FiRefreshCw } from 'react-icons/fi';
import { GrMoney } from 'react-icons/gr';
import { HiOutlineUserGroup } from 'react-icons/hi';

const Sidebar = () => {
    const urlPath = useMemo(() => window.location.pathname, []);

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
            link: "/franchiseOnline/dashboard"
        },
        {
            type: "link",
            title: "Earning",
            Icon: BsCurrencyDollar,
            link: "/franchiseOnline/earning"
        },
        {
            type: "link",
            title: "Coupons",
            Icon: IoBarcodeOutline,
            link: "/franchiseOnline/coupon"
        },
        {
            type: "link",
            title: "Reference",
            Icon: FiRefreshCw,
            link: "/franchiseOnline/reference"
        },
        {
            type: "link",
            title: "Business Amm.",
            Icon: GrMoney,
            link: "/franchiseOnline/bussiness-amount"
        },
        {
            type: "link",
            title: "Student",
            Icon: HiOutlineUserGroup,
            link: "/franchiseOnline/student"
        }

    ], [])

    return (
        <div className={`adminSidebar ${sidebarOpen ? "open" : "close"}`}>
            <div className={`sidebarAvatar ${!sidebarOpen ? "hidden" : "flex"}`}>
                <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/homeGirl.d9eeaffee7b085135ccc+(1).png"} alt="" className='imkl' />
                <h2>Franchise Name</h2>
                <p>Franchise</p>
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