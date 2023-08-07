import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API } from '../constant'

export const getAllCategory = createAsyncThunk(
  "course/getAllCategories",
  async (thunkAPI) => {
    const response = await axios.get(`${API}/category/course/count`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  })

export const getAllSubCategory = createAsyncThunk(
  "course/getAllSubCategories",
  async (thunkAPI) => {
    const response = await axios.get(`${API}/category/sub-category`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  })

const initialState = {
  categories: [],
  subcategories: []
}

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categories = action.payload.category
    })

    builder.addCase(getAllSubCategory.fulfilled, (state, action) => {
      state.subcategories = action.payload.subcategories
    })
  }
})

// export const { } = categoryReducer.actions
export default categoryReducer.reducer