import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constant";



export const getBussinessCoupon = createAsyncThunk(
    "coupon/getAsyncThunk",
    async ( ) => {
        const response = await axios.get(`${API}/bussiness/coupon`, {
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

const bussinessCouponReducer = createSlice({
    name: "bussinessCoupon",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getBussinessCoupon.fulfilled, (state, action) => {
            const {status, coupon} = action.payload;
            if(status === "success"){
                state.coupons = coupon;
            }
        })
    }
})

export default bussinessCouponReducer.reducer;