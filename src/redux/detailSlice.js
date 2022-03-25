import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchDetails = createAsyncThunk(
  'shows/search',
  async (id = '1') => {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
    // maybe fetch the other bits here too
    const castResponse = await fetch(`https://api.tvmaze.com/shows/${id}/cast`)
    const castData = await castResponse.json()
    const showData = await response.json()
    return {
      summary: showData,
      cast: castData,
    }
  }
)

export const detailSlice = createSlice({
  name: 'detail-slice',
  initialState: {
    hits: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.details = action.payload
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
