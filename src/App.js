import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// context providers
import CourseBuilderProvider from './context/CourseBuilderProvider';

// redux func 
import { useDispatch } from 'react-redux'

// reducers
import { getProfile } from './reducers/UserReducer';
import { getAllCategory, getAllSubCategory } from './reducers/CategoryReducer';

// protected route wrapper
import Protected from './components/base/Protected';

// home page 
import Home from './pages/home/Home';

// auth 
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import ForgotPassword from './pages/auth/ForgotPassword';
import OtpVerify from './pages/auth/OtpVerify'

// teacher dashboard 
import Announcements from './pages/TeacherDashboard/Announcements';
import Course from './pages/TeacherDashboard/Course';
import Assignment from './pages/TeacherDashboard/Assignment';
import Analytics from './pages/TeacherDashboard/Analytics';
import Quiz from './pages/TeacherDashboard/Quiz';
import CalendarEvents from './pages/TeacherDashboard/CalendarEvents';
import EditCourseBuilder from './pages/TeacherDashboard/EditCourseBuilder';
import QuizDetails from './pages/TeacherDashboard/QuizDetails';

// commons 
import Settings from './pages/common/Settings';
import Myprofile from './pages/common/Myprofile';

// courses 
import AllCourse from './pages/courses/AllCourse';
import CourseProgress from './pages/courses/CourseProgress';
import ClassCourses from './pages/courses/ClassCourses';

// payment flow 
import PaymentCoupon from './pages/payment/PaymentCoupon';
import PaymentStatus from './pages/payment/PaymentStatus';

// student dashboard 
import Dashboard from './pages/StudentDashboard/Dashboard';
import EnrolledCourses from './pages/StudentDashboard/EnrolledCourses';
import Calender from './pages/StudentDashboard/Calender';
import QuizAttempts from './pages/StudentDashboard/QuizAttempts';
import OrderHistory from './pages/StudentDashboard/OrderHistory';

// other pages 
import Termandcondition from './pages/policy/Termandcondition';
import Privacy from './pages/policy/Privacy';
import Refund from './pages/policy/Refund';
import About from './pages/policy/About';

// error and maintainance pages 
import MaintenancePage from './pages/others/MaintenancePage';
import ErrorPage from './pages/others/ErrorPage';

// career 
import Registercarrers from './pages/careers/Registercarrers';
import Careers from './pages/careers/Careers';
import Application from './pages/careers/Application';
import Profileee from './pages/careers/Profileee';
import Logincarrers from './pages/careers/Logincarrers';

// admin pages
import AdminDashboard from './admin/dashboard/Dashboard';

import AdminCoupon from './admin/pages/coupon/Coupon';
import AdminAddCoupon from './admin/pages/coupon/AddCoupon';

import AdminStudent from './admin/pages/student/Student';


// admin teacher
import AdminTeachers from './admin/pages/teachers/Teachers';
import AdminTeacherAdd from './admin/pages/teachers/AddTeacher';
import AdminTeacherEdit from './admin/pages/teachers/EditTeacher';
import AboutTeacher from './admin/pages/teachers/AboutTeacher';

// admin course
import AdminCourse from './admin/pages/course/Course';
import AdminAboutCourse from './admin/pages/course/AboutCourse';
import AdminAddCourse from './admin/pages/course/AddCourse';

// admin affiliate
import AdminAffiliate from './admin/pages/affiliate/Affiliate';
import AdminAddAffiliate from './admin/pages/affiliate/AddAffiliate';
import AdminEditAffiliate from './admin/pages/affiliate/EditAffiliate';
import AboutAffiliate from './admin/pages/affiliate/AboutAffiliate';

//admin Querys
import AdminUserQuery from './admin/pages/userQuery/UserQuery';
import AdminAboutQuery from './admin/pages/userQuery/AboutQuery';

// course content
import CourseContent from './pages/coursecontent/CourseContent';
import NewQuizAttempt from './pages/coursecontent/NewQuizAttempt';
import QuizResultPage from './pages/coursecontent/QuizResultPage';
import QuizAttemptDetails from './pages/coursecontent/QuizAttemptDetails';
import AssignmentSubmission from './pages/coursecontent/AssignmentSubmission';
import LessonPage from './pages/coursecontent/LessonPage';
import AllRecordings from "./pages/coursecontent/AllRecordings";

