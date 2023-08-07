import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API } from '../constant'

export const getTeacherAssignment = createAsyncThunk(
    "assinment/getAllAssignment",
    async (thunkAPI) => {
        const response = await axios.get(`${API}/assignment`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

const initialState = {
    teacher: {
        assignments: [],
    },
    loading: false,
    assignment_error: ""
}

const assignmentReducer = createSlice({
    name: 'assignment',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTeacherAssignment.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getTeacherAssignment.fulfilled, (state, action) => {
            state.teacher.assignments = action.payload.assignment
            state.loading = false
        })
    }
})

// export const { } = assignmentReducer.actions
export default assignmentReducer.reducer