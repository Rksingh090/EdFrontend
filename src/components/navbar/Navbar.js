import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleSidebar, toggleNavProfile } from '../../reducers/AppSettingReducer'

import { CgMenuRight } from 'react-icons/cg'
import { AiFillPlusSquare, AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'
   ;
import { UserLogOut } from '../../reducers/UserReducer';

import { DivOutsideClick } from '../utils/Outsideclick';
import { hideNavProfile } from '../../reducers/AppSettingReducer'
import { createNewCourse } from '../../functions/createNewCourse';
import { addCourse } from '../../reducers/CourseReducer';

const Navbar = ({ showSideMenu, clearScrollSticky }) => {
   const dispatch = useDispatch();
   const { dropdown: { mobileCourseDD, mobileMenu } } = useSelector(state => state.appsetting);
   const { user } = useSelector(state => state.user);

   const [currMobileCourseMenu, setCurrMobileCourseMenu] = useState("");

   const { loggedIn } = useSelector(state => state.user);

   const handleSidebarToggle = () => {
      dispatch(toggleSidebar())
   }

   const [isSticky, setIsSticky] = useState(true);

   useEffect(() => {
      const handleScroll = () => {
         setIsSticky(window.pageYOffset > 80);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   useEffect(() => {
      if (clearScrollSticky && clearScrollSticky === true) {
         setIsSticky(false)
      }
   }, [clearScrollSticky])


   const handleHideAllMobileMenu = () => {
      dispatch({ type: "appsetting/hideAllNavMenu" })
   }

   const toggleMobileCourseMenu = (item) => {
      setCurrMobileCourseMenu(prev => item === prev ? "" : item);
   }

   return (
      <div className={`navbarMainContainer ${clearScrollSticky === true ? `fixedNav ${isSticky ? "whiteBG" : "transparentBG"}` : `whiteBG ${isSticky ? "sticky top-0 left-0" : ""}`}`}>
         <div className='navbar'>
            <div className='flex items-center gap-3'>
               {showSideMenu &&
                  <div className='sideMenu' onClick={handleSidebarToggle}>
                     <AiOutlineMenu size={28} />
                  </div>
               }
               <Link to={"/"} className='mainNavLogo'>
                  &lt;EduTech /&gt;
               </Link>
            </div>

            <div className='menuBtn'>
               <div className='' onClick={() => dispatch({ type: "appsetting/showMobileMenu" })}>
                  <CgMenuRight size={28} />
               </div>
            </div>

            <div className='listright'>
               <ul className='navlinks'>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/courses">Course</Link></li>
                  <li><Link to="/maintenance">Store</Link></li>
                  <li><Link to="/maintenance">Career</Link></li>
                  <li><Link to="/about"> About Us</Link></li>
               </ul>
            </div>

            {!loggedIn && (
               <div className='navLoginBtn'>
                  <Link to={"/login"}>Login</Link>
               </div>
            )}

            {loggedIn && user?.role === "admin" && (
               <div className='navLoginBtn'>
                  <Link to={"/admin/dashboard"}>Admin</Link>
               </div>
            )}

            {loggedIn && user?.role === "franchise" && (
               <div className='navLoginBtn'>
                  <Link to={"/franchise/dashboard"}>Franchise</Link>
               </div>
            )}

            {loggedIn && user?.role === "affiliate" && (
               <div className='navLoginBtn'>
                  <Link to={"/affiliate/dashboard"}>Affiliate</Link>
               </div>
            )}

            {loggedIn && ["student", "teacher"].includes(user?.role) && (
               <NavProfileMenu />
            )}

         </div>

         <div className={`${mobileMenu ? "active" : "deactive"} mobileMenu`}>
            <div className='mobileNavHeading'>
               <div></div>
               <h2 className='heading'>Edtech Name</h2>
               <IoMdClose size={25} onClick={handleHideAllMobileMenu} />
            </div>
            <ul className={'mob-navlinks'}>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/courses">Courses</Link></li>
               <li><Link to="/">Be a Partner</Link></li>
               <li><Link to="/maintenance">Career</Link></li>
               <li><Link to="/about"> About Us</Link></li>
            </ul>
         </div>
      </div>
   )
}

const NavProfileMenu = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const { loggedIn, user } = useSelector(state => state.user);
   const { showNavProfile } = useSelector(state => state.appsetting);

   const handleCreateNewCourse = async () => {
      const courseRes = await createNewCourse();
      const { status, course } = courseRes.data;
      if (status === "success") {
         dispatch(addCourse({ course: course }));
         navigate(`/teacher/edit-course/${course._id}`);
      }
   }


   return (
      <div className='navProfile'>

         {loggedIn ? (
            <div className='navAvatarImg' onClick={() => dispatch(toggleNavProfile())}>
               <img src={user?.dp || "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="" />
            </div>
         ) : (<></>)}

         {showNavProfile && (
            <DivOutsideClick className='navProfileMenus' onOutsideClick={() => showNavProfile === true ? dispatch(hideNavProfile()) : {}}>

               <div className='createNewCourseBtn'>
                  {user?.role && user.role === "teacher" ? (
                     <div className='newCourseBtn'>
                        <div>
                           <AiFillPlusSquare size={35} color={"white"} />
                           <h2>Create A New Course</h2>
                           <p>Get Started with topics, lessons and more.</p>
                           <button onClick={handleCreateNewCourse}>
                              <MdOutlineArrowForwardIos size={22} />
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className='newCourseBtn studentView'>
                        <div>
                           <h3 className='text-sm text-white'>Welcome,</h3>
                           <h4 className='text-2xl text-gray-100'>{user?.first_name} {user?.last_name}</h4>
                           <p className='text-base mt-3 text-gray-100'>Discover the power of personalized learning with Edtech Name.</p>
                           <Link to="/dashboard">
                              <MdOutlineArrowForwardIos size={22} />
                           </Link>
                        </div>
                     </div>
                  )}
               </div>

               {user?.role && user.role === "student" && (
                  <div className='profileLinks'>
                     <div>
                        <Link to={"/dashboard"}>Dashboard</Link>
                        <Link to={"/student/profile"}>My Profile</Link>
                        <Link to={"/student/enrolled-courses/"}>Enrolled Courses</Link>
                        <Link to={"/student/wishlist"}>Wishlist</Link>
                        <Link to={"/student/reviews"}>Reviews</Link>
                        <Link to={"/student/quiz-attempts"}>Quiz Attempts</Link>
                     </div>
                     <div>
                        <Link to={"/student/order-history"}>Order History</Link>
                        <Link to={"/student/question-answer"}>Questio & Ans.</Link>
                        <Link to={"/student/calender"}>Calendar</Link>
                        <Link to={"/settings"}>Setting</Link>
                        <button type='button' onClick={(e) => {
                           dispatch(UserLogOut())
                           navigate("/login");
                        }}>Logout</button>
                     </div>
                  </div>
               )}
               {user?.role && user.role === "teacher" && (
                  <div className='profileLinks'>
                     <div>
                        <Link to={"/teacher/profile"}>Profile</Link>
                        <Link to={"/teacher/course"}>My Course</Link>
                        <Link to={"/teacher/events"}>Events</Link>
                        <Link to={"/teacher/quiz"}>Quiz</Link>
                        <Link to={"/teacher/announcement"}>Announcement</Link>
                        <Link to={"/teacher/assignment"}>Assignments</Link>
                        <Link to={"/teacher/analytics"}>Analytics</Link>
                     </div>
                     <div>
                        <Link to={"/teacher/zoom"}>Zoom Meeting</Link>
                        <Link to={"/teacher/withdrawls"}>Withdrawls</Link>
                        <Link to={"/settings"}>Setting</Link>
                        <button type='button' onClick={() => {
                           dispatch(UserLogOut())
                           navigate("/login");
                        }}>Logout</button>
                     </div>

                  </div>
               )}

            </DivOutsideClick>
         )}
      </div>
   )
}

export default Navbar