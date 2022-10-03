import { useGetMostViewedMoviesQuery } from '@/store/api';
import React from 'react';
import RenderMovies from './RenderMovies';

type Props = {};

export default function MostViewedMovies({}: Props) {
  const { data, isLoading, isError, error } = useGetMostViewedMoviesQuery();
  return (
    <RenderMovies
      title="Top Viewed Movies"
      isLoading={isLoading}
      isError={isError}
      error={error}
      movies={data ? data.movies : []}
    />
  );
}
