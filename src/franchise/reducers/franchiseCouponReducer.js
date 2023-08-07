import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constant";



export const getFranchiseCoupon = createAsyncThunk(
    "coupon/getAsyncThunk",
    async ( ) => {
        const response = await axios.get(`${API}/franchise/coupon`, {
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
    name: "franchiseCoupon",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getFranchiseCoupon.fulfilled, (state, action) => {
            const {status, coupon} = action.payload;
            if(status === "success"){
                state.coupons = coupon;
            }
        })
    }
})

export default franchiseCouponReducer.reducer;