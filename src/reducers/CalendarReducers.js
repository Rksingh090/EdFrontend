import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API } from '../constant'

export const getAllEvents = createAsyncThunk(
  "calendar/getAllEvents",
  async ({ year, month, day }) => {
    const response = await axios.get(`${API}/calendar/date/${year}/${month}/${day}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  })

export const getAllMonthEvents = createAsyncThunk(
  "calendar/getAllMonthEvents",
  async ({ year, month }) => {
    const response = await axios.get(`${API}/calendar/month/${year}/${month}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  })

export const addNewEvent = createAsyncThunk(
  "calendar/addNewEvent",
  async (data, thunkAPI) => {
    const response = await axios.post(`${API}/calendar`, data, {
      headers: {
        token: localStorage.getItem("token")
      }
    });
    return response.data;
  }
)

const initialState = {
  events: [],
}

const calendarReducer = createSlice({
  name: 'calendar',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.events = action.payload.events;
    })
    builder.addCase(getAllMonthEvents.fulfilled, (state, action) => {
      state.events = action.payload.events;
    })

    builder.addCase(addNewEvent.fulfilled, (state, action) => {
      const { event_date } = action.payload.event;
      const date_id = String(event_date).substring(0, 10)
      console.log(date_id);
      let allEvents = state.events;
      const findEvent = allEvents.filter((ev) => ev._id === date_id);
      if (findEvent.length === 0) {
        const newEvent = {
          _id: date_id,
          events: [action.payload.event]
        }
        state.events = [newEvent, ...state.events]
      } else {
        allEvents.forEach((ev) => {
          if (String(ev._id) === date_id) {
            ev.events.push(action.payload.event);
          }
        })
        state.events = allEvents;
      }
    })

  }
})

// export const { } = calendarReducer.actions
export default calendarReducer.reducer