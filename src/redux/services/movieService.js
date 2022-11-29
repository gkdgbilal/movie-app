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

export const searchMovies = createAsyncThunk(
    "movies/searchMovies",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${server}/?apikey=${process.env.REACT_APP_API_KEY}&s=${arg || ""}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const getMoreMovies = createAsyncThunk(
    "movies/getMoreMovies",
    async ({ movieName, page }, { rejectWithValue }) => {
        // console.log(movieName, page);
        try {
            const response = await axios.get(`${server}/?apikey=${process.env.REACT_APP_API_KEY}&s=${movieName}&page=${page}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)