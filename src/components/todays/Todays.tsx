import ShowCard from "../ShowCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import "./Todays.css";

const TodaysTrending = ({ trendingShows, configuration }) => {
  return (
    <div className="TodaysTVWrapper">
      <h2>Todays TV</h2>
      <div className="TodaysTV">
        {trendingShows.results.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            configuration={configuration?.images}
          />
        ))}
      </div>
    </div>
  );
};

type TrendingProps = {
  trending: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
  };

  configuration: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
};

// use tailwind to style this
// TODO use the ShowCard instead of this
const Trending = ({
  trending: {
    title,
    name,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    vote_count,
    first_air_date,
    origin_country,
  },
  configuration: { base_url, poster_sizes },
}: TrendingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title ?? name}</CardTitle>
        <CardDescription className="text-sm">
          {vote_average} ({vote_count} votes)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={`${base_url}${poster_sizes.at(-1)}${poster_path}`}
          alt={name}
        />
        <p>{overview}</p> {/* TODO convert into read more */}
      </CardContent>
      <CardFooter>
        <div className="text-sm">{first_air_date}</div>
      </CardFooter>
    </Card>
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

export default TodaysTrending;
