import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export function Logout({}) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <div>Not logged in</div>
        <div>
          Click here to continue to <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="m-4">Click below to log out</h1>
      <button
        className="bg-rose-500 hover:bg-rose-700 text-white py-2 px-4 rounded"
        onClick={() => {
          auth.signOut();
        }}
      >
        Log out
      </button>
    </div>
  );
}
