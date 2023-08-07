import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constant";



export const searchCourseByName = createAsyncThunk(
    "course/searchCourseByName",
    async ({searchText}) => {
        
        const response = await axios.get(`${API}/search/course/title/${searchText}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    })


const initialState = {
   
}

const bussinessCouponReducer = createSlice({
    name: "bussinessSearch",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
       
    }
})

export default bussinessCouponReducer.reducer;

