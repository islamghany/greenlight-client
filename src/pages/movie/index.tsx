import api from '@/api';
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { useApi } from '@/hooks/useApi';
import { Movie } from '@/types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/outline';
import MovieLike from './MovieLike';
import './movie.css';

const ShowMovie: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {movie.title}
        </h3>
        <div>
          <div className="flex space-x-3">
            <div className="px-4 py-2 rounded-full bg-gray-50 space-x-2 flex items-center">
              <EyeIcon className="h-5 w-auto  text-gray-400" />
              <span className="text-sm text-gray-500">{movie.count || 0}</span>
            </div>
            <MovieLike id={movie.id} />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Release Year</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {movie.year}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Runtime</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {movie.runtime}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Genres</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-3">
              {movie.genres.map((g) => (
                <span key={g}>{g}</span>
              ))}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Added at</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(movie.created_at!).toDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default function MovieComp() {
  const { id } = useParams<{ id?: string }>();

  const { data, isError, isPending, isSuccess, isIdle, error } = useApi(
    () => api.moviesApi.getMovie(+id!).then((res) => res.data.movie),
    {
      enabled: true,
      enabledData: {},
    }
  );

  if (isIdle || isPending) return <Spinner className="mt-5" center size="lg" />;
  if (isError)
    return (
      <Alert type="error" title="Error">
        {error}
      </Alert>
    );

  if (data)
    return (
      <div className="my-12">
        <ShowMovie movie={data} />
      </div>
    );

  return null;
}
