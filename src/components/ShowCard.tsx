import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../redux/detailSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// TODO create a props type from the following snippet
type ShowCardProps = {
  show: {
    title: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
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

const ShowCard = ({
  show: {
    title,
    id,
    name,
    overview,
    poster_path,
    vote_average,
    vote_count,
    first_air_date,
    origin_country,
  },
  configuration: { base_url, poster_sizes },
}: ShowCardProps) => {
  const resetDispatch = useDispatch();

  console.log({ poster_sizes });

  return (
    <Link to={`details/${id}`} onClick={() => resetDispatch(reset())} key={id}>
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
          <div className="text-sm">{origin_country.join(", ")}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ShowCard;
