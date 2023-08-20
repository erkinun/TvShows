import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShows } from "../redux/searchSlice";
import { fetchToday } from "../redux/todaysTvSlice";
import ShowCard from "./ShowCard";

import "./Search.css";
import TodaysTV from "./todays/Todays";

const Search = () => {
  const searchDispatch = useDispatch();
  const todaysDispatch = useDispatch();
  const shows = useSelector((state) => state.search.hits);
  const status = useSelector((state) => state.search.status);
  const lastSearch = useSelector((state) => state.search.lastSearch);
  const todaysTV = useSelector((state) => state.today.hits);

  useEffect(() => {
    if (status === "idle") {
      searchDispatch(fetchShows());
      todaysDispatch(fetchToday());
    }
  }, [status, searchDispatch, todaysDispatch]);

  return (
    <div className="search-content">
      {shows.length > 0 && (
        <div className="search-results">
          {shows
            .map((s) => s.show)
            .map((s) => (
              <ShowCard show={s} key={s.id} />
            ))}
        </div>
      )}
      <TodaysTV todaysShows={todaysTV} />
    </div>
  );
};

export default Search;
