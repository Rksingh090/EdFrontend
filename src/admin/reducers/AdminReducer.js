import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../constant';

export const getAllDashboarData = createAsyncThunk(
    "admin/getAllDashboarData",
    async () => {
        const response = await axios.get(`${API}/admin/dashboard`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

export const getAllCategories = createAsyncThunk(
    "admin/getAllCategories",
    async () => {
        const response = await axios.get(`${API}/category`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)


export const getCourseByPage = createAsyncThunk(
    "admin/getCourseByPage",
    async ({ pageNo, perPage }) => {
        const response = await axios.get(`${API}/admin/course/page/${pageNo}?perPage=${perPage}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

const initialState = {
    sidebarOpen: true,
    activeNavMenu: "",
    dashboard: {
        students: [],
        teachers: [],
        newStudents: [],
        courseCount: 0,
        studentCounts: 0,
        newStudentsCount: 0,
        transaction: []
    },
    course: {
        courses: [],
        perPage: 10,
        pageNo: 1,
        pagination: [],
        totalCourses: 0
    }
}

const adminReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        setActiveNavMemu: (state, action) => {
            state.activeNavMenu = state.activeNavMenu === action.payload ? "" : action.payload;
        },
        hideActiveMenus: (state) => {
            state.activeNavMenu = ""
        },
        setCoursePage: (state, action) => {
            state.course.pageNo = action.payload
        },
        setCoursePerPage: (state, action) => {
            state.course.perPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllDashboarData.fulfilled, (state, action) => {
            const {
                message,
                status,
                ...restData
            } = action.payload;

            if (status === "success") {
                state.dashboard = {
                    ...state.dashboard,
                    ...restData
                }
            }
        })
       
    
        builder.addCase(getCourseByPage.fulfilled, (state, action) => {
            const { courses, status, pagination, totalCourses } = action.payload;
            if (status === "success") {
                state.course.courses = courses;
                state.course.pagination = pagination;
                state.course.totalCourses = totalCourses;
            }
        })
    }
})

export const { toggleSidebar, setActiveNavMemu, hideActiveMenus, setCoursePage, setCoursePerPage } = adminReducer.actions
export default adminReducer.reducer