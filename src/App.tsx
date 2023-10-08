import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./components/Details";
import Search from "./components/Search";

import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./components/Protected";
import { Lists } from "./pages/Lists";
import { Login } from "./pages/Login";
import { auth } from "./firebase";

const queryClient = new QueryClient();

// TODO add a side menu bar for navigation
// TODO root page must be trending etc and search results must be a separate page
// TODO we can have a modal displaying the search results as a next step, enter would go to detailed search results page
export default function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/">
                <Route index element={<Search />} />
                <Route path="details" element={<Details />}>
                  <Route path=":mediaType/:showId" element={<Details />} />
                </Route>
                <Route
                  path="lists"
                  element={
                    <ProtectedRoute user={user} loading={loading}>
                      <Lists />
                    </ProtectedRoute>
                  }
                />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </main>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
