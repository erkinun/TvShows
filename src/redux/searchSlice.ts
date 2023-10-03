import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// TODO delete
export const fetchShows = createAsyncThunk(
  "shows/search",
  async (searchText = "") => {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchText}`
    );
    return response.json();
  }
);

export const searchSlice = createSlice({
  name: "search-slice",
  initialState: {
    hits: [],
    status: "idle",
    lastSearch: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchShows.pending, (state, action) => {
        state.lastSearch = action.meta.arg;
        state.status = "loading";
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hits = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
