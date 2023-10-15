import { useRef } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ShowList, createList, useLists } from "@/queries/lists";
import { Link } from "react-router-dom";

function List({ list }: { list: ShowList }) {
  return (
    <div>
      <h3>{list.name}</h3>
      <ul>
        {list.shows.map((show) => (
          <li key={show.apiId}>
            <Link to={`/details/${show.mediaType}/${show.apiId}`}>
              {show.name}
            </Link>
          </li>
        ))}
      </ul>
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
    <div>
      <h2>Create a new list ie favorites, watched etc</h2>
      <input className="text-black" ref={inputRef} type="text" />
      <button onClick={handleCreateButton}>Create</button>

      <h2>Existing collections</h2>
      <div className="flex flex-col gap-4">
        {lists.map((list) => {
          return <List key={list.id} list={list} />;
        })}
      </div>
    </div>
  );
};
