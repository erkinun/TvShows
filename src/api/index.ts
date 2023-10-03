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
  const tv = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  const movies = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=bond&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return [...tv.results, ...movies.results];
}

export type MovieOrShow = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country?: string[];
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
