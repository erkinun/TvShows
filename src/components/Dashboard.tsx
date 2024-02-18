import "./Search.css";
import TodaysTrending from "./todays/Todays";
import { useQuery } from "@tanstack/react-query";
import { trendingToday, configuration } from "@/api";

// TODO rename this component to be dashboard etc
// TODO next step is details page, better
const Dashboard = () => {
  // TODO add favorites and watchlist
  // TODO look at accounts and sharing

  const { data: trendingTV, isLoading } = useQuery(["trending"], trendingToday);
  const { data: configurationData, isLoading: configLoading } = useQuery(
    ["configuration"],
    configuration
  );

  return (
    <div className="search-content">
      {!isLoading && !configLoading && (
        <TodaysTrending
          trendingShows={trendingTV}
          configuration={configurationData}
        />
      )}
    </div>
  );
};

export default Dashboard;
