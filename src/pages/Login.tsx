import { auth, authFn } from "@/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

export function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    // TODO check if this works, if not, use a different hook
    // TODO and put it to main.tsx
    // TODO and make the login duration longer
    if (loading) {
      return;
    }
    if (user) navigate("/lists");
  }, [user, loading]);

  return (
    <div className="flex flex-col items-center justify-center rounded-xl shadow-lg gap-2 p-2 m-2">
      <button className="btn" onClick={authFn}>
        Login with Google
      </button>
      <h1 className="header">What to watch</h1>
    </div>
  );
}
