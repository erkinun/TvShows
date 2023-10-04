import { useQuery } from "@tanstack/react-query";
import { ModeToggle } from "./mode-toggle";

import { useSearchParams } from "react-router-dom";
import { configuration, search } from "@/api";
import Modal from "./ui/Modal";
import { ChangeEvent, useEffect, useState } from "react";
import { ShowCardSummary } from "./ShowCard";

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
    <nav className="flex p-2">
      <input
        placeholder="Search for a TV Show"
        value={params.get("searchTerm") || ""}
        className="flex-1 p-2 rounded-md text-black"
        onChange={handleSearch}
      />
      <ModeToggle />

      {!searchLoading && shows.length > 0 && !configLoading && (
        <Modal
          fullWidth
          wrapperProps="fixed z-50 mt-10 overflow-y-auto"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {shows.map((s) => (
            <ShowCardSummary
              show={s}
              key={s.id}
              configuration={configurationData?.images}
            />
          ))}
        </Modal>
      )}
    </nav>
  );
};
