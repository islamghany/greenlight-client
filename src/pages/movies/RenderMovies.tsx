import React, { useCallback, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { useApi } from '@/hooks/useApi';
import api from '@/api';
import { useAppDispatch, useAppSelector } from '@/store';
import Alert from '@/components/Alert';
import { Movie } from '@/types';

type Endpoints = 'getMostLikedMovies' | 'getMostViewedMovies';
interface RenderMoviesProps {
  title: string;
  endpoint: Endpoints;
  moviesState: 'topLikedMovies' | 'topViewedMovies';
  reducerFun: (payload: Movie[]) => {
    payload: Movie[];
    type: string;
  };
}
const RenderMovies: React.FC<RenderMoviesProps> = ({
  title,
  endpoint,
  reducerFun,
  moviesState,
}) => {
  const { exec, isIdle, isError, isPending, error, setError } = useApi(() =>
    api.moviesApi[endpoint]().then((res) => res.data.movies)
  );

  const movies = useAppSelector((state) => state.movies[moviesState]);
  const dispatch = useAppDispatch();
  const renderMovies = useCallback(async () => {
    const res = await exec();
    if (res.data) {
      dispatch(reducerFun(res.data));
    } else if (res.error) {
      setError(res.error);
    }
  }, []);
  useEffect(() => {
    if (movies.length === 0) {
      renderMovies();
    }
  }, []);
  return (
    <div className="">
      <h2 className="text-2xl font-bold my-4">{title}</h2>
      {isError && error && (
        <Alert title="Error" type="error">
          {error}
        </Alert>
      )}
      <div className="flex justify-center">
        <Spinner show={isPending || isIdle} size="md" />
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
