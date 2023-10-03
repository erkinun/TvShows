import ShowCard from "./ShowCard";

import "./Search.css";
import TodaysTrending from "./todays/Todays";
import { useQuery } from "@tanstack/react-query";
import { trendingToday, configuration, search } from "@/api";
import { useSearchParams } from "react-router-dom";

// TODO next step is details page
const Search = () => {
  // TODO add favorites and watchlist
  // TODO look at accounts and sharing

  const { data: trendingTV, isLoading } = useQuery(["trending"], trendingToday);
  const { data: configurationData, isLoading: configLoading } = useQuery(
    ["configuration"],
    configuration
  );

  const [params] = useSearchParams();
  const searchTerm = params.get("searchTerm") || "";

  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchTerm !== "" && search(searchTerm),
  });

  console.log({ searchResults });

  const shows = searchResults || [];

  return (
    <div className="search-content">
      {!searchLoading && shows.length > 0 && !configLoading && (
        <div className="search-results">
          {shows.map((s) => (
            <ShowCard
              show={s}
              key={s.id}
              configuration={configurationData?.images}
            />
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
