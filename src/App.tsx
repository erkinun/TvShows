import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./components/Details";
import Search from "./components/Search";

import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Router>
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
    </QueryClientProvider>
  );
}
