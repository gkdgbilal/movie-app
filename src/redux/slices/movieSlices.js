import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, searchMovies } from "../services/movieService";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        status: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [fetchMovies.pending]: (state, action) => {
            state.status = "loading";
            state.loading = true;
        },
        [fetchMovies.fulfilled]: (state, action) => {
            state.status = "success";
            state.movies = action.payload;
            state.loading = false;
        },
        [fetchMovies.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.loading = false;
        },
        [searchMovies.pending]: (state, action) => {
            state.status = "loading";
            state.loading = true;
        },
        [searchMovies.fulfilled]: (state, action) => {
            state.status = "success";
            state.movies = action.payload;
            state.loading = false;
        },
        [searchMovies.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export default movieSlice.reducer;