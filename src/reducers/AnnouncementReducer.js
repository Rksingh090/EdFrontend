import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API } from '../constant'

// get announcements for teacher 
export const getTeacherAnnouncement = createAsyncThunk(
    "announcement/getAllAnnouncement",
    async (thunkAPI) => {
        const response = await axios.get(`${API}/announcement`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    })

// get announcement by course id for courseProgres 
export const getCourseAnnouncement = createAsyncThunk(
    "announcement/getCourseAnnouncement",
    async (courseId) => {
        const response = await axios.get(`${API}/announcement/course/${courseId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
);

// add new announcement by id 
export const addNewAnnouncement = createAsyncThunk(
    "announcement/addNewAnnouncement",
    async (data) => {
        const response = await axios.post(`${API}/announcement`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

const initialState = {
    teacher: {
        announcements: [],
    },
    loading: false,
    announcement_error: ""
}

const announcementReducer = createSlice({
    name: 'announcement',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTeacherAnnouncement.fulfilled, (state, action) => {
            state.teacher.announcements = action.payload.announcement
        })

        builder.addCase(getCourseAnnouncement.fulfilled, (state, action) => {
            state.course_announcement = action.payload.announcement;
        })

        builder.addCase(addNewAnnouncement.fulfilled, (state, action) => {
            state.teacher.announcements = [
                ...state.teacher.announcements,
                {
                    ...action.payload.announcement,
                    course: action.payload.course
                }
            ]
        })
    }
})

// export const { } = announcementReducer.actions
export default announcementReducer.reducer