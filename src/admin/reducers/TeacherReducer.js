import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../constant';

export const getTeacherByPage = createAsyncThunk(
    "adminteacher/getTeacherByPage",
    async ({ pageNo, perPage }) => {
        const response = await axios.get(`${API}/admin/teachers/page/${pageNo}?perPage=${perPage}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

export const addTeacherByAdmin = createAsyncThunk(
    "adminteacher/addTeacherByAdmin",
    async (data) => {
        const response = await axios.post(`${API}/admin/teachers/`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)
export const updateTeacherByAdmin = createAsyncThunk(
    "adminteacher/updateTeacherByAdmin",
    async (data) => {
        const response = await axios.patch(`${API}/admin/teachers/${data._id}`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

export const deleteTeacherById = createAsyncThunk(
    "adminteacher/deleteTeacherById",
    async (teacherId) => {
        const response = await axios.delete(`${API}/admin/teachers/${teacherId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

export const toggleBanTeacherById = createAsyncThunk(
    "adminteacher/toggleBanTeacherById",
    async ({ teacherId }) => {
        const response = await axios.patch(`${API}/admin/teachers/toggle-ban/${teacherId}`, {}, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

const initialState = {
    teacher: {
        teachers: [],
        perPage: 10,
        pageNo: 1,
        pagination: [],
        totalTeachers: 0
    }
}

const adminReducer = createSlice({
    name: 'adminteacher',
    initialState,
    reducers: {
        setPageNo: (state, action) => {
            state.teacher.pageNo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTeacherByPage.fulfilled, (state, action) => {
            const { teachers, status, pagination, totalTeachers } = action.payload;
            if (status === "success") {
                state.teacher.teachers = teachers;
                state.teacher.pagination = pagination
                state.teacher.totalTeachers = totalTeachers
            }
        })
        builder.addCase(addTeacherByAdmin.fulfilled, (state, action) => {
            const { teacher, status} = action.payload;
            if (status === "success") {
                state.teacher.teachers = [...state.teacher.teachers, teacher];
                state.teacher.totalTeachers += 1
                let paginationArr = state.teacher.pagination;
                let currPages = paginationArr[paginationArr.length -1];
                let newPages = Math.floor(state.teacher.totalTeachers / 10)
                if(state.teacher.totalTeachers % 10 > 0){
                    newPages += 1
                }
                if(newPages > currPages){
                    state.teacher.pagination = [...paginationArr, newPages]
                }
            }
        })
        builder.addCase(updateTeacherByAdmin.fulfilled, (state, action) => {
            const { teacher, status } = action.payload;
            if (status === "success") {
                // find the teacher in teachers array 
                const teacherIdx = state.teacher.teachers.findIndex((eachTeacher) => eachTeacher._id === teacher._id);
                if (teacherIdx !== -1) {
                    state.teacher.teachers[teacherIdx] = teacher;
                }
            }
        })
        builder.addCase(deleteTeacherById.fulfilled, (state, action) => {
            const { teacher, status } = action.payload;
            if (status === "success") {
                const teacherFiltered = state.teacher.teachers.filter((eachTeacher) => eachTeacher._id !== teacher._id);
                state.teacher.teachers = teacherFiltered;
            }
        })
        builder.addCase(toggleBanTeacherById.fulfilled, (state, action) => {
            const {teacherId, account_status} = action.payload;
            const findIndex = state.teacher.teachers.findIndex((oneTeacher) => oneTeacher?._id === teacherId);
            if(findIndex !== -1){
                state.teacher.teachers[findIndex].account_status = account_status;
            }

        })
    }
})

export const { setPageNo } = adminReducer.actions
export default adminReducer.reducer