// franchise 
import FranchiseDashboard from "./franchise/dashboard/Dashboard"
import Earning from './franchise/earning/Earning';
import Coupon from './franchise/coupons/Coupon';

// affiliate
import AffiliateRegister from "./pages/auth/AffiliateRegister"
import AffilateDashboard from "./affiliate/dashboard/Dashboard"
import AffilateCoupon from "./affiliate/coupon/Coupon";
import AffiliateCreateCoupon from "./affiliate/coupon/CreateCoupon";
import AffiliateSales from "./affiliate/sales/Sales"
import AffiliateStudent from "./affiliate/student/Student"
import AffiliateSetting from "./affiliate/setting/Setting";
import AffiliateProfile from "./affiliate/profile/Profile";

// business associates 
import BussinessAssDashboard from "./bussinessAssociate/dashboard/Dashboard";
import BusinessAssCoupon from "./bussinessAssociate/coupon/Coupon"
import BusinessAssCreateCoupon from "./bussinessAssociate/coupon/CreateCoupon"
import BusinessAssProfile from "./bussinessAssociate/profile/Profile"
import BusinessAssSales from "./bussinessAssociate/sales/Sales"


// landing pages 
import Academic1 from './landingpages/academic1/Academic1';
import A1RegisterForm from './landingpages/academic1/RegisterForm';
import CourseContentBase from './pages/coursecontent/CourseContentBase';


const EditCourseBuilderComponent = () => {
  return (
    <CourseBuilderProvider>
      <EditCourseBuilder />
    </CourseBuilderProvider>
  )
}


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let tokenVal = localStorage.getItem("token");
    if (!tokenVal || tokenVal === "" || tokenVal === null || tokenVal === undefined) return;
    dispatch(getProfile())

  }, [dispatch])

  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getAllSubCategory())
  }, [dispatch])

  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

const AllRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "appsetting/hideAllNavMenu" })
  }, [location, dispatch])


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Protected Component={Register} reverse={true} />} />
      <Route path="/login" element={<Protected Component={Login} reverse={true} />} />
      <Route path="/logout" element={<Protected Component={Logout} />} />
      <Route path="/forgot-password" element={<Protected Component={ForgotPassword} reverse={true} />} />
      <Route path="/settings" element={<Protected Component={Settings} />} />
      <Route path="/otp-verify" element={<Protected Component={OtpVerify} reverse={true} />} />
      <Route path="/affiliate/register" element={<Protected reverse={true} Component={AffiliateRegister} />} />

      <Route path="/academics/register" element={<Protected reverse={true} Component={A1RegisterForm} />} />

      {/* all courses public  */}
      <Route path="/courses/all" element={<AllCourse />} />

      {/* course enroll page - Public  */}
      <Route path="/course/:course_id/:course_slug" element={<CourseProgress />} />

      {/* course payment page with coupon  */}
      <Route path="/payment/course/:course_id/:course_name" element={<Protected Component={PaymentCoupon} validRoles={["student"]} />} />
      <Route path="/payment/status/:tracking_id" element={<Protected Component={PaymentStatus} validRoles={["student"]} />} />

      {/* course content pages  */}
      <Route path='/course/:course_id' element={<Protected Component={CourseContentBase} validRoles={["student"]} />}>
        {/* <Route path="/course/:course_id/:course_slug/content" element={<Protected Component={CourseContent} validRoles={["student"]} />} />
        <Route path="/course/:course_id/:course_slug/assignment/:assignment_id" element={<Protected Component={AssignmentSubmission} validRoles={["student"]} />} />
        <Route path="/course/:course_id/:course_slug/quiz/:quiz_id" element={<Protected Component={NewQuizAttempt} validRoles={["student"]} />} />
        <Route path="/course/:course_id/:course_slug/quiz/result/:quiz_id" element={<Protected Component={QuizResultPage} validRoles={["student"]} />} />
        <Route path="/course/:course_id/:course_slug/quiz-attempt/:quiz_attempt_id" element={<Protected Component={QuizAttemptDetails} validRoles={["student"]} />} />
        <Route path="/course/:course_id/:course_slug/lesson/:lesson_id" element={<Protected Component={LessonPage} validRoles={["student"]} />} />
        <Route path="/course/:course_id/:course_slug/recordings" element={<Protected Component={AllRecordings} validRoles={["student"]} />} /> */}

        <Route path="/course/:course_id/:course_slug/content" element={<CourseContent />} />
        <Route path="/course/:course_id/:course_slug/assignment/:assignment_id" element={<AssignmentSubmission />} />
        <Route path="/course/:course_id/:course_slug/quiz/:quiz_id" element={<NewQuizAttempt />} />
        <Route path="/course/:course_id/:course_slug/quiz/result/:quiz_id" element={<QuizResultPage />} />
        <Route path="/course/:course_id/:course_slug/quiz-attempt/:quiz_attempt_id" element={<QuizAttemptDetails />} />
        <Route path="/course/:course_id/:course_slug/lesson/:lesson_id" element={<LessonPage />} />
        <Route path="/course/:course_id/:course_slug/recordings" element={<AllRecordings />} />

      </Route>

      {/* class  - unused */}
      {/* <Route path="/class/:class_name" element={<Protected Component={ClassCourses} />} /> */}

      {/* course builder and editor  */}
      <Route path="/teacher/edit-course/:course_id" element={<Protected Component={EditCourseBuilderComponent} validRoles={["teacher", "admin"]} />} />

      {/* teacher panel  */}
      <Route path="/teacher/course" element={<Protected Component={Course} validRoles={["teacher"]} />} />
      <Route path="/teacher/events" element={<Protected Component={CalendarEvents} validRoles={["teacher"]} />} />
      <Route path="/teacher/quiz" element={<Protected Component={Quiz} validRoles={["teacher"]} />} />
      <Route path="/teacher/quiz/details" element={<Protected Component={QuizDetails} validRoles={["teacher"]} />} />
      <Route path="/teacher/announcement" element={<Protected Component={Announcements} validRoles={["teacher"]} />} />
      <Route path="/teacher/assignment" element={<Protected Component={Assignment} />} />
      <Route path="/teacher/analytics" element={<Protected Component={Analytics} validRoles={["teacher"]} />} />
      <Route path="/teacher/profile" element={<Protected Component={Myprofile} />} validRoles={["teacher"]} />

      {/* student panel  */}
      <Route path="/dashboard" element={<Protected Component={Dashboard} validRoles={["student"]} />} />
      <Route path="/student/quiz-attempts" element={<Protected Component={QuizAttempts} validRoles={["student"]} />} />
      <Route path="/student/profile" element={<Protected Component={Myprofile} />} validRoles={["student"]} />
      <Route path="/student/enrolled-courses" element={<Protected Component={EnrolledCourses} validRoles={["student"]} />} />
      <Route path="/student/order-history" element={<Protected Component={OrderHistory} validRoles={["student"]} />} />
      <Route path="/student/calender" element={<Protected Component={Calender} validRoles={["student"]} />} />

      {/* franchise panel */}

      {/* affilate_dashboard_detail */}
      <Route path="/affiliate/dashboard" element={<Protected Component={AffilateDashboard} validRoles={["affiliate"]} />} />
      <Route path="/affiliate/coupon" element={<Protected Component={AffilateCoupon} validRoles={["affiliate"]} />} />
      <Route path="/affiliate/create-coupon" element={<Protected Component={AffiliateCreateCoupon} validRoles={["affiliate"]} />} />
      <Route path="/affiliate/sales" element={<Protected Component={AffiliateSales} validRoles={["affiliate"]} />} />
      <Route path="/affiliate/student" element={<Protected Component={AffiliateStudent} validRoles={["affiliate"]} />} />
      <Route path="/affiliate/setting" element={<Protected Component={AffiliateSetting} validRoles={["affiliate"]} />} />
      <Route path="/affiliate/profile" element={<Protected Component={AffiliateProfile} validRoles={["affiliate"]} />} />

      {/* bussinessAssociate pages */}
      {/* <Route path="/bussiness/dashboard" element={<Protected Component={BussinessAssDashboard} validRoles={["businessAssociates"]} />} />
      <Route path="/bussiness/coupon" element={<Protected Component={BusinessAssCoupon} validRoles={["businessAssociates"]} />} />
      <Route path="/bussiness/create-coupon" element={<Protected Component={BusinessAssCreateCoupon} validRoles={["businessAssociates"]} />} />
      <Route path="/bussiness/sales" element={<Protected Component={BusinessAssSales} validRoles={["businessAssociates"]} />} />
      <Route path="/bussiness/profile" element={<Protected Component={BusinessAssProfile} validRoles={["businessAssociates"]} />} /> */}

      {/* <Route path="/franchise/dashboard" element={<Protected Component={FranchiseDashboard} validRoles={["franchise"]} />} />
      <Route path="/franchise/earning" element={<Protected Component={Earning} validRoles={["franchise"]} />} />
      <Route path="/franchise/coupon" element={<Protected Component={Coupon} validRoles={["franchise"]} />} /> */}


      {/* franchise rpage */}
      {/* <Route path="/fronchiseOnline/dashboard" element={<Protected Component={BussinessAssDashboard} validRoles={["businessAssociates"]} />} />
      <Route path="/fronchiseOnline/earning" element={<Protected Component={BussinessAssEarning} validRoles={["businessAssociates"]} />} />
      <Route path="/fronchiseOnline/coupon" element={<Protected Component={BusinessAssCoupon} validRoles={["businessAssociates"]} />} /> */}

      {/* policy pages */}
      <Route path="/term-and-conditions" element={<Termandcondition />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/about" element={<About />} />

      {/* careers  */}
      <Route path="/careers" element={<Careers />} />
      <Route path="/applications" element={<Application />} />
      <Route path="/profile" element={<Profileee />} />
      <Route path="/register/career" element={<Registercarrers />} />
      <Route path="/login/career" element={<Logincarrers />} />

      {/* admin pannel */}
      <Route path="/admin/dashboard/" element={<Protected Component={AdminDashboard} validRoles={["admin"]} />} />

      <Route path="/admin/coupon/" element={<Protected Component={AdminCoupon} validRoles={["admin"]} />} />
      <Route path="/admin/coupon/add" element={<Protected Component={AdminAddCoupon} validRoles={["admin"]} />} />

      <Route path="/admin/teachers" element={<Protected Component={AdminTeachers} validRoles={["admin"]} />} />
      <Route path="/admin/teacher/add" element={<Protected Component={AdminTeacherAdd} validRoles={["admin"]} />} />
      <Route path="/admin/teacher/edit/:userId" element={<Protected Component={AdminTeacherEdit} validRoles={["admin"]} />} />
      <Route path="/admin/teacher/about/:teacherId" element={<Protected Component={AboutTeacher} validRoles={["admin"]} />} />

      <Route path="/admin/student" element={<Protected Component={AdminStudent} validRoles={["admin"]} />} />

      <Route path="/admin/course" element={<Protected Component={AdminCourse} validRoles={["admin"]} />} />
      <Route path="/admin/course/about/:courseId" element={<Protected Component={AdminAboutCourse} validRoles={["admin"]} />} />
      <Route path="/admin/course/edit/:course_id" element={<Protected Component={EditCourseBuilderComponent} validRoles={["admin"]} />} />

      <Route path="/admin/user-query" element={<Protected Component={AdminUserQuery} validRoles={["admin"]} />} />
      <Route path="/admin/user-query/about/:query_id" element={<Protected Component={AdminAboutQuery} validRoles={["admin"]} />} />


      {/* for testing only  */}
      <Route path="/admin/course/v2/edit/:course_id" element={<Protected Component={AdminAddCourse} validRoles={["admin"]} />} />


      <Route path="/admin/affiliate" element={<Protected Component={AdminAffiliate} validRoles={["admin"]} />} />
      <Route path="/admin/affiliate/add" element={<Protected Component={AdminAddAffiliate} validRoles={["admin"]} />} />
      <Route path="/admin/affiliate/edit/:userId" element={<Protected Component={AdminEditAffiliate} validRoles={["admin"]} />} />
      <Route path="/admin/affiliate/about/:affiliateId" element={<Protected Component={AboutAffiliate} validRoles={["admin"]} />} />

      <Route path="/academics/1" element={<Academic1 />} />


      <Route path='/maintenance' element={<MaintenancePage />} />
      <Route path='*' element={<ErrorPage />} />

    </Routes>
  )
}

export default App