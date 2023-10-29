import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ModeToggle } from "./mode-toggle";

import { useSearchParams } from "react-router-dom";
import { configuration, search } from "@/api";

import { ChangeEvent, useState } from "react";
import { ShowCardSummary } from "./ShowCard";
import { NavMenu } from "./NavigationMenu";

export const Header = () => {
  const { data: configurationData, isLoading: configLoading } = useQuery(
    ["configuration"],
    configuration
  );

  const [params, setParams] = useSearchParams();
  const searchTerm = params.get("searchTerm") || "";
  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchTerm !== "" && search(searchTerm),
  });

  const shows = searchResults || [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setParams({ searchTerm: e.target.value });
    setIsModalOpen(true);
    // TODO use bounce to delay the search
  };

  return (
    <nav className="flex gap-1 p-2">
      <div className="flex-1">
        <Popover open={isModalOpen} onOpenChange={setIsModalOpen}>
          <PopoverTrigger asChild>
            <div>
              <input
                placeholder="Search for a TV Show"
                value={params.get("searchTerm") || ""}
                className="flex-1 p-2 w-full rounded-md text-black"
                onChange={handleSearch}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-screen min-w-0 max-w-md rounded-md shadow-md"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <h2>Search Results</h2>
            {!searchLoading && shows.length > 0 && !configLoading && (
              <>
                {shows.map((s) => (
                  <ShowCardSummary
                    show={s}
                    key={s.id}
                    configuration={configurationData?.images}
                  />
                ))}
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <NavMenu />
    </nav>
  );
};
