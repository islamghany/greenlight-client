import React from 'react';
import RenderMovies from './RenderMovies';
import {
  setTopLikedMovies,
  setTopViewedMoves,
} from '@/store/slices/moviesSlices';

export default function Movies() {
  return (
    <div>
      <RenderMovies
        title="Top Liked Movies"
        endpoint="getMostLikedMovies"
        reducerFun={setTopLikedMovies}
        moviesState="topLikedMovies"
      />
      <RenderMovies
        title="Top Viewed Movies"
        endpoint="getMostViewedMovies"
        reducerFun={setTopViewedMoves}
        moviesState="topViewedMovies"
      />
    </div>
  );
}
