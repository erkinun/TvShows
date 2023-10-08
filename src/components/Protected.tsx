import { User } from "@firebase/auth";
import React from "react";
import { Navigate } from "react-router-dom";

// TODO do the props typing
type ProtectedRouteProps = {
  user: User | null | undefined;
  loading: boolean;
  children: React.ReactNode; // REACT NODE
};
export const ProtectedRoute = ({
  user,
  loading,
  children,
}: ProtectedRouteProps) => {
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  // or maybe show the login page with a message so we can redirect back to the page

  return children;
};
