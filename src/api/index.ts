const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjQzNDcxYWMzZTVlMjE5OTRlOTVhNmMyZWVlMzgzYyIsInN1YiI6IjY1MTgwZjIxOTY3Y2M3MzQyNjA4ZmFmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3n9KaTCKBC8H02iBdQAc6jjufRZdH0KFX6pm7lOsRjs",
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
