const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export async function trendingToday() {
  return fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-GB",
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
  const search = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-GB&page=1`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return search.results;
}

// TODO can use append_to_response to get more info, ie videos or recommendations
export async function getDetails(media_type: string, id: string) {
  return await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?language=en-GB`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

const MediaTypes = {
  movie: "movie",
  tv: "tv",
  person: "person",
};

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
  media_type: keyof typeof MediaTypes;
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
