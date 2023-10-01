const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export async function trendingToday() {
  return fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
}

export async function configuration() {
  return fetch("https://api.themoviedb.org/3/configuration", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function search(query: string) {
  return fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
