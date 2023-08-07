import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constant";



export const getAffilateCoupon = createAsyncThunk(
    "coupon/getAffilateCoupon",
    async () => {
        const response = await axios.get(`${API}/affiliate/coupon`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)
export const getDashboardData = createAsyncThunk(
    "coupon/getDashboardData",
    async () => {
        const response = await axios.get(`${API}/affiliate/dashboard`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)
export const createCoupon = createAsyncThunk(
    "coupon/createCoupon",
    async () => {
        const response = await axios.get(`${API}/affiliate/createcoupon`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)



const initialState = {
    coupons: [],
    dashboard: {
        coupons: [],
        couponCount: 0,
        enrollments: [],
        enrollmentCount: 0,
        totalSellAmount: 0,
        totalEarnings: 0,
    }
}

const affiliateDashboardReducer = createSlice({
    name: "affiliateDashboard",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAffilateCoupon.fulfilled, (state, action) => {
            const { status, coupon } = action.payload;
            if (status === "success") {
                state.coupons = coupon;
            }
        })
        builder.addCase(getDashboardData.fulfilled, (state, action) => {
            const { status, coupon, couponCount, enrollments, enrollmentCount, sellData } = action.payload;
            if (status === "success") {
                state.dashboard.coupons = coupon;
                state.dashboard.couponCount = couponCount;
                state.dashboard.enrollmentCount = enrollmentCount;
                state.dashboard.enrollments = enrollments;
                state.dashboard.totalSellAmount = parseFloat(sellData?.total_basic || 0).toFixed(2);
                state.dashboard.totalEarnings = parseFloat(sellData?.total_earnings || 0).toFixed(2);
            }
        })
    }
})

export default affiliateDashboardReducer.reducer;