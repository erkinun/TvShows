import { configureStore } from '@reduxjs/toolkit'
import { detailSlice } from './detailSlice'
import favSliceReducer from './favSlice'
import { searchSlice } from './searchSlice'
import { saveFavourites } from './localStorage'

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    detail: detailSlice.reducer,
    favs: favSliceReducer,
  },
})

store.subscribe(() => {
  // uncomment when you want to debug store
  // console.log(store.getState())
  saveFavourites(store.getState().favs)
})

export default store
