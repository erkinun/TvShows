import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchDetails = createAsyncThunk(
  'shows/details',
  async (id = '1') => {
    // TODO group the fetches together for performance
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const castResponse = await fetch(`https://api.tvmaze.com/shows/${id}/cast`)
    const seasonResponse = await fetch(
      `https://api.tvmaze.com/shows/${id}/seasons`
    )
    const castData = await castResponse.json()
    const showData = await response.json()
    const seasonData = await seasonResponse.json()
    return {
      summary: showData,
      cast: castData,
      seasons: seasonData,
    }
  }
)

export const detailSlice = createSlice({
  name: 'detail-slice',
  initialState: {
    hits: [],
    status: 'idle',
  },
  reducers: {
    reset(state) {
      state.status = 'idle'
    },
  },
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

export const { reset } = detailSlice.actions
