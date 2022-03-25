import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchShows = createAsyncThunk(
  'shows/search',
  async (searchText = 'test') => {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchText}`
    )
    return response.json()
  }
)

export const searchSlice = createSlice({
  name: 'search-slice',
  initialState: {
    hits: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchShows.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.hits = action.payload
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
