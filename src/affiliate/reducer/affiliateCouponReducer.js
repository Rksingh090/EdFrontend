import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constant";



export const getAffilateCoupon = createAsyncThunk(
    "coupon/getAsyncThunk",
    async ( ) => {
        const response = await axios.get(`${API}/affiliate/coupon`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)

const initialState = {
    coupons: []
}

const affiliateCouponReducer = createSlice({
    name: "affiliateCoupon",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAffilateCoupon.fulfilled, (state, action) => {
            const {status, coupon} = action.payload;
            if(status === "success"){
                state.coupons = coupon;
            }
        })
    }
})

export default affiliateCouponReducer.reducer;