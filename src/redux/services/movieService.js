import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../config";

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&type=movie`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)