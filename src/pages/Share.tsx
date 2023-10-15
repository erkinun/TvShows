import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";

import { useProfile } from "../queries/user";
import {
  ShowList,
  ShowLists,
  shareListWithUser,
  useLists,
} from "@/queries/lists";

// TODO this component renders 7 times to get the full details
// TODO in near future, receipient of the share should be able approve or deny
export function Share() {
  // TODO can we just include the auth state in the hooks below?
  const [user] = useAuthState(auth);
  const profile = useProfile();
  const lists = useLists();
  const [listId, setCollectionId] = useState<string>(lists[0]?.id);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleShare = async () => {
    console.log("sharing", listId, inputRef.current?.value);
    if (inputRef.current?.value && listId !== "") {
      // TODO maybe add some result state to confirm the share was successful
      shareListWithUser(listId, inputRef.current?.value);
    }
  };

  useEffect(() => {
    if (Array.isArray(lists)) {
      setCollectionId(lists[0]?.id);
    }
  }, [lists]);

  return (
    <div>
      <div>Hi {profile.userName ?? user?.displayName}!</div>
      <div>
        <h2>Share your lists</h2>
        <CollectionList
          lists={lists}
          onChange={(list) => setCollectionId(list.id)}
        />
        <div>
          <label htmlFor="share">Share with</label>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter username of user"
          />
        </div>

        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  );
}

export type CollectionListProps = {
  lists: ShowLists;
  onChange?: (list: ShowList) => void;
};

export function CollectionList({ lists, onChange }: CollectionListProps) {
  return (
    <select
      className="text-primary bg-primary-background"
      onChange={(e) => {
        const selectedList = lists.find((list) => list.id === e.target.value);
        if (selectedList) {
          onChange && onChange(selectedList);
        }
      }}
    >
      {lists.map((list) => (
        <option key={list.id} value={list.id}>
          {list.name}
        </option>
      ))}
    </select>
  );
}
