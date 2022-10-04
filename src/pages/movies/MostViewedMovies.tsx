import { useGetMostViewedMoviesQuery } from '@/store/api'
import RenderMovies from './RenderMovies'

export default function MostViewedMovies() {
  const { data, isLoading, isError, error } = useGetMostViewedMoviesQuery()
  return (
    <RenderMovies
      title='Top Viewed Movies'
      isLoading={isLoading}
      isError={isError}
      error={error}
      movies={data ? data.movies : []}
    />
  )
}
