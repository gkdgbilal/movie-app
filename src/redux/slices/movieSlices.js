import { createSlice } from "@reduxjs/toolkit";
import { addMovie, deleteMovie, fetchMovie, fetchMovies, searchMovies, updateMovie } from "../services/movieService";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        movie: {},
        status: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [fetchMovie.pending]: (state, action) => {
            state.status = "loading";
            state.loading = true;
        },
        [fetchMovie.fulfilled]: (state, action) => {
            state.status = "success";
            state.movie = action.payload;
            state.loading = false;
        },
        [fetchMovie.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.loading = false;
        },
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
        [deleteMovie.pending]: (state, action) => {
            state.status = "loading";
            state.loading = true;
        },
        [deleteMovie.fulfilled]: (state, action) => {
            state.status = "success";
            state.movies = state.movies.filter((movie) => movie.imdbID !== action.payload.imdbID);
            state.loading = false;
        },
        [deleteMovie.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.loading = false;
        },
        [updateMovie.pending]: (state, action) => {
            state.status = "loading";
            state.loading = true;
        },
        [updateMovie.fulfilled]: (state, action) => {
            state.status = "success";
            state.movies = action.payload;
            state.loading = false;
        },
        [updateMovie.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.loading = false;
        },
        [addMovie.pending]: (state, action) => {
            state.status = "loading";
            state.loading = true;
        },
        [addMovie.fulfilled]: (state, action) => {
            state.status = "success";
            state.movies.push(action.payload);
            state.loading = false;
        },
        [addMovie.rejected]: (state, action) => {
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