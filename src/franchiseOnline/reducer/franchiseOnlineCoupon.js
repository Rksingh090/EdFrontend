import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constant";



export const getFranchiseOnlineCoupon = createAsyncThunk(
    "coupon/getAsyncThunk",
    async ( ) => {
        const response = await axios.get(`${API}/franchiseOnline/coupon`, {
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

const franchiseCouponReducer = createSlice({
    name: "franchiseOnlineCoupon",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getFranchiseOnlineCoupon.fulfilled, (state, action) => {
            const {status, coupon} = action.payload;
            if(status === "success"){
                state.coupons = coupon;
            }
        })
    }
})

export default franchiseCouponReducer.reducer;