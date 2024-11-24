import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";
import { updateUserName, useProfile } from "../queries/user";
import { PrimaryButton } from "@/components/PrimaryButton";

// TODO style this page
export function Profile() {
  const [user] = useAuthState(auth);
  const profile = useProfile();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSave = () => {
    updateUserName(user?.uid ?? "", inputRef.current?.value ?? "");
  };

  return (
    <div className="w-full p-2">
      <div className="p-4 rounded-xl shadow-lg flex flex-col gap-4">
        <div>Hi {profile.userName ?? user?.displayName}!</div>
        <h2>Set your user name</h2>
        <input
          className="text-black p-2 border rounded"
          ref={inputRef}
          type="text"
          defaultValue={user?.displayName ?? ""}
        />

        <PrimaryButton text="Save" onClick={handleSave} />
      </div>
    </div>
  );
}
