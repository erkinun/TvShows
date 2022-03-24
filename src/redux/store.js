import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// TODO maybe move these to their corresponding folders - slice file
export const fetchShows = createAsyncThunk(
  'shows/search',
  async (searchText = 'test') => {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchText}`
    )
    return response.json()
  }
)

const searchSlice = createSlice({
  name: 'search-slice',
  initialState: {
    // TODO handle initial load
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
        state.hits = state.hits.concat(action.payload)
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

const store = configureStore({
  reducer: searchSlice.reducer,
})

// TODO remove this later on
store.subscribe(() => console.log(store.getState()))

export default store
