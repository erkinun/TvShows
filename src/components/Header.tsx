import { fetchShows } from "@/redux/searchSlice";
import { ModeToggle } from "./mode-toggle";

import { useDispatch } from "react-redux"; // TODO convert this to reactQuery and remove redux

export const Header = () => {
  const searchDispatch = useDispatch();

  return (
    <nav className="flex p-2">
      <input
        placeholder="Search for a TV Show"
        className="flex-1 p-2 rounded-md text-black"
        onChange={(e) => searchDispatch(fetchShows(e.target.value))}
      />
      <ModeToggle />
    </nav>
  );
};
