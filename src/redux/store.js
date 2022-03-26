import { configureStore } from '@reduxjs/toolkit'
import { detailSlice } from './detailSlice'
import { searchSlice } from './searchSlice'

const store = configureStore({
  reducer: { search: searchSlice.reducer, detail: detailSlice.reducer },
})

// uncomment when you want to debug store
// store.subscribe(() => console.log(store.getState()))

export default store
