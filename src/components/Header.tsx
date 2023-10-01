import { ModeToggle } from "./mode-toggle";

import { useSearchParams } from "react-router-dom";

export const Header = () => {
  const [params, setParams] = useSearchParams();

  return (
    <nav className="flex p-2">
      <input
        placeholder="Search for a TV Show"
        value={params.get("searchTerm") || ""}
        className="flex-1 p-2 rounded-md text-black"
        onChange={(e) => setParams({ searchTerm: e.target.value })}
      />
      <ModeToggle />
    </nav>
  );
};
