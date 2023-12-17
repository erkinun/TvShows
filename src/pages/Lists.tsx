import { useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Show, ShowList, createList, useLists } from "@/queries/lists";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { configuration, getDetails } from "@/api";

function ShowSummary({
  show: { mediaType, apiId: showId, name },
}: {
  show: Show;
}) {
  // TODO use the loading state to show a skeleton
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

  const { base_url, poster_sizes } = configurationData?.images;

  const { vote_average: average, overview, poster_path } = showDetails || {};

  if (isLoading || configLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <Link to={`/details/${mediaType}/${showId}`}>
        <div className="flex">
          <div className="basis-1/4">
            {poster_path && (
              <img
                className="w-auto h-32"
                src={`${base_url}${poster_sizes.at(4)}${poster_path}`}
                alt="show"
              />
            )}
          </div>
          <div className="basis-3/4">
            <div>
              {name} - {Math.round(average * 100) / 100}
            </div>
            <div>{overview.substring(0, 150)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function List({ list }: { list: ShowList }) {
  const shows = list.shows ?? [];
  console.log({ shows });
  const mediaTypes = Array.from(new Set(shows.map((show) => show.mediaType)));
  const [shown, setShown] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    mediaType: string
  ) => {
    const { checked } = e.target;
    const value = mediaType;
    console.log({ value, checked });
    if (checked) {
      setFilters((prev) => [...prev, value]);
    } else {
      setFilters((prev) => prev.filter((filter) => filter !== value));
    }
  };
  return (
    <div>
      <h3
        className="capitalize text-xl"
        onClick={() => setShown((prev) => !prev)}
      >
        {list.name}
      </h3>
      {shown ? (
        <>
          <h4>Filter by type</h4>
          <ul className="flex flex-col gap-1 my-4">
            {mediaTypes.map((mediaType) => (
              <li key={mediaType} className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  onChange={(e) => handleFilter(e, mediaType)}
                />
                <label className="uppercase">{mediaType}</label>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {shown ? (
        <ul className="flex flex-col gap-4">
          {shows
            .filter((s) => {
              if (filters.length === 0) {
                return true;
              }
              return filters.includes(s.mediaType);
            })
            .map((show) => (
              <li key={show.apiId} className="border-t pt-2">
                <ShowSummary show={show} />
              </li>
            ))}
        </ul>
      ) : (
        <button onClick={() => setShown(true)}>Show</button>
      )}
    </div>
  );
}

export const Lists = () => {
  const [user] = useAuthState(auth);
  const lists = useLists();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateButton = () => {
    createList(user?.uid ?? "", inputRef.current?.value ?? "");
  };

  return (
    <div className="p-2">
      <label className="capitalize">Existing collections</label>
      <div className="flex flex-col gap-4 p-2">
        {lists.map((list) => {
          return <List key={list.id} list={list} />;
        })}
      </div>

      <section className="p-2 flex flex-col gap-2 justify-start">
        <div className="text-lg">
          Create a new list ie favorites, watched etc
        </div>
        <input
          className="text-black text-lg p-2 rounded"
          ref={inputRef}
          type="text"
        />
        <button
          className="bg-white text-black rounded"
          onClick={handleCreateButton}
        >
          Create
        </button>
      </section>
    </div>
  );
};
