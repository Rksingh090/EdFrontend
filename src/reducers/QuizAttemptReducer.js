import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../constant';

export const getStudentQuizAttempts = createAsyncThunk(
    "quizattempts/getStudentQuizAttempts",
    async (thunkAPI) => {
        const response = await axios.get(`${API}/quiz-attempts/student`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)

export const getTeacherQuizAttempts = createAsyncThunk(
    "quizattempts/getTeacherQuizAttempts",
    async (thunkAPI) => {
        const response = await axios.get(`${API}/quiz-attempts/teacher`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)


export const getQAttemptsByCourse = createAsyncThunk(
    "quizattempts/getQAttemptsByCourse",
    async (courseId) => {
        const response = await axios.get(`${API}/quiz-attempts/course/${courseId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)

const initialState = {
    student: {
        quiz_attempts: [],
        course_qattempts: []
    },
    teacher: {
        quiz_attempts: [],
    },
}

const announcementReducer = createSlice({
    name: 'quizattempts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getStudentQuizAttempts.fulfilled, (state, action) => {
            state.student.quiz_attempts = action.payload.attempts
        })
        builder.addCase(getTeacherQuizAttempts.fulfilled, (state, action) => {
            state.teacher.quiz_attempts = action.payload.attempts
        })
        builder.addCase(getQAttemptsByCourse.fulfilled, (state, action) => {
            state.student.course_qattempts = action.payload.quiz_attempts
        })
    }
})

// export const { } = announcementReducer.actions
export default announcementReducer.reducer