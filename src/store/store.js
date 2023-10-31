import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CourseReducer from '../reducers/CourseReducer';
import UserReducer from '../reducers/UserReducer';
import CategoryReducer from '../reducers/CategoryReducer';
import AssignmentReducer from '../reducers/AssignmentReducer';
import AnnouncementReducer from '../reducers/AnnouncementReducer';
import AppSettingReducer from '../reducers/AppSettingReducer';
import CalendarReducers from '../reducers/CalendarReducers';
import QuizAttemptReducer from '../reducers/QuizAttemptReducer';
import CouponReducer from '../reducers/CouponReducer';

import AdminReducer from '../admin/reducers/AdminReducer';
import AdminTeacherReducer from '../admin/reducers/TeacherReducer';
import AdminAffiliateReducer from '../admin/reducers/AffiliateReducer';

import AffiliateCouponReducer from "../affiliate/reducer/affiliateCouponReducer"
import affiliateSearchReducer from '../affiliate/reducer/affiliateSearchReducer';
import affiliateDashboardReducer from '../affiliate/reducer/affiliateDashboardReducer';



const rootReducer = combineReducers({
    course: CourseReducer,
    user: UserReducer,
    category: CategoryReducer,
    assignment: AssignmentReducer,
    announcement: AnnouncementReducer,
    appsetting: AppSettingReducer,
    calendar: CalendarReducers,
    quizattempts: QuizAttemptReducer,
    coupon: CouponReducer,
    admin: AdminReducer,
    adminteacher: AdminTeacherReducer,
    adminaffiliate: AdminAffiliateReducer,
    affiliatecoupon: AffiliateCouponReducer,
    affiliateSearch: affiliateSearchReducer,
    affiliateDashboard: affiliateDashboardReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})