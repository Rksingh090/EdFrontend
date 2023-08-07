import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleSidebar, toggleNavProfile, toggleCourseDropdown } from '../../reducers/AppSettingReducer'

import { GoChevronRight } from 'react-icons/go'
import { CgMenuRight } from 'react-icons/cg'
import { AiFillPlusSquare, AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'
   ;
import { UserLogOut } from '../../reducers/UserReducer';

import OutsideClick, { DivOutsideClick } from '../utils/Outsideclick';
import { hideNavProfile } from '../../reducers/AppSettingReducer'
import { createNewCourse } from '../../functions/createNewCourse';
import { addCourse } from '../../reducers/CourseReducer';

const Navbar = ({ showSideMenu, clearScrollSticky }) => {
   const dispatch = useDispatch();
   const { dropdown: { courseDD, mobileCourseDD, mobileMenu } } = useSelector(state => state.appsetting);
   const { user } = useSelector(state => state.user);

   const [currCourseMenu, setCurrCourseMenu] = useState("")
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
               <Link to="/" className='logoAndSlogan'>
                  <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/logoLandscape.png"} alt="Edtech Name Logo" />
               </Link>
            </div>
            <div>
               <h2 className='companyTitle'>
                  <span>Let's</span>
                  <span>Learn</span>
               </h2>
            </div>
            <div className='menuBtn'>
               <div className='' onClick={() => dispatch({ type: "appsetting/showMobileMenu" })}>
                  <CgMenuRight size={28} />
               </div>
            </div>

            <div className='listright'>
               <ul className='navlinks'>
                  <li><Link to="/">Home</Link></li>
                  <li className="relative courses">
                     <span onClick={() => dispatch(toggleCourseDropdown())}>Courses</span>
                     {courseDD &&
                        <OutsideClick onOutsideClick={() => dispatch(toggleCourseDropdown())} className='courseDropDown'>
                           <li className='level1Link'
                              onMouseEnter={() => setCurrCourseMenu("school")}
                              onMouseLeave={() => setCurrCourseMenu("")}
                           >
                              <p>
                                 ACADEMIC ( 6th-12th )
                                 <GoChevronRight />
                              </p>

                              {currCourseMenu === "school" &&
                                 <ul className='dropDownLevel2'>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=academic&subcategory=class 6th">
                                          <span>Class 6th</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=academic&subcategory=class 7th">
                                          <span>Class 7th</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=academic&subcategory=class 8th">
                                          <span>Class 8th</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=academic&subcategory=class 9th">
                                          <span>Class 9th</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=academic&subcategory=class 10th">
                                          <span>Class 10th</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=academic&subcategory=class 11th">
                                          <span>Class 11th</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=academic&subcategory=class 12th">
                                          <span>Class 12th</span>
                                       </Link>
                                    </li>
                                 </ul>
                              }
                           </li>
                           <li className='level1Link'
                              onMouseEnter={() => setCurrCourseMenu("goverment")}
                              onMouseLeave={() => setCurrCourseMenu("")}
                           >
                              <p>
                                 <span>GOVT JOB EXAM</span>
                                 <GoChevronRight />
                              </p>
                              {currCourseMenu === "goverment" &&
                                 <ul className='dropDownLevel2'>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=ssc">
                                          <span>SSC</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=banking">
                                          <span>Banking</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=teaching">
                                          <span>Teaching</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=railway">
                                          <span>Railway</span>
                                       </Link>
                                    </li>
                                 </ul>
                              }
                           </li>
                           <li className='level1Link'
                              onMouseEnter={() => setCurrCourseMenu("upse")}
                              onMouseLeave={() => setCurrCourseMenu("")}
                           >
                              <p>
                                 <span>UPSE</span>
                                 <GoChevronRight />
                              </p>
                              {currCourseMenu === "upse" &&
                                 <ul className='dropDownLevel2'>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=UPSE">
                                          <span>UPSE CSE</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=UPSE">
                                          <span>UPSE NDA</span>
                                       </Link>
                                    </li>
                                 </ul>
                              }
                           </li>
                           <li className='level1Link'
                              onMouseEnter={() => setCurrCourseMenu("iit-jee")}
                              onMouseLeave={() => setCurrCourseMenu("")}
                           >
                              <p>
                                 <span>IIT JEE</span>
                                 <GoChevronRight />
                              </p>
                              {currCourseMenu === "iit-jee" &&
                                 <ul className='dropDownLevel2'>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=IIT JEE">
                                          <span>Class 11</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=IIT JEE">
                                          <span>Class12</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=IIT JEE">
                                          <span>Dropper</span>
                                       </Link>
                                    </li>
                                 </ul>
                              }
                           </li>
                           <li className='level1Link'
                              onMouseEnter={() => setCurrCourseMenu("neet")}
                              onMouseLeave={() => setCurrCourseMenu("")}
                           >
                              <p>
                                 <span>NEET</span>
                                 <GoChevronRight />
                              </p>
                              {currCourseMenu === "neet" &&
                                 <ul className='dropDownLevel2'>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=NEET">
                                          <span>Class 11</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=NEET">
                                          <span>Class 12</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=NEET">
                                          <span>Dropper</span>
                                       </Link>
                                    </li>
                                 </ul>
                              }
                           </li>
                           <li className='level1Link'>
                              <p>
                                 <span>CAT</span>
                              </p>
                           </li>
                           <li className='level1Link'
                              onMouseEnter={() => setCurrCourseMenu("gate")}
                              onMouseLeave={() => setCurrCourseMenu("")}
                           >
                              <p>
                                 <span>GATE</span>
                                 <GoChevronRight />
                              </p>
                              {currCourseMenu === "gate" &&
                                 <ul className='dropDownLevel2'>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>Civil</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>Mechanical</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>CS & IT</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>ECE</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>EE</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>Instrumenation</span>
                                       </Link>
                                    </li>
                                 </ul>
                              }
                           </li>
                           <li className='level1Link'>
                              <Link to="/courses/all?category=CUET">
                                 <p>CUET</p>
                              </Link>
                           </li>
                           <li className='level1Link'
                              onMouseEnter={() => setCurrCourseMenu("languages")}
                              onMouseLeave={() => setCurrCourseMenu("")}
                           >
                              <p>
                                 <span>LANGUAGES</span>
                                 <GoChevronRight />
                              </p>
                              {currCourseMenu === "languages" &&
                                 <ul className='dropDownLevel2'>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>English Speaking Course</span>
                                       </Link>
                                    </li>
                                    <li className='level2Link'>
                                       <Link to="/courses/all?category=GATE">
                                          <span>IELTS</span>
                                       </Link>
                                    </li>
                                 </ul>
                              }
                           </li>
                        </OutsideClick>
                     }
                  </li>
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
            {loggedIn && user?.role === "onlineFranchise" && (
               <div className='navLoginBtn'>
                  <Link to={"/affiliate/dashboard"}>Affiliate</Link>
               </div>
            )}
            {loggedIn && user?.role === "businessAssociates" && (
               <div className='navLoginBtn'>
                  <Link to={"/bussiness/dashboard"}>Bussiness</Link>
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
               <li>
                  <div className='mobileCourses' onClick={() => dispatch({ type: "appsetting/showMobileCourseMenu" })}>
                     <span>All Course</span>
                     <IoIosArrowForward size={20} />
                  </div>
               </li>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/">Be a Partner</Link></li>
               <li><Link to="/maintenance">Career</Link></li>
               <li><Link to="/about"> About Us</Link></li>
            </ul>

            <div className={`mobileCourseMenu ${mobileMenu && mobileCourseDD ? "active" : "inactive"}`}>
               <div className='mobileNavHeading'>
                  <IoIosArrowBack size={25} onClick={() => dispatch({ type: "appsetting/hideMobileCourseMenu" })} />
                  <h2 className='heading'>All Courses</h2>
                  <IoMdClose size={25} onClick={handleHideAllMobileMenu} />
               </div>
               <div className='mobileLevel1Link' >
                  <p onClick={() => toggleMobileCourseMenu("academics")}>
                     <span>ACADEMIC ( 6th-12th )</span>
                     <IoIosArrowDown />
                  </p>
                  <ul className={`mobileDropdownLvl2 ${currMobileCourseMenu === "academics" ? "active" : "inactive"}`} style={{ "--sublinks": 7 }} >
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=academic&subcategory=class 6th">
                           <span>Class 6th</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=academic&subcategory=class 7th">
                           <span>Class 7th</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=academic&subcategory=class 8th">
                           <span>Class 8th</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=academic&subcategory=class 9th">
                           <span>Class 9th</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=academic&subcategory=class 10th">
                           <span>Class 10th</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=academic&subcategory=class 11th">
                           <span>Class 11th</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=academic&subcategory=class 12th">
                           <span>Class 12th</span>
                        </Link>
                     </li>
                  </ul>
               </div>

               <div className='mobileLevel1Link' >
                  <p onClick={() => toggleMobileCourseMenu("Govt.Jobs")}>
                     <span>GOVT JOB EXAM</span>
                     <IoIosArrowDown />
                  </p>
                  <ul className={`mobileDropdownLvl2 ${currMobileCourseMenu === "Govt.Jobs" ? "active" : "inactive"}`} style={{ "--sublinks": 4 }}>

                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=ssc">
                           <span>SSC</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=banking">
                           <span>Banking</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=teaching">
                           <span>Teaching</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GOVT. JOB EXAMS&subcategory=railway">
                           <span>Railway</span>
                        </Link>
                     </li>
                  </ul>
               </div>

               <div className='mobileLevel1Link' >
                  <p onClick={() => toggleMobileCourseMenu("upse")}>
                     <span>UPSE</span>
                     <IoIosArrowDown />
                  </p>
                  <ul className={`mobileDropdownLvl2 ${currMobileCourseMenu === "upse" ? "active" : "inactive"}`} style={{ "--sublinks": 2 }}>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=UPSE">
                           <span>UPSE CSE</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=UPSE">
                           <span>UPSE NDA</span>
                        </Link>
                     </li>
                  </ul>
               </div>

               <div className='mobileLevel1Link' >
                  <p onClick={() => toggleMobileCourseMenu("iit-jee")}>
                     <span>IIT JEE</span>
                     <IoIosArrowDown />
                  </p>
                  <ul className={`mobileDropdownLvl2 ${currMobileCourseMenu === "iit-jee" ? "active" : "inactive"}`} style={{ "--sublinks": 3 }}>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=IIT JEE">
                           <span>Class 11</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=IIT JEE">
                           <span>Class12</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=IIT JEE">
                           <span>Dropper</span>
                        </Link>
                     </li>
                  </ul>
               </div>
               <div className='mobileLevel1Link' >
                  <p onClick={() => toggleMobileCourseMenu("neet")}>
                     <span>NEET</span>
                     <IoIosArrowDown />
                  </p>
                  <ul className={`mobileDropdownLvl2 ${currMobileCourseMenu === "neet" ? "active" : "inactive"}`} style={{ "--sublinks": 3 }}>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=NEET">
                           <span>Class 11</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=NEET">
                           <span>Class 12</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=NEET">
                           <span>Dropper</span>
                        </Link>
                     </li>
                  </ul>
               </div>

               <div className='mobileLevel1Link'>
                  <Link to={"/courses/all?category=CAT"}>
                     <span>CAT</span>
                  </Link>
               </div>

               <div className='mobileLevel1Link' >
                  <p onClick={() => toggleMobileCourseMenu("gate")}>
                     <span>GATE</span>
                     <IoIosArrowDown />
                  </p>
                  <ul className={`mobileDropdownLvl2 ${currMobileCourseMenu === "gate" ? "active" : "inactive"}`} style={{ "--sublinks": 6 }}>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>Civil</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>Mechanical</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>CS & IT</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>ECE</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>EE</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>Instrumenation</span>
                        </Link>
                     </li>
                  </ul>
               </div>

               <div className='mobileLevel1Link'>
                  <Link to={"/courses/all?category=CUET"}>
                     <span>CUET</span>
                  </Link>
               </div>
               <div className='mobileLevel1Link' >
                  <p onClick={() => toggleMobileCourseMenu("languages")}>
                     <span>LANGUAGES</span>
                     <IoIosArrowDown />
                  </p>

                  <ul className={`mobileDropdownLvl2 ${currMobileCourseMenu === "languages" ? "active" : "inactive"}`} style={{ "--sublinks": 2 }}>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>English Speaking Course</span>
                        </Link>
                     </li>
                     <li className='mobLevel2Link'>
                        <Link to="/courses/all?category=GATE">
                           <span>IELTS</span>
                        </Link>
                     </li>
                  </ul>
               </div>




            </div>
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