import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../config";

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=harry`);
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
            console.log("arg", arg);
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${arg || ""}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const getMoreMovies = createAsyncThunk(
    "movies/getMoreMovies",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=harry`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)