import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./components/Details";
import Search from "./components/Search";

import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

// TODO remove the piece of shit redux
// TODO root page must be trending etc and search results must be a separate page
// TODO we can have a modal displaying the search results as a next step, enter would go to detailed search results page
export default function App() {
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
              </Route>
            </Routes>
          </main>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
