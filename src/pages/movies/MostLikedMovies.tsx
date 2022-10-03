import { useGetMostLikedMoviesQuery } from '@/store/api';
import React from 'react';
import RenderMovies from './RenderMovies';

type Props = {};

export default function MostLikedMovies({}: Props) {
  const { data, isLoading, isError, error } = useGetMostLikedMoviesQuery();
  return (
    <RenderMovies
      title="Top Liked Movies"
      isLoading={isLoading}
      isError={isError}
      error={error}
      movies={data ? data.movies : []}
    />
  );
}
