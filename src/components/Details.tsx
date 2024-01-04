import { Link, useParams } from "react-router-dom";

import CastSection from "./details/Cast";
import SeasonSection from "./details/Season";

import "./Details.css";
import { useQuery } from "@tanstack/react-query";
import { configuration, getDetails } from "@/api";
import { ShowLists, updateList, useLists } from "@/queries/lists";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, authFn } from "@/firebase";

// TODO find a NA image and use where image doesn't exist

type AddToListButtonProps = {
  lists: ShowLists;
  showId: string;
  addToList: (listId: string, showId: string, add: boolean) => void;
};

const AddToListButton = ({
  lists,
  showId,
  addToList,
}: AddToListButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu defaultOpen open={isOpen} modal={false}>
      <DropdownMenuTrigger onClick={() => setIsOpen((prev) => !prev)}>
        Manage your lists
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {lists.map((list) => (
          <DropdownMenuItem key={list.id}>
            <div className="text-white">
              <input
                id={`show-checkbox-${list.id}`}
                type="checkbox"
                checked={!!(list.shows ?? []).find((s) => s.apiId === showId)}
                onChange={(e) => addToList(list.id, showId, e.target.checked)}
              />{" "}
              <label className="text-xl" htmlFor={`show-checkbox-${list.id}`}>
                {list.name}
              </label>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 *
 * movie sample
 * {
    "adult": false,
    "backdrop_path": "/h0nmmdFAdBjQttN8Y0q825MWzZp.jpg",
    "belongs_to_collection": {
        "id": 523855,
        "name": "The Equalizer Collection",
        "poster_path": "/lq0Ledkl44xhnr1C15AiqbprAAi.jpg",
        "backdrop_path": "/f66hwFPSXgVBTmLwurPMgJHVNec.jpg"
    },
    "budget": 70000000,
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 80,
            "name": "Crime"
        }
    ],
    "homepage": "https://www.equalizer.movie",
    "id": 926393,
    "imdb_id": "tt17024450",
    "original_language": "en",
    "original_title": "The Equalizer 3",
    "overview": "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
    "popularity": 499.603,
    "poster_path": "/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg",
    "production_companies": [
        {
            "id": 1423,
            "logo_path": "/1rbAwGQzrNvXDICD6HWEn1YqfAV.png",
            "name": "Escape Artists",
            "origin_country": "US"
        },
        {
            "id": 5,
            "logo_path": "/wrweLpBqRYcAM7kCSaHDJRxKGOP.png",
            "name": "Columbia Pictures",
            "origin_country": "US"
        },
        {
            "id": 10400,
            "logo_path": "/9LlB2YAwXTkUAhx0pItSo6pDlkB.png",
            "name": "Eagle Pictures",
            "origin_country": "IT"
        },
        {
            "id": 44967,
            "logo_path": null,
            "name": "ZHIV Productions",
            "origin_country": ""
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "IT",
            "name": "Italy"
        },
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2023-08-30",
    "revenue": 158300000,
    "runtime": 109,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        },
        {
            "english_name": "Italian",
            "iso_639_1": "it",
            "name": "Italiano"
        }
    ],
    "status": "Released",
    "tagline": "Justice knows no borders.",
    "title": "The Equalizer 3",
    "video": false,
    "vote_average": 6.965,
    "vote_count": 287
}

tv sample
{
    "adult": false,
    "backdrop_path": "/mvoW41kdSxiobGZ9ONL1Tqrpt3h.jpg",
    "created_by": [
        {
            "id": 71538,
            "credit_id": "64302e441f98d101d36ee00e",
            "name": "Dave Filoni",
            "gender": 2,
            "profile_path": "/dDTTrShpCnCacxB3LhpPffFIdB5.jpg"
        }
    ],
    "episode_run_time": [],
    "first_air_date": "2023-08-22",
    "genres": [
        {
            "id": 10765,
            "name": "Sci-Fi & Fantasy"
        },
        {
            "id": 10759,
            "name": "Action & Adventure"
        }
    ],
    "homepage": "https://www.disneyplus.com/series/ahsoka/pdpjs2TO4zJ4",
    "id": 114461,
    "in_production": false,
    "languages": [
        "en"
    ],
    "last_air_date": "2023-10-03",
    "last_episode_to_air": {
        "id": 4502602,
        "name": "Part Eight: The Jedi, the Witch, and the Warlord",
        "overview": "The heroes race to prevent Grand Admiral Thrawn's escape.",
        "vote_average": 5.429,
        "vote_count": 7,
        "air_date": "2023-10-03",
        "episode_number": 8,
        "episode_type": "finale",
        "production_code": "",
        "runtime": 49,
        "season_number": 1,
        "show_id": 114461,
        "still_path": "/hfTeALgUwN0aezOPA57kVnVZ5M8.jpg"
    },
    "name": "Ahsoka",
    "next_episode_to_air": null,
    "networks": [
        {
            "id": 2739,
            "logo_path": "/uzKjVDmQ1WRMvGBb7UNRE0wTn1H.png",
            "name": "Disney+",
            "origin_country": ""
        }
    ],
    "number_of_episodes": 8,
    "number_of_seasons": 1,
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_name": "Ahsoka",
    "overview": "Former Jedi Knight Ahsoka Tano investigates an emerging threat to a vulnerable galaxy.",
    "popularity": 840.957,
    "poster_path": "/laCJxobHoPVaLQTKxc14Y2zV64J.jpg",
    "production_companies": [
        {
            "id": 1,
            "logo_path": "/o86DbpburjxrqAzEDhXZcyE8pDb.png",
            "name": "Lucasfilm Ltd.",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "seasons": [
        {
            "air_date": "2023-08-22",
            "episode_count": 8,
            "id": 171668,
            "name": "Season 1",
            "overview": "",
            "poster_path": "/ikzUPmlVtb7xQAcfChzmVTevwAz.jpg",
            "season_number": 1,
            "vote_average": 7
        }
    ],
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Ended",
    "tagline": "Warrior. Outcast. Rebel. Jedi.",
    "type": "Miniseries",
    "vote_average": 8.041,
    "vote_count": 306
}
 */

const Details = () => {
  const params = useParams();
  const showId = params.showId;
  const mediaType = params.mediaType;
  const lists = useLists();

  const {
    data: showDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["details", mediaType, showId],
    queryFn: () => getDetails(mediaType ?? "", showId ?? ""),
  });

  const { data: configurationData, isLoading: configLoading } = useQuery(
    ["configuration"],
    configuration
  );

  const [user, loading] = useAuthState(auth);

  if (isLoading || configLoading || loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!showDetails || !showId) {
    return <div>No show details found</div>;
  }

  const {
    genres = [],
    vote_average: average,
    networks = [],
    premiered,
    status,
    poster_path,
  } = showDetails || {};
  const premieredYear = premiered?.slice(0, 4);

  const { base_url, poster_sizes } = configurationData?.images;

  return (
    <div className="details-wrapper h-full">
      <div className="details-content p-4">
        <div className="header">
          <div className="title">{showDetails.title ?? showDetails.name}</div>
          <div className="flex flex-wrap justify-center items-center">
            <div>
              <div className="info text-sm">
                {Math.round(average * 100) / 100}{" "}
                {networks.map((n) => n.name).join(", ")}
                {premieredYear} - {status}
              </div>
            </div>
            <div className="genres">
              {genres.map((g) => (
                <div key={g.id} className="genre text-sm">
                  {g.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="basis-1/4">
              {poster_path && (
                <img
                  src={`${base_url}${poster_sizes.at(3)}${poster_path}`}
                  alt="show"
                />
              )}
            </div>

            <div className="basis-3/4 text-sm">{showDetails.overview}</div>
          </div>
        </div>
        {user && (
          <AddToListButton
            lists={lists}
            showId={showId}
            addToList={(listId, showId, add) => {
              const list = lists.find((l) => l.id === listId);
              if (!list) {
                return;
              }
              if (add) {
                updateList({
                  ...list,
                  shows: (list?.shows ?? []).concat({
                    apiId: showId,
                    id: showId,
                    name: showDetails.title ?? showDetails.name,
                    mediaType: mediaType ?? "movie",
                  }),
                });
              } else {
                updateList({
                  ...list,
                  shows: list?.shows.filter((s) => s.apiId !== showId),
                });
              }
            }}
          />
        )}
        {!user && (
          <div className="text-sm">
            <button className="btn" onClick={authFn}>
              Login with Google to add this to your lists
            </button>
          </div>
        )}
        {
          // TODO implement cast
        }{" "}
        <CastSection casts={showDetails.cast} />
        {mediaType === "tv" && <SeasonSection seasons={showDetails.seasons} />}
      </div>
    </div>
  );
};

export default Details;
