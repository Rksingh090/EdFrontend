import React, { useMemo, useState } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineStorefront } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineUser } from 'react-icons/ai';
import { RiBookLine, RiCouponLine } from 'react-icons/ri';
import { TbUsers } from 'react-icons/tb';
import { BiLayout, BiMessageRoundedDots } from 'react-icons/bi';
import { GrUserSettings } from 'react-icons/gr';
import { FiDollarSign } from 'react-icons/fi';


import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuNetwork } from 'react-icons/lu';

const Sidebar = () => {
    const urlPath = useMemo(() => window.location.pathname, []);
    
    const {user} = useSelector((state) => state.user);

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
            link: "/admin/dashboard"
        },
        {
            type: "button",
            title: "Teachers",
            Icon: AiOutlineUser,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Teachers",
                    link: "/admin/teachers"
                },
                {
                    type: "link",
                    title: "Add Teacher",
                    link: "/admin/teacher/add"
                }
            ]
        },
        {
            type: "button",
            title: "Students",
            Icon: TbUsers,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Students",
                    link: "/admin/student"
                },
                {
                    type: "link",
                    title: "Add Student",
                    link: "/admin/student/add"
                }
            ]
        },
        {
            type: "button",
            title: "Course",
            Icon: RiBookLine,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Courses",
                    link: "/admin/course"
                },
                {
                    type: "link",
                    title: "Add Course",
                    link: "/admin/course/add"
                }
            ]
        },
        {
            type: "button",
            title: "Staff",
            Icon: GrUserSettings,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Staffs",
                    link: "/admin/staff"
                },
                {
                    type: "link",
                    title: "Add Staffs",
                    link: "/admin/staff/add"
                }
            ]
        },
        {
            type: "button",
            title: "Affiliate",
            Icon: LuNetwork,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Affiliates",
                    link: "/admin/affiliate"
                },
                {
                    type: "link",
                    title: "Add Affiliate",
                    link: "/admin/affiliate/add"
                }
            ]
        },
        {
            type: "link",
            title: "User Query",
            Icon: BiMessageRoundedDots,
            hasMenu: false,
            link:"/admin/user-query"
        },
        {
            type: "button",
            title: "Partners",
            Icon: MdOutlineStorefront,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Franchise",
                    link: "/admin/franchise"
                },
                {
                    type: "link",
                    title: "Add Franchise",
                    link: "/admin/franchise/add"
                }
            ]
        },
        {
            type: "button",
            title: "Coupon",
            Icon: RiCouponLine,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Coupon",
                    link: "/admin/coupon"
                },
                {
                    type: "link",
                    title: "Add Coupon",
                    link: "/admin/coupon/add"
                },
                {
                    type: "link",
                    title: "Edit Coupon",
                    link: "/admin/coupon/edit"
                },
                {
                    type: "link",
                    title: "Coupon Details",
                    link: "/admin/coupon/details"
                }
            ]
        },
        {
            type: "button",
            title: "Department",
            Icon: BiLayout,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "All Departments",
                    link: "/admin/email"
                },
                {
                    type: "link",
                    title: "Add Department",
                    link: "/admin/department/add"
                },
                {
                    type: "link",
                    title: "Edit Department",
                    link: "/admin/department/about"
                }
            ]
        },
        {
            type: "button",
            title: "Fees",
            Icon: FiDollarSign,
            hasMenu: true,
            submenu: [
                {
                    type: "link",
                    title: "Fees Collection",
                    link: "/admin/fees"
                },
                {
                    type: "link",
                    title: "Add Fee",
                    link: "/admin/fees/add"
                },
                {
                    type: "link",
                    title: "Fee Receipt",
                    link: "/admin/fees/receipt"
                }
            ]
        }
    ], [])

    return (
        <div className={`adminSidebar ${sidebarOpen ? "open" : "close"}`}>
            <div className={`sidebarAvatar ${!sidebarOpen ? "hidden" : "flex"}`}>
                <img src={user.dp ? user?.dp : "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/homeGirl.d9eeaffee7b085135ccc+(1).png"} alt="" className='imkl' />
                <h2>Rishab Singh</h2>
                <p>Administrator</p>
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
                                                        className={`${urlPath.includes(submenuItem?.link) ? "active" : ""}`}>
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