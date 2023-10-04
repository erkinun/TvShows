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
import { MovieOrShow } from "@/api";

// TODO create a props type from the following snippet
type ShowCardProps = {
  show: MovieOrShow;
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
    media_type,
    poster_path,
    vote_average,
    vote_count,
    first_air_date,
    origin_country,
  },
  configuration: { base_url, poster_sizes },
}: ShowCardProps) => {
  const resetDispatch = useDispatch();

  return (
    <Link
      to={`details/${media_type}/${id}`}
      onClick={() => resetDispatch(reset())}
      key={id}
    >
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
          <div className="text-sm">{origin_country ?? [].join(", ")}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ShowCard;
