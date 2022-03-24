import { configureStore, createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search-slice',
  initialState: {
    // TODO handle initial load
    hits: [],
  },
  reducers: {
    searchForShow: (state, { payload }) => {
      // TODO fill the logic here
      console.log({ payload })
      state.hits = []
    },
  },
})

export const { searchForShow } = searchSlice.actions

const store = configureStore({
  reducer: searchSlice.reducer,
})

// TODO remove this later on
store.subscribe(() => console.log(store.getState()))

export default store
