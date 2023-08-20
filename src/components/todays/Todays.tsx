import ShowCard from "../ShowCard";
import "./Todays.css";

const TodaysTV = ({ todaysShows }) => {
  return (
    <div className="TodaysTVWrapper">
      <h2>Todays TV</h2>
      <div className="TodaysTV">
        {todaysShows.map((episode) => (
          <ShowWithEpisode key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};

const ShowWithEpisode = ({ episode }) => {
  return (
    <div className="ShowEpisode">
      <div className="time">{episode.airtime}: </div>
      <ShowCard show={episode.show} />
    </div>
  );
};

export default TodaysTV;
