import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShows } from "../redux/searchSlice";
import { fetchToday } from "../redux/todaysTvSlice";
import ShowCard from "./ShowCard";

import "./Search.css";
import TodaysTrending from "./todays/Todays";
import { useQuery } from "@tanstack/react-query";
import { trendingToday, configuration } from "@/api";

const Search = () => {
  // TODO remove all these redux bullshit with react-query
  // TODO add favorites and watchlist
  // TODO look at accounts and sharing
  const searchDispatch = useDispatch();
  const todaysDispatch = useDispatch();
  const shows = useSelector((state) => state.search.hits);
  const status = useSelector((state) => state.search.status);
  const { data: trendingTV, isLoading } = useQuery(["trending"], trendingToday);
  const { data: configurationData, isLoading: configLoading } = useQuery(
    ["configuration"],
    configuration
  );

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
      {!isLoading && !configLoading && (
        <TodaysTrending
          trendingShows={trendingTV}
          configuration={configurationData}
        />
      )}
    </div>
  );
};

export default Search;
