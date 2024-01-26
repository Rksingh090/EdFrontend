import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
import CourseDetails from './pages/courses/CourseDetails';
// import ClassCourses from './pages/courses/ClassCourses';

// payment flow 
import PaymentCoupon from './pages/payment/PaymentCoupon';
import PaymentStatus from './pages/payment/PaymentStatus';

// student dashboard 
import Dashboard from './pages/StudentDashboard/Dashboard';
import EnrolledCourses from './pages/StudentDashboard/EnrolledCourses';
import Calendar from './pages/StudentDashboard/Calendar';
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
import Logincarrers from './pages/careers/Logincarrers';

import Careers from './pages/careers/Careers';
import Application from './pages/careers/Application';
import Profile from './pages/careers/Profile';

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

// affiliate
import AffiliateRegister from "./pages/auth/AffiliateRegister"
import AffilateDashboard from "./affiliate/dashboard/Dashboard"
import AffilateCoupon from "./affiliate/coupon/Coupon";
import AffiliateCreateCoupon from "./affiliate/coupon/CreateCoupon";
import AffiliateSales from "./affiliate/sales/Sales"
import AffiliateStudent from "./affiliate/student/Student"
import AffiliateSetting from "./affiliate/setting/Setting";
import AffiliateProfile from "./affiliate/profile/Profile";

// landing pages 
import CourseContentBase from './pages/coursecontent/CourseContentBase';
import { setTheme, toggleTheme } from './reducers/AppSettingReducer';
import useKeybinds from './hooks/useKeyBinds';
import AdminBase from './admin/adminBase/AdminBase';




const EditCourseBuilderComponent = () => {
    return (
        <CourseBuilderProvider>
            <EditCourseBuilder />
        </CourseBuilderProvider>
    )
}


