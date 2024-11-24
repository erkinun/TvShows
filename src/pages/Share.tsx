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
import { PrimaryButton } from "@/components/PrimaryButton";

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
    <div className="w-full p-2">
      <div className="p-4 rounded-xl shadow-lg flex flex-col gap-4">
        <div>Select a list to share</div>
        <Lists lists={lists} onChange={(list) => setCollectionId(list.id)} />
        <div className="flex gap-2 items-center">
          <label htmlFor="share">Share with</label>
          <input
            className="text-black p-2 border rounded"
            ref={inputRef}
            type="text"
            placeholder="Enter username of user"
          />
        </div>

        <PrimaryButton text="Share" onClick={handleShare} />
      </div>
    </div>
  );
}

export type CollectionListProps = {
  lists: ShowLists;
  onChange?: (list: ShowList) => void;
};

export function Lists({ lists, onChange }: CollectionListProps) {
  return (
    <select
      className="p-2 rounded-sm bg-gray-700 text-neutral-400"
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
