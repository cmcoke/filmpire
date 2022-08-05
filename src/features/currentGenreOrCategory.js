import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: ""
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      // console.log(action.payload);
      state.genreIdOrCategoryName = action.payload; // saves a specific category/genre to the redux store
      state.searchQuery = ""; // needs to be set to an empty search when clicking on the category/genre links on the sidebar
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
