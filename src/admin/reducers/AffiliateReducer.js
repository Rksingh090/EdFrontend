import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../constant';


export const getAffiliateByPageNo = createAsyncThunk(
    "adminaffiliate/getAffiliateByPageNo",
    async ({ pageNo }) => {
        const response = await axios.get(`${API}/admin/affiliate/page/${pageNo}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)


export const addAffiliateByAdmin = createAsyncThunk(
    "adminaffiliate/addAffiliateByAdmin",
    async (affiliate) => {
        const response = await axios.post(`${API}/admin/affiliate`, affiliate, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

export const updateAffiliate = createAsyncThunk(
    "adminaffiliate/updateAffiliate",
    async (affiliate) => {
        const response = await axios.patch(`${API}/admin/affiliate/${affiliate._id}`, affiliate, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return response.data;
    }
)

const initialState = {
    affiliates: [],
    pageNo: 1,
    pagination: [],
    perPage: 10,
    totalAffiliates: 0
}

const affiliateReducer = createSlice({
    name: 'adminaffiliate',
    initialState,
    reducers: {
        setPageNo: (state, action) => {
            state.pageNo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addAffiliateByAdmin.fulfilled, (state, action) => {
            const { status, affiliate } = action.payload;
            if (status === "success") {
                state.affiliates = [...state.affiliates, affiliate];
            }
        })

        builder.addCase(getAffiliateByPageNo.fulfilled, (state, action) => {
            const { affiliates, totalAffiliates, pagination, status } = action.payload;

            if (status === "success") {
                state.pagination = pagination;
                state.affiliates = affiliates;
                state.totalAffiliates = totalAffiliates
            }
        })

        builder.addCase(updateAffiliate.fulfilled, (state, action) => {
            const { status, affiliate } = action.payload;
            if (status === "success") {
                const findIdx =state.affiliates.findIndex((affiliateItm) => affiliateItm._id === affiliate._id);
                if(findIdx === -1){
                    return;
                }
                state.affiliates[findIdx] = affiliate;
            }
        })
    }
})

export const { setPageNo } = affiliateReducer.actions
export default affiliateReducer.reducer