import { useGetMostLikedMoviesQuery } from '@/store/api'
import RenderMovies from './RenderMovies'

export default function MostLikedMovies() {
  const { data, isLoading, isError, error } = useGetMostLikedMoviesQuery()
  return (
    <RenderMovies
      title='Top Liked Movies'
      isLoading={isLoading}
      isError={isError}
      error={error}
      movies={data ? data.movies : []}
    />
  )
}
