import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

const initialState = { movies: [], genres: [], genresLoaded: false };

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`
  );
  return data.genres;
});

const mapMovies = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = movie.genre_ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean);
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie.original_name || movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getMovieData = async (api, genres) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
    const { data } = await axios.get(`${api}&page=${i}`);
    mapMovies(data.results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/fetch",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getMovieData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`,
      genres
    );
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: { netflix: NetflixSlice.reducer },
});
