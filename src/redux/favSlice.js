import { createSlice } from '@reduxjs/toolkit'
import { loadFavourites } from './localStorage'

// TODO implement the fav slice of the store
export const favSlice = createSlice({
  name: 'fav-slice',
  initialState: {
    favs: loadFavourites(),
  },
  reducers: {
    addFav(state, action) {
      const id = action.payload
      if (!state.favs.includes(id)) {
        state.favs.push(id)
      }
    },
    removeFav(state, action) {
      const id = action.payload
      if (state.favs.includes(id)) {
        state.favs.splice(state.favs.indexOf(id), 1)
      }
    },
  },
})

export const { addFav, removeFav } = favSlice.actions
export default favSlice.reducer
