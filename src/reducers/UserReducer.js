import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API } from '../constant'


export const sendOtpToUser = createAsyncThunk(
    "user/sendOtpToUser",
    async ({ email }) => {
        const response = await axios.post(`${API}/auth/generate/otp`, { email })
        return response.data;
    }
)

export const getProfile = createAsyncThunk(
    "user/getProfile",
    async () => {
        const reponse = await axios.get(`${API}/auth/profile`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return reponse.data;
    }
)

export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async (data) => {
        const reponse = await axios.patch(`${API}/auth/profile`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return reponse.data;
    }
)

export const searchFranchiseByName = createAsyncThunk(
    "user/searchFranchiseByName",
    async (data) => {
        const reponse = await axios.get(`${API}/search/franchise/name/${data}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return reponse.data;
    }
)



const initialState = {
    user: {},
    userid: null,
    loggedIn: false,
    userLoading: true
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.loggedIn = true;
            state.userid = action.payload.user?._id;
        },
        UserLogOut: (state) => {
            state.user = {}
            state.loggedIn = false
            state.userid = null
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state, action) => {
            state.userLoading = true
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            if (action.payload.status === "success") {
                state.user = action.payload.user
                state.userid = action.payload.user?._id
                state.loggedIn = true
            } else {
                state.loggedIn = false
            }
            state.userLoading = false;
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.user = action.payload.user
        })
    }
})

export const { setUser, UserLogOut } = userReducer.actions
export default userReducer.reducer