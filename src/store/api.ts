import { emptySplitApi as api } from './emptyApi';
export const addTagTypes = ['movies', 'users', 'tokens', 'likes'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      healthCheck: build.query<HealthCheckApiResponse, HealthCheckApiArg>({
        query: () => ({ url: `/healthcheck` }),
      }),
      getAllMovies: build.query<GetAllMoviesApiResponse, GetAllMoviesApiArg>({
        query: (queryArg) => ({
          url: `/movies`,
          params: {
            title: queryArg.title,
            genres: queryArg.genres,
            page: queryArg.page,
            page_size: queryArg.pageSize,
            sort: queryArg.sort,
          },
        }),
        providesTags: ['movies'],
      }),
      createMovie: build.mutation<CreateMovieApiResponse, CreateMovieApiArg>({
        query: (queryArg) => ({
          url: `/movies`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['movies'],
      }),
      getMovie: build.query<GetMovieApiResponse, GetMovieApiArg>({
        query: (queryArg) => ({ url: `/movies/${queryArg.id}` }),
        providesTags: ['movies'],
      }),
      updateMovie: build.mutation<UpdateMovieApiResponse, UpdateMovieApiArg>({
        query: (queryArg) => ({
          url: `/movies/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.body,
        }),
        invalidatesTags: ['movies'],
      }),
      deleteMovie: build.mutation<DeleteMovieApiResponse, DeleteMovieApiArg>({
        query: (queryArg) => ({
          url: `/movies/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['movies'],
      }),
      getMostLikedMovies: build.query<
        GetMostLikedMoviesApiResponse,
        GetMostLikedMoviesApiArg
      >({
        query: () => ({ url: `/most-movies/likes` }),
        providesTags: ['movies'],
      }),
      getMostViewedMovies: build.query<
        GetMostViewedMoviesApiResponse,
        GetMostViewedMoviesApiArg
      >({
        query: () => ({ url: `/most-movies/views` }),
        providesTags: ['movies'],
      }),
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/users` }),
        providesTags: ['users'],
      }),
      registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>(
        {
          query: (queryArg) => ({
            url: `/users`,
            method: 'POST',
            body: queryArg.createUser,
          }),
          invalidatesTags: ['users'],
        }
      ),
      getUser: build.query<GetUserApiResponse, GetUserApiArg>({
        query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
        providesTags: ['users'],
      }),
      activateUser: build.mutation<ActivateUserApiResponse, ActivateUserApiArg>(
        {
          query: (queryArg) => ({
            url: `/users/activated`,
            method: 'PUT',
            body: queryArg.body,
          }),
          invalidatesTags: ['users'],
        }
      ),
      signinUser: build.mutation<SigninUserApiResponse, SigninUserApiArg>({
        query: (queryArg) => ({
          url: `/tokens/authentication`,
          method: 'POST',
          body: queryArg.authenticateUser,
        }),
        invalidatesTags: ['tokens'],
      }),
      createResetPasswordToken: build.mutation<
        CreateResetPasswordTokenApiResponse,
        CreateResetPasswordTokenApiArg
      >({
        query: (queryArg) => ({
          url: `/tokens/reset-password-token`,
          method: 'POST',
          body: queryArg.emailObject,
        }),
        invalidatesTags: ['tokens'],
      }),
      signoutUser: build.mutation<SignoutUserApiResponse, SignoutUserApiArg>({
        query: () => ({ url: `/users/signout`, method: 'POST' }),
        invalidatesTags: ['users'],
      }),
      getMovieLikes: build.query<GetMovieLikesApiResponse, GetMovieLikesApiArg>(
        {
          query: (queryArg) => ({ url: `/likes/${queryArg.id}` }),
          providesTags: ['likes'],
        }
      ),
      unlikeMovie: build.mutation<UnlikeMovieApiResponse, UnlikeMovieApiArg>({
        query: (queryArg) => ({
          url: `/likes/${queryArg.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['likes'],
      }),
      likeMovie: build.mutation<LikeMovieApiResponse, LikeMovieApiArg>({
        query: (queryArg) => ({
          url: `/likes`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['likes'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type HealthCheckApiResponse = /** status 200 Success request */ {
  status?: string;
  system_info?: {
    environment?: string;
    version?: string;
  }[];
};
export type HealthCheckApiArg = void;
export type GetAllMoviesApiResponse =
  /** status 200 success request */ MoviesResponse;
export type GetAllMoviesApiArg = {
  /** the title of the movie */
  title?: string;
  /** an array containg the genres of the movie */
  genres?: string[];
  /** how many pages */
  page?: number;
  /** how many movies in one page */
  pageSize?: number;
  /** sort the returned array movie depend on these params */
  sort?:
    | 'title'
    | '-title'
    | 'id'
    | '-id - year'
    | '-year - runtime'
    | '-runtime';
};
export type CreateMovieApiResponse = /** status 201 success request */ {
  movie?: Movie;
};
export type CreateMovieApiArg = {
  /** movie data */
  body: CreateMovie;
};
export type GetMovieApiResponse = /** status 200 successful operation */ {
  movie?: Movie;
};
export type GetMovieApiArg = {
  /** the id of the movie */
  id: number;
};
export type UpdateMovieApiResponse = /** status 200 successful operation */ {
  movie?: Movie;
};
export type UpdateMovieApiArg = {
  /** the id of the movie */
  id: number;
  /** updated movie data */
  body: CreateMovie;
};
export type DeleteMovieApiResponse = /** status 200 successful operation */ {
  messgae?: string;
};
export type DeleteMovieApiArg = {
  /** the id of the movie */
  id: number;
};
export type GetMostLikedMoviesApiResponse =
  /** status 200 success operation */ {
    movies?: Movie[];
  };
export type GetMostLikedMoviesApiArg = void;
export type GetMostViewedMoviesApiResponse =
  /** status 200 success operation */ {
    movies?: Movie[];
  };
export type GetMostViewedMoviesApiArg = void;
export type GetCurrentUserApiResponse = /** status 200 user created */ {
  user?: User;
};
export type GetCurrentUserApiArg = void;
export type RegisterUserApiResponse = /** status 201 user created */ {
  user?: User;
};
export type RegisterUserApiArg = {
  /** Created user object */
  createUser: CreateUser;
};
export type GetUserApiResponse = /** status 200 success operation */ {
  user?: User;
};
export type GetUserApiArg = {
  /** the id of the movie */
  id: number;
};
export type ActivateUserApiResponse = /** status 201 user activated */ {
  user?: User;
};
export type ActivateUserApiArg = {
  body: {
    token?: string;
  };
};
export type SigninUserApiResponse = /** status 201 user activated */ {
  user?: User;
};
export type SigninUserApiArg = {
  authenticateUser: AuthenticateUser;
};
export type CreateResetPasswordTokenApiResponse =
  /** status 201 token has been sent to user's email */ SuccessResponse;
export type CreateResetPasswordTokenApiArg = {
  emailObject: EmailObject;
};
export type SignoutUserApiResponse =
  /** status 200 user has been signed out */ SuccessResponse;
export type SignoutUserApiArg = void;
export type GetMovieLikesApiResponse = /** status 200 Success operation */ {
  likes?: Like;
};
export type GetMovieLikesApiArg = {
  /** the id of the movie */
  id: number;
};
export type UnlikeMovieApiResponse =
  /** status 200 Success operation */ SuccessResponse;
export type UnlikeMovieApiArg = {
  /** the id of the movie */
  id: number;
};
export type LikeMovieApiResponse =
  /** status 200 Success operation */ SuccessResponse;
export type LikeMovieApiArg = {
  body: {
    movie_id?: number;
  };
};
export type ErrorResponse = {
  error?: string;
};
export type MetaData = {
  current_page?: number;
  page_size?: number;
  first_page?: number;
  last_page?: number;
  total_reocrds?: number;
};
export type Movie = {
  id: number;
  title: string;
  created_at?: string;
  runtime: string;
  genres: string[];
  year: number;
  version?: string;
  count?: number;
  likes?: number;
  user_id?: number;
};
export type MoviesResponse = {
  metadata?: MetaData;
  movies?: Movie[];
};
export type CreateMovie = {
  title?: string;
  year?: number;
  genres?: string[];
  runtime?: string;
};
export type User = {
  id?: number;
  name?: string;
  activated?: boolean;
  email?: string;
  password?: string;
  version?: string;
  created_at?: string;
  isCurrentUser?: boolean;
};
export type CreateUser = {
  name?: string;
  email?: string;
  password?: string;
};
export type AuthenticateUser = {
  email?: string;
  password?: string;
};
export type SuccessResponse = {
  messgae?: string;
};
export type EmailObject = {
  email: string;
};
export type Like = {
  movie_id?: number;
  isCurrentUserLiked?: number;
  likes?: number;
};
export const {
  useHealthCheckQuery,
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useGetMovieQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetMostLikedMoviesQuery,
  useGetMostViewedMoviesQuery,
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useGetUserQuery,
  useActivateUserMutation,
  useSigninUserMutation,
  useCreateResetPasswordTokenMutation,
  useSignoutUserMutation,
  useGetMovieLikesQuery,
  useUnlikeMovieMutation,
  useLikeMovieMutation,
} = injectedRtkApi;
