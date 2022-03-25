import { configureStore } from '@reduxjs/toolkit'
import { searchSlice } from './searchSlice'

const store = configureStore({
  reducer: { search: searchSlice.reducer },
})

// TODO remove this later on
// store.subscribe(() => console.log(store.getState()))

export default store
