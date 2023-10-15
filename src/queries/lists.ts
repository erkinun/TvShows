import { useEffect, useState } from "react";
import { ref, onValue, child, push, update, get } from "firebase/database";
import { auth, database } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export type ShowLists = Array<ShowList>;

export type ShowList = {
  id: string;
  name: string;
  shows: Array<Show>;
};

export type Show = {
  id: string;
  name: string;
  apiId: string;
  mediaType: string;
};

export function useLists() {
  const [user] = useAuthState(auth);

  const uid = user?.uid;
  const [showLists, setShowLists] = useState([] as ShowLists);
  useEffect(() => {
    if (uid) {
      // TODO is there a better way of doing this?
      const listsRef = ref(database, `users/${uid}/lists`);
      onValue(listsRef, (snapshot) => {
        snapshot.forEach((child) => {
          const realRef = ref(database, `lists/${child.val()}`);
          onValue(realRef, (listSnap) => {
            const listData = listSnap.val() as ShowList;
            setShowLists((existingLists) =>
              existingLists.find((list) => list.id === child.val())
                ? existingLists
                : existingLists.concat([
                    {
                      name: listData.name,
                      id: listData.id,
                      shows: listData.shows,
                    },
                  ])
            );
          });
        });
      });
    }
  }, [uid]);

  return showLists;
}

export async function createList(uid: string, name: string) {
  try {
    const newListKey = push(child(ref(database), "lists")).key;
    const listData = {
      name,
      shows: [],
    };

    const listRef = ref(database, `lists/${newListKey}`);
    await update(listRef, listData);
    const userListsRef = ref(database, `users/${uid}/lists`);
    await push(userListsRef, newListKey);
  } catch (error) {
    console.error(error);
  }
}

// TODO maybe check user exists?
// TODO maybe use the user type here?
export function shareListWithUser(listId: string, username: string) {
  try {
    const usersRef = ref(database, `users`);
    get(usersRef).then((snapshot) => {
      snapshot.forEach((child) => {
        const userData = child.val();
        if (userData.profile.userName === username) {
          const userListRef = ref(database, `users/${child.key}/lists`);
          push(userListRef, listId);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateList(showList: ShowList) {
  try {
    const shoppingListsRef = ref(database, `lists/${showList.id}`);
    await update(shoppingListsRef, showList);
  } catch (error) {
    console.error(error);
  }
}
