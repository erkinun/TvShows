import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import Search from "./components/Search";

import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./components/Header";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Router basename="TvShows">
        <div>
          <Routes>
            <Route path="/">
              <Route index element={<Search />} />
              <Route path="details" element={<Details />}>
                <Route path=":showId" element={<Details />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
