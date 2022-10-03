import React from 'react';
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';
import { Movie } from '@/store/api';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface RenderMoviesProps {
  title: string;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  isError: boolean;
  movies: Movie[] | undefined;
}
const RenderMovies: React.FC<RenderMoviesProps> = ({
  title,
  error,
  isLoading,
  isError,
  movies = [],
}) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold my-4">{title}</h2>
      {isError && error && (
        <Alert title="Error" type="error">
          {'data' in error ? JSON.stringify(error.data) : 'unknown error'}
        </Alert>
      )}
      <div className="flex justify-center">
        <Spinner show={isLoading} size="md" />
      </div>
      {movies.length ? (
        <div className="flex gap-3 w-full">
          {movies.map((movie) => (
            <h1 key={movie.id}>{movie.runtime}</h1>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RenderMovies;
