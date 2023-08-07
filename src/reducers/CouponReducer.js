import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API } from '../constant'

export const getCouponByPage = createAsyncThunk(
    "coupon/getAsyncThunk",
    async ({ pageNo, perPage }) => {
        const response = await axios.get(`${API}/coupon/page/${pageNo}?perPage=${perPage}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)
export const createNewCoupon = createAsyncThunk(
    "coupon/createNewCoupon",
    async (data) => {
        const response = await axios.post(`${API}/coupon`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)
export const totalCouponsPagination = createAsyncThunk(
    "coupon/totalCouponsPagination",
    async ({ perPage }) => {
        const response = await axios.get(`${API}/coupon/pagination?perPage=${perPage}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)

export const deletCouponById = createAsyncThunk(
    "coupon/deletCouponById",
    async ({ couponId }) => {
        const response = await axios.delete(`${API}/coupon/${couponId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        return response.data;
    }
)




const initialState = {
    coupons: [],
    pages: [],
    currPageNo: 1,
    perPageItem: 10
}

const couponReducer = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCurrPageNo: (state, action) => {
            state.currPageNo = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getCouponByPage.fulfilled, (state, action) => {
            const { status, coupon } = action.payload;
            if (status === "success") {
                state.coupons = coupon;
            }
        })

        builder.addCase(createNewCoupon.fulfilled, (state, action) => {
            const { status, coupon } = action.payload;
            if (status === "success") {
                if (state.pages.length === 1 || state.currPageNo === state.pages[state.pages.length - 1]) {
                    state.coupons = [...state.coupons, coupon];
                }
            }
        })

        builder.addCase(totalCouponsPagination.fulfilled, (state, action) => {
            const { status, pagination } = action.payload;
            if (status === "success") {
                state.pages = pagination;
            }
        })

        builder.addCase(deletCouponById.fulfilled, (state, action) => {
            const {status, coupon} = action.payload;
            if(status === "success"){
                let filterCoupon = state.coupons.filter((couponItem) =>  couponItem?._id !== coupon?._id);
                state.coupons = filterCoupon
            }
        })

    }
})

export const { setCurrPageNo } = couponReducer.actions
export default couponReducer.reducer;