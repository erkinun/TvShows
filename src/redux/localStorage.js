export const loadFavourites = () => {
  try {
    const serializedState = localStorage.getItem('favourites')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState).favs
  } catch (err) {
    return undefined
  }
}

export const saveFavourites = (favourites) => {
  try {
    const stringifiedFavs = JSON.stringify(favourites)
    localStorage.setItem('favourites', stringifiedFavs)
  } catch (err) {}
}
