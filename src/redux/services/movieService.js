import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../config";

export const fetchMovie = createAsyncThunk(
    "movies/fetchMovie",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${server}/?apikey=${process.env.REACT_APP_API_KEY}&i=${arg}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (arg, { rejectWithValue }) => {
        try {
            let isTrue = localStorage.getItem("isTrue");
            let movies = localStorage.getItem("movieList");
            movies = JSON.parse(movies);

            if (isTrue !== null) {
                return movies;
            } else {
                const response = await axios.get(`${server}/?apikey=${process.env.REACT_APP_API_KEY}&s=har`);

                const data = await response.data;
                const jsonValue = JSON.stringify(data.Search);
                localStorage.setItem("movieList", jsonValue);
                isTrue = localStorage.setItem("isTrue", true);

                return data;
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const searchMovies = createAsyncThunk(
    "movies/searchMovies",
    async (arg, { rejectWithValue }) => {
        try {
            let movies = localStorage.getItem("movieList");
            movies = JSON.parse(movies);

            const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(arg.toLowerCase()));

            return filteredMovies;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const addMovie = createAsyncThunk(
    "movies/addMovie",
    async ({ formValues, movies }, { rejectWithValue }) => {
        try {
            const stringifiedData = JSON.stringify(formValues);
            localStorage.setItem("movieList",
                JSON.stringify([...movies, JSON.parse(stringifiedData)])
            );

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const getMoreMovies = createAsyncThunk(
    "movies/getMoreMovies",
    async ({ movieName, page }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${server}/?apikey=${process.env.REACT_APP_API_KEY}&s=${movieName}&page=${page}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteMovie = createAsyncThunk(
    "movies/deleteMovie",
    async (id, { rejectWithValue }) => {
        try {
            const movies = localStorage.getItem("movieList");
            const parsedMovies = JSON.parse(movies);
            const filteredMovies = parsedMovies.filter(movie => movie.imdbID !== id);

            if (movies.length === 0) {
                localStorage.setItem("isTrue", false);
            }

            localStorage.setItem("movieList", JSON.stringify(filteredMovies));
            return filteredMovies;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateMovie = createAsyncThunk(
    "movies/updateMovie",
    async (arg, { rejectWithValue }) => {
        try {
            const movies = localStorage.getItem("movieList");
            const parsedMovies = JSON.parse(movies);
            const updatedMovies = parsedMovies.map(movie => {
                if (movie.imdbID === arg.imdbID) {
                    return arg;
                }
                return movie;
            });
            console.log("updatedMovies", updatedMovies);
            localStorage.setItem("movieList", JSON.stringify(updatedMovies));
            return updatedMovies;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)