import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchToday = createAsyncThunk('shows/today', async () => {
  const response = await fetch(`https://api.tvmaze.com/schedule?country=GB`)
  return response.json()
})

export const todaysSlice = createSlice({
  name: 'todays-slice',
  initialState: {
    hits: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchToday.pending, (state, action) => {
        state.lastSearch = action.meta.arg
        state.status = 'loading'
      })
      .addCase(fetchToday.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.hits = action.payload
      })
      .addCase(fetchToday.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
