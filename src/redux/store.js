import { configureStore } from '@reduxjs/toolkit'
import { searchSlice } from './searchSlice'

const store = configureStore({
  reducer: searchSlice.reducer,
})

// TODO remove this later on
// store.subscribe(() => console.log(store.getState()))

export default store