const router = createBrowserRouter([
    // public pages 
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/courses",
        element: <AllCourse />
    },
    {
        path: "/course/:course_id/:course_slug",
        element: <CourseDetails />
    },
    {
        path: "/term-and-conditions",
        element: <Termandcondition />
    },
    {
        path: "/privacy",
        element: <Privacy />
    },
    {
        path: "/refund",
        element: <Refund />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/careers",
        element: <Careers />
    },
    {
        path: "/applications",
        element: <Application />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/careers",
        element: <Careers />
    },
    {
        path: "/careers",
        element: <Careers />
    },
    {
        path: "/",
        element: <Protected reverse={true} />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/logout",
                element: <Logout />
            },
            {
                path: "/otp-verify",
                element: <OtpVerify />
            },
            {
                path: "/affiliate/register",
                element: <OtpVerify />
            },
        ]
    },
    {
        // student and teacher common pages 
        path: "/settings",
        element: <Settings />
    },
    {
        path: "/course/:course_id",
        element: <Protected />
    },

    // course content page `student only` and enrolled 
    {
        path: "/course/:course_id",
        element: <Protected validRoles={["student"]} renderChild={true} />,
        children: [
            {
                path: "/course/:course_id",
                element: <CourseContentBase />,
                children: [
                    {
                        path: "/course/:course_id/:course_slug/content",
                        element: <CourseContent />
                    },
                    {
                        path: "/course/:course_id/:course_slug/assignment/:assignment_id",
                        element: <AssignmentSubmission />
                    },
                    {
                        path: "/course/:course_id/:course_slug/quiz/:quiz_id",
                        element: <NewQuizAttempt />
                    },
                    {
                        path: "/course/:course_id/:course_slug/quiz/result/:quiz_id",
                        element: <QuizResultPage />
                    },
                    {
                        path: "/course/:course_id/:course_slug/quiz-attempt/:quiz_attempt_id",
                        element: <QuizAttemptDetails />
                    },
                    {
                        path: "/course/:course_id/:course_slug/lesson/:lesson_id",
                        element: <LessonPage />
                    },
                    {
                        path: "/course/:course_id/:course_slug/recordings",
                        element: <AllRecordings />
                    },
                ]
            }
        ]
    },
    {
        path: "/teacher",
        element: <Protected validRoles={["teacher", "admin"]} />,
        children: [
            {
                path: "/teacher/edit-course/:course_id",
                element: <EditCourseBuilderComponent />
            }
        ]
    },
    {
        path: "/teacher",
        element: <Protected validRoles={["teacher"]} />,
        children: [
            {
                path: "/teacher/course",
                element: <Course />
            },
            {
                path: "/teacher/events",
                element: <CalendarEvents />
            },
            {
                path: "/teacher/quiz",
                element: <Quiz />
            },
            {
                path: "/teacher/quiz/details",
                element: <QuizDetails />
            },
            {
                path: "/teacher/announcement",
                element: <Announcements />
            },
            {
                path: "/teacher/assignment",
                element: <Assignment />
            },
            {
                path: "/teacher/analytics",
                element: <Analytics />
            },
            {
                path: "/teacher/profile",
                element: <Myprofile />
            },
        ]
    },
    {
        path: "/student",
        element: <Protected validRoles={["student"]} />,
        children: [
            {
                path: "/student/dashboard",
                element: <Dashboard />
            },
            {
                path: "/student/quiz-attempts",
                element: <QuizAttempts />
            },
            {
                path: "/student/order-history",
                element: <OrderHistory />
            },
            {
                path: "/student/calendar",
                element: <Calendar />
            },
            {
                path: "/student/enrolled-courses",
                element: <EnrolledCourses />
            },
            {
                path: "/student/profile",
                element: <Myprofile />
            },
        ]
    },
    {
        path: "/payment",
        element: <Protected validRoles={["student"]} />,
        children: [
            {
                path: "/payment/course/:course_id/:course_name",
                element: <PaymentCoupon />,
            },
            {
                path: "/payment/status/:tracking_id",
                element: <PaymentStatus />,
            },
        ]
    },
    {
        path: "/affiliate",
        element: <Protected validRoles={["affiliate"]} />,
        children: [
            {
                path: "/affiliate/dashboard",
                element: <AffilateDashboard />
            },
            {
                path: "/affiliate/coupon",
                element: <AffilateCoupon />
            },
            {
                path: "/affiliate/create-coupon",
                element: <AffiliateCreateCoupon />
            },
            {
                path: "/affiliate/sales",
                element: <AffiliateSales />
            },
            {
                path: "/affiliate/student",
                element: <AffiliateStudent />
            },
            {
                path: "/affiliate/setting",
                element: <AffiliateSetting />
            },
            {
                path: "/affiliate/profile",
                element: <AffiliateProfile />
            },
        ]
    },
    {
        path: "/admin",
        element: <Protected validRoles={["admin"]} />,
        children: [
            {
                path: "/admin",
                element: <AdminBase />,
                children: [
                    {
                        path: "/admin/dashboard",
                        element: <AdminDashboard />,
                    },
                    {
                        path: "/admin/coupon",
                        element: <AdminCoupon />
                    },
                    {
                        path: "/admin/coupon/add",
                        element: <AdminAddCoupon />
                    },
                    {
                        path: "/admin/teachers",
                        element: <AdminTeachers />
                    },
                    {
                        path: "/admin/teachers/add",
                        element: <AdminTeacherAdd />
                    },
                    {
                        path: "/admin/teachers/edit/:userId",
                        element: <AdminTeacherEdit />
                    },
                    {
                        path: "/admin/teachers/about/:teacherId",
                        element: <AboutTeacher />
                    },
                    {
                        path: "/admin/student",
                        element: <AdminStudent />
                    },
                    {
                        path: "/admin/course",
                        element: <AdminCourse />
                    },
                    {
                        path: "/admin/course/about/:courseId",
                        element: <AdminAboutCourse />
                    },
                    {
                        path: "/admin/course/edit/:course_id",
                        element: <EditCourseBuilderComponent />
                    },
                    {
                        path: "/admin/user-query",
                        element: <AdminUserQuery />
                    },
                    {
                        path: "/admin/user-query/about/:query_id",
                        element: <AdminAboutQuery />
                    },
                    {
                        path: "/admin/course/v2/edit/:course_id",
                        element: <AdminAddCourse />
                    },
                    {
                        path: "/admin/affiliate",
                        element: <AdminAffiliate />
                    },
                    {
                        path: "/admin/affiliate/add",
                        element: <AdminAddAffiliate />
                    },
                    {
                        path: "/admin/affiliate/edit/:userId",
                        element: <AdminEditAffiliate />
                    },
                    {
                        path: "/admin/affiliate/about/:affiliateId",
                        element: <AboutAffiliate />
                    },
                ]
            },
        ]
    },
    {
        path: "/maintenance",
        element: <MaintenancePage />
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);




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

    // const pathname = window.location.pathname;

    useEffect(() => {
        router.subscribe(() => {
            dispatch({ type: "appsetting/hideAllNavMenu" })
        });

        return () => {
            router.dispose();
        };
    }, [dispatch]);
    

    useKeybinds([
        {
            cmd: ["Alt", "x"],
            func: () => dispatch(toggleTheme())
        }
    ])

    useEffect(() => {
        const mqListener = (e) => {
            const activeTheme = localStorage.getItem("themeMode");
            const selectTheme = localStorage.getItem("selectTheme");
            if (selectTheme === "user" && activeTheme === "dark") {
                dispatch(setTheme("dark"));
            } else if (selectTheme === "user" && activeTheme === "light") {
                dispatch(setTheme("light"));
            } else {
                localStorage.setItem("selectTheme", "system");
                if (e.matches) {
                    dispatch(setTheme("dark"));
                } else {
                    dispatch(setTheme("light"));
                }
            }
        };
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        mqListener(darkThemeMq);
        darkThemeMq.addEventListener("change", mqListener);
        return () => darkThemeMq.removeEventListener("change", mqListener);
    }, [dispatch]);

    return (
        
        <RouterProvider router={router} />
    )
}


export default App;