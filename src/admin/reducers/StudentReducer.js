import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../constant';

export const getStudentByPage = createAsyncThunk(
    "admin/getStudentByPage",
    async ({ pageNo, perPage }) => {
        const response = await axios.get(`${API}/admin/students/${pageNo}?perPage=${perPage}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

const initialState = {
    student: {
        students: [],
        perPage: 10,
        pageNo: 1,
        pagination: [],
        totalStudents: 0
    }
}

const adminStudentReducer = createSlice({
    name: 'adminstudent',
    initialState,
    reducers: {
        setPageNo: (state, action) => {
            state.student.pageNo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStudentByPage.fulfilled, (state, action) => {
            const { students, status, totalStudents, pagination } = action.payload;
            if (status === "success") {
                state.student.students = students;
                state.student.pagination = pagination;
                state.student.totalStudents = totalStudents;
            }
        })
    }
})

export const { setPageNo } = adminStudentReducer.actions
export default adminStudentReducer.reducer