import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/types';

const initialState: {
  topLikedMovies: Movie[];
  topViewedMovies: Movie[];
} = {
  topLikedMovies: [],
  topViewedMovies: [],
};
const topLikedMoviesSlice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    setTopLikedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.topLikedMovies = action.payload;
    },
    setTopViewedMoves: (state, action: PayloadAction<Movie[]>) => {
      state.topViewedMovies = action.payload;
    },
  },
});

export const { setTopLikedMovies, setTopViewedMoves } =
  topLikedMoviesSlice.actions;

export default topLikedMoviesSlice.reducer;
