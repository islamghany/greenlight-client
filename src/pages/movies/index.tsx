import React from 'react'

import MostLikedMovies from './MostLikedMovies'
import MostViewedMovies from './MostViewedMovies'

export default function Movies() {
  return (
    <React.Fragment>
      <MostLikedMovies />
      <MostViewedMovies />
    </React.Fragment>
  )
}
